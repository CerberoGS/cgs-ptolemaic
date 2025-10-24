import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\TradingProviders\Pages\CreateTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/CreateTradingProvider.php:7
 * @route '/admin/trading-providers/create'
 */
const CreateTradingProvider = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateTradingProvider.url(options),
    method: 'get',
})

CreateTradingProvider.definition = {
    methods: ["get","head"],
    url: '/admin/trading-providers/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\TradingProviders\Pages\CreateTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/CreateTradingProvider.php:7
 * @route '/admin/trading-providers/create'
 */
CreateTradingProvider.url = (options?: RouteQueryOptions) => {
    return CreateTradingProvider.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\TradingProviders\Pages\CreateTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/CreateTradingProvider.php:7
 * @route '/admin/trading-providers/create'
 */
CreateTradingProvider.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateTradingProvider.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\TradingProviders\Pages\CreateTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/CreateTradingProvider.php:7
 * @route '/admin/trading-providers/create'
 */
CreateTradingProvider.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateTradingProvider.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\TradingProviders\Pages\CreateTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/CreateTradingProvider.php:7
 * @route '/admin/trading-providers/create'
 */
    const CreateTradingProviderForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateTradingProvider.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\TradingProviders\Pages\CreateTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/CreateTradingProvider.php:7
 * @route '/admin/trading-providers/create'
 */
        CreateTradingProviderForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateTradingProvider.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\TradingProviders\Pages\CreateTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/CreateTradingProvider.php:7
 * @route '/admin/trading-providers/create'
 */
        CreateTradingProviderForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateTradingProvider.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateTradingProvider.form = CreateTradingProviderForm
export default CreateTradingProvider