<?php

namespace App\Http\Controllers;

use App\Models\JournalEntry;
use App\Services\AchievementService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class JournalEntryController extends Controller
{
    public function __construct(protected AchievementService $achievementService) {}

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
            'stop_loss' => ['nullable', 'numeric', 'min:0'],
            'take_profit' => ['nullable', 'numeric', 'min:0'],
            'risk_reward_ratio' => ['nullable', 'numeric', 'min:0'],
            'account_risk_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'quantity' => ['required', 'numeric', 'min:0.0001'],
            'setup_type' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:10000'],
            'tags' => ['nullable', 'string'],
            'emotion' => ['nullable', 'integer', 'min:1', 'max:5'],
            'trade_date' => ['required', 'date'],
            'entry_time' => ['nullable', 'date_format:H:i'],
            'exit_time' => ['nullable', 'date_format:H:i'],
            'followed_plan' => ['nullable', 'boolean'],
            'mistakes' => ['nullable', 'string', 'max:1000'],
            'lessons_learned' => ['nullable', 'string', 'max:1000'],
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
            $entry->updateCalculatedFields();
            $entry->save();

            // Check for new achievements
            $newAchievements = $this->achievementService->checkAchievementsForTrade($request->user(), $entry);

            if (count($newAchievements) > 0) {
                $achievementNames = collect($newAchievements)->pluck('name')->join(', ');

                return redirect()
                    ->route('journal.show', ['locale' => $locale, 'journal' => $entry->id])
                    ->with('success', __('Journal entry created successfully.'))
                    ->with('achievement', __('New achievement unlocked: :names', ['names' => $achievementNames]));
            }
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
            'stop_loss' => ['nullable', 'numeric', 'min:0'],
            'take_profit' => ['nullable', 'numeric', 'min:0'],
            'risk_reward_ratio' => ['nullable', 'numeric', 'min:0'],
            'account_risk_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'quantity' => ['required', 'numeric', 'min:0.0001'],
            'setup_type' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:10000'],
            'tags' => ['nullable', 'string'],
            'emotion' => ['nullable', 'integer', 'min:1', 'max:5'],
            'trade_date' => ['required', 'date'],
            'entry_time' => ['nullable', 'date_format:H:i'],
            'exit_time' => ['nullable', 'date_format:H:i'],
            'followed_plan' => ['nullable', 'boolean'],
            'mistakes' => ['nullable', 'string', 'max:1000'],
            'lessons_learned' => ['nullable', 'string', 'max:1000'],
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
            $entry->updateCalculatedFields();
            $entry->save();

            // Check for new achievements
            $newAchievements = $this->achievementService->checkAchievementsForTrade($request->user(), $entry);

            if (count($newAchievements) > 0) {
                $achievementNames = collect($newAchievements)->pluck('name')->join(', ');

                return redirect()
                    ->route('journal.show', ['locale' => $locale, 'journal' => $entry->id])
                    ->with('success', __('Journal entry updated successfully.'))
                    ->with('achievement', __('New achievement unlocked: :names', ['names' => $achievementNames]));
            }
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
                'pnl_timeline' => [],
                'asset_distribution' => [],
                'win_loss_distribution' => [],
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

        // P&L Timeline (last 30 days or all trades if less)
        $pnlTimeline = $entries
            ->sortBy('trade_date')
            ->groupBy(fn ($e) => $e->trade_date->format('Y-m-d'))
            ->map(fn ($dayEntries) => [
                'date' => $dayEntries->first()->trade_date->format('M d'),
                'pnl' => round($dayEntries->sum(fn ($e) => (float) $e->pnl), 2),
            ])
            ->values()
            ->take(30);

        // Asset Type Distribution
        $assetDistribution = $entries
            ->groupBy('asset_type')
            ->map(fn ($group, $type) => [
                'name' => ucfirst($type),
                'value' => $group->count(),
                'pnl' => round($group->sum(fn ($e) => (float) $e->pnl), 2),
            ])
            ->values();

        // Win/Loss Distribution
        $winLossDistribution = [
            ['name' => 'Wins', 'value' => $winningTrades, 'fill' => '#22c55e'],
            ['name' => 'Losses', 'value' => $totalTrades - $winningTrades, 'fill' => '#ef4444'],
        ];

        return [
            'total_trades' => $totalTrades,
            'win_rate' => round($winRate, 2),
            'total_pnl' => round($totalPnl, 2),
            'avg_win' => round($avgWin, 2),
            'avg_loss' => round($avgLoss, 2),
            'pnl_timeline' => $pnlTimeline,
            'asset_distribution' => $assetDistribution,
            'win_loss_distribution' => $winLossDistribution,
        ];
    }

    /**
     * Export journal entries to CSV.
     */
    public function exportCsv(Request $request, string $locale): StreamedResponse
    {
        $query = $request->user()
            ->journalEntries()
            ->latest('trade_date');

        // Apply same filters as index
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

        $entries = $query->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="journal-entries-'.now()->format('Y-m-d').'.csv"',
        ];

        $callback = function () use ($entries) {
            $file = fopen('php://output', 'w');

            // CSV Headers
            fputcsv($file, [
                'Date',
                'Symbol',
                'Direction',
                'Asset Type',
                'Entry Price',
                'Exit Price',
                'Quantity',
                'P&L',
                'P&L %',
                'Setup Type',
                'Emotion',
                'Status',
                'Tags',
            ]);

            // CSV Data
            foreach ($entries as $entry) {
                fputcsv($file, [
                    $entry->trade_date->format('Y-m-d'),
                    $entry->symbol,
                    ucfirst($entry->direction instanceof \BackedEnum ? $entry->direction->value : $entry->direction),
                    ucfirst($entry->asset_type instanceof \BackedEnum ? $entry->asset_type->value : $entry->asset_type),
                    $entry->entry_price,
                    $entry->exit_price ?? '',
                    $entry->quantity,
                    $entry->pnl ?? '',
                    $entry->pnl_percentage ?? '',
                    $entry->setup_type ?? '',
                    $entry->emotion ?? '',
                    $entry->isClosed() ? 'Closed' : 'Open',
                    is_array($entry->tags) ? implode(', ', $entry->tags) : '',
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Export journal entries to PDF.
     */
    public function exportPdf(Request $request, string $locale)
    {
        $query = $request->user()
            ->journalEntries()
            ->latest('trade_date');

        // Apply same filters as index
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

        $entries = $query->get();

        $pdf = Pdf::loadView('journal-pdf', [
            'entries' => $entries,
        ]);

        return $pdf->download('journal-entries-'.now()->format('Y-m-d').'.pdf');
    }
}
