<?php

namespace Database\Seeders;

use App\Models\Feature;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $features = [
            // Analytics Features
            [
                'key' => 'ai_analytics',
                'name_key' => 'features.labels.ai_analytics',
                'description_key' => 'features.descriptions.ai_analytics',
                'category' => 'analytics',
                'value_type' => 'boolean',
                'is_visible' => true,
                'display_order' => 10,
            ],
            [
                'key' => 'predictive_ai',
                'name_key' => 'features.labels.predictive_ai',
                'description_key' => 'features.descriptions.predictive_ai',
                'category' => 'analytics',
                'value_type' => 'boolean',
                'is_visible' => true,
                'display_order' => 11,
            ],
            [
                'key' => 'realtime_data',
                'name_key' => 'features.labels.realtime_data',
                'description_key' => 'features.descriptions.realtime_data',
                'category' => 'analytics',
                'value_type' => 'boolean',
                'is_visible' => true,
                'display_order' => 12,
            ],

            // Limits
            [
                'key' => 'daily_analysis_limit',
                'name_key' => 'features.labels.daily_limit',
                'description_key' => 'features.descriptions.daily_limit',
                'category' => 'limits',
                'value_type' => 'integer',
                'is_visible' => true,
                'display_order' => 20,
            ],
            [
                'key' => 'monthly_analysis_limit',
                'name_key' => 'features.labels.monthly_limit',
                'description_key' => 'features.descriptions.monthly_limit',
                'category' => 'limits',
                'value_type' => 'integer',
                'is_visible' => true,
                'display_order' => 21,
            ],

            // Integrations
            [
                'key' => 'own_api_keys',
                'name_key' => 'features.labels.own_keys',
                'description_key' => 'features.descriptions.own_keys',
                'category' => 'integrations',
                'value_type' => 'boolean',
                'is_visible' => true,
                'display_order' => 30,
            ],
            [
                'key' => 'managed_api_keys',
                'name_key' => 'features.labels.managed_keys',
                'description_key' => 'features.descriptions.managed_keys',
                'category' => 'integrations',
                'value_type' => 'boolean',
                'is_visible' => true,
                'display_order' => 31,
            ],
            [
                'key' => 'custom_integrations',
                'name_key' => 'features.labels.custom_integrations',
                'description_key' => 'features.descriptions.custom_integrations',
                'category' => 'integrations',
                'value_type' => 'boolean',
                'is_visible' => true,
                'display_order' => 32,
            ],

            // Support
            [
                'key' => 'priority_support',
                'name_key' => 'features.labels.priority_support',
                'description_key' => 'features.descriptions.priority_support',
                'category' => 'support',
                'value_type' => 'boolean',
                'is_visible' => true,
                'display_order' => 40,
            ],
            [
                'key' => 'email_support',
                'name_key' => 'features.labels.email_support',
                'description_key' => 'features.descriptions.email_support',
                'category' => 'support',
                'value_type' => 'boolean',
                'is_visible' => true,
                'display_order' => 41,
            ],

            // Journal & Data
            [
                'key' => 'export_journal',
                'name_key' => 'features.labels.export_journal',
                'description_key' => 'features.descriptions.export_journal',
                'category' => 'journal',
                'value_type' => 'boolean',
                'is_visible' => true,
                'display_order' => 50,
            ],
            [
                'key' => 'journal_backup',
                'name_key' => 'features.labels.journal_backup',
                'description_key' => 'features.descriptions.journal_backup',
                'category' => 'journal',
                'value_type' => 'boolean',
                'is_visible' => true,
                'display_order' => 51,
            ],

            // Automation
            [
                'key' => 'automation_flows',
                'name_key' => 'features.labels.automation',
                'description_key' => 'features.descriptions.automation',
                'category' => 'automation',
                'value_type' => 'boolean',
                'is_visible' => true,
                'display_order' => 60,
            ],

            // Team
            [
                'key' => 'team_members_limit',
                'name_key' => 'features.labels.team_members',
                'description_key' => 'features.descriptions.team_members',
                'category' => 'team',
                'value_type' => 'integer',
                'is_visible' => false,
                'display_order' => 70,
            ],

            // Access
            [
                'key' => 'community_access',
                'name_key' => 'features.labels.community',
                'description_key' => 'features.descriptions.community',
                'category' => 'access',
                'value_type' => 'boolean',
                'is_visible' => true,
                'display_order' => 80,
            ],
        ];

        foreach ($features as $feature) {
            Feature::updateOrCreate(
                ['key' => $feature['key']],
                $feature
            );
        }

        $this->command->info('✅ Features seeded successfully!');
    }
}
