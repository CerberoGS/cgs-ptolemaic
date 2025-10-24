<?php

namespace Database\Seeders;

use App\Models\Feature;
use App\Models\PricingPlan;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class PricingPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🚀 Seeding pricing plans with flexible architecture...');

        // Crear roles de Spatie para cada plan
        $freeRole = Role::firstOrCreate(['name' => 'plan:free', 'guard_name' => 'web']);
        $managedRole = Role::firstOrCreate(['name' => 'plan:managed', 'guard_name' => 'web']);
        $proRole = Role::firstOrCreate(['name' => 'plan:pro', 'guard_name' => 'web']);
        $enterpriseRole = Role::firstOrCreate(['name' => 'plan:enterprise', 'guard_name' => 'web']);
        $staffRole = Role::firstOrCreate(['name' => 'plan:staff', 'guard_name' => 'web']);
        $betaRole = Role::firstOrCreate(['name' => 'plan:beta_testing', 'guard_name' => 'web']);
        $internalRole = Role::firstOrCreate(['name' => 'plan:internal', 'guard_name' => 'web']);

        $this->command->info('✅ Roles created');

        // 1. FREE (Observador) 👁️
        $freePlan = PricingPlan::updateOrCreate(
            ['slug' => 'free'],
            [
                'name_key' => 'plans.labels.free',
                'tagline_key' => 'plans.taglines.free',
                'description_key' => 'plans.descriptions.free',
                'emoji' => '👁️',
                'accent_color' => 'zinc',
                'is_active' => true,
                'is_public' => true,
                'is_featured' => false,
                'display_order' => 1,
                'role_id' => $freeRole->id,
            ]
        );

        // 2. MANAGED (Cosmógrafo) 🧭
        $managedPlan = PricingPlan::updateOrCreate(
            ['slug' => 'managed'],
            [
                'name_key' => 'plans.labels.managed',
                'tagline_key' => 'plans.taglines.managed',
                'description_key' => 'plans.descriptions.managed',
                'emoji' => '🧭',
                'accent_color' => 'cyan',
                'is_active' => true,
                'is_public' => true,
                'is_featured' => true, // Recomendado
                'display_order' => 2,
                'role_id' => $managedRole->id,
            ]
        );

        // 3. PRO (Astrónomo) 🔭
        $proPlan = PricingPlan::updateOrCreate(
            ['slug' => 'pro'],
            [
                'name_key' => 'plans.labels.pro',
                'tagline_key' => 'plans.taglines.pro',
                'description_key' => 'plans.descriptions.pro',
                'emoji' => '🔭',
                'accent_color' => 'violet',
                'is_active' => true,
                'is_public' => true,
                'is_featured' => false,
                'display_order' => 3,
                'role_id' => $proRole->id,
            ]
        );

        // 4. ENTERPRISE (Heliópolis) ☀️
        $enterprisePlan = PricingPlan::updateOrCreate(
            ['slug' => 'enterprise'],
            [
                'name_key' => 'plans.labels.enterprise',
                'tagline_key' => 'plans.taglines.enterprise',
                'description_key' => 'plans.descriptions.enterprise',
                'emoji' => '☀️',
                'accent_color' => 'amber',
                'is_active' => true,
                'is_public' => true,
                'is_featured' => false,
                'display_order' => 4,
                'role_id' => $enterpriseRole->id,
            ]
        );

        // 5. STAFF 🛡️
        $staffPlan = PricingPlan::updateOrCreate(
            ['slug' => 'staff'],
            [
                'name_key' => 'plans.labels.staff',
                'tagline_key' => 'plans.taglines.staff',
                'description_key' => 'plans.descriptions.staff',
                'emoji' => '🛡️',
                'accent_color' => 'blue',
                'is_active' => true,
                'is_public' => false, // No visible en página pública
                'is_featured' => false,
                'display_order' => 5,
                'role_id' => $staffRole->id,
            ]
        );

        // 6. BETA TESTING 🧪
        $betaPlan = PricingPlan::updateOrCreate(
            ['slug' => 'beta_testing'],
            [
                'name_key' => 'plans.labels.beta_testing',
                'tagline_key' => 'plans.taglines.beta_testing',
                'description_key' => 'plans.descriptions.beta_testing',
                'emoji' => '🧪',
                'accent_color' => 'purple',
                'is_active' => true,
                'is_public' => false,
                'is_featured' => false,
                'display_order' => 6,
                'role_id' => $betaRole->id,
            ]
        );

        // 7. INTERNAL (Administrador) 👑
        $internalPlan = PricingPlan::updateOrCreate(
            ['slug' => 'internal'],
            [
                'name_key' => 'plans.labels.internal',
                'tagline_key' => 'plans.taglines.internal',
                'description_key' => 'plans.descriptions.internal',
                'emoji' => '👑',
                'accent_color' => 'rose',
                'is_active' => true,
                'is_public' => false,
                'is_featured' => false,
                'display_order' => 7,
                'role_id' => $internalRole->id,
            ]
        );

        $this->command->info('✅ Plans created');

        // Asignar features a cada plan
        $this->assignFeaturesToPlans($freePlan, $managedPlan, $proPlan, $enterprisePlan, $staffPlan, $betaPlan, $internalPlan);

        $this->command->info('✅ Pricing plans seeded successfully!');
    }

    /**
     * Assign features to each plan
     */
    private function assignFeaturesToPlans(...$plans): void
    {
        [$freePlan, $managedPlan, $proPlan, $enterprisePlan, $staffPlan, $betaPlan, $internalPlan] = $plans;

        // Get all features
        $aiAnalytics = Feature::where('key', 'ai_analytics')->first();
        $predictiveAi = Feature::where('key', 'predictive_ai')->first();
        $realtimeData = Feature::where('key', 'realtime_data')->first();
        $dailyLimit = Feature::where('key', 'daily_analysis_limit')->first();
        $monthlyLimit = Feature::where('key', 'monthly_analysis_limit')->first();
        $ownKeys = Feature::where('key', 'own_api_keys')->first();
        $managedKeys = Feature::where('key', 'managed_api_keys')->first();
        $customIntegrations = Feature::where('key', 'custom_integrations')->first();
        $prioritySupport = Feature::where('key', 'priority_support')->first();
        $emailSupport = Feature::where('key', 'email_support')->first();
        $exportJournal = Feature::where('key', 'export_journal')->first();
        $journalBackup = Feature::where('key', 'journal_backup')->first();
        $automation = Feature::where('key', 'automation_flows')->first();
        $community = Feature::where('key', 'community_access')->first();

        // FREE Plan
        $freePlan->features()->sync([
            $community->id => ['is_enabled' => true],
            $exportJournal->id => ['is_enabled' => true],
            $aiAnalytics->id => ['is_enabled' => false],
            $dailyLimit->id => ['is_enabled' => true, 'limit_value' => 0],
        ]);

        // MANAGED Plan
        $managedPlan->features()->sync([
            $community->id => ['is_enabled' => true],
            $exportJournal->id => ['is_enabled' => true],
            $aiAnalytics->id => ['is_enabled' => true],
            $realtimeData->id => ['is_enabled' => true],
            $managedKeys->id => ['is_enabled' => true],
            $emailSupport->id => ['is_enabled' => true],
            $dailyLimit->id => ['is_enabled' => true, 'limit_value' => 50],
            $monthlyLimit->id => ['is_enabled' => true, 'limit_value' => 1000],
        ]);

        // PRO Plan
        $proPlan->features()->sync([
            $community->id => ['is_enabled' => true],
            $exportJournal->id => ['is_enabled' => true],
            $journalBackup->id => ['is_enabled' => true],
            $aiAnalytics->id => ['is_enabled' => true],
            $predictiveAi->id => ['is_enabled' => true],
            $realtimeData->id => ['is_enabled' => true],
            $ownKeys->id => ['is_enabled' => true],
            $automation->id => ['is_enabled' => true],
            $prioritySupport->id => ['is_enabled' => true],
            $dailyLimit->id => ['is_enabled' => true, 'limit_value' => null], // unlimited
            $monthlyLimit->id => ['is_enabled' => true, 'limit_value' => null], // unlimited
        ]);

        // ENTERPRISE Plan
        $enterprisePlan->features()->sync([
            $community->id => ['is_enabled' => true],
            $exportJournal->id => ['is_enabled' => true],
            $journalBackup->id => ['is_enabled' => true],
            $aiAnalytics->id => ['is_enabled' => true],
            $predictiveAi->id => ['is_enabled' => true],
            $realtimeData->id => ['is_enabled' => true],
            $ownKeys->id => ['is_enabled' => true],
            $customIntegrations->id => ['is_enabled' => true],
            $automation->id => ['is_enabled' => true],
            $prioritySupport->id => ['is_enabled' => true],
            $dailyLimit->id => ['is_enabled' => true, 'limit_value' => null],
            $monthlyLimit->id => ['is_enabled' => true, 'limit_value' => null],
        ]);

        // STAFF Plan (Pro + feedback management)
        $staffPlan->features()->sync([
            $community->id => ['is_enabled' => true],
            $exportJournal->id => ['is_enabled' => true],
            $journalBackup->id => ['is_enabled' => true],
            $aiAnalytics->id => ['is_enabled' => true],
            $predictiveAi->id => ['is_enabled' => true],
            $realtimeData->id => ['is_enabled' => true],
            $ownKeys->id => ['is_enabled' => true],
            $automation->id => ['is_enabled' => true],
            $prioritySupport->id => ['is_enabled' => true],
            $dailyLimit->id => ['is_enabled' => true, 'limit_value' => 500],
            $monthlyLimit->id => ['is_enabled' => true, 'limit_value' => 10000],
        ]);

        // BETA TESTING Plan (All features)
        $betaPlan->features()->sync([
            $community->id => ['is_enabled' => true],
            $exportJournal->id => ['is_enabled' => true],
            $journalBackup->id => ['is_enabled' => true],
            $aiAnalytics->id => ['is_enabled' => true],
            $predictiveAi->id => ['is_enabled' => true],
            $realtimeData->id => ['is_enabled' => true],
            $ownKeys->id => ['is_enabled' => true],
            $customIntegrations->id => ['is_enabled' => true],
            $automation->id => ['is_enabled' => true],
            $prioritySupport->id => ['is_enabled' => true],
            $dailyLimit->id => ['is_enabled' => true, 'limit_value' => null],
            $monthlyLimit->id => ['is_enabled' => true, 'limit_value' => null],
        ]);

        // INTERNAL Plan (Unlimited everything)
        $internalPlan->features()->sync([
            $community->id => ['is_enabled' => true],
            $exportJournal->id => ['is_enabled' => true],
            $journalBackup->id => ['is_enabled' => true],
            $aiAnalytics->id => ['is_enabled' => true],
            $predictiveAi->id => ['is_enabled' => true],
            $realtimeData->id => ['is_enabled' => true],
            $ownKeys->id => ['is_enabled' => true],
            $customIntegrations->id => ['is_enabled' => true],
            $automation->id => ['is_enabled' => true],
            $prioritySupport->id => ['is_enabled' => true],
            $dailyLimit->id => ['is_enabled' => true, 'limit_value' => null],
            $monthlyLimit->id => ['is_enabled' => true, 'limit_value' => null],
        ]);

        $this->command->info('✅ Features assigned to plans');
    }
}
