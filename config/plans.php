<?php

use App\Enums\PlanType;

return [
    'default' => PlanType::default()->value,

    'limits' => [
        'managed' => [
            'daily' => (int) env('MANAGED_PLAN_DAILY_LIMIT', 50),
            'monthly' => (int) env('MANAGED_PLAN_MONTHLY_LIMIT', 1000),
        ],
    ],

    'upgrade_order' => [
        PlanType::Free->value,
        PlanType::Trial->value,
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
        PlanType::Trial->value => [
            'price' => 'plans.price.trial',
            'summary' => 'plans.summary.trial',
            'features' => [
                'plans.features.trial.keys_included',
                'plans.features.trial.full_access',
                'plans.features.trial.guided_onboarding',
            ],
        ],
        PlanType::Managed->value => [
            'price' => 'plans.price.managed',
            'summary' => 'plans.summary.managed',
            'features' => [
                'plans.features.managed.managed_keys',
                'plans.features.managed.daily_limit',
                'plans.features.managed.monthly_limit',
                'plans.features.managed.email_support',
            ],
        ],
        PlanType::Pro->value => [
            'price' => 'plans.price.pro',
            'summary' => 'plans.summary.pro',
            'features' => [
                'plans.features.pro.own_keys',
                'plans.features.pro.automation',
                'plans.features.pro.priority_support',
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
    ],

    'features' => [
        PlanType::Free->value => [
            'logbook.view',
            'logbook.create',
            'forum.view',
            'forum.participate',
        ],
        PlanType::Trial->value => [
            'logbook.view',
            'logbook.create',
            'forum.view',
            'forum.participate',
            'integrations.view',
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
    ],
];
