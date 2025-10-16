# Sistema de Traducciones - Ptolemaic Platform

## **Arquitectura del Sistema**

El sistema de traducciones de Ptolemaic utiliza **archivos PHP organizados por namespace** siguiendo las mejores prácticas de Laravel.

### **Estructura de Archivos:**
```
lang/
├── es/                          # Español
│   ├── general.php             # Traducciones generales de UI
│   ├── pricing.php             # Gestión de precios
│   ├── plans.php               # Planes de suscripción
│   ├── achievements.php        # Sistema de logros
│   ├── feedback.php            # Sistema de feedback
│   ├── invitations.php         # Sistema de invitaciones
│   ├── auth.php                # Autenticación
│   ├── validation.php          # Validaciones
│   └── ...
├── en/                          # Inglés
│   ├── general.php
│   ├── pricing.php
│   └── ...
├── es.json                      # Compatibilidad (legacy)
└── en.json                      # Compatibilidad (legacy)
```

## **Cómo Funciona**

### **Backend (Laravel):**
```php
// Usar helper __() con namespace
__('pricing.title')           // Busca en lang/es/pricing.php
__('general.Dashboard')       // Busca en lang/es/general.php
__('auth.failed')             // Busca en lang/es/auth.php
```

### **Frontend (React/Inertia):**
```typescript
// Usar hook useTrans() con namespace
const t = useTrans();

t('pricing.title')           // Busca en lang/es/pricing.php
t('general.Dashboard')       // Busca en lang/es/general.php
t('auth.failed')             // Busca en lang/es/auth.php
```

## **Cómo Agregar Nuevas Traducciones**

### **1. Para una funcionalidad existente:**

**Ejemplo: Agregar traducción para "Delete Confirmation" en pricing**

```php
// lang/es/pricing.php
return [
    'title' => 'Gestión de Precios',
    'delete_confirmation' => '¿Estás seguro de que quieres eliminar este plan de precios?',
    // ... resto de traducciones
];

// lang/en/pricing.php  
return [
    'title' => 'Pricing Management',
    'delete_confirmation' => 'Are you sure you want to delete this pricing plan?',
    // ... resto de traducciones
];
```

**Uso en frontend:**
```typescript
const t = useTrans();
const message = t('pricing.delete_confirmation');
```

### **2. Para una nueva funcionalidad:**

**Ejemplo: Crear sistema de notificaciones**

```php
// lang/es/notifications.php
return [
    'title' => 'Notificaciones',
    'mark_as_read' => 'Marcar como leído',
    'mark_all_read' => 'Marcar todas como leídas',
    'types' => [
        'success' => 'Éxito',
        'error' => 'Error',
        'warning' => 'Advertencia',
        'info' => 'Información',
    ],
    'messages' => [
        'welcome' => '¡Bienvenido a Ptolemaic!',
        'trial_expiring' => 'Tu período de prueba expira en :days días',
    ],
];

// lang/en/notifications.php
return [
    'title' => 'Notifications',
    'mark_as_read' => 'Mark as read',
    'mark_all_read' => 'Mark all as read',
    'types' => [
        'success' => 'Success',
        'error' => 'Error', 
        'warning' => 'Warning',
        'info' => 'Information',
    ],
    'messages' => [
        'welcome' => 'Welcome to Ptolemaic!',
        'trial_expiring' => 'Your trial expires in :days days',
    ],
];
```

**Uso en frontend:**
```typescript
const t = useTrans();

// Traducciones simples
const title = t('notifications.title');
const markRead = t('notifications.mark_as_read');

// Traducciones anidadas
const successType = t('notifications.types.success');
const welcomeMsg = t('notifications.messages.welcome');

// Con parámetros (usando el hook useTrans con replace)
const trialMsg = t('notifications.messages.trial_expiring', { days: 5 });
```

### **3. Para traducciones generales de UI:**

**Agregar al archivo `general.php`:**
```php
// lang/es/general.php
return [
    // ... traducciones existentes
    'New Feature' => 'Nueva Funcionalidad',
    'Coming Soon' => 'Próximamente',
    'Beta' => 'Beta',
];

// lang/en/general.php
return [
    // ... traducciones existentes  
    'New Feature' => 'New Feature',
    'Coming Soon' => 'Coming Soon',
    'Beta' => 'Beta',
];
```

## **Reglas y Convenciones**

### **1. Naming Convention:**
- **Archivos**: `snake_case.php` (ej: `user_profile.php`)
- **Claves**: `snake_case` (ej: `delete_confirmation`)
- **Namespaces**: Coinciden con el nombre del archivo

### **2. Organización:**
- **Una funcionalidad = Un archivo PHP**
- **Traducciones generales = `general.php`**
- **Traducciones específicas = archivo dedicado**

### **3. Estructura de Arrays:**
```php
// ✅ CORRECTO - Estructura plana
return [
    'title' => 'Título',
    'description' => 'Descripción',
    'save_button' => 'Guardar',
];

// ✅ CORRECTO - Arrays anidados para agrupación
return [
    'title' => 'Título',
    'buttons' => [
        'save' => 'Guardar',
        'cancel' => 'Cancelar',
    ],
    'messages' => [
        'success' => 'Éxito',
        'error' => 'Error',
    ],
];

// ❌ INCORRECTO - Demasiada anidación
return [
    'ui' => [
        'forms' => [
            'buttons' => [
                'save' => 'Guardar', // Demasiado profundo
            ],
        ],
    ],
];
```

### **4. Parámetros en Traducciones:**
```php
// En el archivo PHP
'messages' => [
    'welcome_user' => 'Bienvenido :name, tienes :count notificaciones',
    'trial_expires' => 'Tu prueba expira en :days días',
],

// En el frontend
const message = t('general.messages.welcome_user', { 
    name: 'Juan', 
    count: 5 
});
```

## **Migración desde JSON (Si es necesario)**

Si necesitas migrar traducciones desde JSON a PHP:

### **1. Identificar el namespace apropiado:**
```json
// lang/es.json
{
    "Pricing Management": "Gestión de Precios",
    "Monthly Price": "Precio Mensual"
}
```

### **2. Crear archivo PHP:**
```php
// lang/es/pricing.php
return [
    'title' => 'Gestión de Precios',
    'monthly_price' => 'Precio Mensual',
];
```

### **3. Actualizar referencias en código:**
```typescript
// ❌ Antes (JSON)
t('Pricing Management')

// ✅ Después (PHP)
t('pricing.title')
```

## **Testing de Traducciones**

### **1. Verificar que existen:**
```php
// En tests PHP
$this->assertTrue(__('pricing.title') !== 'pricing.title');
```

### **2. Verificar en frontend:**
```typescript
// En tests React
expect(t('pricing.title')).not.toBe('pricing.title');
```

## **Troubleshooting**

### **Problema: Traducción no aparece**
1. Verificar que el archivo PHP existe en `lang/{locale}/`
2. Verificar que la clave existe en el archivo
3. Verificar que el namespace es correcto
4. Limpiar caché: `php artisan cache:clear`

### **Problema: Traducción aparece como clave**
```typescript
// Si ves esto:
"pricing.title" // En lugar de "Gestión de Precios"

// Verifica:
// 1. El archivo lang/es/pricing.php existe
// 2. La clave 'title' existe en el archivo
// 3. El archivo tiene sintaxis PHP válida
```

### **Problema: Traducción en idioma incorrecto**
1. Verificar que `app()->getLocale()` retorna el idioma correcto
2. Verificar que el middleware `SetLocale` está funcionando
3. Verificar que el usuario tiene el idioma correcto en cookies/sesión

## **Herramientas Útiles**

### **1. Comando para verificar traducciones:**
```bash
# Ver todas las traducciones de un namespace
php artisan tinker
>>> __('pricing.title')
>>> __('general.Dashboard')
```

### **2. Comando para limpiar caché:**
```bash
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

### **3. Verificar archivos de traducción:**
```bash
# Ver estructura de archivos
ls -la lang/es/
ls -la lang/en/
```

---

## **Resumen de Cambios Implementados**

✅ **Sistema híbrido**: JSON (legacy) + PHP (nuevo)  
✅ **Namespacing**: `namespace.key` para organización  
✅ **Compatibilidad**: Funciona con código existente  
✅ **Escalabilidad**: Fácil agregar nuevas funcionalidades  
✅ **Mantenibilidad**: Archivos organizados por funcionalidad  

**El sistema ahora sigue las mejores prácticas de Laravel y es mucho más mantenible y escalable.**
