<?php

return [
    'labels' => [
        'free' => 'Gratis',
        'trial' => 'Plan de Prueba',
        'managed' => 'Plan Gestionado',
        'pro' => 'Plan Pro',
        'enterprise' => 'Plan Empresarial',
        // Internal plans
        'staff' => 'Staff',
        'beta_testing' => 'Beta Tester',
        'internal' => 'Administrador',
    ],

    'descriptions' => [
        'free' => 'Acceso a la bitácora principal y funciones de la comunidad.',
        'trial' => 'Evaluación de 30 días con integraciones administradas.',
        'managed' => 'Integraciones administradas con claves API compartidas y límites de uso.',
        'pro' => 'Trae tus propias claves de proveedor con límites avanzados.',
        'enterprise' => 'Oferta empresarial personalizada con soporte dedicado.',
        // Internal plans
        'staff' => 'Plan interno del equipo con funciones Pro y gestión de feedback.',
        'beta_testing' => 'Acceso anticipado a nuevas funciones para testers y usuarios VIP.',
        'internal' => 'Acceso completo al sistema para administradores.',
    ],

    'summary' => [
        'free' => 'Comienza a explorar la plataforma con funciones de la comunidad.',
        'trial' => 'Evalúa cada función con integraciones administradas.',
        'managed' => 'Gestionamos las claves de proveedor mientras te enfocas en los insights.',
        'pro' => 'Trae tus propias claves con automatización avanzada.',
        'enterprise' => 'Integraciones a medida, cumplimiento y onboarding personalizado.',
        // Internal plans
        'staff' => 'Plan para miembros del equipo con funciones extendidas.',
        'beta_testing' => 'Prueba nuevas funciones antes del lanzamiento público.',
        'internal' => 'Acceso administrativo completo.',
    ],

    'price' => [
        'free' => 'Gratis',
        'trial' => 'Prueba por 30 días',
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
            'logbook' => 'Entradas ilimitadas en la bitácora',
            'community' => 'Acceso al foro de la comunidad',
            'notifications' => 'Notificaciones básicas',
        ],
        'trial' => [
            'keys_included' => 'Claves API administradas incluidas',
            'full_access' => 'Acceso completo a todas las funciones por 30 días',
            'guided_onboarding' => 'Guía de incorporación asistida',
        ],
        'managed' => [
            'managed_keys' => 'Claves API administradas por CGS',
            'daily_limit' => 'Límite de uso diario de :daily solicitudes',
            'monthly_limit' => 'Límite de uso mensual de :monthly solicitudes',
            'email_support' => 'Soporte por correo',
        ],
        'pro' => [
            'own_keys' => 'Trae y administra tus propias claves API',
            'automation' => 'Flujos avanzados de automatización',
            'priority_support' => 'Soporte prioritario y aportes al roadmap',
        ],
        'enterprise' => [
            'everything_pro' => 'Todo lo del plan Pro',
            'success_manager' => 'Gerente de éxito dedicado',
            'custom_slas' => 'SLA personalizados y revisiones de seguridad',
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
];
