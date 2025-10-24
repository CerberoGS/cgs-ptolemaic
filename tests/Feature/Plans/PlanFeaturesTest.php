<?php

use App\Models\Feature;
use App\Models\PricingPlan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
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
        'description_key' => 'features.descriptions.ai_analytics',
        'category' => 'analytics',
        'value_type' => 'boolean',
        'is_visible' => true,
        'display_order' => 1,
    ]);

    $this->dailyLimitFeature = Feature::create([
        'key' => 'daily_analysis_limit',
        'name_key' => 'features.labels.daily_analysis_limit',
        'description_key' => 'features.descriptions.daily_analysis_limit',
        'category' => 'limits',
        'value_type' => 'integer',
        'is_visible' => true,
        'display_order' => 2,
    ]);

    // Create plans
    $this->freePlan = PricingPlan::create([
        'slug' => 'free',
        'name_key' => 'plans.labels.free',
        'emoji' => '👁️',
        'accent_color' => 'zinc',
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
        'limit_value' => 0,
    ]);

    $this->proPlan->features()->attach($this->aiAnalyticsFeature->id, [
        'is_enabled' => true,
    ]);

    $this->proPlan->features()->attach($this->dailyLimitFeature->id, [
        'is_enabled' => true,
        'limit_value' => null, // unlimited
    ]);
});

it('checks if plan has a specific feature', function () {
    expect($this->freePlan->hasFeature('ai_analytics'))->toBeFalse();
    expect($this->proPlan->hasFeature('ai_analytics'))->toBeTrue();
});

it('returns correct feature limit for integer features', function () {
    expect($this->freePlan->getFeatureLimit('daily_analysis_limit'))->toBe(0);
    expect($this->proPlan->getFeatureLimit('daily_analysis_limit'))->toBeNull();
});

it('returns null for non-existent features', function () {
    expect($this->freePlan->hasFeature('non_existent_feature'))->toBeFalse();
    expect($this->freePlan->getFeatureLimit('non_existent_feature'))->toBeNull();
});

it('user can check feature access via HasPlanFeatures trait', function () {
    $freeUser = User::factory()->create(['plan' => 'free']);
    $proUser = User::factory()->create(['plan' => 'pro']);

    expect($freeUser->hasFeature('ai_analytics'))->toBeFalse();
    expect($proUser->hasFeature('ai_analytics'))->toBeTrue();
});

it('user can get feature limits via HasPlanFeatures trait', function () {
    $freeUser = User::factory()->create(['plan' => 'free']);
    $proUser = User::factory()->create(['plan' => 'pro']);

    expect($freeUser->getFeatureLimit('daily_analysis_limit'))->toBe(0);
    expect($proUser->getFeatureLimit('daily_analysis_limit'))->toBeNull();
});

it('caches feature checks for 6 hours', function () {
    Cache::flush();

    // First call should hit database
    $hasFeature = $this->proPlan->hasFeature('ai_analytics');
    expect($hasFeature)->toBeTrue();

    // Check if cached
    $cacheKey = "plan.{$this->proPlan->id}.feature.ai_analytics";
    expect(Cache::has($cacheKey))->toBeTrue();
    expect(Cache::get($cacheKey))->toBeTrue();
});

it('caches feature limits for 6 hours', function () {
    Cache::flush();

    // First call should hit database
    $limit = $this->freePlan->getFeatureLimit('daily_analysis_limit');
    expect($limit)->toBe(0);

    // Check if cached
    $cacheKey = "plan.{$this->freePlan->id}.limit.daily_analysis_limit";
    expect(Cache::has($cacheKey))->toBeTrue();
    expect(Cache::get($cacheKey))->toBe(0);
});

it('syncPlanRole assigns correct Spatie role to user', function () {
    $user = User::factory()->create(['plan' => 'pro']);

    $user->syncPlanRole();

    expect($user->hasRole('plan:pro'))->toBeTrue();
    expect($user->hasRole('plan:free'))->toBeFalse();
});

it('syncPlanRole removes old plan roles and assigns new one', function () {
    $user = User::factory()->create(['plan' => 'free']);
    $user->syncRoles([$this->freeRole]);

    expect($user->hasRole('plan:free'))->toBeTrue();

    // Change plan
    $user->plan = 'pro';
    $user->save();
    $user->syncPlanRole();

    expect($user->hasRole('plan:pro'))->toBeTrue();
    expect($user->hasRole('plan:free'))->toBeFalse();
});

it('only returns active plans in active scope', function () {
    $inactivePlan = PricingPlan::create([
        'slug' => 'inactive',
        'name_key' => 'plans.labels.inactive',
        'price_monthly' => 50,
        'price_yearly' => 500,
        'is_active' => false,
        'display_order' => 99,
    ]);

    $activePlans = PricingPlan::active()->get();

    expect($activePlans)->toHaveCount(2); // free and pro
    expect($activePlans->contains($inactivePlan))->toBeFalse();
});

it('only returns public plans in public scope', function () {
    $privatePlan = PricingPlan::create([
        'slug' => 'internal',
        'name_key' => 'plans.labels.internal',
        'price_monthly' => 0,
        'price_yearly' => 0,
        'is_active' => true,
        'is_public' => false,
        'display_order' => 99,
    ]);

    $publicPlans = PricingPlan::public()->get();

    expect($publicPlans)->toHaveCount(2); // free and pro
    expect($publicPlans->contains($privatePlan))->toBeFalse();
});

it('translates plan names correctly', function () {
    // Mock translations
    app('translator')->addLines([
        'plans.labels.free' => 'Observador',
        'plans.labels.pro' => 'Astrónomo',
    ], 'es');

    app()->setLocale('es');

    expect($this->freePlan->name())->toBe('Observador');
    expect($this->proPlan->name())->toBe('Astrónomo');
});

it('translates feature names correctly', function () {
    // Mock translations
    app('translator')->addLines([
        'features.labels.ai_analytics' => 'Análisis con IA',
        'features.labels.daily_analysis_limit' => 'Límite Diario',
    ], 'es');

    app()->setLocale('es');

    expect($this->aiAnalyticsFeature->name())->toBe('Análisis con IA');
    expect($this->dailyLimitFeature->name())->toBe('Límite Diario');
});
