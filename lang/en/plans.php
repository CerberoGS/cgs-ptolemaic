<?php

return [
    'labels' => [
        'free' => 'Free plan',
        'trial' => 'Trial plan',
        'managed' => 'Managed plan',
        'pro' => 'Pro plan',
        'enterprise' => 'Enterprise plan',
        // Internal plans
        'staff' => 'Staff',
        'beta_testing' => 'Beta Tester',
        'internal' => 'Administrator',
    ],

    'descriptions' => [
        'free' => 'Access to core logbook and community features.',
        'trial' => '30-day evaluation with managed integrations.',
        'managed' => 'Managed integrations with shared API keys and usage limits.',
        'pro' => 'Bring your own provider keys with advanced limits.',
        'enterprise' => 'Custom enterprise offering with dedicated support.',
        // Internal plans
        'staff' => 'Internal team plan with Pro features and feedback management.',
        'beta_testing' => 'Early access to new features for testers and VIP users.',
        'internal' => 'Full system access for administrators.',
    ],

    'summary' => [
        'free' => 'Start exploring the platform with community features.',
        'trial' => 'Evaluate every feature with managed integrations.',
        'managed' => 'We manage the provider keys while you focus on insights.',
        'pro' => 'Bring your own keys with advanced automation.',
        'enterprise' => 'Tailored integrations, compliance, and white-glove onboarding.',
        // Internal plans
        'staff' => 'Team member plan with extended features.',
        'beta_testing' => 'Test new features before public release.',
        'internal' => 'Complete administrative access.',
    ],

    'price' => [
        'free' => 'Free',
        'trial' => 'Free for 30 days',
        'managed' => '$49 / month',
        'pro' => '$99 / month',
        'enterprise' => "Let's talk",
        // Internal plans
        'staff' => 'Internal',
        'beta_testing' => 'Invitation Only',
        'internal' => 'System Role',
    ],

    'features' => [
        'free' => [
            'logbook' => 'Unlimited logbook entries',
            'community' => 'Community forum access',
            'notifications' => 'Basic notifications',
        ],
        'trial' => [
            'keys_included' => 'Managed API keys included',
            'full_access' => 'Full feature access for 30 days',
            'guided_onboarding' => 'Guided onboarding tips',
        ],
        'managed' => [
            'managed_keys' => 'Managed provider API keys by CGS',
            'daily_limit' => 'Daily usage limit of :daily requests',
            'monthly_limit' => 'Monthly usage limit of :monthly requests',
            'email_support' => 'Email support',
        ],
        'pro' => [
            'own_keys' => 'Bring & manage your own API keys',
            'automation' => 'Advanced automation workflows',
            'priority_support' => 'Priority support & roadmap input',
        ],
        'enterprise' => [
            'everything_pro' => 'Everything in Pro',
            'success_manager' => 'Dedicated success manager',
            'custom_slas' => 'Custom SLAs & security reviews',
        ],
        // Internal plans
        'staff' => [
            'pro_features' => 'All Pro features included',
            'feedback_management' => 'Feedback management access',
            'extended_limits' => 'Extended API usage limits',
        ],
        'beta_testing' => [
            'all_features' => 'Access to all released features',
            'experimental' => 'Experimental features preview',
            'priority_support' => 'Priority support channel',
        ],
        'internal' => [
            'unlimited_access' => 'Unlimited access to all features',
            'admin_panel' => 'Full administrative panel',
            'all_management' => 'User, role, and system management',
        ],
    ],
];
