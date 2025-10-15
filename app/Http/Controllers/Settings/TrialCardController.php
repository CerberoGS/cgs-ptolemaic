<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TrialCardController extends Controller
{
    /**
     * Add card and extend trial by 30 days (only for Astronomer/Pro trial)
     * Cosmographer does NOT get this bonus - only Astronomer does
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user === null) {
            return redirect()->route('login')
                ->with('error', __('You must be authenticated to perform this action.'));
        }

        if (! $user->canAddCardToExtendTrial()) {
            return back()->with('error', __('You cannot extend your trial at this time.'));
        }

        // TODO: Integrate with Stripe/Payment Gateway
        // For now, we just mark the card as added and extend the trial
        $success = $user->addCardAndExtendTrial();

        if ($success) {
            return back()->with('success', __('Your trial has been extended by 30 days!'));
        }

        return back()->with('error', __('Unable to extend trial. Please try again.'));
    }
}
