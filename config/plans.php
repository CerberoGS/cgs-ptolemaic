<?php

use App\Enums\PlanType;

return [
    'default' => PlanType::default()->value,

    'limits' => [
        'managed' => [
            'daily' => (int) env('MANAGED_PLAN_DAILY_LIMIT', 50),
            'monthly' => (int) env('MANAGED_PLAN_MONTHLY_LIMIT', 1000),
        ],
        'staff' => [
            'daily' => (int) env('STAFF_PLAN_DAILY_LIMIT', 500),
            'monthly' => (int) env('STAFF_PLAN_MONTHLY_LIMIT', 10000),
        ],
    ],

    'upgrade_order' => [
        PlanType::Free->value,
        PlanType::Managed->value,
        PlanType::Pro->value,
        PlanType::Enterprise->value,
    ],

    'catalog' => [
        PlanType::Free->value => [
            'price' => 'plans.price.free',
            'summary' => 'plans.summary.free',
            'features' => [
                'plans.features.free.logbook',
                'plans.features.free.community',
                'plans.features.free.notifications',
            ],
        ],
        PlanType::Managed->value => [
            'price' => 'plans.price.managed',
            'summary' => 'plans.summary.managed',
            'features' => [
                'plans.features.managed.everything_free',
                'plans.features.managed.trial_30_days',
                'plans.features.managed.ai_analytics',
                'plans.features.managed.realtime_data',
                'plans.features.managed.managed_keys',
                'plans.features.managed.daily_limit',
                'plans.features.managed.monthly_limit',
                'plans.features.managed.email_support',
                'plans.features.managed.cancel_anytime',
            ],
        ],
        PlanType::Pro->value => [
            'price' => 'plans.price.pro',
            'summary' => 'plans.summary.pro',
            'features' => [
                'plans.features.pro.everything_managed',
                'plans.features.pro.trial_60_days',
                'plans.features.pro.own_keys',
                'plans.features.pro.predictive_ai',
                'plans.features.pro.automation',
                'plans.features.pro.unlimited_requests',
                'plans.features.pro.priority_support',
                'plans.features.pro.cancel_anytime',
            ],
        ],
        PlanType::Enterprise->value => [
            'price' => 'plans.price.enterprise',
            'summary' => 'plans.summary.enterprise',
            'features' => [
                'plans.features.enterprise.everything_pro',
                'plans.features.enterprise.success_manager',
                'plans.features.enterprise.custom_slas',
            ],
        ],
        // Internal plans
        PlanType::Staff->value => [
            'price' => 'plans.price.staff',
            'summary' => 'plans.summary.staff',
            'features' => [
                'plans.features.staff.pro_features',
                'plans.features.staff.feedback_management',
                'plans.features.staff.extended_limits',
            ],
        ],
        PlanType::BetaTesting->value => [
            'price' => 'plans.price.beta_testing',
            'summary' => 'plans.summary.beta_testing',
            'features' => [
                'plans.features.beta_testing.all_features',
                'plans.features.beta_testing.experimental',
                'plans.features.beta_testing.priority_support',
            ],
        ],
        PlanType::Internal->value => [
            'price' => 'plans.price.internal',
            'summary' => 'plans.summary.internal',
            'features' => [
                'plans.features.internal.unlimited_access',
                'plans.features.internal.admin_panel',
                'plans.features.internal.all_management',
            ],
        ],
    ],

    'features' => [
        PlanType::Free->value => [
            'logbook.view',
            'logbook.create',
            'forum.view',
            'forum.participate',
        ],
        PlanType::Managed->value => [
            'logbook.view',
            'logbook.create',
            'forum.view',
            'forum.participate',
            'integrations.view',
            'integrations.managed',
            'automation.basic',
        ],
        PlanType::Pro->value => [
            'logbook.view',
            'logbook.create',
            'forum.view',
            'forum.participate',
            'integrations.view',
            'integrations.own_keys',
            'automation.advanced',
            'analytics.advanced',
        ],
        PlanType::Enterprise->value => [
            'logbook.view',
            'logbook.create',
            'forum.view',
            'forum.participate',
            'integrations.view',
            'integrations.own_keys',
            'automation.advanced',
            'analytics.advanced',
            'enterprise.support',
        ],
        // Internal plans features
        PlanType::Staff->value => [
            'logbook.view',
            'logbook.create',
            'forum.view',
            'forum.participate',
            'forum.moderate',
            'integrations.view',
            'integrations.own_keys',
            'automation.advanced',
            'analytics.advanced',
            'feedback.manage',
        ],
        PlanType::BetaTesting->value => [
            'logbook.view',
            'logbook.create',
            'forum.view',
            'forum.participate',
            'integrations.view',
            'integrations.own_keys',
            'automation.advanced',
            'analytics.advanced',
            'experimental.features',
            'priority.support',
        ],
        PlanType::Internal->value => [
            'all.features',
            'admin.panel',
            'user.management',
            'provider.management',
            'feedback.manage',
            'system.configuration',
        ],
    ],
];
