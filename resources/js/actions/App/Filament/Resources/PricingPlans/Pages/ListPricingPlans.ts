import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PricingPlans\Pages\ListPricingPlans::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/ListPricingPlans.php:7
 * @route '/admin/pricing-plans'
 */
const ListPricingPlans = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListPricingPlans.url(options),
    method: 'get',
})

ListPricingPlans.definition = {
    methods: ["get","head"],
    url: '/admin/pricing-plans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PricingPlans\Pages\ListPricingPlans::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/ListPricingPlans.php:7
 * @route '/admin/pricing-plans'
 */
ListPricingPlans.url = (options?: RouteQueryOptions) => {
    return ListPricingPlans.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\PricingPlans\Pages\ListPricingPlans::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/ListPricingPlans.php:7
 * @route '/admin/pricing-plans'
 */
ListPricingPlans.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListPricingPlans.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\PricingPlans\Pages\ListPricingPlans::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/ListPricingPlans.php:7
 * @route '/admin/pricing-plans'
 */
ListPricingPlans.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListPricingPlans.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\PricingPlans\Pages\ListPricingPlans::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/ListPricingPlans.php:7
 * @route '/admin/pricing-plans'
 */
    const ListPricingPlansForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListPricingPlans.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\PricingPlans\Pages\ListPricingPlans::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/ListPricingPlans.php:7
 * @route '/admin/pricing-plans'
 */
        ListPricingPlansForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListPricingPlans.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\PricingPlans\Pages\ListPricingPlans::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/ListPricingPlans.php:7
 * @route '/admin/pricing-plans'
 */
        ListPricingPlansForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListPricingPlans.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListPricingPlans.form = ListPricingPlansForm
export default ListPricingPlans