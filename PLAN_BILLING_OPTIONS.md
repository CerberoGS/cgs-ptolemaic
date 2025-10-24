# Sistema de Opciones de Facturación Flexibles

**Fecha de creación:** 2025-10-23
**Estado:** 🚧 En Implementación
**Prioridad:** Alta

---

## 📋 Resumen Ejecutivo

Sistema flexible para gestionar múltiples períodos de pago por plan (mensual, trimestral, semestral, anual, etc.) con descuentos configurables por:
- Pago adelantado (upfront)
- Autopago automático
- Combinación de ambos

---

## 🎯 Objetivos

1. ✅ **Flexibilidad Total**: Permitir cualquier período de facturación (1, 2, 3, 6, 12, 24 meses)
2. ✅ **Descuentos Configurables**: Por autopago, por pago adelantado, o combinados
3. ✅ **Por Plan**: Cada plan tiene sus propias opciones independientes
4. ✅ **Sin Deploy**: Todo configurable desde base de datos
5. ✅ **Cálculos Automáticos**: El sistema calcula precios finales automáticamente

---

## 🗄️ Estructura de Base de Datos

### Tabla: `plan_billing_options`

```sql
CREATE TABLE plan_billing_options (
    id BIGSERIAL PRIMARY KEY,
    plan_id BIGINT NOT NULL,

    -- Identificación
    billing_cycle_slug VARCHAR(50) NOT NULL,
    billing_cycle_name_key VARCHAR(255),

    -- Período
    billing_months INTEGER NOT NULL,
    billing_days INTEGER,

    -- Precio base
    base_price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',

    -- Descuentos por autopago
    has_autopay_discount BOOLEAN DEFAULT FALSE,
    autopay_discount_type VARCHAR(20),
    autopay_discount_value DECIMAL(10,2),

    -- Descuentos por pago adelantado
    upfront_discount_percentage INTEGER DEFAULT 0,

    -- Extras
    setup_fee DECIMAL(10,2) DEFAULT 0,
    trial_days INTEGER DEFAULT 0,

    -- Estado
    is_active BOOLEAN DEFAULT TRUE,
    is_default BOOLEAN DEFAULT FALSE,
    is_popular BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,

    -- Metadata
    description_key VARCHAR(255),
    highlight_text_key VARCHAR(255),

    created_at TIMESTAMP,
    updated_at TIMESTAMP,

    FOREIGN KEY (plan_id) REFERENCES pricing_plans(id) ON DELETE CASCADE,
    UNIQUE(plan_id, billing_cycle_slug)
);
```

---

## 💡 Ejemplos de Configuración

### Plan PRO - Opciones de Facturación

#### 1. **Mensual** (Sin descuentos)
```php
[
    'billing_cycle_slug' => 'monthly',
    'billing_months' => 1,
    'base_price' => 49.99,
    'has_autopay_discount' => true,
    'autopay_discount_type' => 'fixed',
    'autopay_discount_value' => 5.00,
    // Final: $49.99 (con autopago: $44.99)
]
```

#### 2. **Trimestral** (10% descuento + autopago)
```php
[
    'billing_cycle_slug' => 'quarterly',
    'billing_months' => 3,
    'base_price' => 134.97,
    'upfront_discount_percentage' => 10,
    'has_autopay_discount' => true,
    'autopay_discount_type' => 'percentage',
    'autopay_discount_value' => 5,
    // Final: $121.47 (con autopago: $115.40)
    // Equivalente: $40.49/mes
]
```

#### 3. **Semestral** (15% descuento)
```php
[
    'billing_cycle_slug' => 'semiannual',
    'billing_months' => 6,
    'base_price' => 269.94,
    'upfront_discount_percentage' => 15,
    'has_autopay_discount' => true,
    'autopay_discount_type' => 'fixed',
    'autopay_discount_value' => 20.00,
    // Final: $229.45 (con autopago: $209.45)
    // Equivalente: $38.24/mes
]
```

#### 4. **Anual** (25% descuento + 10% autopago) - MÁS POPULAR
```php
[
    'billing_cycle_slug' => 'annual',
    'billing_months' => 12,
    'base_price' => 539.88,
    'upfront_discount_percentage' => 25,
    'has_autopay_discount' => true,
    'autopay_discount_type' => 'percentage',
    'autopay_discount_value' => 10,
    'is_popular' => true,
    // Final: $404.91 (con autopago: $364.42)
    // Equivalente: $33.74/mes con autopago
    // Ahorro: $175.46 (32%) vs pago mensual
]
```

---

## 🔢 Lógica de Cálculo de Precios

### Fórmula de Precio Final

```
precio_final = base_price

// 1. Aplicar descuento por pago adelantado
if (upfront_discount_percentage > 0)
    precio_final = precio_final * (1 - upfront_discount_percentage/100)

// 2. Aplicar descuento por autopago (si aplica)
if (has_autopay_discount && user_has_autopay)
    if (autopay_discount_type == 'fixed')
        precio_final = precio_final - autopay_discount_value
    else if (autopay_discount_type == 'percentage')
        precio_final = precio_final * (1 - autopay_discount_value/100)

return round(precio_final, 2)
```

### Cálculo de Ahorro

```
precio_mensual = $49.99
total_mensual_equivalente = precio_mensual * billing_months

ahorro_total = total_mensual_equivalente - precio_final
ahorro_porcentaje = (ahorro_total / total_mensual_equivalente) * 100

equivalente_mensual = precio_final / billing_months
```

---

## 📊 Métodos del Modelo

### `PlanBillingOption.php`

```php
// Cálculo de precio
calculateFinalPrice(bool $withAutopay = false): float

// Precio mensual equivalente
monthlyEquivalent(): float

// Ahorro vs pago mensual
savingsVsMonthly(float $monthlyPrice): float
savingsPercentage(float $monthlyPrice): int

// Traducción
name(): string
highlightText(): ?string
```

---

## 🌐 Traducciones

### `lang/es/billing.php`

```php
return [
    'cycles' => [
        'monthly' => 'Mensual',
        'bimonthly' => 'Bimestral',
        'quarterly' => 'Trimestral',
        'semiannual' => 'Semestral',
        'annual' => 'Anual',
        'biennial' => 'Bianual',
    ],

    'highlights' => [
        'save_10' => 'Ahorra 10%',
        'save_15' => 'Ahorra 15%',
        'save_20' => 'Ahorra 20%',
        'save_25' => 'Ahorra 25%',
        'most_popular' => 'Más Popular',
        'best_value' => 'Mejor Valor',
    ],

    'autopay' => [
        'enabled' => 'Autopago activado',
        'discount' => 'Descuento por autopago: :amount',
        'save_extra' => 'Ahorra :amount extra con autopago',
    ],
];
```

---

## 🎨 Interfaz de Usuario (Ejemplo)

```
┌──────────────────────────────────────────────────┐
│  Plan PRO - Selecciona tu período de pago        │
├──────────────────────────────────────────────────┤
│                                                   │
│  ○ Mensual                             $49.99    │
│    💳 Con autopago: $44.99 (-$5)                 │
│                                                   │
│  ○ Trimestral (3 meses)               $121.47    │
│    💰 Ahorra 10% • $40.49/mes                    │
│    💳 Con autopago: $115.40 (-15%)               │
│                                                   │
│  ● Anual (12 meses)                   $404.91    │
│    🔥 MÁS POPULAR • Ahorra 25%                   │
│    📊 $33.74/mes                                 │
│    💳 Con autopago: $364.42 (-33%)               │
│    ✨ Ahorras $175.46 vs pago mensual            │
│                                                   │
│  [✓] Activar autopago y ahorrar más              │
│                                                   │
│  [ Continuar al pago ]                           │
└──────────────────────────────────────────────────┘
```

---

## 🔄 Relaciones de Base de Datos

```
pricing_plans (1) ────── (N) plan_billing_options
     │
     └─ billingOptions()
     └─ activeBillingOptions()
     └─ defaultBillingOption()
```

---

## ✅ Casos de Uso

### 1. Usuario selecciona plan anual con autopago
```php
$option = PlanBillingOption::find(4); // Plan anual
$finalPrice = $option->calculateFinalPrice(withAutopay: true);
// $364.42

$savings = $option->savingsVsMonthly(49.99);
// $175.46 de ahorro

$percentage = $option->savingsPercentage(49.99);
// 32% de descuento total
```

### 2. Mostrar opciones en pricing page
```php
$plan = PricingPlan::with('activeBillingOptions')->find(1);

foreach ($plan->activeBillingOptions as $option) {
    echo $option->name(); // "Mensual", "Trimestral", etc.
    echo $option->calculateFinalPrice(false); // Sin autopago
    echo $option->calculateFinalPrice(true);  // Con autopago
    echo $option->monthlyEquivalent(); // Equivalente mensual
}
```

### 3. Crear nueva opción desde admin
```php
$plan->billingOptions()->create([
    'billing_cycle_slug' => 'biennial',
    'billing_months' => 24,
    'base_price' => 959.76,
    'upfront_discount_percentage' => 35,
    'has_autopay_discount' => true,
    'autopay_discount_type' => 'percentage',
    'autopay_discount_value' => 15,
    'is_active' => true,
]);
```

---

## 📝 Tareas de Implementación

- [x] Diseño de arquitectura
- [ ] Migración de base de datos
- [ ] Modelo PlanBillingOption
- [ ] Actualizar modelo PricingPlan
- [ ] Seeder con ejemplos
- [ ] Traducciones
- [ ] Tests unitarios
- [ ] Actualizar controladores
- [ ] Actualizar vistas frontend
- [ ] Documentación de API

---

## 🚀 Beneficios

✅ **100% Flexible**: Cualquier período de facturación
✅ **Descuentos Acumulables**: Autopago + Pago adelantado
✅ **Sin Hardcode**: Todo en base de datos
✅ **Cálculos Automáticos**: El modelo hace todo
✅ **Multiplan**: Cada plan sus propias opciones
✅ **Escalable**: Fácil agregar nuevos tipos de descuentos
✅ **Multimoneda**: Preparado para USD, EUR, etc.

---

## 📚 Referencias

- Stripe Pricing Tables
- Paddle Subscription Cycles
- ChargeAutomation Billing Cycles
- SaaS Pricing Best Practices

---

**Última actualización:** 2025-10-23
**Autor:** Sistema de Arquitectura Flexible
