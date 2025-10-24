import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\UserTradingStats\Pages\ListUserTradingStats::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/ListUserTradingStats.php:7
 * @route '/admin/user-trading-stats'
 */
const ListUserTradingStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListUserTradingStats.url(options),
    method: 'get',
})

ListUserTradingStats.definition = {
    methods: ["get","head"],
    url: '/admin/user-trading-stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\UserTradingStats\Pages\ListUserTradingStats::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/ListUserTradingStats.php:7
 * @route '/admin/user-trading-stats'
 */
ListUserTradingStats.url = (options?: RouteQueryOptions) => {
    return ListUserTradingStats.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\UserTradingStats\Pages\ListUserTradingStats::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/ListUserTradingStats.php:7
 * @route '/admin/user-trading-stats'
 */
ListUserTradingStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListUserTradingStats.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\UserTradingStats\Pages\ListUserTradingStats::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/ListUserTradingStats.php:7
 * @route '/admin/user-trading-stats'
 */
ListUserTradingStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListUserTradingStats.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\UserTradingStats\Pages\ListUserTradingStats::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/ListUserTradingStats.php:7
 * @route '/admin/user-trading-stats'
 */
    const ListUserTradingStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListUserTradingStats.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\UserTradingStats\Pages\ListUserTradingStats::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/ListUserTradingStats.php:7
 * @route '/admin/user-trading-stats'
 */
        ListUserTradingStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListUserTradingStats.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\UserTradingStats\Pages\ListUserTradingStats::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/ListUserTradingStats.php:7
 * @route '/admin/user-trading-stats'
 */
        ListUserTradingStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListUserTradingStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListUserTradingStats.form = ListUserTradingStatsForm
export default ListUserTradingStats