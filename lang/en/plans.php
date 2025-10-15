<?php

return [
    'labels' => [
        'free' => 'Observer',
        'managed' => 'Cosmographer',
        'pro' => 'Astronomer',
        'enterprise' => 'Heliopolis',
        // Internal plans
        'staff' => 'Staff',
        'beta_testing' => 'Beta Tester',
        'internal' => 'Administrator',
    ],

    'taglines' => [
        'free' => 'Learn and connect with the community',
        'managed' => 'AI-powered analysis, ready to explore',
        'pro' => 'Total control with advanced AI',
        'enterprise' => 'Exclusive and personalized',
        // Internal plans
        'staff' => 'Internal team access',
        'beta_testing' => 'Early access program',
        'internal' => 'Full system control',
    ],

    'descriptions' => [
        'free' => 'Complete trading journal and community access.',
        'managed' => '30-day free trial, then $49/month with managed integrations.',
        'pro' => '30-day free trial + 30 bonus days with card, then $99/month BYOK.',
        'enterprise' => 'Custom enterprise solution with dedicated support.',
        // Internal plans
        'staff' => 'Internal team plan with Pro features and feedback management.',
        'beta_testing' => 'Early access to new features for testers and VIP users.',
        'internal' => 'Full system access for administrators.',
    ],

    'summary' => [
        'free' => 'Start your exploration with journal and community.',
        'managed' => 'Try 30 days free. We handle the AI setup, you focus on insights.',
        'pro' => 'Try 30 days free + 30 bonus days with card. Full control with BYOK.',
        'enterprise' => 'Tailored solution, compliance, and white-glove onboarding.',
        // Internal plans
        'staff' => 'Team member plan with extended features.',
        'beta_testing' => 'Test new features before public release.',
        'internal' => 'Complete administrative access.',
    ],

    'price' => [
        'free' => 'Free',
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
            'logbook' => 'Complete trading journal',
            'community' => 'Community and Discord access',
            'notifications' => 'Basic notifications',
        ],
        'managed' => [
            'everything_free' => 'Everything in Observer',
            'trial_30_days' => '30 days free trial (no card required)',
            'ai_analytics' => 'AI-powered analytics and insights',
            'realtime_data' => 'Real-time market data',
            'managed_keys' => 'Managed API keys by CGS',
            'daily_limit' => 'Daily limit: :daily requests',
            'monthly_limit' => 'Monthly limit: :monthly requests',
            'email_support' => 'Email support',
            'cancel_anytime' => 'Cancel anytime',
        ],
        'pro' => [
            'everything_managed' => 'Everything in Cosmographer',
            'trial_60_days' => '30 days free + 30 bonus days with card',
            'own_keys' => 'Bring your own API keys (BYOK)',
            'predictive_ai' => 'Predictive AI and advanced models',
            'automation' => 'Advanced automation workflows',
            'unlimited_requests' => 'No usage limits',
            'priority_support' => 'Priority support & roadmap input',
            'cancel_anytime' => 'Cancel anytime',
        ],
        'enterprise' => [
            'everything_pro' => 'Everything in Astronomer',
            'custom_integrations' => 'Custom integrations',
            'success_manager' => 'Dedicated success manager',
            'custom_slas' => 'Custom SLAs & security reviews',
            'sso' => 'SSO and enterprise auth',
            'compliance' => 'Compliance and audit tools',
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

    // UX Copy for different contexts
    'cta' => [
        'unlock_trial' => 'Try Cosmographer free for 30 days',
        'unlock_features' => 'Unlock AI-powered analytics',
        'upgrade_to_pro' => 'Upgrade to Astronomer',
        'add_card_extend' => 'Add card & get +30 extra days',
        'talk_to_sales' => 'Talk to sales',
    ],

    'trial_banners' => [
        'days_left' => ':days days left in your trial',
        'last_days' => 'Your trial ends soon',
        'expired' => 'Your trial has ended',
        'extend_offer' => 'Add your card to extend 30 more days. Cancel anytime.',
    ],

    'tooltips' => [
        'locked_feature' => 'Requires real-time data and AI analytics.',
        'upgrade_needed' => 'Upgrade to :plan to unlock this feature.',
    ],

    'downgrade' => [
        'message' => 'Your trial has ended. Your journal and community access remain active. Reactivate anytime.',
        'cta' => 'Explore plans',
    ],
];
