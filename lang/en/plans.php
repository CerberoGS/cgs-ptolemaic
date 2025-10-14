<?php

return [
    'labels' => [
        'free' => 'Free plan',
        'trial' => 'Trial plan',
        'managed' => 'Managed plan',
        'pro' => 'Pro plan',
        'enterprise' => 'Enterprise plan',
    ],

    'descriptions' => [
        'free' => 'Access to core logbook and community features.',
        'trial' => '30-day evaluation with managed integrations.',
        'managed' => 'Managed integrations with shared API keys and usage limits.',
        'pro' => 'Bring your own provider keys with advanced limits.',
        'enterprise' => 'Custom enterprise offering with dedicated support.',
    ],

    'summary' => [
        'free' => 'Start exploring the platform with community features.',
        'trial' => 'Evaluate every feature with managed integrations.',
        'managed' => 'We manage the provider keys while you focus on insights.',
        'pro' => 'Bring your own keys with advanced automation.',
        'enterprise' => 'Tailored integrations, compliance, and white-glove onboarding.',
    ],

    'price' => [
        'free' => 'Free',
        'trial' => 'Free for 30 days',
        'managed' => '$49 / month',
        'pro' => '$99 / month',
        'enterprise' => "Let's talk",
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
    ],
];
