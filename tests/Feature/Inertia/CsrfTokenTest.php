<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Session;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

uses(RefreshDatabase::class);

it('shares the csrf token with inertia responses', function () {
    app(PermissionRegistrar::class)->forgetCachedPermissions();

    $permission = Permission::firstOrCreate([
        'name' => 'providers.view',
        'guard_name' => 'web',
    ]);

    $role = Role::firstOrCreate([
        'name' => 'Admin',
        'guard_name' => 'web',
    ]);

    $role->givePermissionTo($permission);

    $user = User::factory()->create();
    $user->assignRole($role);

    Session::start();

    $response = $this
        ->actingAs($user)
        ->get(route('admin.providers.index', ['locale' => 'es']));

    $response->assertInertia(fn (Assert $page) => $page
        ->where('csrfToken', function ($token) {
            return is_string($token) && $token !== '';
        })
        ->etc());
});
