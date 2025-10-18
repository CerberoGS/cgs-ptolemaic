<?php

use App\Enums\PlanType;
use App\Models\User;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    // Crear rutas de prueba temporales
    Route::middleware(['web', 'auth', 'feature:manage-own-api-keys'])
        ->get('/test-pro-feature', fn () => response()->json(['message' => 'success']));

    Route::middleware(['web', 'auth', 'feature:access-integrations'])
        ->get('/test-integrations', fn () => response()->json(['message' => 'success']));

    Route::middleware(['web', 'auth', 'feature:use-advanced-automation'])
        ->get('/test-automation', fn () => response()->json(['message' => 'success']));
});

test('unauthenticated users get 401', function () {
    $this->withoutExceptionHandling();

    $this->expectException(\Symfony\Component\HttpKernel\Exception\HttpException::class);
    $this->expectExceptionMessage('Debes iniciar sesión para acceder a esta función.');

    $response = $this->get('/test-pro-feature');
});

test('free plan users get 403 when accessing pro features', function () {
    $this->withoutExceptionHandling();

    $user = User::factory()->create([
        'plan' => PlanType::Free,
    ]);

    $this->expectException(\Symfony\Component\HttpKernel\Exception\HttpException::class);

    $response = $this->actingAs($user)->get('/test-pro-feature');
});

test('pro plan users can access pro features', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Pro,
    ]);

    $response = $this->actingAs($user)->get('/test-pro-feature');

    $response->assertOk();
    $response->assertJson(['message' => 'success']);
});

test('managed plan users can access integrations', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Managed,
    ]);

    $response = $this->actingAs($user)->get('/test-integrations');

    $response->assertOk();
    $response->assertJson(['message' => 'success']);
});

test('free plan users get 403 when accessing integrations', function () {
    $this->withoutExceptionHandling();

    $user = User::factory()->create([
        'plan' => PlanType::Free,
    ]);

    $this->expectException(\Symfony\Component\HttpKernel\Exception\HttpException::class);

    $response = $this->actingAs($user)->get('/test-integrations');
});

test('pro plan users can access advanced automation', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Pro,
    ]);

    $response = $this->actingAs($user)->get('/test-automation');

    $response->assertOk();
});

test('middleware returns JSON response for API requests', function () {
    Route::middleware(['web', 'auth', 'feature:manage-own-api-keys'])
        ->get('/api/test-feature', fn () => response()->json(['data' => 'test']));

    $user = User::factory()->create([
        'plan' => PlanType::Free,
    ]);

    $response = $this->actingAs($user)
        ->withHeaders(['Accept' => 'application/json'])
        ->get('/api/test-feature');

    $response->assertStatus(403);
    $response->assertJson([
        'upgrade_required' => true,
        'current_plan' => 'free',
    ]);
});

test('enterprise plan users can access all features', function () {
    $user = User::factory()->create([
        'plan' => PlanType::Enterprise,
    ]);

    $response1 = $this->actingAs($user)->get('/test-pro-feature');
    $response2 = $this->actingAs($user)->get('/test-integrations');
    $response3 = $this->actingAs($user)->get('/test-automation');

    $response1->assertOk();
    $response2->assertOk();
    $response3->assertOk();
});
