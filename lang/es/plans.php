<?php

return [
    'labels' => [
        'free' => 'Observador',
        'managed' => 'Cosmógrafo',
        'pro' => 'Astrónomo',
        'enterprise' => 'Heliópolis',
        // Internal plans
        'staff' => 'Staff',
        'beta_testing' => 'Beta Tester',
        'internal' => 'Administrador',
    ],

    'taglines' => [
        'free' => 'Aprende y conecta con la comunidad',
        'managed' => 'Análisis IA, listo para explorar',
        'pro' => 'Control total con IA avanzada',
        'enterprise' => 'Exclusivo y personalizado',
        // Internal plans
        'staff' => 'Acceso interno del equipo',
        'beta_testing' => 'Programa de acceso anticipado',
        'internal' => 'Control total del sistema',
    ],

    'descriptions' => [
        'free' => 'Bitácora completa y acceso a la comunidad.',
        'managed' => '30 días gratis, luego $49/mes con integraciones administradas.',
        'pro' => '30 días gratis + 30 días bonus con tarjeta, luego $99/mes BYOK.',
        'enterprise' => 'Solución empresarial personalizada con soporte dedicado.',
        // Internal plans
        'staff' => 'Plan interno del equipo con funciones Pro y gestión de feedback.',
        'beta_testing' => 'Acceso anticipado a nuevas funciones para testers y usuarios VIP.',
        'internal' => 'Acceso completo al sistema para administradores.',
    ],

    'summary' => [
        'free' => 'Comienza tu exploración con bitácora y comunidad.',
        'managed' => 'Prueba 30 días gratis. Nosotros gestionamos la IA, tú enfócate en insights.',
        'pro' => 'Prueba 30 días gratis + 30 días bonus con tarjeta. Control total con BYOK.',
        'enterprise' => 'Solución a medida, cumplimiento y onboarding personalizado.',
        // Internal plans
        'staff' => 'Plan para miembros del equipo con funciones extendidas.',
        'beta_testing' => 'Prueba nuevas funciones antes del lanzamiento público.',
        'internal' => 'Acceso administrativo completo.',
    ],

    'price' => [
        'free' => 'Gratis',
        'managed' => '$49 / mes',
        'pro' => '$99 / mes',
        'enterprise' => 'Hablemos',
        // Internal plans
        'staff' => 'Interno',
        'beta_testing' => 'Solo Invitación',
        'internal' => 'Rol del Sistema',
    ],

    'features' => [
        'free' => [
            'logbook' => 'Bitácora de trading completa',
            'community' => 'Comunidad y acceso a Discord',
            'notifications' => 'Notificaciones básicas',
        ],
        'managed' => [
            'everything_free' => 'Todo lo de Observador',
            'trial_30_days' => '30 días gratis de prueba (sin tarjeta)',
            'ai_analytics' => 'Análisis e insights con IA',
            'realtime_data' => 'Datos de mercado en tiempo real',
            'managed_keys' => 'API keys administradas por CGS',
            'daily_limit' => 'Límite diario: :daily solicitudes',
            'monthly_limit' => 'Límite mensual: :monthly solicitudes',
            'email_support' => 'Soporte por correo',
            'cancel_anytime' => 'Cancela cuando quieras',
        ],
        'pro' => [
            'everything_managed' => 'Todo lo de Cosmógrafo',
            'trial_60_days' => '30 días gratis + 30 días bonus con tarjeta',
            'own_keys' => 'Trae tus propias API keys (BYOK)',
            'predictive_ai' => 'IA predictiva y modelos avanzados',
            'automation' => 'Flujos de automatización avanzados',
            'unlimited_requests' => 'Sin límites de uso',
            'priority_support' => 'Soporte prioritario e influencia en roadmap',
            'cancel_anytime' => 'Cancela cuando quieras',
        ],
        'enterprise' => [
            'everything_pro' => 'Todo lo de Astrónomo',
            'custom_integrations' => 'Integraciones personalizadas',
            'success_manager' => 'Gerente de éxito dedicado',
            'custom_slas' => 'SLAs personalizados y revisiones de seguridad',
            'sso' => 'SSO y autenticación empresarial',
            'compliance' => 'Herramientas de cumplimiento y auditoría',
        ],
        // Internal plans
        'staff' => [
            'pro_features' => 'Todas las funciones Pro incluidas',
            'feedback_management' => 'Acceso a gestión de feedback',
            'extended_limits' => 'Límites extendidos de uso de API',
        ],
        'beta_testing' => [
            'all_features' => 'Acceso a todas las funciones lanzadas',
            'experimental' => 'Vista previa de funciones experimentales',
            'priority_support' => 'Canal de soporte prioritario',
        ],
        'internal' => [
            'unlimited_access' => 'Acceso ilimitado a todas las funciones',
            'admin_panel' => 'Panel administrativo completo',
            'all_management' => 'Gestión de usuarios, roles y sistema',
        ],
    ],

    // UX Copy para diferentes contextos
    'cta' => [
        'unlock_trial' => 'Probar Cosmógrafo gratis 30 días',
        'unlock_features' => 'Desbloquear análisis IA',
        'upgrade_to_pro' => 'Actualizar a Astrónomo',
        'add_card_extend' => 'Agregar tarjeta y obtener +30 días extra',
        'talk_to_sales' => 'Hablar con ventas',
    ],

    'trial_banners' => [
        'days_left' => 'Te quedan :days días de prueba',
        'last_days' => 'Tu prueba termina pronto',
        'expired' => 'Tu prueba ha terminado',
        'extend_offer' => 'Agrega tu tarjeta para extender 30 días más. Cancela cuando quieras.',
    ],

    'tooltips' => [
        'locked_feature' => 'Requiere datos en tiempo real y análisis IA.',
        'upgrade_needed' => 'Actualiza a :plan para desbloquear esta función.',
    ],

    'downgrade' => [
        'message' => 'Tu prueba ha terminado. Tu bitácora y acceso a la comunidad siguen activos. Reactiva cuando quieras.',
        'cta' => 'Explorar planes',
    ],
];
