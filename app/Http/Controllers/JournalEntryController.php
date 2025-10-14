<?php

namespace App\Http\Controllers;

use App\Models\JournalEntry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class JournalEntryController extends Controller
{
    /**
     * Display a listing of the user's journal entries.
     */
    public function index(Request $request, string $locale): Response
    {
        $query = $request->user()
            ->journalEntries()
            ->with('user:id,name')
            ->latest('trade_date');

        // Apply filters
        if ($request->filled('asset_type')) {
            $query->ofAssetType($request->input('asset_type'));
        }

        if ($request->filled('setup_type')) {
            $query->ofSetupType($request->input('setup_type'));
        }

        if ($request->filled('status')) {
            match ($request->input('status')) {
                'open' => $query->open(),
                'closed' => $query->closed(),
                'profitable' => $query->profitable(),
                'losing' => $query->losing(),
                default => null,
            };
        }

        if ($request->filled('date_from') && $request->filled('date_to')) {
            $query->dateRange(
                $request->input('date_from'),
                $request->input('date_to')
            );
        }

        $entries = $query->paginate(20)->withQueryString();

        // Calculate statistics
        $stats = $this->calculateStats($request->user());

        return Inertia::render('journal/index', [
            'entries' => $entries,
            'stats' => $stats,
            'filters' => $request->only(['asset_type', 'setup_type', 'status', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Show the form for creating a new journal entry.
     */
    public function create(string $locale): Response
    {
        return Inertia::render('journal/create');
    }

    /**
     * Store a newly created journal entry in storage.
     */
    public function store(Request $request, string $locale): RedirectResponse
    {
        $validated = $request->validate([
            'symbol' => ['required', 'string', 'max:20'],
            'direction' => ['required', 'in:long,short'],
            'asset_type' => ['required', 'in:stock,forex,crypto,option,future'],
            'entry_price' => ['required', 'numeric', 'min:0'],
            'exit_price' => ['nullable', 'numeric', 'min:0'],
            'quantity' => ['required', 'numeric', 'min:0.0001'],
            'setup_type' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:10000'],
            'tags' => ['nullable', 'string'],
            'emotion' => ['nullable', 'integer', 'min:1', 'max:5'],
            'trade_date' => ['required', 'date'],
            'entry_time' => ['nullable', 'date_format:H:i'],
            'exit_time' => ['nullable', 'date_format:H:i'],
        ]);

        // Process tags from comma-separated string to array
        if (! empty($validated['tags'])) {
            $validated['tags'] = array_map('trim', explode(',', $validated['tags']));
        } else {
            $validated['tags'] = [];
        }

        // Combine date and time for entry_time and exit_time
        if (! empty($validated['entry_time'])) {
            $validated['entry_time'] = $validated['trade_date'].' '.$validated['entry_time'];
        }

        if (! empty($validated['exit_time'])) {
            $validated['exit_time'] = $validated['trade_date'].' '.$validated['exit_time'];
        }

        $entry = $request->user()->journalEntries()->create($validated);

        // Calculate P&L if exit price is provided
        if ($validated['exit_price'] ?? null) {
            $entry->calculatePnL();
            $entry->save();
        }

        return redirect()
            ->route('journal.show', ['locale' => $locale, 'journal' => $entry->id])
            ->with('success', __('Journal entry created successfully.'));
    }

    /**
     * Display the specified journal entry.
     */
    public function show(string $locale, JournalEntry $journal): Response
    {
        $entry = $journal;
        Gate::authorize('view', $entry);

        $entry->load('user:id,name');

        return Inertia::render('journal/show', [
            'entry' => [
                'id' => $entry->id,
                'symbol' => $entry->symbol,
                'direction' => $entry->direction,
                'asset_type' => $entry->asset_type,
                'entry_price' => $entry->entry_price,
                'exit_price' => $entry->exit_price,
                'quantity' => $entry->quantity,
                'pnl' => $entry->pnl,
                'pnl_percentage' => $entry->pnl_percentage,
                'setup_type' => $entry->setup_type,
                'notes' => $entry->notes,
                'tags' => $entry->tags ?? [],
                'images' => $entry->images ?? [],
                'emotion' => $entry->emotion,
                'trade_date' => $entry->trade_date->toIso8601String(),
                'entry_time' => $entry->entry_time?->toIso8601String(),
                'exit_time' => $entry->exit_time?->toIso8601String(),
                'is_closed' => $entry->isClosed(),
                'is_profitable' => $entry->isProfitable(),
                'hold_time' => $entry->getFormattedHoldTime(),
                'created_at' => $entry->created_at->toIso8601String(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified journal entry.
     */
    public function edit(string $locale, JournalEntry $journal): Response
    {
        $entry = $journal;
        Gate::authorize('update', $entry);

        return Inertia::render('journal/edit', [
            'entry' => [
                'id' => $entry->id,
                'symbol' => $entry->symbol,
                'direction' => $entry->direction,
                'asset_type' => $entry->asset_type,
                'entry_price' => $entry->entry_price,
                'exit_price' => $entry->exit_price,
                'quantity' => $entry->quantity,
                'setup_type' => $entry->setup_type,
                'notes' => $entry->notes,
                'tags' => $entry->tags ?? [],
                'images' => $entry->images ?? [],
                'emotion' => $entry->emotion,
                'trade_date' => $entry->trade_date->format('Y-m-d'),
                'entry_time' => $entry->entry_time?->format('H:i'),
                'exit_time' => $entry->exit_time?->format('H:i'),
            ],
        ]);
    }

    /**
     * Update the specified journal entry in storage.
     */
    public function update(Request $request, string $locale, JournalEntry $journal): RedirectResponse
    {
        $entry = $journal;
        Gate::authorize('update', $entry);

        $validated = $request->validate([
            'symbol' => ['required', 'string', 'max:20'],
            'direction' => ['required', 'in:long,short'],
            'asset_type' => ['required', 'in:stock,forex,crypto,option,future'],
            'entry_price' => ['required', 'numeric', 'min:0'],
            'exit_price' => ['nullable', 'numeric', 'min:0'],
            'quantity' => ['required', 'numeric', 'min:0.0001'],
            'setup_type' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:10000'],
            'tags' => ['nullable', 'string'],
            'emotion' => ['nullable', 'integer', 'min:1', 'max:5'],
            'trade_date' => ['required', 'date'],
            'entry_time' => ['nullable', 'date_format:H:i'],
            'exit_time' => ['nullable', 'date_format:H:i'],
        ]);

        // Process tags from comma-separated string to array
        if (! empty($validated['tags'])) {
            $validated['tags'] = array_map('trim', explode(',', $validated['tags']));
        } else {
            $validated['tags'] = [];
        }

        // Combine date and time for entry_time and exit_time
        if (! empty($validated['entry_time'])) {
            $validated['entry_time'] = $validated['trade_date'].' '.$validated['entry_time'];
        }

        if (! empty($validated['exit_time'])) {
            $validated['exit_time'] = $validated['trade_date'].' '.$validated['exit_time'];
        }

        $entry->update($validated);

        // Recalculate P&L if exit price is provided
        if ($validated['exit_price'] ?? null) {
            $entry->calculatePnL();
            $entry->save();
        }

        return redirect()
            ->route('journal.show', ['locale' => $locale, 'journal' => $entry->id])
            ->with('success', __('Journal entry updated successfully.'));
    }

    /**
     * Remove the specified journal entry from storage.
     */
    public function destroy(string $locale, JournalEntry $journal): RedirectResponse
    {
        $entry = $journal;
        Gate::authorize('delete', $entry);

        $entry->delete();

        return redirect()
            ->route('journal.index', ['locale' => $locale])
            ->with('success', __('Journal entry deleted successfully.'));
    }

    /**
     * Calculate statistics for user's trading performance.
     */
    private function calculateStats($user): array
    {
        $entries = $user->journalEntries()->closed()->get();

        if ($entries->isEmpty()) {
            return [
                'total_trades' => 0,
                'win_rate' => 0,
                'total_pnl' => 0,
                'avg_win' => 0,
                'avg_loss' => 0,
            ];
        }

        $totalTrades = $entries->count();
        $winningTrades = $entries->filter(fn ($e) => $e->isProfitable())->count();
        $winRate = ($winningTrades / $totalTrades) * 100;

        $totalPnl = $entries->sum(fn ($e) => (float) $e->pnl);

        $winners = $entries->filter(fn ($e) => $e->isProfitable());
        $losers = $entries->filter(fn ($e) => ! $e->isProfitable());

        $avgWin = $winners->isNotEmpty()
            ? $winners->avg(fn ($e) => (float) $e->pnl)
            : 0;

        $avgLoss = $losers->isNotEmpty()
            ? $losers->avg(fn ($e) => (float) $e->pnl)
            : 0;

        return [
            'total_trades' => $totalTrades,
            'win_rate' => round($winRate, 2),
            'total_pnl' => round($totalPnl, 2),
            'avg_win' => round($avgWin, 2),
            'avg_loss' => round($avgLoss, 2),
        ];
    }
}
