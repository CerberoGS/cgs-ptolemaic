<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

uses(RefreshDatabase::class);

it('updates roles via http when locale prefix is used', function () {
    app(PermissionRegistrar::class)->forgetCachedPermissions();

    $permissions = [
        'dashboard.view',
        'admin.dashboard',
        'users.view',
        'users.manage',
    ];

    foreach ($permissions as $permission) {
        Permission::query()->firstOrCreate([
            'name' => $permission,
            'guard_name' => 'web',
        ]);
    }

    $adminRole = Role::query()->firstOrCreate(
        ['name' => 'Admin', 'guard_name' => 'web'],
    );
    $adminRole->syncPermissions($permissions);

    $viewerRole = Role::query()->firstOrCreate(
        ['name' => 'Viewer', 'guard_name' => 'web'],
    );
    $viewerRole->syncPermissions(['dashboard.view', 'users.view']);

    $admin = User::factory()->create();
    $admin->assignRole($adminRole);

    $target = User::factory()->create();
    $target->assignRole($viewerRole);

    $this->actingAs($admin)
        ->from(route('admin.users.index', ['locale' => 'es']))
        ->put(route('admin.users.roles.update', [
            'locale' => 'es',
            'user' => $target->id,
        ]), [
            'roles' => ['Admin'],
        ])
        ->assertRedirect();

    expect($target->refresh()->roles->pluck('name'))->toMatchArray(['Admin']);
});
