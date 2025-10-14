<?php

use App\Enums\PlanType;
use App\Models\User;

use function Pest\Laravel\actingAs;

it('allows a free user to start a trial', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Free->value,
        'trial_ends_at' => null,
    ]);

    actingAs($user)
        ->post(route('settings.trial.store', ['locale' => 'es']))
        ->assertRedirect(route('dashboard', ['locale' => 'es']))
        ->assertSessionHas('success');

    $user->refresh();

    expect($user->plan)->toBe(PlanType::Trial)
        ->and($user->trial_ends_at)->not->toBeNull()
        ->and($user->trial_ends_at->isAfter(now()))->toBeTrue();
});

it('prevents non-free users from starting a trial', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Pro->value,
    ]);

    actingAs($user)
        ->post(route('settings.trial.store', ['locale' => 'es']))
        ->assertRedirect(route('settings.plan.show', ['locale' => 'es']))
        ->assertSessionHas('error');

    $user->refresh();
    expect($user->plan)->toBe(PlanType::Pro);
});

it('prevents users who already had a trial from starting another', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Free->value,
        'trial_ends_at' => now()->subDays(5),
    ]);

    actingAs($user)
        ->post(route('settings.trial.store', ['locale' => 'es']))
        ->assertRedirect(route('settings.plan.show', ['locale' => 'es']))
        ->assertSessionHas('error');

    $user->refresh();
    expect($user->plan)->toBe(PlanType::Free);
});

it('sets trial to end 30 days from now', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Free->value,
        'trial_ends_at' => null,
    ]);

    actingAs($user)
        ->post(route('settings.trial.store', ['locale' => 'es']));

    $user->refresh();

    $daysDiff = abs($user->trial_ends_at->diffInDays(now()));

    expect($daysDiff)->toBeGreaterThanOrEqual(29)
        ->and($daysDiff)->toBeLessThanOrEqual(30);
});

it('requires authentication to start a trial', function () {
    $this->post(route('settings.trial.store', ['locale' => 'es']))
        ->assertRedirect();
});
