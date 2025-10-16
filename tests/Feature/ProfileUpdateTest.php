<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can update user profile with phone number', function () {
    $user = User::factory()->create([
        'phone' => '+1234567890',
        'phone_verified_at' => now(),
    ]);

    $this->actingAs($user);

    $response = $this->patch('/en/settings/profile', [
        'name' => 'Updated Name',
        'email' => 'updated@example.com',
        'phone' => '+9876543210',
    ]);

    $response->assertRedirect('/en/settings/profile');

    $user->refresh();
    expect($user->name)->toBe('Updated Name');
    expect($user->email)->toBe('updated@example.com');
    expect($user->phone)->toBe('+9876543210');
    expect($user->phone_verified_at)->toBeNull(); // Should be reset when phone changes
});

it('resets email verification when email changes', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
        'phone' => '+1234567890', // Give user a phone number
    ]);

    $this->actingAs($user);

    $response = $this->patch('/en/settings/profile', [
        'name' => $user->name,
        'email' => 'newemail@example.com',
        'phone' => $user->phone,
    ]);

    $response->assertRedirect('/en/settings/profile');

    $user->refresh();
    expect($user->email)->toBe('newemail@example.com');
    expect($user->email_verified_at)->toBeNull();
});

it('resets phone verification when phone changes', function () {
    $user = User::factory()->create([
        'phone' => '+1234567890',
        'phone_verified_at' => now(),
    ]);

    $this->actingAs($user);

    $response = $this->patch('/en/settings/profile', [
        'name' => $user->name,
        'email' => $user->email,
        'phone' => '+9876543210',
    ]);

    $response->assertRedirect('/en/settings/profile');

    $user->refresh();
    expect($user->phone)->toBe('+9876543210');
    expect($user->phone_verified_at)->toBeNull();
});

it('validates phone number format', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->patch('/en/settings/profile', [
        'name' => $user->name,
        'email' => $user->email,
        'phone' => 'invalid-phone',
    ]);

    $response->assertSessionHasErrors('phone');
});

it('allows null phone number', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->patch('/en/settings/profile', [
        'name' => $user->name,
        'email' => $user->email,
        'phone' => null,
    ]);

    $response->assertRedirect('/en/settings/profile');

    $user->refresh();
    expect($user->phone)->toBeNull();
});

it('can check if user has phone', function () {
    $userWithPhone = User::factory()->create(['phone' => '+1234567890']);
    $userWithoutPhone = User::factory()->create(['phone' => null]);

    expect($userWithPhone->hasPhone())->toBeTrue();
    expect($userWithoutPhone->hasPhone())->toBeFalse();
});

it('can check if phone is verified', function () {
    $verifiedUser = User::factory()->create([
        'phone' => '+1234567890',
        'phone_verified_at' => now(),
    ]);

    $unverifiedUser = User::factory()->create([
        'phone' => '+1234567890',
        'phone_verified_at' => null,
    ]);

    expect($verifiedUser->isPhoneVerified())->toBeTrue();
    expect($unverifiedUser->isPhoneVerified())->toBeFalse();
});

it('can check if email is verified', function () {
    $verifiedUser = User::factory()->create(['email_verified_at' => now()]);
    $unverifiedUser = User::factory()->create(['email_verified_at' => null]);

    expect($verifiedUser->isEmailVerified())->toBeTrue();
    expect($unverifiedUser->isEmailVerified())->toBeFalse();
});
