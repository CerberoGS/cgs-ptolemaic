import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\MarketDataProviders\Pages\ListMarketDataProviders::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/ListMarketDataProviders.php:7
 * @route '/admin/market-data-providers'
 */
const ListMarketDataProviders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListMarketDataProviders.url(options),
    method: 'get',
})

ListMarketDataProviders.definition = {
    methods: ["get","head"],
    url: '/admin/market-data-providers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\MarketDataProviders\Pages\ListMarketDataProviders::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/ListMarketDataProviders.php:7
 * @route '/admin/market-data-providers'
 */
ListMarketDataProviders.url = (options?: RouteQueryOptions) => {
    return ListMarketDataProviders.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\MarketDataProviders\Pages\ListMarketDataProviders::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/ListMarketDataProviders.php:7
 * @route '/admin/market-data-providers'
 */
ListMarketDataProviders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListMarketDataProviders.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\MarketDataProviders\Pages\ListMarketDataProviders::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/ListMarketDataProviders.php:7
 * @route '/admin/market-data-providers'
 */
ListMarketDataProviders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListMarketDataProviders.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\MarketDataProviders\Pages\ListMarketDataProviders::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/ListMarketDataProviders.php:7
 * @route '/admin/market-data-providers'
 */
    const ListMarketDataProvidersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListMarketDataProviders.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\MarketDataProviders\Pages\ListMarketDataProviders::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/ListMarketDataProviders.php:7
 * @route '/admin/market-data-providers'
 */
        ListMarketDataProvidersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListMarketDataProviders.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\MarketDataProviders\Pages\ListMarketDataProviders::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/ListMarketDataProviders.php:7
 * @route '/admin/market-data-providers'
 */
        ListMarketDataProvidersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListMarketDataProviders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListMarketDataProviders.form = ListMarketDataProvidersForm
export default ListMarketDataProviders