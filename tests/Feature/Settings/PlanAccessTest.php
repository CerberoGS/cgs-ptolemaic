<?php

use App\Enums\PlanType;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('shows the plan overview to authenticated users', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Free,
    ]);

    $response = $this->actingAs($user)->get(
        route('settings.plan.show', ['locale' => config('app.locale')])
    );

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('settings/plan')
        ->where('currentPlan.type', PlanType::Free->value)
    );
});

it('redirects free users from provider integrations to the plan page', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Free,
    ]);

    $response = $this->actingAs($user)->get(
        route('settings.integrations.index', ['locale' => config('app.locale')])
    );

    $response->assertRedirect(
        route('settings.plan.show', ['locale' => config('app.locale')])
    );
});

it('allows pro users to access provider integrations', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Pro,
    ]);

    $response = $this->actingAs($user)->get(
        route('settings.integrations.index', ['locale' => config('app.locale')])
    );

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('settings/integrations')
        ->where('plan.canManageProviderKeys', true)
    );
});

it('exposes plan capabilities in shared data', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Free,
    ]);

    $response = $this->actingAs($user)->get(
        route('settings.plan.show', ['locale' => config('app.locale')])
    );

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->where('auth.plan.features', function ($features): bool {
            $features = is_array($features) ? $features : $features?->toArray();

            return is_array($features) && in_array('logbook.create', $features, true);
        })
    );
});

it('returns forbidden json response when integrations are not available', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Free,
    ]);

    $response = $this->actingAs($user)->getJson(
        route('settings.integrations.index', ['locale' => config('app.locale')])
    );

    $response->assertForbidden();
});
