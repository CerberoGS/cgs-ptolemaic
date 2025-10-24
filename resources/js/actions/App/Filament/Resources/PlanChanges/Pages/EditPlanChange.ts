import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PlanChanges\Pages\EditPlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/EditPlanChange.php:7
 * @route '/admin/plan-changes/{record}/edit'
 */
const EditPlanChange = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditPlanChange.url(args, options),
    method: 'get',
})

EditPlanChange.definition = {
    methods: ["get","head"],
    url: '/admin/plan-changes/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PlanChanges\Pages\EditPlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/EditPlanChange.php:7
 * @route '/admin/plan-changes/{record}/edit'
 */
EditPlanChange.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditPlanChange.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\PlanChanges\Pages\EditPlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/EditPlanChange.php:7
 * @route '/admin/plan-changes/{record}/edit'
 */
EditPlanChange.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditPlanChange.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\PlanChanges\Pages\EditPlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/EditPlanChange.php:7
 * @route '/admin/plan-changes/{record}/edit'
 */
EditPlanChange.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditPlanChange.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\PlanChanges\Pages\EditPlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/EditPlanChange.php:7
 * @route '/admin/plan-changes/{record}/edit'
 */
    const EditPlanChangeForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditPlanChange.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\PlanChanges\Pages\EditPlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/EditPlanChange.php:7
 * @route '/admin/plan-changes/{record}/edit'
 */
        EditPlanChangeForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditPlanChange.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\PlanChanges\Pages\EditPlanChange::__invoke
 * @see app/Filament/Resources/PlanChanges/Pages/EditPlanChange.php:7
 * @route '/admin/plan-changes/{record}/edit'
 */
        EditPlanChangeForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditPlanChange.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditPlanChange.form = EditPlanChangeForm
export default EditPlanChange