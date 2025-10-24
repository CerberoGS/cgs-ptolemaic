import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\MarketDataProviders\Pages\EditMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/EditMarketDataProvider.php:7
 * @route '/admin/market-data-providers/{record}/edit'
 */
const EditMarketDataProvider = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditMarketDataProvider.url(args, options),
    method: 'get',
})

EditMarketDataProvider.definition = {
    methods: ["get","head"],
    url: '/admin/market-data-providers/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\MarketDataProviders\Pages\EditMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/EditMarketDataProvider.php:7
 * @route '/admin/market-data-providers/{record}/edit'
 */
EditMarketDataProvider.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return EditMarketDataProvider.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\MarketDataProviders\Pages\EditMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/EditMarketDataProvider.php:7
 * @route '/admin/market-data-providers/{record}/edit'
 */
EditMarketDataProvider.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditMarketDataProvider.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\MarketDataProviders\Pages\EditMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/EditMarketDataProvider.php:7
 * @route '/admin/market-data-providers/{record}/edit'
 */
EditMarketDataProvider.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditMarketDataProvider.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\MarketDataProviders\Pages\EditMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/EditMarketDataProvider.php:7
 * @route '/admin/market-data-providers/{record}/edit'
 */
    const EditMarketDataProviderForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditMarketDataProvider.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\MarketDataProviders\Pages\EditMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/EditMarketDataProvider.php:7
 * @route '/admin/market-data-providers/{record}/edit'
 */
        EditMarketDataProviderForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditMarketDataProvider.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\MarketDataProviders\Pages\EditMarketDataProvider::__invoke
 * @see app/Filament/Resources/MarketDataProviders/Pages/EditMarketDataProvider.php:7
 * @route '/admin/market-data-providers/{record}/edit'
 */
        EditMarketDataProviderForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditMarketDataProvider.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditMarketDataProvider.form = EditMarketDataProviderForm
export default EditMarketDataProvider