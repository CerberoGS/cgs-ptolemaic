import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\UserTradingStats\Pages\CreateUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/CreateUserTradingStat.php:7
 * @route '/admin/user-trading-stats/create'
 */
const CreateUserTradingStat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateUserTradingStat.url(options),
    method: 'get',
})

CreateUserTradingStat.definition = {
    methods: ["get","head"],
    url: '/admin/user-trading-stats/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\UserTradingStats\Pages\CreateUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/CreateUserTradingStat.php:7
 * @route '/admin/user-trading-stats/create'
 */
CreateUserTradingStat.url = (options?: RouteQueryOptions) => {
    return CreateUserTradingStat.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\UserTradingStats\Pages\CreateUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/CreateUserTradingStat.php:7
 * @route '/admin/user-trading-stats/create'
 */
CreateUserTradingStat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateUserTradingStat.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\UserTradingStats\Pages\CreateUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/CreateUserTradingStat.php:7
 * @route '/admin/user-trading-stats/create'
 */
CreateUserTradingStat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateUserTradingStat.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\UserTradingStats\Pages\CreateUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/CreateUserTradingStat.php:7
 * @route '/admin/user-trading-stats/create'
 */
    const CreateUserTradingStatForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateUserTradingStat.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\UserTradingStats\Pages\CreateUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/CreateUserTradingStat.php:7
 * @route '/admin/user-trading-stats/create'
 */
        CreateUserTradingStatForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateUserTradingStat.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\UserTradingStats\Pages\CreateUserTradingStat::__invoke
 * @see app/Filament/Resources/UserTradingStats/Pages/CreateUserTradingStat.php:7
 * @route '/admin/user-trading-stats/create'
 */
        CreateUserTradingStatForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateUserTradingStat.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateUserTradingStat.form = CreateUserTradingStatForm
export default CreateUserTradingStat