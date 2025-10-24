<?php

namespace App\Filament\Resources\PricingPlans\Schemas;

use App\Models\Feature;
use App\Models\PricingPlan;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;

class PricingPlanForm
{
    protected static ?\Illuminate\Support\Collection $featuresCache = null;

    protected static function getFeature(int $featureId): ?Feature
    {
        if (static::$featuresCache === null) {
            static::$featuresCache = Feature::all()->keyBy('id');
        }

        return static::$featuresCache->get($featureId);
    }

    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Plan de Precios')
                    ->tabs([
                        Tabs\Tab::make('Información del Plan')
                            ->icon('heroicon-o-rectangle-stack')
                            ->schema([
                                Section::make('Información Básica')
                                    ->description('Identificación del plan y su estado')
                                    ->schema([
                                        TextInput::make('slug')
                                            ->label('Slug del Plan')
                                            ->required()
                                            ->unique(ignoreRecord: true)
                                            ->maxLength(100)
                                            ->helperText('Identificador único del plan (ej: free, managed, pro)')
                                            ->disabled(fn (?PricingPlan $record) => $record !== null),

                                        TextInput::make('name_key')
                                            ->label('Clave de Traducción del Nombre')
                                            ->required()
                                            ->maxLength(255)
                                            ->helperText('Ej: plans.labels.free')
                                            ->placeholder('plans.labels.nombre_plan'),

                                        TextInput::make('tagline_key')
                                            ->label('Clave de Traducción del Lema')
                                            ->maxLength(255)
                                            ->helperText('Ej: plans.taglines.free')
                                            ->placeholder('plans.taglines.nombre_plan'),

                                        TextInput::make('description_key')
                                            ->label('Clave de Traducción de la Descripción')
                                            ->maxLength(255)
                                            ->helperText('Ej: plans.descriptions.free')
                                            ->placeholder('plans.descriptions.nombre_plan'),

                                        TextInput::make('emoji')
                                            ->label('Emoji')
                                            ->maxLength(10)
                                            ->helperText('Emoji representativo del plan (ej: 👁️, 🧭, 🔭)'),

                                        Select::make('accent_color')
                                            ->label('Color de Acento')
                                            ->options([
                                                'zinc' => 'Zinc (Gris)',
                                                'cyan' => 'Cyan (Cian)',
                                                'violet' => 'Violet (Violeta)',
                                                'amber' => 'Amber (Ámbar)',
                                                'blue' => 'Blue (Azul)',
                                                'purple' => 'Purple (Púrpura)',
                                                'rose' => 'Rose (Rosa)',
                                                'green' => 'Green (Verde)',
                                                'red' => 'Red (Rojo)',
                                            ])
                                            ->helperText('Color usado en badges y destacados')
                                            ->native(false),

                                        TextInput::make('icon_url')
                                            ->label('URL del Ícono')
                                            ->url()
                                            ->maxLength(500)
                                            ->helperText('URL opcional de un ícono personalizado'),

                                        Toggle::make('is_active')
                                            ->label('Plan Activo')
                                            ->helperText('Solo los planes activos se mostrarán a los usuarios')
                                            ->default(true)
                                            ->inline(false),

                                        Toggle::make('is_public')
                                            ->label('Plan Público')
                                            ->helperText('Visible en la página pública de precios')
                                            ->default(true)
                                            ->inline(false),

                                        Toggle::make('is_featured')
                                            ->label('Plan Destacado')
                                            ->helperText('Marcar como plan recomendado')
                                            ->default(false)
                                            ->inline(false),

                                        TextInput::make('display_order')
                                            ->label('Orden de Visualización')
                                            ->numeric()
                                            ->minValue(0)
                                            ->default(0)
                                            ->helperText('Orden en que aparece (menor primero)'),
                                    ])
                                    ->columns(2),
                            ]),

                        Tabs\Tab::make('Opciones de Facturación')
                            ->icon('heroicon-o-credit-card')
                            ->schema([
                                Section::make('Ciclos de Facturación')
                                    ->description('Configura las opciones de pago (mensual, trimestral, anual, etc.)')
                                    ->schema([
                                        Repeater::make('billingOptions')
                                            ->relationship('billingOptions')
                                            ->schema([
                                                Select::make('billing_cycle_slug')
                                                    ->label('Ciclo')
                                                    ->options([
                                                        'monthly' => 'Mensual',
                                                        'quarterly' => 'Trimestral (3 meses)',
                                                        'semiannual' => 'Semestral (6 meses)',
                                                        'annual' => 'Anual (12 meses)',
                                                        'biennial' => 'Bianual (24 meses)',
                                                    ])
                                                    ->required()
                                                    ->native(false)
                                                    ->reactive()
                                                    ->afterStateUpdated(function ($state, callable $set) {
                                                        $months = match ($state) {
                                                            'monthly' => 1,
                                                            'quarterly' => 3,
                                                            'semiannual' => 6,
                                                            'annual' => 12,
                                                            'biennial' => 24,
                                                            default => 1,
                                                        };
                                                        $set('billing_months', $months);
                                                        $set('billing_cycle_name_key', "billing.cycles.$state");
                                                    }),

                                                Hidden::make('billing_cycle_name_key'),

                                                TextInput::make('billing_months')
                                                    ->label('Meses')
                                                    ->numeric()
                                                    ->required()
                                                    ->minValue(1)
                                                    ->default(1)
                                                    ->helperText('Número de meses del ciclo'),

                                                TextInput::make('base_price')
                                                    ->label('Precio Base')
                                                    ->numeric()
                                                    ->required()
                                                    ->minValue(0)
                                                    ->prefix('$')
                                                    ->step(0.01)
                                                    ->helperText('Precio sin descuentos'),

                                                Select::make('currency')
                                                    ->label('Moneda')
                                                    ->options([
                                                        'USD' => 'USD ($)',
                                                        'EUR' => 'EUR (€)',
                                                        'GBP' => 'GBP (£)',
                                                    ])
                                                    ->default('USD')
                                                    ->required()
                                                    ->native(false),

                                                TextInput::make('upfront_discount_percentage')
                                                    ->label('Descuento Adelantado (%)')
                                                    ->numeric()
                                                    ->minValue(0)
                                                    ->maxValue(100)
                                                    ->default(0)
                                                    ->suffix('%')
                                                    ->helperText('Descuento por pago adelantado'),

                                                Toggle::make('has_autopay_discount')
                                                    ->label('Descuento Autopago')
                                                    ->default(false)
                                                    ->inline(false)
                                                    ->reactive(),

                                                Select::make('autopay_discount_type')
                                                    ->label('Tipo Descuento Autopago')
                                                    ->options([
                                                        'fixed' => 'Fijo ($)',
                                                        'percentage' => 'Porcentaje (%)',
                                                    ])
                                                    ->native(false)
                                                    ->visible(fn ($get) => $get('has_autopay_discount')),

                                                TextInput::make('autopay_discount_value')
                                                    ->label('Valor Descuento Autopago')
                                                    ->numeric()
                                                    ->minValue(0)
                                                    ->step(0.01)
                                                    ->helperText('Cantidad o porcentaje')
                                                    ->visible(fn ($get) => $get('has_autopay_discount')),

                                                TextInput::make('setup_fee')
                                                    ->label('Cuota Inicial')
                                                    ->numeric()
                                                    ->minValue(0)
                                                    ->default(0)
                                                    ->prefix('$')
                                                    ->step(0.01)
                                                    ->helperText('Pago único al iniciar'),

                                                TextInput::make('trial_days')
                                                    ->label('Días de Prueba')
                                                    ->numeric()
                                                    ->minValue(0)
                                                    ->default(0)
                                                    ->helperText('Días gratis antes de cobrar'),

                                                Toggle::make('is_default')
                                                    ->label('Opción por Defecto')
                                                    ->default(false)
                                                    ->inline(false)
                                                    ->helperText('Se mostrará seleccionada'),

                                                Toggle::make('is_popular')
                                                    ->label('Más Popular')
                                                    ->default(false)
                                                    ->inline(false)
                                                    ->helperText('Destacar como recomendada'),

                                                Toggle::make('is_active')
                                                    ->label('Activa')
                                                    ->default(true)
                                                    ->inline(false),

                                                TextInput::make('display_order')
                                                    ->label('Orden')
                                                    ->numeric()
                                                    ->minValue(0)
                                                    ->default(0)
                                                    ->helperText('Orden de visualización'),

                                                TextInput::make('description_key')
                                                    ->label('Clave Descripción')
                                                    ->maxLength(255)
                                                    ->placeholder('billing.descriptions.save_10_percent')
                                                    ->helperText('Clave de traducción')
                                                    ->columnSpanFull(),

                                                TextInput::make('highlight_text_key')
                                                    ->label('Clave Highlight')
                                                    ->maxLength(255)
                                                    ->placeholder('billing.highlights.most_popular')
                                                    ->helperText('Texto destacado')
                                                    ->columnSpanFull(),
                                            ])
                                            ->columns(3)
                                            ->itemLabel(function (array $state): ?string {
                                                if (! isset($state['billing_cycle_slug'])) {
                                                    return null;
                                                }
                                                $cycle = match ($state['billing_cycle_slug']) {
                                                    'monthly' => 'Mensual',
                                                    'quarterly' => 'Trimestral',
                                                    'semiannual' => 'Semestral',
                                                    'annual' => 'Anual',
                                                    'biennial' => 'Bianual',
                                                    default => ucfirst($state['billing_cycle_slug']),
                                                };
                                                $price = $state['base_price'] ?? 0;
                                                $badges = [];
                                                if ($state['is_default'] ?? false) {
                                                    $badges[] = '⭐';
                                                }
                                                if ($state['is_popular'] ?? false) {
                                                    $badges[] = '🔥';
                                                }
                                                $badgeStr = empty($badges) ? '' : ' '.implode(' ', $badges);

                                                return "$cycle - $$price$badgeStr";
                                            })
                                            ->collapsible()
                                            ->cloneable()
                                            ->reorderable()
                                            ->orderColumn('display_order')
                                            ->addActionLabel('Añadir Opción de Facturación')
                                            ->defaultItems(0)
                                            ->columnSpanFull(),
                                    ]),
                            ]),

                        Tabs\Tab::make('Features')
                            ->icon('heroicon-o-sparkles')
                            ->schema([
                                Section::make('Características del Plan')
                                    ->description('Selecciona y configura las features que incluye este plan')
                                    ->schema([
                                        Repeater::make('features')
                                            ->relationship('features')
                                            ->schema([
                                                Select::make('feature_id')
                                                    ->label('Feature')
                                                    ->options(function () {
                                                        return Feature::query()
                                                            ->orderBy('category')
                                                            ->orderBy('display_order')
                                                            ->get()
                                                            ->mapWithKeys(function ($feature) {
                                                                $category = $feature->category ? "[$feature->category] " : '';

                                                                return [$feature->id => $category.$feature->name()];
                                                            });
                                                    })
                                                    ->required()
                                                    ->searchable()
                                                    ->native(false)
                                                    ->disableOptionsWhenSelectedInSiblingRepeaterItems()
                                                    ->reactive()
                                                    ->afterStateUpdated(function ($state, callable $set) {
                                                        if ($state) {
                                                            $feature = static::getFeature($state);
                                                            if ($feature) {
                                                                // Set default is_enabled to true
                                                                $set('is_enabled', true);
                                                            }
                                                        }
                                                    }),

                                                Toggle::make('is_enabled')
                                                    ->label('Habilitada')
                                                    ->default(true)
                                                    ->inline(false)
                                                    ->helperText('Activar o desactivar esta feature para el plan'),

                                                TextInput::make('limit_value')
                                                    ->label('Límite')
                                                    ->numeric()
                                                    ->helperText('Límite numérico (null = ilimitado, 0 = desactivado)')
                                                    ->placeholder('null')
                                                    ->visible(function (callable $get) {
                                                        $featureId = $get('feature_id');
                                                        if (! $featureId) {
                                                            return false;
                                                        }
                                                        $feature = static::getFeature($featureId);

                                                        return $feature && $feature->value_type === 'integer';
                                                    }),

                                                TextInput::make('string_value')
                                                    ->label('Valor de Texto')
                                                    ->maxLength(255)
                                                    ->helperText('Valor de texto personalizado')
                                                    ->visible(function (callable $get) {
                                                        $featureId = $get('feature_id');
                                                        if (! $featureId) {
                                                            return false;
                                                        }
                                                        $feature = static::getFeature($featureId);

                                                        return $feature && $feature->value_type === 'string';
                                                    }),

                                                Textarea::make('json_value')
                                                    ->label('Valor JSON')
                                                    ->rows(3)
                                                    ->helperText('Objeto JSON con configuración compleja')
                                                    ->placeholder('{"key": "value"}')
                                                    ->visible(function (callable $get) {
                                                        $featureId = $get('feature_id');
                                                        if (! $featureId) {
                                                            return false;
                                                        }
                                                        $feature = static::getFeature($featureId);

                                                        return $feature && $feature->value_type === 'json';
                                                    }),

                                                Textarea::make('config')
                                                    ->label('Configuración Adicional')
                                                    ->rows(3)
                                                    ->helperText('JSON con configuración específica de esta feature')
                                                    ->placeholder('{"soft_limit": true, "warning_threshold": 0.8}')
                                                    ->columnSpanFull(),
                                            ])
                                            ->columns(2)
                                            ->itemLabel(function (array $state): ?string {
                                                if (! isset($state['feature_id'])) {
                                                    return null;
                                                }
                                                $feature = Feature::find($state['feature_id']);
                                                if (! $feature) {
                                                    return null;
                                                }
                                                $enabled = $state['is_enabled'] ?? true;
                                                $status = $enabled ? '✓' : '✗';

                                                return "$status {$feature->name()}";
                                            })
                                            ->collapsible()
                                            ->cloneable()
                                            ->reorderable(false)
                                            ->addActionLabel('Añadir Feature')
                                            ->defaultItems(0)
                                            ->columnSpanFull(),
                                    ]),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
