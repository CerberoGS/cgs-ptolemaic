<?php

namespace App\Enums;

enum ProviderType: string
{
    case Ai = 'ai';
    case MarketData = 'market_data';
    case News = 'news';
    case Trading = 'trading';

    /**
     * @return class-string<\Illuminate\Database\Eloquent\Model>
     */
    public function modelClass(): string
    {
        return match ($this) {
            self::Ai => \App\Models\AiProvider::class,
            self::MarketData => \App\Models\MarketDataProvider::class,
            self::News => \App\Models\NewsProvider::class,
            self::Trading => \App\Models\TradingProvider::class,
        };
    }

    public function categoryName(): string
    {
        return $this->value;
    }

    public function table(): string
    {
        return match ($this) {
            self::Ai => 'ai_providers',
            self::MarketData => 'market_data_providers',
            self::News => 'news_providers',
            self::Trading => 'trading_providers',
        };
    }

    /**
     * @return list<string>
     */
    public function fillableAttributes(): array
    {
        return match ($this) {
            self::Ai => [
                'provider_category_id',
                'slug',
                'display_name',
                'description',
                'base_url',
                'docs_url',
                'verification_endpoint',
                'test_json',
                'ops_json',
                'requires_organization',
                'status',
            ],
            self::MarketData => [
                'provider_category_id',
                'slug',
                'display_name',
                'description',
                'base_url',
                'docs_url',
                'verification_endpoint',
                'test_json',
                'ops_json',
                'data_frequency',
                'rate_limit_per_minute',
                'supports_historical',
                'status',
            ],
            self::News => [
                'provider_category_id',
                'slug',
                'display_name',
                'description',
                'base_url',
                'docs_url',
                'verification_endpoint',
                'test_json',
                'ops_json',
                'category_filters',
                'language_support',
                'webhook_support',
                'status',
            ],
            self::Trading => [
                'provider_category_id',
                'slug',
                'display_name',
                'description',
                'base_url',
                'docs_url',
                'verification_endpoint',
                'test_json',
                'ops_json',
                'supports_paper_trading',
                'market_types',
                'requires_two_factor',
                'status',
            ],
        };
    }
}
