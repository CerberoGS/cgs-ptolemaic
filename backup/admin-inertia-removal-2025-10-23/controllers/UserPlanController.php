<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ChangePlanRequest;
use App\Models\PlanChange;
use App\Models\PricingPlan;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserPlanController extends Controller
{
    /**
     * Show the form for editing the user's plan.
     */
    public function edit(string $locale, User $user): Response
    {
        $plans = PricingPlan::active()->orderBy('display_order')->get()->map(function (PricingPlan $plan): array {
            return [
                'value' => $plan->slug,
                'label' => $plan->name(),
                'description' => $plan->description(),
                'isInternal' => in_array($plan->slug, ['internal', 'staff']),
            ];
        })->values();

        $userPlan = $user->currentPlan();

        return Inertia::render('admin/users/plan-edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'plan' => $user->plan,
                'planLabel' => $userPlan?->name() ?? ucfirst($user->plan),
                'trial_ends_at' => $user->trial_ends_at?->toIso8601String(),
            ],
            'plans' => $plans,
            'recentChanges' => $user->planChanges()
                ->with('changedBy:id,name')
                ->latest()
                ->take(5)
                ->get()
                ->map(fn ($change) => [
                    'id' => $change->id,
                    'old_plan' => $change->oldPlanLabel(),
                    'new_plan' => $change->newPlanLabel(),
                    'reason' => $change->reason,
                    'changed_by' => $change->changedBy->name,
                    'changed_at' => $change->created_at->diffForHumans(),
                ]),
        ]);
    }

    /**
     * Update the user's plan.
     */
    public function update(ChangePlanRequest $request, string $locale, User $user): RedirectResponse
    {
        $oldPlan = $user->plan;
        $oldTrialEndsAt = $user->trial_ends_at;

        $newPlan = $request->input('plan');
        $newTrialEndsAt = $request->input('trial_ends_at');

        $user->update([
            'plan' => $newPlan,
            'trial_ends_at' => $newTrialEndsAt,
            'plan_started_at' => now(),
        ]);

        PlanChange::create([
            'user_id' => $user->id,
            'changed_by_user_id' => $request->user()->id,
            'old_plan' => $oldPlan,
            'new_plan' => $newPlan,
            'old_trial_ends_at' => $oldTrialEndsAt,
            'new_trial_ends_at' => $newTrialEndsAt,
            'reason' => $request->input('reason'),
        ]);

        return redirect()
            ->route('admin.users.index', ['locale' => app()->getLocale()])
            ->with('success', __('Plan updated successfully for :name.', ['name' => $user->name]));
    }
}
