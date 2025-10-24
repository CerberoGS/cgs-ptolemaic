<?php

namespace App\Filament\Resources\Features\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class FeatureForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Información Básica')
                    ->description('Identificación y descripción de la feature')
                    ->schema([
                        TextInput::make('key')
                            ->label('Clave Única')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(100)
                            ->helperText('Identificador único de la feature (ej: ai_analytics, daily_limit)')
                            ->placeholder('ai_analytics')
                            ->rules(['alpha_dash']),

                        TextInput::make('name_key')
                            ->label('Clave de Traducción del Nombre')
                            ->required()
                            ->maxLength(255)
                            ->helperText('Ej: features.labels.ai_analytics')
                            ->placeholder('features.labels.nombre_feature'),

                        TextInput::make('description_key')
                            ->label('Clave de Traducción de la Descripción')
                            ->maxLength(255)
                            ->helperText('Ej: features.descriptions.ai_analytics')
                            ->placeholder('features.descriptions.nombre_feature')
                            ->columnSpanFull(),

                        Select::make('category')
                            ->label('Categoría')
                            ->options([
                                'analytics' => 'Analytics',
                                'limits' => 'Límites',
                                'integrations' => 'Integraciones',
                                'support' => 'Soporte',
                                'journal' => 'Journal',
                                'automation' => 'Automatización',
                                'team' => 'Equipo',
                                'access' => 'Acceso',
                            ])
                            ->helperText('Categoría para agrupar features')
                            ->native(false),

                        TextInput::make('icon')
                            ->label('Ícono')
                            ->maxLength(255)
                            ->helperText('Nombre de ícono Heroicon o emoji')
                            ->placeholder('heroicon-o-sparkles'),
                    ])
                    ->columns(2),

                Section::make('Tipo de Valor')
                    ->description('Define cómo se almacenará el valor de esta feature')
                    ->schema([
                        Select::make('value_type')
                            ->label('Tipo de Valor')
                            ->options([
                                'boolean' => 'Boolean (Sí/No)',
                                'integer' => 'Integer (Número entero)',
                                'string' => 'String (Texto)',
                                'json' => 'JSON (Objeto complejo)',
                            ])
                            ->required()
                            ->helperText('Tipo de valor que almacena esta feature')
                            ->native(false)
                            ->reactive(),

                        Textarea::make('default_value')
                            ->label('Valor por Defecto')
                            ->rows(2)
                            ->helperText('Valor por defecto cuando no está configurado en el plan')
                            ->placeholder('null, 0, "", {}')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Visualización')
                    ->description('Configuración de cómo se muestra la feature')
                    ->schema([
                        Toggle::make('is_visible')
                            ->label('Visible en Página Pública')
                            ->helperText('Si está visible en la página de pricing público')
                            ->default(true)
                            ->inline(false),

                        TextInput::make('display_order')
                            ->label('Orden de Visualización')
                            ->numeric()
                            ->minValue(0)
                            ->default(0)
                            ->helperText('Orden en que aparece (menor primero)'),
                    ])
                    ->columns(2),
            ]);
    }
}
