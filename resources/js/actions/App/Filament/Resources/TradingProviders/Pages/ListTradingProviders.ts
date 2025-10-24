import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\TradingProviders\Pages\ListTradingProviders::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/ListTradingProviders.php:7
 * @route '/admin/trading-providers'
 */
const ListTradingProviders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListTradingProviders.url(options),
    method: 'get',
})

ListTradingProviders.definition = {
    methods: ["get","head"],
    url: '/admin/trading-providers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\TradingProviders\Pages\ListTradingProviders::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/ListTradingProviders.php:7
 * @route '/admin/trading-providers'
 */
ListTradingProviders.url = (options?: RouteQueryOptions) => {
    return ListTradingProviders.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\TradingProviders\Pages\ListTradingProviders::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/ListTradingProviders.php:7
 * @route '/admin/trading-providers'
 */
ListTradingProviders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListTradingProviders.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\TradingProviders\Pages\ListTradingProviders::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/ListTradingProviders.php:7
 * @route '/admin/trading-providers'
 */
ListTradingProviders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListTradingProviders.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\TradingProviders\Pages\ListTradingProviders::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/ListTradingProviders.php:7
 * @route '/admin/trading-providers'
 */
    const ListTradingProvidersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListTradingProviders.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\TradingProviders\Pages\ListTradingProviders::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/ListTradingProviders.php:7
 * @route '/admin/trading-providers'
 */
        ListTradingProvidersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListTradingProviders.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\TradingProviders\Pages\ListTradingProviders::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/ListTradingProviders.php:7
 * @route '/admin/trading-providers'
 */
        ListTradingProvidersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListTradingProviders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListTradingProviders.form = ListTradingProvidersForm
export default ListTradingProviders