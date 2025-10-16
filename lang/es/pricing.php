<?php

return [
    // General
    'title' => 'Gestión de Precios',
    'manage_pricing' => 'Gestionar Precios',
    'pricing_plans' => 'Planes de Precios',
    'edit_pricing' => 'Editar Precios',
    'updated_successfully' => 'Plan de precios actualizado exitosamente',
    'offer_activated' => 'Oferta activada exitosamente',
    'offer_deactivated' => 'Oferta desactivada exitosamente',
    'scarcity_activated' => 'Escasez activada exitosamente',
    'scarcity_deactivated' => 'Escasez desactivada exitosamente',
    'scarcity_incremented' => 'Contador de escasez incrementado',
    'scarcity_reset' => 'Contador de escasez reiniciado',

    // Plan types
    'plan_types' => [
        'managed' => 'Cosmógrafo',
        'pro' => 'Astrónomo',
        'enterprise' => 'Heliópolis',
    ],

    // Fields
    'fields' => [
        'plan_type' => 'Tipo de Plan',
        'price_monthly' => 'Precio Mensual',
        'price_yearly' => 'Precio Anual',
        'offer_price_monthly' => 'Precio Mensual de Oferta',
        'offer_price_yearly' => 'Precio Anual de Oferta',
        'offer_active' => 'Oferta Activa',
        'offer_name' => 'Nombre de la Oferta',
        'offer_description' => 'Descripción de la Oferta',
        'offer_starts_at' => 'Oferta Inicia',
        'offer_ends_at' => 'Oferta Termina',
        'scarcity_active' => 'Escasez Activa',
        'scarcity_message' => 'Mensaje de Escasez',
        'scarcity_limit' => 'Límite de Escasez',
        'scarcity_sold' => 'Escasez Vendida',
        'is_active' => 'Activo',
    ],

    // Actions
    'actions' => [
        'edit' => 'Editar',
        'update' => 'Actualizar',
        'toggle_offer' => 'Alternar Oferta',
        'toggle_scarcity' => 'Alternar Escasez',
        'increment_scarcity' => 'Incrementar Escasez',
        'reset_scarcity' => 'Reiniciar Escasez',
        'save' => 'Guardar Cambios',
        'cancel' => 'Cancelar',
    ],

    // Status
    'status' => [
        'active' => 'Activo',
        'inactive' => 'Inactivo',
        'offer_active' => 'Oferta Activa',
        'offer_inactive' => 'Oferta Inactiva',
        'scarcity_active' => 'Escasez Activa',
        'scarcity_inactive' => 'Escasez Inactiva',
    ],

    // Validation messages
    'validation' => [
        'price_monthly_required' => 'El precio mensual es requerido',
        'price_monthly_numeric' => 'El precio mensual debe ser un número',
        'price_monthly_min' => 'El precio mensual debe ser al menos 0',
        'price_yearly_required' => 'El precio anual es requerido',
        'price_yearly_numeric' => 'El precio anual debe ser un número',
        'price_yearly_min' => 'El precio anual debe ser al menos 0',
        'offer_price_monthly_numeric' => 'El precio mensual de oferta debe ser un número',
        'offer_price_monthly_min' => 'El precio mensual de oferta debe ser al menos 0',
        'offer_price_yearly_numeric' => 'El precio anual de oferta debe ser un número',
        'offer_price_yearly_min' => 'El precio anual de oferta debe ser al menos 0',
        'offer_name_max' => 'El nombre de la oferta no puede exceder 100 caracteres',
        'offer_description_max' => 'La descripción de la oferta no puede exceder 500 caracteres',
        'offer_starts_at_date' => 'La fecha de inicio de la oferta debe ser una fecha válida',
        'offer_starts_at_after_or_equal' => 'La fecha de inicio de la oferta debe ser hoy o en el futuro',
        'offer_ends_at_date' => 'La fecha de fin de la oferta debe ser una fecha válida',
        'offer_ends_at_after' => 'La fecha de fin de la oferta debe ser después de la fecha de inicio',
        'scarcity_message_max' => 'El mensaje de escasez no puede exceder 200 caracteres',
        'scarcity_limit_integer' => 'El límite de escasez debe ser un número entero',
        'scarcity_limit_min' => 'El límite de escasez debe ser al menos 1',
        'scarcity_sold_integer' => 'La escasez vendida debe ser un número entero',
        'scarcity_sold_min' => 'La escasez vendida debe ser al menos 0',
        'offer_price_monthly_required_when_active' => 'El precio mensual de oferta es requerido cuando la oferta está activa',
        'offer_price_yearly_required_when_active' => 'El precio anual de oferta es requerido cuando la oferta está activa',
        'scarcity_message_required_when_active' => 'El mensaje de escasez es requerido cuando la escasez está activa',
        'scarcity_limit_required_when_active' => 'El límite de escasez es requerido cuando la escasez está activa',
        'scarcity_sold_exceeds_limit' => 'La escasez vendida no puede exceder el límite',
    ],

    // Help text
    'help' => [
        'offer_name' => 'Dale a tu oferta un nombre atractivo como "Oferta Black Friday" o "Especial Año Nuevo"',
        'offer_description' => 'Describe qué hace especial esta oferta y por qué los usuarios deberían actuar ahora',
        'offer_starts_at' => '¿Cuándo debería estar disponible esta oferta? Deja vacío para iniciar inmediatamente',
        'offer_ends_at' => '¿Cuándo debería expirar esta oferta? Deja vacío para que no expire',
        'scarcity_message' => 'Crea urgencia con mensajes como "¡Solo quedan 50 cupos!" o "Oferta por tiempo limitado"',
        'scarcity_limit' => '¿Cuántas unidades están disponibles? Esto crea escasez artificial',
        'scarcity_sold' => '¿Cuántas se han vendido? Esto muestra el progreso hacia el límite',
    ],
];
