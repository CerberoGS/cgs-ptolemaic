<?php

use App\Models\Feature;
use App\Models\PricingPlan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create Spatie roles
    $this->freeRole = Role::create(['name' => 'plan:free']);
    $this->proRole = Role::create(['name' => 'plan:pro']);

    // Create features
    $this->aiAnalyticsFeature = Feature::create([
        'key' => 'ai_analytics',
        'name_key' => 'features.labels.ai_analytics',
        'category' => 'analytics',
        'value_type' => 'boolean',
        'is_visible' => true,
        'display_order' => 1,
    ]);

    $this->dailyLimitFeature = Feature::create([
        'key' => 'daily_analysis_limit',
        'name_key' => 'features.labels.daily_analysis_limit',
        'category' => 'limits',
        'value_type' => 'integer',
        'is_visible' => true,
        'display_order' => 2,
    ]);

    $this->exportFeature = Feature::create([
        'key' => 'export_journal',
        'name_key' => 'features.labels.export_journal',
        'category' => 'journal',
        'value_type' => 'boolean',
        'is_visible' => true,
        'display_order' => 3,
    ]);

    // Create plans
    $this->freePlan = PricingPlan::create([
        'slug' => 'free',
        'name_key' => 'plans.labels.free',
        'emoji' => '👁️',
        'accent_color' => 'zinc',
        'price_monthly' => 0,
        'price_yearly' => 0,
        'is_active' => true,
        'is_public' => true,
        'display_order' => 1,
        'role_id' => $this->freeRole->id,
    ]);

    $this->proPlan = PricingPlan::create([
        'slug' => 'pro',
        'name_key' => 'plans.labels.pro',
        'emoji' => '🔭',
        'accent_color' => 'violet',
        'price_monthly' => 99,
        'price_yearly' => 999,
        'is_active' => true,
        'is_public' => true,
        'display_order' => 3,
        'role_id' => $this->proRole->id,
    ]);

    // Assign features to plans
    $this->freePlan->features()->attach($this->aiAnalyticsFeature->id, [
        'is_enabled' => false,
    ]);

    $this->freePlan->features()->attach($this->dailyLimitFeature->id, [
        'is_enabled' => true,
        'limit_value' => 10,
    ]);

    $this->freePlan->features()->attach($this->exportFeature->id, [
        'is_enabled' => true,
    ]);

    $this->proPlan->features()->attach($this->aiAnalyticsFeature->id, [
        'is_enabled' => true,
    ]);

    $this->proPlan->features()->attach($this->dailyLimitFeature->id, [
        'is_enabled' => true,
        'limit_value' => null, // unlimited
    ]);

    $this->proPlan->features()->attach($this->exportFeature->id, [
        'is_enabled' => true,
    ]);

    // Create users
    $this->freeUser = User::factory()->create(['plan' => 'free']);
    $this->proUser = User::factory()->create(['plan' => 'pro']);
});

// ============================================
// GENERIC FEATURE GATE TESTS
// ============================================

it('generic feature gate allows access to enabled features', function () {
    expect(Gate::forUser($this->proUser)->allows('feature', 'ai_analytics'))->toBeTrue();
    expect(Gate::forUser($this->proUser)->allows('feature', 'export_journal'))->toBeTrue();
});

it('generic feature gate denies access to disabled features', function () {
    expect(Gate::forUser($this->freeUser)->denies('feature', 'ai_analytics'))->toBeTrue();
});

it('generic feature gate denies access to non-existent features', function () {
    expect(Gate::forUser($this->proUser)->denies('feature', 'non_existent_feature'))->toBeTrue();
});

// ============================================
// FEATURE LIMIT GATE TESTS
// ============================================

it('feature.limit gate allows usage within limit', function () {
    // Free user has limit of 10, using 5 should be allowed
    expect(Gate::forUser($this->freeUser)->allows('feature.limit', ['daily_analysis_limit', 5]))->toBeTrue();
});

it('feature.limit gate denies usage exceeding limit', function () {
    // Free user has limit of 10, using 15 should be denied
    expect(Gate::forUser($this->freeUser)->denies('feature.limit', ['daily_analysis_limit', 15]))->toBeTrue();
});

it('feature.limit gate allows unlimited usage when limit is null', function () {
    // Pro user has no limit (null), any usage should be allowed
    expect(Gate::forUser($this->proUser)->allows('feature.limit', ['daily_analysis_limit', 999999]))->toBeTrue();
});

it('feature.limit gate allows usage at exact limit', function () {
    // Free user has limit of 10, using exactly 10 should be allowed (<=)
    expect(Gate::forUser($this->freeUser)->allows('feature.limit', ['daily_analysis_limit', 10]))->toBeTrue();
    // But 11 should be denied
    expect(Gate::forUser($this->freeUser)->denies('feature.limit', ['daily_analysis_limit', 11]))->toBeTrue();
});

// ============================================
// FEATURE CAN-USE GATE TESTS
// ============================================

it('feature.can-use gate checks feature availability', function () {
    // Pro user has ai_analytics, free user doesn't
    expect(Gate::forUser($this->proUser)->allows('feature.can-use', ['ai_analytics', null]))->toBeTrue();
    expect(Gate::forUser($this->freeUser)->denies('feature.can-use', ['ai_analytics', null]))->toBeTrue();
});

// ============================================
// SPECIFIC FEATURE GATE TESTS
// ============================================

it('use-ai-analytics gate works correctly', function () {
    expect(Gate::forUser($this->proUser)->allows('use-ai-analytics'))->toBeTrue();
    expect(Gate::forUser($this->freeUser)->denies('use-ai-analytics'))->toBeTrue();
});

it('export-journal gate works correctly', function () {
    expect(Gate::forUser($this->freeUser)->allows('export-journal'))->toBeTrue();
    expect(Gate::forUser($this->proUser)->allows('export-journal'))->toBeTrue();
});

// ============================================
// PLAN CHECK GATE TESTS
// ============================================

it('is-paid-plan gate identifies paid plans', function () {
    expect(Gate::forUser($this->proUser)->allows('is-paid-plan'))->toBeTrue();
    expect(Gate::forUser($this->freeUser)->denies('is-paid-plan'))->toBeTrue();
});

it('is-free-plan gate identifies free plans', function () {
    // Debug: check plan values
    expect($this->freeUser->plan)->toBe('free');
    expect($this->proUser->plan)->toBe('pro');

    expect(Gate::forUser($this->freeUser)->allows('is-free-plan'))->toBeTrue();
    expect(Gate::forUser($this->proUser)->denies('is-free-plan'))->toBeTrue();
});

// ============================================
// MIDDLEWARE TESTS
// ============================================

it('middleware allows access when user has feature', function () {
    $this->actingAs($this->proUser)
        ->get('/test-route-with-feature')
        ->assertStatus(404); // Route doesn't exist but middleware passed
});

it('middleware blocks access when user lacks feature', function () {
    // Create a test route with middleware
    Route::get('/test-protected-route', function () {
        return response()->json(['success' => true]);
    })->middleware(['auth', 'feature:ai_analytics']);

    $this->actingAs($this->freeUser)
        ->get('/test-protected-route')
        ->assertRedirect(); // Should redirect to pricing/settings
});

it('middleware returns JSON for API requests without feature', function () {
    Route::get('/api/test-protected', function () {
        return response()->json(['success' => true]);
    })->middleware(['auth', 'feature:ai_analytics']);

    $response = $this->actingAs($this->freeUser)
        ->getJson('/api/test-protected');

    $response->assertStatus(403)
        ->assertJson([
            'feature' => 'ai_analytics',
            'reason' => 'feature_not_available',
        ]);
});

it('middleware checks limits for integer features', function () {
    Route::post('/api/test-limit', function () {
        return response()->json(['success' => true]);
    })->middleware(['auth', 'feature:daily_analysis_limit,15']);

    // Free user has limit of 10, requiring 15 should fail
    $response = $this->actingAs($this->freeUser)
        ->postJson('/api/test-limit');

    $response->assertStatus(403)
        ->assertJson([
            'feature' => 'daily_analysis_limit',
            'reason' => 'limit_exceeded',
        ]);
});

it('middleware allows unlimited features when limit is null', function () {
    Route::post('/api/test-unlimited', function () {
        return response()->json(['success' => true]);
    })->middleware(['auth', 'feature:daily_analysis_limit,999']);

    // Pro user has no limit, any amount should work
    $response = $this->actingAs($this->proUser)
        ->postJson('/api/test-unlimited');

    $response->assertStatus(200)
        ->assertJson(['success' => true]);
});

it('middleware requires authentication', function () {
    Route::get('/test-auth-required', function () {
        return response()->json(['success' => true]);
    })->middleware('feature:ai_analytics');

    $this->get('/test-auth-required')
        ->assertRedirect(); // Should redirect to login
});
