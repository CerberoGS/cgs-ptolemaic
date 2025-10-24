<?php

namespace App\Filament\Pages;

use App\Filament\Resources\AiProviders\Tables\AiProvidersTable;
use App\Filament\Resources\MarketDataProviders\Tables\MarketDataProvidersTable;
use App\Filament\Resources\NewsProviders\Tables\NewsProvidersTable;
use App\Filament\Resources\TradingProviders\Tables\TradingProvidersTable;
use App\Models\AiProvider;
use App\Models\MarketDataProvider;
use App\Models\NewsProvider;
use App\Models\TradingProvider;
use BackedEnum;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Concerns\InteractsWithTable;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use UnitEnum;

class ProvidersManager extends Page implements HasTable
{
    use InteractsWithTable;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedSquaresPlus;

    protected string $view = 'filament.pages.providers-manager';

    protected static ?string $navigationLabel = 'Proveedores';

    protected static string|UnitEnum|null $navigationGroup = 'Integraciones';

    protected static ?int $navigationSort = 30;

    public string $activeTab = 'ai';

    public function mount(): void
    {
        $this->activeTab = $this->resolveTab(request()->query('tab', $this->activeTab));

        $this->mountInteractsWithTable();
    }

    public function setActiveTab(string $tab): void
    {
        $this->activeTab = $this->resolveTab($tab);

        $this->resetTable();
    }

    public function table(Table $table): Table
    {
        $table = $table
            ->query($this->getActiveQuery())
            ->defaultPaginationPageOption(10)
            ->paginated([10, 25, 50]);

        return match ($this->activeTab) {
            'ai' => AiProvidersTable::configure($table),
            'trading' => TradingProvidersTable::configure($table),
            'news' => NewsProvidersTable::configure($table),
            'market-data' => MarketDataProvidersTable::configure($table),
        };
    }

    /**
     * @return array<string, array<string, string>>
     */
    public function getTabs(): array
    {
        return [
            'ai' => [
                'label' => 'AI Providers',
                'description' => 'Modelos y servicios conectados a la IA principal.',
                'createRoute' => route('filament.admin.resources.ai-providers.create'),
            ],
            'trading' => [
                'label' => 'Trading Providers',
                'description' => 'Brokers y conectores de trading automatizado.',
                'createRoute' => route('filament.admin.resources.trading-providers.create'),
            ],
            'news' => [
                'label' => 'News Providers',
                'description' => 'Fuentes de noticias y sentimiento de mercado.',
                'createRoute' => route('filament.admin.resources.news-providers.create'),
            ],
            'market-data' => [
                'label' => 'Market Data Providers',
                'description' => 'Mercados y proveedores de datos financieros.',
                'createRoute' => route('filament.admin.resources.market-data-providers.create'),
            ],
        ];
    }

    public function getHeading(): string
    {
        return 'Gestión de Proveedores';
    }

    /**
     * @return array<string, string>
     */
    public function getBreadcrumbs(): array
    {
        return [
            route('filament.admin.pages.providers-manager') => 'Proveedores',
        ];
    }

    protected function resolveTab(string $tab): string
    {
        return array_key_exists($tab, $this->getTabs()) ? $tab : 'ai';
    }

    protected function getActiveQuery(): Builder
    {
        return match ($this->activeTab) {
            'ai' => AiProvider::query()->latest('created_at'),
            'trading' => TradingProvider::query()->latest('created_at'),
            'news' => NewsProvider::query()->latest('created_at'),
            'market-data' => MarketDataProvider::query()->latest('created_at'),
        };
    }
}
