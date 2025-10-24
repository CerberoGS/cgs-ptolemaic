import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PlanChanges\Pages\ListPlanChanges::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/ListPlanChanges.php:7
 * @route '/admin/plan-changes'
 */
const ListPlanChanges = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListPlanChanges.url(options),
    method: 'get',
})

ListPlanChanges.definition = {
    methods: ["get","head"],
    url: '/admin/plan-changes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PlanChanges\Pages\ListPlanChanges::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/ListPlanChanges.php:7
 * @route '/admin/plan-changes'
 */
ListPlanChanges.url = (options?: RouteQueryOptions) => {
    return ListPlanChanges.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\PlanChanges\Pages\ListPlanChanges::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/ListPlanChanges.php:7
 * @route '/admin/plan-changes'
 */
ListPlanChanges.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListPlanChanges.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\PlanChanges\Pages\ListPlanChanges::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/ListPlanChanges.php:7
 * @route '/admin/plan-changes'
 */
ListPlanChanges.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListPlanChanges.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\PlanChanges\Pages\ListPlanChanges::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/ListPlanChanges.php:7
 * @route '/admin/plan-changes'
 */
    const ListPlanChangesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListPlanChanges.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\PlanChanges\Pages\ListPlanChanges::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/ListPlanChanges.php:7
 * @route '/admin/plan-changes'
 */
        ListPlanChangesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListPlanChanges.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\PlanChanges\Pages\ListPlanChanges::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/ListPlanChanges.php:7
 * @route '/admin/plan-changes'
 */
        ListPlanChangesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListPlanChanges.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListPlanChanges.form = ListPlanChangesForm
export default ListPlanChanges