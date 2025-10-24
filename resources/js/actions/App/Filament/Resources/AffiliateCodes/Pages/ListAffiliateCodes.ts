import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\AffiliateCodes\Pages\ListAffiliateCodes::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/ListAffiliateCodes.php:7
 * @route '/admin/affiliate-codes'
 */
const ListAffiliateCodes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListAffiliateCodes.url(options),
    method: 'get',
})

ListAffiliateCodes.definition = {
    methods: ["get","head"],
    url: '/admin/affiliate-codes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\AffiliateCodes\Pages\ListAffiliateCodes::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/ListAffiliateCodes.php:7
 * @route '/admin/affiliate-codes'
 */
ListAffiliateCodes.url = (options?: RouteQueryOptions) => {
    return ListAffiliateCodes.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\AffiliateCodes\Pages\ListAffiliateCodes::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/ListAffiliateCodes.php:7
 * @route '/admin/affiliate-codes'
 */
ListAffiliateCodes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListAffiliateCodes.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\AffiliateCodes\Pages\ListAffiliateCodes::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/ListAffiliateCodes.php:7
 * @route '/admin/affiliate-codes'
 */
ListAffiliateCodes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListAffiliateCodes.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\AffiliateCodes\Pages\ListAffiliateCodes::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/ListAffiliateCodes.php:7
 * @route '/admin/affiliate-codes'
 */
    const ListAffiliateCodesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListAffiliateCodes.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\AffiliateCodes\Pages\ListAffiliateCodes::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/ListAffiliateCodes.php:7
 * @route '/admin/affiliate-codes'
 */
        ListAffiliateCodesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListAffiliateCodes.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\AffiliateCodes\Pages\ListAffiliateCodes::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/ListAffiliateCodes.php:7
 * @route '/admin/affiliate-codes'
 */
        ListAffiliateCodesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListAffiliateCodes.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListAffiliateCodes.form = ListAffiliateCodesForm
export default ListAffiliateCodes