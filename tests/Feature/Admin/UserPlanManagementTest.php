<?php

use App\Enums\PlanType;
use App\Models\PlanChange;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    // Crear permisos necesarios
    Permission::create(['name' => 'users.manage', 'guard_name' => 'web']);
    Permission::create(['name' => 'users.view', 'guard_name' => 'web']);

    // Crear rol de Admin con permisos
    $role = Role::create(['name' => 'Admin', 'guard_name' => 'web']);
    $role->givePermissionTo(['users.manage', 'users.view']);
});

it('allows admin to view plan edit page', function () {
    $admin = User::factory()->create();
    $admin->assignRole('Admin');

    $user = User::factory()->create([
        'plan' => PlanType::Free->value,
    ]);

    actingAs($admin)
        ->get(route('admin.users.plan.edit', ['locale' => 'es', 'user' => $user->id]))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('admin/users/plan-edit')
            ->has('user')
            ->has('plans')
            ->has('recentChanges'));
});

it('allows admin to change user plan', function () {
    $admin = User::factory()->create();
    $admin->assignRole('Admin');

    $user = User::factory()->create([
        'plan' => PlanType::Free->value,
        'trial_ends_at' => null,
    ]);

    actingAs($admin)
        ->put(route('admin.users.plan.update', ['locale' => 'es', 'user' => $user->id]), [
            'plan' => PlanType::Pro->value,
            'reason' => 'Upgrading user for testing purposes',
        ])
        ->assertRedirect(route('admin.users.index', ['locale' => 'es']))
        ->assertSessionHas('success');

    $user->refresh();

    expect($user->plan)->toBe(PlanType::Pro);
});

it('logs plan changes', function () {
    $admin = User::factory()->create();
    $admin->assignRole('Admin');

    $user = User::factory()->create([
        'plan' => PlanType::Free->value,
    ]);

    actingAs($admin)
        ->put(route('admin.users.plan.update', ['locale' => 'es', 'user' => $user->id]), [
            'plan' => PlanType::Managed->value,
            'reason' => 'Customer requested managed plan',
        ]);

    $planChange = PlanChange::where('user_id', $user->id)->latest()->first();

    expect($planChange)->not->toBeNull()
        ->and($planChange->old_plan)->toBe(PlanType::Free)
        ->and($planChange->new_plan)->toBe(PlanType::Managed)
        ->and($planChange->changed_by_user_id)->toBe($admin->id)
        ->and($planChange->reason)->toBe('Customer requested managed plan');
});

it('allows setting trial end date when changing to trial plan', function () {
    $admin = User::factory()->create();
    $admin->assignRole('Admin');

    $user = User::factory()->create([
        'plan' => PlanType::Free->value,
        'trial_ends_at' => null,
    ]);

    $trialEndDate = now()->addDays(60)->format('Y-m-d');

    actingAs($admin)
        ->put(route('admin.users.plan.update', ['locale' => 'es', 'user' => $user->id]), [
            'plan' => PlanType::Trial->value,
            'trial_ends_at' => $trialEndDate,
            'reason' => 'Extended trial period',
        ]);

    $user->refresh();

    expect($user->plan)->toBe(PlanType::Trial)
        ->and($user->trial_ends_at->format('Y-m-d'))->toBe($trialEndDate);
});

it('prevents non-admin users from changing plans', function () {
    $regularUser = User::factory()->create();
    $targetUser = User::factory()->create([
        'plan' => PlanType::Free->value,
    ]);

    actingAs($regularUser)
        ->put(route('admin.users.plan.update', ['locale' => 'es', 'user' => $targetUser->id]), [
            'plan' => PlanType::Pro->value,
        ])
        ->assertForbidden();

    $targetUser->refresh();
    expect($targetUser->plan)->toBe(PlanType::Free);
});

it('requires valid plan type', function () {
    $admin = User::factory()->create();
    $admin->assignRole('Admin');

    $user = User::factory()->create([
        'plan' => PlanType::Free->value,
    ]);

    actingAs($admin)
        ->put(route('admin.users.plan.update', ['locale' => 'es', 'user' => $user->id]), [
            'plan' => 'invalid_plan',
            'reason' => 'Testing',
        ])
        ->assertSessionHasErrors('plan');

    $user->refresh();
    expect($user->plan)->toBe(PlanType::Free);
});

it('validates trial end date must be after today', function () {
    $admin = User::factory()->create();
    $admin->assignRole('Admin');

    $user = User::factory()->create([
        'plan' => PlanType::Free->value,
    ]);

    actingAs($admin)
        ->put(route('admin.users.plan.update', ['locale' => 'es', 'user' => $user->id]), [
            'plan' => PlanType::Trial->value,
            'trial_ends_at' => now()->subDays(1)->format('Y-m-d'),
        ])
        ->assertSessionHasErrors('trial_ends_at');
});
