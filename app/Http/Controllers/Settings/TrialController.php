<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TrialController extends Controller
{
    /**
     * Start trial for Cosmographer (Managed plan)
     */
    public function storeManaged(Request $request): RedirectResponse
    {
        $user = $request->user();

        if (! $user->canStartTrial()) {
            return redirect()
                ->route('settings.plan.show', ['locale' => app()->getLocale()])
                ->with('error', __('You cannot start a trial at this time.'));
        }

        $user->startTrial('managed');

        return redirect()
            ->route('dashboard', ['locale' => app()->getLocale()])
            ->with('success', __('Your Cosmographer trial has started! 30 days of AI-powered insights.'));
    }

    /**
     * Start trial for Astronomer (Pro plan with 30+30 bonus)
     */
    public function storePro(Request $request): RedirectResponse
    {
        $user = $request->user();

        if (! $user->canStartTrial()) {
            return redirect()
                ->route('settings.plan.show', ['locale' => app()->getLocale()])
                ->with('error', __('You cannot start a trial at this time.'));
        }

        $user->startTrial('pro');

        return redirect()
            ->route('dashboard', ['locale' => app()->getLocale()])
            ->with('success', __('Your Astronomer trial has started! Add your card anytime to get +30 extra days.'));
    }
}
