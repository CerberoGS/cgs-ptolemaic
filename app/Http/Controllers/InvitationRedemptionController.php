<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvitationRedemptionController extends Controller
{
    /**
     * Show the invitation details and redemption form
     */
    public function show(string $code): Response|RedirectResponse
    {
        $invitation = Invitation::where('code', $code)->firstOrFail();

        // Check if invitation is valid
        if (! $invitation->isValid()) {
            return Inertia::render('invite/invalid', [
                'code' => $code,
                'reason' => $this->getInvalidReason($invitation),
            ]);
        }

        // If user is authenticated, check if they can redeem
        $user = auth()->user();
        if ($user && ! $invitation->canBeRedeemedBy($user)) {
            return redirect()->route('dashboard')
                ->with('error', __('You have already redeemed this invitation.'));
        }

        return Inertia::render('invite/show', [
            'invitation' => [
                'code' => $invitation->code,
                'name' => $invitation->name,
                'description' => $invitation->description,
                'target_plan' => [
                    'value' => $invitation->target_plan->value,
                    'label' => $invitation->target_plan->label(),
                    'emoji' => $invitation->target_plan->emoji(),
                    'tagline' => $invitation->target_plan->tagline(),
                ],
                'price_monthly' => $invitation->price_monthly,
                'discount_percent' => $invitation->discount_percent,
                'trial_duration_days' => $invitation->trial_duration_days,
                'available_redemptions' => $invitation->availableRedemptions(),
                'expires_at' => $invitation->expires_at?->toIso8601String(),
            ],
            'isAuthenticated' => $user !== null,
        ]);
    }

    /**
     * Redeem the invitation for authenticated user
     */
    public function redeem(Request $request, string $code): RedirectResponse
    {
        $user = $request->user();

        if (! $user) {
            session(['invitation_code' => $code]);

            return redirect()->route('register')
                ->with('info', __('Please register to redeem this invitation.'));
        }

        $invitation = Invitation::where('code', $code)->firstOrFail();

        if (! $invitation->canBeRedeemedBy($user)) {
            return back()->with('error', __('You cannot redeem this invitation.'));
        }

        // Redeem invitation
        $invitation->redeemFor(
            $user,
            $request->ip(),
            $request->userAgent()
        );

        // Apply plan benefits
        $this->applyInvitationBenefits($user, $invitation);

        return redirect()->route('dashboard')
            ->with('success', __('Invitation redeemed successfully! Your plan has been updated.'));
    }

    /**
     * Apply invitation benefits to user
     */
    protected function applyInvitationBenefits($user, Invitation $invitation): void
    {
        $updateData = [
            'plan' => $invitation->target_plan,
            'plan_started_at' => now(),
        ];

        // Apply trial duration if specified
        if ($invitation->trial_duration_days) {
            $updateData['trial_ends_at'] = now()->addDays($invitation->trial_duration_days);
        }

        $user->update($updateData);
    }

    /**
     * Get reason why invitation is invalid
     */
    protected function getInvalidReason(Invitation $invitation): string
    {
        if ($invitation->status->value !== 'active') {
            return __('This invitation is no longer active.');
        }

        if ($invitation->expires_at && now()->greaterThan($invitation->expires_at)) {
            return __('This invitation has expired.');
        }

        if ($invitation->usage_limit && $invitation->usage_count >= $invitation->usage_limit) {
            return __('This invitation has reached its usage limit.');
        }

        return __('This invitation is invalid.');
    }
}
