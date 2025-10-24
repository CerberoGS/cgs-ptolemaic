<?php

namespace App\Filament\Resources\PricingPlans\Tables;

use App\Models\PricingPlan;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class PricingPlansTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('slug')
                    ->label('Plan')
                    ->formatStateUsing(function ($record) {
                        return $record->emoji.' '.$record->name();
                    })
                    ->badge()
                    ->color(fn ($record) => $record->accent_color ?? 'gray')
                    ->searchable()
                    ->sortable(),

                IconColumn::make('is_active')
                    ->label('Activo')
                    ->boolean()
                    ->sortable(),

                IconColumn::make('is_public')
                    ->label('Público')
                    ->boolean()
                    ->sortable(),

                IconColumn::make('is_featured')
                    ->label('Destacado')
                    ->boolean()
                    ->sortable(),

                TextColumn::make('display_order')
                    ->label('Orden')
                    ->numeric()
                    ->sortable(),

                TextColumn::make('billing_options_count')
                    ->label('Opciones de Pago')
                    ->counts('billingOptions')
                    ->badge()
                    ->color('success')
                    ->sortable()
                    ->description(fn ($record) => $record->billingOptions->pluck('billing_cycle_slug')->join(', ') ?: 'Sin opciones'),

                TextColumn::make('features_count')
                    ->label('Features')
                    ->counts('features')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('created_at')
                    ->label('Creado')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->label('Actualizado')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('slug')
                    ->label('Tipo de Plan')
                    ->options(function () {
                        return PricingPlan::all()
                            ->mapWithKeys(fn ($plan) => [$plan->slug => $plan->emoji.' '.$plan->name()]);
                    })
                    ->placeholder('Todos los planes'),

                TernaryFilter::make('is_active')
                    ->label('Estado')
                    ->placeholder('Todos')
                    ->trueLabel('Solo activos')
                    ->falseLabel('Solo inactivos'),

                TernaryFilter::make('is_public')
                    ->label('Visibilidad')
                    ->placeholder('Todos')
                    ->trueLabel('Solo públicos')
                    ->falseLabel('Solo privados'),
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
