<?php

namespace App\Filament\Resources\Users\Schemas;

use App\Models\PricingPlan;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Usuario')
                    ->tabs([
                        Tabs\Tab::make('Perfil')
                            ->icon('heroicon-o-user')
                            ->schema([
                                Section::make('Información Personal')
                                    ->description('Datos básicos del usuario')
                                    ->schema([
                                        TextInput::make('name')
                                            ->label('Nombre Completo')
                                            ->required()
                                            ->maxLength(255),
                                        TextInput::make('email')
                                            ->label('Correo Electrónico')
                                            ->email()
                                            ->required()
                                            ->unique(ignoreRecord: true)
                                            ->maxLength(255),
                                        TextInput::make('phone')
                                            ->label('Teléfono')
                                            ->tel()
                                            ->maxLength(20),
                                    ])
                                    ->columns(2),

                                Section::make('Seguridad')
                                    ->description('Contraseña y verificaciones')
                                    ->schema([
                                        TextInput::make('password')
                                            ->label('Contraseña')
                                            ->password()
                                            ->revealable()
                                            ->dehydrateStateUsing(fn ($state) => filled($state) ? bcrypt($state) : null)
                                            ->dehydrated(fn ($state) => filled($state))
                                            ->helperText('Dejar en blanco para mantener la contraseña actual'),
                                        DateTimePicker::make('email_verified_at')
                                            ->label('Email Verificado')
                                            ->seconds(false)
                                            ->helperText('Fecha en que se verificó el email'),
                                        DateTimePicker::make('phone_verified_at')
                                            ->label('Teléfono Verificado')
                                            ->seconds(false)
                                            ->helperText('Fecha en que se verificó el teléfono'),
                                    ])
                                    ->columns(2),
                            ]),

                        Tabs\Tab::make('Plan y Suscripción')
                            ->icon('heroicon-o-credit-card')
                            ->schema([
                                Section::make('Plan Actual')
                                    ->description('Configuración del plan del usuario')
                                    ->schema([
                                        Select::make('plan')
                                            ->label('Plan Activo')
                                            ->options(function () {
                                                return PricingPlan::where('is_active', true)
                                                    ->orderBy('display_order')
                                                    ->get()
                                                    ->mapWithKeys(function ($pricingPlan) {
                                                        return [$pricingPlan->slug => $pricingPlan->emoji.' '.$pricingPlan->name()];
                                                    });
                                            })
                                            ->default('free')
                                            ->required()
                                            ->helperText('Selecciona el plan del usuario. Solo se muestran planes activos.')
                                            ->native(false)
                                            ->columnSpanFull(),
                                        DateTimePicker::make('plan_started_at')
                                            ->label('Inicio del Plan')
                                            ->seconds(false)
                                            ->helperText('Fecha en que inició el plan actual'),
                                        DateTimePicker::make('plan_expires_at')
                                            ->label('Expiración del Plan')
                                            ->seconds(false)
                                            ->helperText('Fecha en que expira el plan (si aplica)'),
                                        DateTimePicker::make('trial_ends_at')
                                            ->label('Fin del Periodo de Prueba')
                                            ->seconds(false)
                                            ->helperText('Fecha en que termina el trial gratuito'),
                                        DateTimePicker::make('card_added_at')
                                            ->label('Tarjeta Agregada')
                                            ->seconds(false)
                                            ->helperText('Fecha en que el usuario agregó su tarjeta'),
                                    ])
                                    ->columns(2),

                                Section::make('Metadata')
                                    ->description('Información adicional del plan')
                                    ->schema([
                                        Textarea::make('plan_metadata')
                                            ->label('Metadata del Plan')
                                            ->rows(3)
                                            ->helperText('Información adicional sobre el plan (JSON)')
                                            ->columnSpanFull(),
                                    ])
                                    ->collapsible(),
                            ]),

                        Tabs\Tab::make('Autenticación')
                            ->icon('heroicon-o-shield-check')
                            ->schema([
                                Section::make('Google OAuth')
                                    ->description('Autenticación con Google')
                                    ->schema([
                                        TextInput::make('google_id')
                                            ->label('Google ID')
                                            ->disabled()
                                            ->helperText('ID de autenticación de Google (solo lectura)'),
                                    ]),

                                Section::make('Autenticación de Dos Factores')
                                    ->description('Configuración de 2FA')
                                    ->schema([
                                        Toggle::make('google2fa_enabled')
                                            ->label('2FA Google Habilitado')
                                            ->inline(false)
                                            ->helperText('Activar o desactivar autenticación de dos factores'),
                                        DateTimePicker::make('two_factor_confirmed_at')
                                            ->label('2FA Confirmado')
                                            ->seconds(false)
                                            ->disabled()
                                            ->helperText('Fecha de confirmación de 2FA'),
                                        Textarea::make('two_factor_secret')
                                            ->label('Secret 2FA')
                                            ->disabled()
                                            ->rows(2)
                                            ->helperText('Secreto de 2FA generado (solo lectura)')
                                            ->columnSpanFull(),
                                        Textarea::make('two_factor_recovery_codes')
                                            ->label('Códigos de Recuperación')
                                            ->disabled()
                                            ->rows(3)
                                            ->helperText('Códigos de respaldo para 2FA (solo lectura)')
                                            ->columnSpanFull(),
                                        Textarea::make('google2fa_secret')
                                            ->label('Secret Google 2FA (Alternativo)')
                                            ->disabled()
                                            ->rows(2)
                                            ->helperText('Secret alternativo de Google 2FA (solo lectura)')
                                            ->columnSpanFull(),
                                    ])
                                    ->columns(2),
                            ]),

                        Tabs\Tab::make('Afiliados')
                            ->icon('heroicon-o-users')
                            ->schema([
                                Section::make('Programa de Afiliados')
                                    ->description('Códigos y bonificaciones de referidos')
                                    ->schema([
                                        TextInput::make('affiliate_code')
                                            ->label('Código de Afiliado')
                                            ->maxLength(50)
                                            ->helperText('Código único del usuario para referir a otros'),
                                        TextInput::make('referred_by_code')
                                            ->label('Referido Por')
                                            ->maxLength(50)
                                            ->helperText('Código del afiliado que lo refirió'),
                                        TextInput::make('monthly_analysis_bonus')
                                            ->label('Bono Mensual de Análisis')
                                            ->numeric()
                                            ->default(0)
                                            ->minValue(0)
                                            ->suffix('análisis')
                                            ->helperText('Cantidad de análisis adicionales por mes'),
                                    ])
                                    ->columns(2),

                                Section::make('Descuentos de Afiliado')
                                    ->description('Descuentos aplicados por el programa')
                                    ->schema([
                                        TextInput::make('affiliate_discount_percentage')
                                            ->label('Descuento de Afiliado')
                                            ->numeric()
                                            ->default(0)
                                            ->minValue(0)
                                            ->maxValue(100)
                                            ->suffix('%')
                                            ->helperText('Porcentaje de descuento por ser afiliado'),
                                        DateTimePicker::make('affiliate_discount_expires_at')
                                            ->label('Expiración del Descuento')
                                            ->seconds(false)
                                            ->helperText('Fecha en que expira el descuento de afiliado'),
                                    ])
                                    ->columns(2),
                            ]),

                        Tabs\Tab::make('Integraciones')
                            ->icon('heroicon-o-link')
                            ->schema([
                                Section::make('Telegram')
                                    ->description('Integración con Telegram')
                                    ->schema([
                                        Toggle::make('telegram_enabled')
                                            ->label('Telegram Habilitado')
                                            ->inline(false)
                                            ->helperText('Activar o desactivar integración con Telegram'),
                                        TextInput::make('telegram_chat_id')
                                            ->label('Telegram Chat ID')
                                            ->maxLength(100)
                                            ->helperText('ID del chat de Telegram del usuario'),
                                    ])
                                    ->columns(2),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
