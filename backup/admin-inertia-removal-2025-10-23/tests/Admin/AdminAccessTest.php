<?php

use App\Models\AiProvider;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

it('denies admin panel access to non-admin users', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.dashboard', ['locale' => 'en']))
        ->assertForbidden();
});

it('allows administrators to access the dashboard', function () {
    Role::query()->firstOrCreate(['name' => 'Admin'], ['guard_name' => 'web']);

    $admin = User::factory()->create();
    $admin->assignRole('Admin');

    $this->actingAs($admin)
        ->get(route('admin.dashboard', ['locale' => 'en']))
        ->assertOk();
});

it('stores a provider through the admin endpoint', function () {
    Role::query()->firstOrCreate(['name' => 'Admin'], ['guard_name' => 'web']);

    $admin = User::factory()->create();
    $admin->assignRole('Admin');

    $payload = [
        'type' => 'ai',
        'slug' => 'openai',
        'display_name' => 'OpenAI',
        'description' => 'Large language models',
        'base_url' => 'https://api.openai.com',
        'docs_url' => 'https://platform.openai.com/docs',
        'verification_endpoint' => 'https://api.openai.com/status',
        'status' => 'active',
        'requires_organization' => true,
        'test_json' => '[{\"ping\":\"pong\"}]',
        'ops_json' => '[{\"messages\":[\"hello\"]}]',
    ];

    $response = $this->actingAs($admin)
        ->post(route('admin.providers.store', ['locale' => 'en']), $payload);

    $response->assertSessionHasNoErrors()
        ->assertRedirect();

    $provider = AiProvider::query()->where('slug', 'openai')->first();

    expect($provider)->not->toBeNull()
        ->and($provider->display_name)->toBe('OpenAI')
        ->and($provider->requires_organization)->toBeTrue()
        ->and($provider->test_json)->toBeArray();
});
