<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

it('requires the current password when one exists', function () {
    $user = User::factory()->create([
        'password' => Hash::make('old-password'),
    ]);

    $this->actingAs($user)
        ->from(route('password.edit', ['locale' => 'es']))
        ->put(route('password.update', ['locale' => 'es']), [
            'current_password' => 'old-password',
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ])
        ->assertRedirect();

    expect(Hash::check('new-password-123', $user->fresh()->password))->toBeTrue();
});

it('allows setting a password without current password when user has none', function () {
    $user = User::factory()->create([
        'password' => null,
    ]);

    $this->actingAs($user)
        ->from(route('password.edit', ['locale' => 'es']))
        ->put(route('password.update', ['locale' => 'es']), [
            'password' => 'new-password-456',
            'password_confirmation' => 'new-password-456',
        ])
        ->assertRedirect();

    expect(Hash::check('new-password-456', $user->fresh()->password))->toBeTrue();
});
