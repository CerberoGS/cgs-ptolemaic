import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\TradingProviders\Pages\EditTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/EditTradingProvider.php:7
 * @route '/admin/trading-providers/{record}/edit'
 */
const EditTradingProvider = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditTradingProvider.url(args, options),
    method: 'get',
})

EditTradingProvider.definition = {
    methods: ["get","head"],
    url: '/admin/trading-providers/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\TradingProviders\Pages\EditTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/EditTradingProvider.php:7
 * @route '/admin/trading-providers/{record}/edit'
 */
EditTradingProvider.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditTradingProvider.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\TradingProviders\Pages\EditTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/EditTradingProvider.php:7
 * @route '/admin/trading-providers/{record}/edit'
 */
EditTradingProvider.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditTradingProvider.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\TradingProviders\Pages\EditTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/EditTradingProvider.php:7
 * @route '/admin/trading-providers/{record}/edit'
 */
EditTradingProvider.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditTradingProvider.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\TradingProviders\Pages\EditTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/EditTradingProvider.php:7
 * @route '/admin/trading-providers/{record}/edit'
 */
    const EditTradingProviderForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditTradingProvider.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\TradingProviders\Pages\EditTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/EditTradingProvider.php:7
 * @route '/admin/trading-providers/{record}/edit'
 */
        EditTradingProviderForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditTradingProvider.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\TradingProviders\Pages\EditTradingProvider::__invoke
 * @see app/Filament/Resources/TradingProviders/Pages/EditTradingProvider.php:7
 * @route '/admin/trading-providers/{record}/edit'
 */
        EditTradingProviderForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditTradingProvider.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditTradingProvider.form = EditTradingProviderForm
export default EditTradingProvider