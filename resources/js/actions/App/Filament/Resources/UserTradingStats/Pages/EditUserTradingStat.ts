import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\UserTradingStats\Pages\EditUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/EditUserTradingStat.php:7
 * @route '/admin/user-trading-stats/{record}/edit'
 */
const EditUserTradingStat = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditUserTradingStat.url(args, options),
    method: 'get',
})

EditUserTradingStat.definition = {
    methods: ["get","head"],
    url: '/admin/user-trading-stats/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\UserTradingStats\Pages\EditUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/EditUserTradingStat.php:7
 * @route '/admin/user-trading-stats/{record}/edit'
 */
EditUserTradingStat.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditUserTradingStat.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\UserTradingStats\Pages\EditUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/EditUserTradingStat.php:7
 * @route '/admin/user-trading-stats/{record}/edit'
 */
EditUserTradingStat.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditUserTradingStat.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\UserTradingStats\Pages\EditUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/EditUserTradingStat.php:7
 * @route '/admin/user-trading-stats/{record}/edit'
 */
EditUserTradingStat.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditUserTradingStat.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\UserTradingStats\Pages\EditUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/EditUserTradingStat.php:7
 * @route '/admin/user-trading-stats/{record}/edit'
 */
    const EditUserTradingStatForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditUserTradingStat.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\UserTradingStats\Pages\EditUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/EditUserTradingStat.php:7
 * @route '/admin/user-trading-stats/{record}/edit'
 */
        EditUserTradingStatForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditUserTradingStat.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\UserTradingStats\Pages\EditUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/EditUserTradingStat.php:7
 * @route '/admin/user-trading-stats/{record}/edit'
 */
        EditUserTradingStatForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditUserTradingStat.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditUserTradingStat.form = EditUserTradingStatForm
export default EditUserTradingStat