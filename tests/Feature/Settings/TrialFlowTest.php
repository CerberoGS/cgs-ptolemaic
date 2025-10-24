<?php

use App\Models\User;

use function Pest\Laravel\actingAs;

it('allows a free user to start a Cosmographer trial', function () {
    $user = User::factory()->create([
        'plan' => 'free',
        'trial_ends_at' => null,
    ]);

    actingAs($user)
        ->post(route('settings.trial.managed', ['locale' => 'es']))
        ->assertRedirect(route('dashboard', ['locale' => 'es']))
        ->assertSessionHas('success');

    $user->refresh();

    expect($user->plan)->toBe('managed')
        ->and($user->trial_ends_at)->not->toBeNull()
        ->and($user->trial_ends_at->isAfter(now()))->toBeTrue();
});

it('allows a free user to start an Astronomer trial', function () {
    $user = User::factory()->create([
        'plan' => 'free',
        'trial_ends_at' => null,
    ]);

    actingAs($user)
        ->post(route('settings.trial.pro', ['locale' => 'es']))
        ->assertRedirect(route('dashboard', ['locale' => 'es']))
        ->assertSessionHas('success');

    $user->refresh();

    expect($user->plan)->toBe('pro')
        ->and($user->trial_ends_at)->not->toBeNull()
        ->and($user->trial_ends_at->isAfter(now()))->toBeTrue();
});

it('prevents non-free users from starting a trial', function () {
    $user = User::factory()->create([
        'plan' => 'pro',
    ]);

    actingAs($user)
        ->post(route('settings.trial.managed', ['locale' => 'es']))
        ->assertRedirect(route('settings.plan.show', ['locale' => 'es']))
        ->assertSessionHas('error');

    $user->refresh();
    expect($user->plan)->toBe('pro');
});

it('prevents users who already had a trial from starting another', function () {
    $user = User::factory()->create([
        'plan' => 'free',
        'trial_ends_at' => now()->subDays(5),
    ]);

    actingAs($user)
        ->post(route('settings.trial.managed', ['locale' => 'es']))
        ->assertRedirect(route('settings.plan.show', ['locale' => 'es']))
        ->assertSessionHas('error');

    $user->refresh();
    expect($user->plan)->toBe('free');
});

it('sets trial to end 30 days from now', function () {
    $user = User::factory()->create([
        'plan' => 'free',
        'trial_ends_at' => null,
    ]);

    actingAs($user)
        ->post(route('settings.trial.managed', ['locale' => 'es']));

    $user->refresh();

    $daysDiff = abs($user->trial_ends_at->diffInDays(now()));

    expect($daysDiff)->toBeGreaterThanOrEqual(29)
        ->and($daysDiff)->toBeLessThanOrEqual(30);
});

it('requires authentication to start a trial', function () {
    $this->post(route('settings.trial.managed', ['locale' => 'es']))
        ->assertRedirect();
});

it('allows Astronomer trial users to extend by adding card', function () {
    $user = User::factory()->create([
        'plan' => 'pro',
        'trial_ends_at' => now()->addDays(15),
        'card_added_at' => null,
    ]);

    actingAs($user)
        ->post(route('settings.trial.add-card', ['locale' => 'es']))
        ->assertRedirect()
        ->assertSessionHas('success');

    $user->refresh();

    expect($user->card_added_at)->not->toBeNull()
        ->and(abs($user->trial_ends_at->diffInDays(now())))->toBeGreaterThanOrEqual(44);
});

it('prevents Cosmographer trial users from extending with card', function () {
    $user = User::factory()->create([
        'plan' => 'managed',
        'trial_ends_at' => now()->addDays(15),
        'card_added_at' => null,
    ]);

    actingAs($user)
        ->post(route('settings.trial.add-card', ['locale' => 'es']))
        ->assertRedirect()
        ->assertSessionHas('error');

    $user->refresh();

    expect($user->card_added_at)->toBeNull();
});
