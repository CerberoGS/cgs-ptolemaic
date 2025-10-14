<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TrialController extends Controller
{
    /**
     * Iniciar el período de prueba gratuito.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        if (! $user->canStartTrial()) {
            return redirect()
                ->route('settings.plan.show', ['locale' => app()->getLocale()])
                ->with('error', __('You cannot start a trial at this time.'));
        }

        $user->startTrial();

        return redirect()
            ->route('dashboard', ['locale' => app()->getLocale()])
            ->with('success', __('Your 30-day trial has started! Enjoy all features.'));
    }
}
