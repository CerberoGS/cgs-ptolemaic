<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WaitlistEntry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class WaitlistController extends Controller
{
    /**
     * Display the waitlist management page
     */
    public function index(): Response
    {
        $entries = WaitlistEntry::with('user')
            ->latest()
            ->paginate(20)
            ->through(function ($entry) {
                return [
                    'id' => $entry->id,
                    'user_name' => $entry->user->name,
                    'user_email' => $entry->user->email,
                    'plan_type' => $entry->plan_type,
                    'plan_label' => $entry->plan_label,
                    'plan_icon' => $entry->plan_icon,
                    'status' => $entry->status,
                    'status_label' => $entry->status_label,
                    'notes' => $entry->notes,
                    'contacted_at' => $entry->contacted_at,
                    'converted_at' => $entry->converted_at,
                    'created_at' => $entry->created_at,
                ];
            });

        $stats = [
            'total_entries' => WaitlistEntry::count(),
            'active_entries' => WaitlistEntry::where('status', 'active')->count(),
            'contacted_entries' => WaitlistEntry::where('status', 'contacted')->count(),
            'converted_entries' => WaitlistEntry::where('status', 'converted')->count(),
            'entries_by_plan' => WaitlistEntry::selectRaw('plan_type, COUNT(*) as count')
                ->groupBy('plan_type')
                ->pluck('count', 'plan_type')
                ->toArray(),
        ];

        return Inertia::render('admin/waitlist/index', [
            'entries' => $entries,
            'stats' => $stats,
        ]);
    }

    /**
     * Update waitlist entry status
     */
    public function updateStatus(Request $request, string $locale, $waitlistEntry): RedirectResponse
    {
        if (is_string($waitlistEntry) || is_numeric($waitlistEntry)) {
            $waitlistEntry = WaitlistEntry::findOrFail($waitlistEntry);
        }

        $validated = $request->validate([
            'status' => ['required', 'string', Rule::in(['active', 'contacted', 'converted', 'cancelled'])],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $waitlistEntry->update([
            'status' => $validated['status'],
            'notes' => $validated['notes'],
        ]);

        // Set timestamps based on status
        if ($validated['status'] === 'contacted' && !$waitlistEntry->contacted_at) {
            $waitlistEntry->markAsContacted();
        } elseif ($validated['status'] === 'converted' && !$waitlistEntry->converted_at) {
            $waitlistEntry->markAsConverted();
        }

        return back()->with('success', __('Waitlist entry status updated successfully!'));
    }

    /**
     * Delete waitlist entry
     */
    public function destroy(string $locale, $waitlistEntry): RedirectResponse
    {
        if (is_string($waitlistEntry) || is_numeric($waitlistEntry)) {
            $waitlistEntry = WaitlistEntry::findOrFail($waitlistEntry);
        }

        $waitlistEntry->delete();

        return back()->with('success', __('Waitlist entry deleted successfully!'));
    }
}