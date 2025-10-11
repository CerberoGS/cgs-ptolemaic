<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

it('assigns the user role during registration', function () {
    $password = 'Password123!';

    $response = $this->post(route('register.store', ['locale' => 'en']), [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'password' => $password,
        'password_confirmation' => $password,
    ]);

    $response->assertRedirect(route('dashboard', ['locale' => 'en'], absolute: false));

    $user = User::where('email', 'jane@example.com')->first();

    expect($user)->not->toBeNull()
        ->and($user->hasRole('User'))->toBeTrue();
});

it('ensures existing users receive the user role on login', function () {
    $user = User::factory()->create([
        'email' => 'existing@example.com',
        'password' => bcrypt('password'),
    ]);

    $user->syncRoles([]); // ensure it starts without any role

    $response = $this->post(route('login.store', ['locale' => 'en']), [
        'email' => 'existing@example.com',
        'password' => 'password',
    ]);

    $response->assertRedirect(route('dashboard', ['locale' => 'en'], absolute: false));

    expect($user->fresh()->hasRole('User'))->toBeTrue();
});

it('does not attach the user role to admins on login', function () {
    $admin = User::factory()->create([
        'email' => 'admin-only@example.com',
        'password' => bcrypt('password'),
    ]);

    Role::query()->firstOrCreate(['name' => 'Admin'], ['guard_name' => 'web']);

    $admin->syncRoles(['Admin']);

    $response = $this->post(route('login.store', ['locale' => 'en']), [
        'email' => 'admin-only@example.com',
        'password' => 'password',
    ]);

    $response->assertRedirect(route('dashboard', ['locale' => 'en'], absolute: false));

    $freshAdmin = $admin->fresh();

    expect($freshAdmin->hasRole('Admin'))->toBeTrue()
        ->and($freshAdmin->hasRole('User'))->toBeFalse();
});
