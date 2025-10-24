import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Feedback\Pages\EditFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/EditFeedback.php:7
 * @route '/admin/feedback/{record}/edit'
 */
const EditFeedback = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditFeedback.url(args, options),
    method: 'get',
})

EditFeedback.definition = {
    methods: ["get","head"],
    url: '/admin/feedback/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Feedback\Pages\EditFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/EditFeedback.php:7
 * @route '/admin/feedback/{record}/edit'
 */
EditFeedback.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditFeedback.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Feedback\Pages\EditFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/EditFeedback.php:7
 * @route '/admin/feedback/{record}/edit'
 */
EditFeedback.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditFeedback.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Feedback\Pages\EditFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/EditFeedback.php:7
 * @route '/admin/feedback/{record}/edit'
 */
EditFeedback.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditFeedback.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Feedback\Pages\EditFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/EditFeedback.php:7
 * @route '/admin/feedback/{record}/edit'
 */
    const EditFeedbackForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditFeedback.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Feedback\Pages\EditFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/EditFeedback.php:7
 * @route '/admin/feedback/{record}/edit'
 */
        EditFeedbackForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditFeedback.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Feedback\Pages\EditFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/EditFeedback.php:7
 * @route '/admin/feedback/{record}/edit'
 */
        EditFeedbackForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditFeedback.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditFeedback.form = EditFeedbackForm
export default EditFeedback