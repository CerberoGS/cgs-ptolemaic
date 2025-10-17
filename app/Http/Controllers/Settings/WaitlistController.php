<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\WaitlistEntry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class WaitlistController extends Controller
{
    /**
     * Add user to waitlist for a specific plan
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'plan_type' => ['required', 'string', Rule::in(['managed', 'pro', 'enterprise'])],
                'action' => ['nullable', 'string', Rule::in(['add', 'switch', 'remove'])],
            ]);

            $user = Auth::user();
            $planType = $validated['plan_type'];
            $action = $validated['action'] ?? 'add';

            \Log::info('Waitlist action', [
                'user_id' => $user->id,
                'plan_type' => $planType,
                'action' => $action
            ]);

            $planLabels = [
                'managed' => 'Cosmógrafo',
                'pro' => 'Astrónomo',
                'enterprise' => 'Heliópolis',
            ];

            // Check if user is already on any active waitlist (regardless of plan)
            $activeEntry = WaitlistEntry::where('user_id', $user->id)
                ->where('status', 'active')
                ->first();

            if ($action === 'remove' && $activeEntry) {
                // Remove from waitlist
                $activeEntry->cancel();
                $message = __('general.removed_waitlist', [
                    'plan' => $planLabels[$activeEntry->plan_type]
                ]);
            } elseif ($action === 'add' || $action === 'switch') {
                if ($activeEntry) {
                    if ($activeEntry->plan_type === $planType) {
                        // User is already on this plan's waitlist
                        $message = __('general.already_on_waitlist');
                    } else {
                        // User is on another plan's waitlist, switch them
                        $oldPlanLabel = $planLabels[$activeEntry->plan_type];
                        \Log::info('Switching plan', [
                            'entry_id' => $activeEntry->id,
                            'old_plan' => $activeEntry->plan_type,
                            'new_plan' => $planType
                        ]);
                        
                        try {
                            $activeEntry->update([
                                'plan_type' => $planType,
                                'status' => 'active',
                            ]);
                            
                            \Log::info('Plan switched successfully', [
                                'entry_id' => $activeEntry->id,
                                'new_plan' => $activeEntry->plan_type
                            ]);
                            
                            // Refresh the model to get updated data
                            $activeEntry->refresh();
                        } catch (\Exception $e) {
                            \Log::error('Error switching plan', [
                                'entry_id' => $activeEntry->id,
                                'error' => $e->getMessage(),
                                'trace' => $e->getTraceAsString()
                            ]);
                            throw $e;
                        }
                        
                        $message = __('general.switched_waitlist', [
                            'oldPlan' => $oldPlanLabel,
                            'newPlan' => $planLabels[$planType]
                        ]);
                    }
                } else {
                    // User is not on any waitlist, create new entry
                    WaitlistEntry::create([
                        'user_id' => $user->id,
                        'plan_type' => $planType,
                        'status' => 'active',
                    ]);
                    $message = __('general.added_waitlist', [
                        'plan' => $planLabels[$planType]
                    ]);
                }
            } else {
                // Invalid action
                $message = __('Invalid action specified.');
            }

            // Return JSON response for AJAX requests
            if ($request->header('X-Requested-With') === 'XMLHttpRequest') {
                return response()->json([
                    'success' => true,
                    'message' => $message,
                    'action' => $action,
                    'plan_type' => $planType,
                ]);
            }

            // Fallback for non-AJAX requests
            return back()->with('success', $message);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors
            if ($request->header('X-Requested-With') === 'XMLHttpRequest') {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $e->errors(),
                ], 422);
            }
            throw $e;
        } catch (\Exception $e) {
            // Handle other errors
            if ($request->header('X-Requested-With') === 'XMLHttpRequest') {
                return response()->json([
                    'success' => false,
                    'message' => 'An error occurred: ' . $e->getMessage(),
                ], 500);
            }
            throw $e;
        }
    }

    /**
     * Get user's waitlist status
     */
    public function status(Request $request)
    {
        $user = Auth::user();
        
        $activeEntry = WaitlistEntry::where('user_id', $user->id)
            ->where('status', 'active')
            ->first();

        $planLabels = [
            'managed' => 'Cosmógrafo',
            'pro' => 'Astrónomo',
            'enterprise' => 'Heliópolis',
        ];

        $waitlistStatus = [
            'is_on_waitlist' => $activeEntry !== null,
            'current_plan' => $activeEntry?->plan_type,
            'current_plan_label' => $activeEntry ? $planLabels[$activeEntry->plan_type] : null,
        ];

        // Always return JSON for this endpoint - it's designed for AJAX calls
        return response()->json([
            'waitlistStatus' => $waitlistStatus,
        ]);
    }

    /**
     * Remove user from waitlist
     */
    public function destroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'plan_type' => ['required', 'string', Rule::in(['managed', 'pro', 'enterprise'])],
        ]);

        $user = Auth::user();

        $entry = WaitlistEntry::where('user_id', $user->id)
            ->where('plan_type', $validated['plan_type'])
            ->where('status', 'active')
            ->first();

        if (!$entry) {
            return back()->with('error', __('You are not on the waitlist for this plan.'));
        }

        $entry->cancel();

        $planLabels = [
            'managed' => 'Cosmógrafo',
            'pro' => 'Astrónomo',
            'enterprise' => 'Heliópolis',
        ];

        return back()->with('success', __("You have been removed from the :plan waitlist.", [
            'plan' => $planLabels[$validated['plan_type']]
        ]));
    }
}