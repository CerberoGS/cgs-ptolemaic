import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\AffiliateRewards\Pages\ListAffiliateRewards::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/ListAffiliateRewards.php:7
 * @route '/admin/affiliate-rewards'
 */
const ListAffiliateRewards = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListAffiliateRewards.url(options),
    method: 'get',
})

ListAffiliateRewards.definition = {
    methods: ["get","head"],
    url: '/admin/affiliate-rewards',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\AffiliateRewards\Pages\ListAffiliateRewards::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/ListAffiliateRewards.php:7
 * @route '/admin/affiliate-rewards'
 */
ListAffiliateRewards.url = (options?: RouteQueryOptions) => {
    return ListAffiliateRewards.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\AffiliateRewards\Pages\ListAffiliateRewards::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/ListAffiliateRewards.php:7
 * @route '/admin/affiliate-rewards'
 */
ListAffiliateRewards.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListAffiliateRewards.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\AffiliateRewards\Pages\ListAffiliateRewards::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/ListAffiliateRewards.php:7
 * @route '/admin/affiliate-rewards'
 */
ListAffiliateRewards.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListAffiliateRewards.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\AffiliateRewards\Pages\ListAffiliateRewards::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/ListAffiliateRewards.php:7
 * @route '/admin/affiliate-rewards'
 */
    const ListAffiliateRewardsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListAffiliateRewards.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\AffiliateRewards\Pages\ListAffiliateRewards::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/ListAffiliateRewards.php:7
 * @route '/admin/affiliate-rewards'
 */
        ListAffiliateRewardsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListAffiliateRewards.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\AffiliateRewards\Pages\ListAffiliateRewards::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/ListAffiliateRewards.php:7
 * @route '/admin/affiliate-rewards'
 */
        ListAffiliateRewardsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListAffiliateRewards.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListAffiliateRewards.form = ListAffiliateRewardsForm
export default ListAffiliateRewards