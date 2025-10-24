import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PricingPlans\Pages\CreatePricingPlan::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/CreatePricingPlan.php:7
 * @route '/admin/pricing-plans/create'
 */
const CreatePricingPlan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePricingPlan.url(options),
    method: 'get',
})

CreatePricingPlan.definition = {
    methods: ["get","head"],
    url: '/admin/pricing-plans/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PricingPlans\Pages\CreatePricingPlan::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/CreatePricingPlan.php:7
 * @route '/admin/pricing-plans/create'
 */
CreatePricingPlan.url = (options?: RouteQueryOptions) => {
    return CreatePricingPlan.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\PricingPlans\Pages\CreatePricingPlan::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/CreatePricingPlan.php:7
 * @route '/admin/pricing-plans/create'
 */
CreatePricingPlan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePricingPlan.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\PricingPlans\Pages\CreatePricingPlan::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/CreatePricingPlan.php:7
 * @route '/admin/pricing-plans/create'
 */
CreatePricingPlan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreatePricingPlan.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\PricingPlans\Pages\CreatePricingPlan::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/CreatePricingPlan.php:7
 * @route '/admin/pricing-plans/create'
 */
    const CreatePricingPlanForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreatePricingPlan.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\PricingPlans\Pages\CreatePricingPlan::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/CreatePricingPlan.php:7
 * @route '/admin/pricing-plans/create'
 */
        CreatePricingPlanForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreatePricingPlan.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\PricingPlans\Pages\CreatePricingPlan::__invoke
 * @see app/Filament/Resources/PricingPlans/Pages/CreatePricingPlan.php:7
 * @route '/admin/pricing-plans/create'
 */
        CreatePricingPlanForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreatePricingPlan.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreatePricingPlan.form = CreatePricingPlanForm
export default CreatePricingPlan