import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
 */
const ListReferrals = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListReferrals.url(options),
    method: 'get',
})

ListReferrals.definition = {
    methods: ["get","head"],
    url: '/admin/referrals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
 */
ListReferrals.url = (options?: RouteQueryOptions) => {
    return ListReferrals.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
 */
ListReferrals.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListReferrals.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
 */
ListReferrals.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListReferrals.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
 */
    const ListReferralsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListReferrals.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
 */
        ListReferralsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListReferrals.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
 */
        ListReferralsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListReferrals.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListReferrals.form = ListReferralsForm
export default ListReferrals