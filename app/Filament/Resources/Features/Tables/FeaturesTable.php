<?php

namespace App\Filament\Resources\Features\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class FeaturesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('key')
                    ->label('Clave')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->copyMessage('Clave copiada')
                    ->tooltip('Clic para copiar'),

                TextColumn::make('name_key')
                    ->label('Nombre')
                    ->formatStateUsing(fn ($record) => $record->name())
                    ->searchable()
                    ->sortable()
                    ->description(fn ($record) => $record->description() ?: null),

                TextColumn::make('category')
                    ->label('Categoría')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'analytics' => 'info',
                        'limits' => 'warning',
                        'integrations' => 'success',
                        'support' => 'purple',
                        'journal' => 'cyan',
                        'automation' => 'amber',
                        'team' => 'blue',
                        'access' => 'gray',
                        default => 'gray',
                    })
                    ->sortable(),

                TextColumn::make('value_type')
                    ->label('Tipo')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'boolean' => 'success',
                        'integer' => 'info',
                        'string' => 'warning',
                        'json' => 'purple',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'boolean' => 'Boolean',
                        'integer' => 'Integer',
                        'string' => 'String',
                        'json' => 'JSON',
                        default => $state,
                    })
                    ->sortable(),

                TextColumn::make('plans_count')
                    ->label('Planes')
                    ->counts('plans')
                    ->badge()
                    ->color('gray')
                    ->tooltip('Número de planes que tienen esta feature'),

                IconColumn::make('is_visible')
                    ->label('Visible')
                    ->boolean()
                    ->tooltip('Visible en página pública de pricing'),

                TextColumn::make('display_order')
                    ->label('Orden')
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('created_at')
                    ->label('Creado')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('category')
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
                    ]),

                SelectFilter::make('value_type')
                    ->label('Tipo de Valor')
                    ->options([
                        'boolean' => 'Boolean',
                        'integer' => 'Integer',
                        'string' => 'String',
                        'json' => 'JSON',
                    ]),

                SelectFilter::make('is_visible')
                    ->label('Visibilidad')
                    ->options([
                        1 => 'Visible',
                        0 => 'Oculto',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('display_order', 'asc');
    }
}
