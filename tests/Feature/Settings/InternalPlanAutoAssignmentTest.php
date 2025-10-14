<?php

use App\Enums\PlanType;
use App\Models\User;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    // Create roles
    Role::create(['name' => 'Admin']);
    Role::create(['name' => 'Manager']);
});

it('auto-assigns internal plan to admin users on update', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Free,
        'name' => 'Test User',
    ]);

    // Assign Admin role
    $user->assignRole('Admin');

    // Trigger observer by updating user with different value
    $user->update(['name' => 'Updated User']);
    $user->refresh();

    expect($user->plan)->toBe(PlanType::Internal);
});

it('auto-assigns staff plan to manager users on update', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Free,
        'name' => 'Test User',
    ]);

    // Assign Manager role
    $user->assignRole('Manager');

    // Trigger observer by updating user with different value
    $user->update(['name' => 'Updated User']);
    $user->refresh();

    expect($user->plan)->toBe(PlanType::Staff);
});

it('does not change internal plan if admin already has one', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Internal,
    ]);

    // Assign Admin role
    $user->assignRole('Admin');

    // Update user (trigger observer)
    $user->update(['name' => 'Updated Name']);
    $user->refresh();

    expect($user->plan)->toBe(PlanType::Internal);
});

it('does not change plan for regular users', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Pro,
    ]);

    // Update user
    $user->update(['name' => 'Updated Name']);
    $user->refresh();

    expect($user->plan)->toBe(PlanType::Pro);
});
