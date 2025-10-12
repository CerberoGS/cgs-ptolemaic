<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

uses(RefreshDatabase::class);

function setupPermissions(): void
{
    app(PermissionRegistrar::class)->forgetCachedPermissions();

    $permissions = [
        'dashboard.view',
        'admin.dashboard',
        'providers.view',
        'providers.manage',
        'users.view',
        'users.manage',
        'roles.view',
        'roles.manage',
    ];

    foreach ($permissions as $permission) {
        Permission::firstOrCreate([
            'name' => $permission,
            'guard_name' => 'web',
        ]);
    }

    $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
    $adminRole->syncPermissions($permissions);

    $viewerRole = Role::firstOrCreate(['name' => 'Viewer', 'guard_name' => 'web']);
    $viewerRole->syncPermissions(['roles.view']);
}

it('allows administrators to create roles with permissions', function () {
    setupPermissions();

    $admin = User::factory()->create();
    $admin->assignRole('Admin');

    $payload = [
        'name' => 'Editor',
        'permissions' => ['providers.view', 'providers.manage'],
    ];

    $this->actingAs($admin)
        ->post(route('admin.roles.store', ['locale' => 'es']), $payload)
        ->assertRedirect();

    $role = Role::where('name', 'Editor')->first();

    expect($role)->not->toBeNull();
    expect($role->permissions->pluck('name')->all())->toEqualCanonicalizing($payload['permissions']);
});

it('forbids creating roles without the manage permission', function () {
    setupPermissions();

    $viewer = User::factory()->create();
    $viewerRole = Role::where('name', 'Viewer')->first();
    $viewer->assignRole($viewerRole);

    $this->actingAs($viewer)
        ->post(route('admin.roles.store', ['locale' => 'es']), [
            'name' => 'Guest',
        ])
        ->assertForbidden();

    expect(Role::where('name', 'Guest')->exists())->toBeFalse();
});

it('prevents deleting protected roles', function () {
    setupPermissions();

    $admin = User::factory()->create();
    $admin->assignRole('Admin');

    $this->actingAs($admin)
        ->delete(route('admin.roles.destroy', ['locale' => 'es', 'role' => Role::where('name', 'Admin')->first()->id]))
        ->assertSessionHasErrors('role');
});
