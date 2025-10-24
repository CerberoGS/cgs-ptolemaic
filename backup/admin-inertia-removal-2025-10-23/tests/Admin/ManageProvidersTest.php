<?php

use App\Models\AiProvider;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

uses(RefreshDatabase::class);

beforeEach(function (): void {
    app(PermissionRegistrar::class)->forgetCachedPermissions();

    $permissions = [
        'dashboard.view',
        'admin.dashboard',
        'providers.view',
        'providers.manage',
    ];

    foreach ($permissions as $permission) {
        Permission::query()->firstOrCreate([
            'name' => $permission,
            'guard_name' => 'web',
        ]);
    }

    $adminRole = Role::query()->firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
    $adminRole->syncPermissions($permissions);

    $this->admin = User::factory()->create();
    $this->admin->assignRole($adminRole);
});

it('allows creating a provider when the user has manage permission', function () {
    $payload = [
        'type' => 'ai',
        'slug' => 'test-provider',
        'display_name' => 'Test Provider',
        'description' => 'A test provider',
        'status' => 'active',
    ];

    $this->actingAs($this->admin)
        ->from(route('admin.providers.index', ['locale' => 'es']))
        ->post(route('admin.providers.store', ['locale' => 'es']), $payload)
        ->assertRedirect();

    expect(AiProvider::query()->where('slug', 'test-provider')->exists())->toBeTrue();
});

it('forbids creating a provider without the manage permission', function () {
    $viewerRole = Role::query()->firstOrCreate(['name' => 'Viewer', 'guard_name' => 'web']);
    $viewerRole->syncPermissions(['providers.view']);

    $viewer = User::factory()->create();
    $viewer->assignRole($viewerRole);

    $payload = [
        'type' => 'ai',
        'slug' => 'test-provider-2',
        'display_name' => 'Test Provider 2',
        'status' => 'active',
    ];

    $this->actingAs($viewer)
        ->post(route('admin.providers.store', ['locale' => 'es']), $payload)
        ->assertForbidden();

    expect(AiProvider::query()->where('slug', 'test-provider-2')->exists())->toBeFalse();
});

it('updates a provider via http', function () {
    $provider = AiProvider::query()->create([
        'slug' => 'openai',
        'display_name' => 'OpenAI',
        'status' => 'active',
        'requires_organization' => false,
        'test_json' => [],
        'ops_json' => [],
    ]);

    expect(route('admin.providers.update', ['locale' => 'es', 'type' => 'ai', 'provider' => $provider->id]))
        ->toEndWith("/es/admin/providers/ai/{$provider->id}");

    $payload = [
        'type' => 'ai',
        'slug' => 'openai',
        'display_name' => 'OpenAI Updated',
        'description' => 'Some description',
        'status' => 'active',
        'test_json' => [],
        'ops_json' => [],
        'requires_organization' => false,
    ];

    $response = $this->actingAs($this->admin)
        ->from(route('admin.providers.index', ['locale' => 'es']))
        ->put(route('admin.providers.update', ['locale' => 'es', 'type' => 'ai', 'provider' => $provider->id]), $payload);

    $response->assertRedirect()
        ->assertSessionHasNoErrors();

    expect($provider->fresh()->display_name)->toBe('OpenAI Updated');
});
