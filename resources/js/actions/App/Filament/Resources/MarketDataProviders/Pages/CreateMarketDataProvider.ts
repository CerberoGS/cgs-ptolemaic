import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\MarketDataProviders\Pages\CreateMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/CreateMarketDataProvider.php:7
 * @route '/admin/market-data-providers/create'
 */
const CreateMarketDataProvider = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateMarketDataProvider.url(options),
    method: 'get',
})

CreateMarketDataProvider.definition = {
    methods: ["get","head"],
    url: '/admin/market-data-providers/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\MarketDataProviders\Pages\CreateMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/CreateMarketDataProvider.php:7
 * @route '/admin/market-data-providers/create'
 */
CreateMarketDataProvider.url = (options?: RouteQueryOptions) => {
    return CreateMarketDataProvider.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\MarketDataProviders\Pages\CreateMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/CreateMarketDataProvider.php:7
 * @route '/admin/market-data-providers/create'
 */
CreateMarketDataProvider.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateMarketDataProvider.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\MarketDataProviders\Pages\CreateMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/CreateMarketDataProvider.php:7
 * @route '/admin/market-data-providers/create'
 */
CreateMarketDataProvider.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateMarketDataProvider.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\MarketDataProviders\Pages\CreateMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/CreateMarketDataProvider.php:7
 * @route '/admin/market-data-providers/create'
 */
    const CreateMarketDataProviderForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateMarketDataProvider.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\MarketDataProviders\Pages\CreateMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/CreateMarketDataProvider.php:7
 * @route '/admin/market-data-providers/create'
 */
        CreateMarketDataProviderForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateMarketDataProvider.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\MarketDataProviders\Pages\CreateMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/CreateMarketDataProvider.php:7
 * @route '/admin/market-data-providers/create'
 */
        CreateMarketDataProviderForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateMarketDataProvider.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateMarketDataProvider.form = CreateMarketDataProviderForm
export default CreateMarketDataProvider