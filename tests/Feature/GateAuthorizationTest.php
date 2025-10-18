<?php

use App\Enums\PlanType;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Role;

test('free plan users cannot access integrations', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Free,
    ]);

    $this->actingAs($user);

    expect(Gate::allows('access-integrations'))->toBeFalse();
});

test('managed plan users can access integrations', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Managed,
    ]);

    $this->actingAs($user);

    expect(Gate::allows('access-integrations'))->toBeTrue();
});

test('pro plan users can manage their own API keys', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Pro,
    ]);

    $this->actingAs($user);

    expect(Gate::allows('manage-own-api-keys'))->toBeTrue();
});

test('free plan users cannot manage API keys', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Free,
    ]);

    $this->actingAs($user);

    expect(Gate::allows('manage-own-api-keys'))->toBeFalse();
});

test('managed plan users use managed keys when trial is active', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Managed,
        'trial_ends_at' => now()->addDays(10),
    ]);

    $this->actingAs($user);

    expect(Gate::allows('use-managed-keys'))->toBeTrue();
});

test('managed plan users cannot use managed keys when trial expired', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Managed,
        'trial_ends_at' => now()->subDays(1),
    ]);

    $this->actingAs($user);

    expect(Gate::allows('use-managed-keys'))->toBeFalse();
});

test('pro plan users can use advanced automation', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Pro,
    ]);

    $this->actingAs($user);

    expect(Gate::allows('use-advanced-automation'))->toBeTrue();
});

test('free plan users cannot use advanced automation', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Free,
    ]);

    $this->actingAs($user);

    expect(Gate::allows('use-advanced-automation'))->toBeFalse();
});

test('admin with permission and no expired trial can access admin features', function () {
    // Create permission first
    $permission = \Spatie\Permission\Models\Permission::firstOrCreate([
        'name' => 'admin.dashboard',
        'guard_name' => 'web',
    ]);

    $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
    $adminRole->givePermissionTo($permission);

    $user = User::factory()->create([
        'plan' => PlanType::Pro,
        'trial_ends_at' => null, // No trial, paid plan
    ]);

    $user->assignRole($adminRole);
    $this->actingAs($user);

    expect(Gate::allows('access-admin-features'))->toBeTrue();
});

test('manager with feedback permission and paid plan can manage feedback', function () {
    // Create permission first
    $permission = \Spatie\Permission\Models\Permission::firstOrCreate([
        'name' => 'feedback.manage',
        'guard_name' => 'web',
    ]);

    $managerRole = Role::firstOrCreate(['name' => 'Manager', 'guard_name' => 'web']);
    $managerRole->givePermissionTo($permission);

    $user = User::factory()->create([
        'plan' => PlanType::Managed,
    ]);

    $user->assignRole($managerRole);
    $this->actingAs($user);

    expect(Gate::allows('manage-feedback'))->toBeTrue();
});

test('staff plan users can manage feedback without permission', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Staff,
    ]);

    $this->actingAs($user);

    expect(Gate::allows('manage-feedback'))->toBeTrue();
});

test('paid plans return true for is-paid-plan gate', function () {
    $paidPlans = [PlanType::Managed, PlanType::Pro, PlanType::Enterprise];

    foreach ($paidPlans as $plan) {
        $user = User::factory()->create(['plan' => $plan]);
        $this->actingAs($user);

        expect(Gate::allows('is-paid-plan'))->toBeTrue()
            ->and($plan->value)->toBe($user->plan->value);
    }
});

test('free plan returns false for is-paid-plan gate', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Free,
    ]);

    $this->actingAs($user);

    expect(Gate::allows('is-paid-plan'))->toBeFalse();
});
