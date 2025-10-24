import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PlanChanges\Pages\CreatePlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/CreatePlanChange.php:7
 * @route '/admin/plan-changes/create'
 */
const CreatePlanChange = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePlanChange.url(options),
    method: 'get',
})

CreatePlanChange.definition = {
    methods: ["get","head"],
    url: '/admin/plan-changes/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PlanChanges\Pages\CreatePlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/CreatePlanChange.php:7
 * @route '/admin/plan-changes/create'
 */
CreatePlanChange.url = (options?: RouteQueryOptions) => {
    return CreatePlanChange.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\PlanChanges\Pages\CreatePlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/CreatePlanChange.php:7
 * @route '/admin/plan-changes/create'
 */
CreatePlanChange.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePlanChange.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\PlanChanges\Pages\CreatePlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/CreatePlanChange.php:7
 * @route '/admin/plan-changes/create'
 */
CreatePlanChange.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreatePlanChange.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\PlanChanges\Pages\CreatePlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/CreatePlanChange.php:7
 * @route '/admin/plan-changes/create'
 */
    const CreatePlanChangeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreatePlanChange.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\PlanChanges\Pages\CreatePlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/CreatePlanChange.php:7
 * @route '/admin/plan-changes/create'
 */
        CreatePlanChangeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreatePlanChange.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\PlanChanges\Pages\CreatePlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/CreatePlanChange.php:7
 * @route '/admin/plan-changes/create'
 */
        CreatePlanChangeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreatePlanChange.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreatePlanChange.form = CreatePlanChangeForm
export default CreatePlanChange