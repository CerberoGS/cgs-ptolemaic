<?php

return [
    'prism_server' => [
        // The middleware that will be applied to the Prism Server routes.
        'middleware' => [],
        'enabled' => env('PRISM_SERVER_ENABLED', false),
    ],

    // Default provider for AI operations
    'default' => env('PRISM_DEFAULT_PROVIDER', 'fingpt'),

    // Failover configuration
    'failover' => [
        'enabled' => env('PRISM_FAILOVER_ENABLED', true),
        'providers' => ['fingpt', 'openai', 'anthropic'], // Priority order
        'max_retries' => env('PRISM_FAILOVER_MAX_RETRIES', 3),
        'retry_after' => env('PRISM_FAILOVER_RETRY_AFTER', 300), // 5 minutes
        'backoff' => [100, 500, 1000], // Exponential backoff in ms
    ],

    // Queue configuration for AI requests
    'queue' => [
        'enabled' => env('PRISM_QUEUE_ENABLED', true),
        'connection' => env('PRISM_QUEUE_CONNECTION', 'redis'),
        'queue' => env('PRISM_QUEUE_NAME', 'ai-requests'),
        'retry_after' => env('PRISM_QUEUE_RETRY_AFTER', 90), // 90 seconds
    ],

    'providers' => [
        // 1️⃣ FinGPT (Local VPS) - PRIMARY for financial analysis
        'fingpt' => [
            'driver' => 'openai', // FinGPT uses OpenAI-compatible API
            'url' => env('FINGPT_API_URL', 'http://fingpt:8001/v1'),
            'api_key' => env('FINGPT_API_KEY', 'fingpt-local-key'),
            'timeout' => env('FINGPT_TIMEOUT', 60),
            'priority' => 1, // Highest priority
        ],

        // 2️⃣ OpenAI (Backup for demand peaks/failures)
        'openai' => [
            'url' => env('OPENAI_URL', 'https://api.openai.com/v1'),
            'api_key' => env('OPENAI_API_KEY', ''),
            'organization' => env('OPENAI_ORGANIZATION', null),
            'project' => env('OPENAI_PROJECT', null),
            'priority' => 2,
        ],

        // 3️⃣ Anthropic Claude (Critical backup)
        'anthropic' => [
            'api_key' => env('ANTHROPIC_API_KEY', ''),
            'version' => env('ANTHROPIC_API_VERSION', '2023-06-01'),
            'default_thinking_budget' => env('ANTHROPIC_DEFAULT_THINKING_BUDGET', 1024),
            'anthropic_beta' => env('ANTHROPIC_BETA', null),
            'priority' => 3,
        ],

        // Optional providers (disabled by default)
        'ollama' => [
            'url' => env('OLLAMA_URL', 'http://localhost:11434'),
        ],
        'mistral' => [
            'api_key' => env('MISTRAL_API_KEY', ''),
            'url' => env('MISTRAL_URL', 'https://api.mistral.ai/v1'),
        ],
        'groq' => [
            'api_key' => env('GROQ_API_KEY', ''),
            'url' => env('GROQ_URL', 'https://api.groq.com/openai/v1'),
        ],
        'xai' => [
            'api_key' => env('XAI_API_KEY', ''),
            'url' => env('XAI_URL', 'https://api.x.ai/v1'),
        ],
        'gemini' => [
            'api_key' => env('GEMINI_API_KEY', ''),
            'url' => env('GEMINI_URL', 'https://generativelanguage.googleapis.com/v1beta/models'),
        ],
        'deepseek' => [
            'api_key' => env('DEEPSEEK_API_KEY', ''),
            'url' => env('DEEPSEEK_URL', 'https://api.deepseek.com/v1'),
        ],
        'elevenlabs' => [
            'api_key' => env('ELEVENLABS_API_KEY', ''),
            'url' => env('ELEVENLABS_URL', 'https://api.elevenlabs.io/v1/'),
        ],
        'voyageai' => [
            'api_key' => env('VOYAGEAI_API_KEY', ''),
            'url' => env('VOYAGEAI_URL', 'https://api.voyageai.com/v1'),
        ],
        'openrouter' => [
            'api_key' => env('OPENROUTER_API_KEY', ''),
            'url' => env('OPENROUTER_URL', 'https://openrouter.ai/api/v1'),
            'site' => [
                'http_referer' => env('OPENROUTER_SITE_HTTP_REFERER', null),
                'x_title' => env('OPENROUTER_SITE_X_TITLE', null),
            ],
        ],
    ],
];
