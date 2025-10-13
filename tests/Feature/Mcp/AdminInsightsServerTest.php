<?php

use App\Mcp\Resources\AppStatusResource;
use App\Mcp\Resources\ProvidersResource;
use App\Mcp\Resources\UsersResource;
use App\Models\AiProvider;
use App\Models\ProviderCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Mcp\Request;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

function decodeResponse(\Laravel\Mcp\Response $response): array
{
    return json_decode((string) $response->content(), true, flags: JSON_THROW_ON_ERROR);
}

it('returns a filtered list of users', function () {
    $adminRole = Role::query()->firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);

    User::factory()->create([
        'name' => 'Alice Example',
        'email' => 'alice@example.com',
        'email_verified_at' => now(),
    ])->assignRole($adminRole);

    $resource = app(UsersResource::class);

    $payload = decodeResponse($resource->handle(new Request([
        'search' => 'alice',
        'limit' => 5,
    ])));

    expect($payload['count'])->toBeGreaterThan(0)
        ->and(data_get($payload, 'users.0.email'))->toBe('alice@example.com')
        ->and(data_get($payload, 'users.0.email_verified'))->toBeTrue()
        ->and(data_get($payload, 'users.0.roles'))->toContain('Admin');
});

it('summarises providers across types', function () {
    $category = ProviderCategory::query()->firstOrCreate(
        ['name' => 'ai'],
        [
            'display_name' => 'Inteligencia Artificial',
            'description' => 'Modelos de IA.',
        ],
    );

    AiProvider::query()->create([
        'provider_category_id' => $category->id,
        'slug' => 'openai',
        'display_name' => 'OpenAI',
        'status' => 'active',
    ]);

    $resource = app(ProvidersResource::class);

    $payload = decodeResponse($resource->handle(new Request([
        'type' => 'ai',
        'limit' => 10,
    ])));

    expect($payload['count'])->toBeGreaterThan(0)
        ->and(data_get($payload, 'providers.0.type'))->toBe('ai')
        ->and(data_get($payload, 'providers.0.display_name'))->toBe('OpenAI');
});

it('returns an application status snapshot', function () {
    $category = ProviderCategory::query()->firstOrCreate(
        ['name' => 'ai'],
        [
            'display_name' => 'Inteligencia Artificial',
            'description' => 'Modelos de IA.',
        ],
    );

    AiProvider::query()->create([
        'provider_category_id' => $category->id,
        'slug' => 'anthropic',
        'display_name' => 'Anthropic',
        'status' => 'active',
    ]);

    User::factory()->create([
        'name' => 'Bob Example',
        'email' => 'bob@example.com',
    ]);

    $resource = app(AppStatusResource::class);

    $payload = decodeResponse($resource->handle(new Request));

    expect(data_get($payload, 'app.name'))->toBe(config('app.name'))
        ->and(data_get($payload, 'users.totals.total'))->toBeGreaterThan(0)
        ->and(data_get($payload, 'providers.totals.ai.total'))->toBeGreaterThan(0);
});
