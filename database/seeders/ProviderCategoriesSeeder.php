<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProviderCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        $categories = [
            [
                'name' => 'ai',
                'display_name' => 'Inteligencia Artificial',
                'description' => 'Modelos y servicios de IA generativa.',
            ],
            [
                'name' => 'market_data',
                'display_name' => 'Datos de Mercado',
                'description' => 'Fuentes de datos financieros y bursatiles.',
            ],
            [
                'name' => 'news',
                'display_name' => 'Noticias',
                'description' => 'Agregadores y proveedores de noticias.',
            ],
            [
                'name' => 'trading',
                'display_name' => 'Trading',
                'description' => 'Plataformas y brokers con APIs de trading.',
            ],
        ];

        DB::table('provider_categories')->upsert(
            array_map(
                fn (array $category) => [
                    ...$category,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                $categories
            ),
            ['name'],
            ['display_name', 'description', 'updated_at']
        );
    }
}
