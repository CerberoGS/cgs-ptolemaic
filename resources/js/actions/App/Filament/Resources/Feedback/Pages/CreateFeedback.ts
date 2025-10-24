import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Feedback\Pages\CreateFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/CreateFeedback.php:7
 * @route '/admin/feedback/create'
 */
const CreateFeedback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateFeedback.url(options),
    method: 'get',
})

CreateFeedback.definition = {
    methods: ["get","head"],
    url: '/admin/feedback/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Feedback\Pages\CreateFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/CreateFeedback.php:7
 * @route '/admin/feedback/create'
 */
CreateFeedback.url = (options?: RouteQueryOptions) => {
    return CreateFeedback.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Feedback\Pages\CreateFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/CreateFeedback.php:7
 * @route '/admin/feedback/create'
 */
CreateFeedback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateFeedback.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Feedback\Pages\CreateFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/CreateFeedback.php:7
 * @route '/admin/feedback/create'
 */
CreateFeedback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateFeedback.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Feedback\Pages\CreateFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/CreateFeedback.php:7
 * @route '/admin/feedback/create'
 */
    const CreateFeedbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateFeedback.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Feedback\Pages\CreateFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/CreateFeedback.php:7
 * @route '/admin/feedback/create'
 */
        CreateFeedbackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateFeedback.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Feedback\Pages\CreateFeedback::__invoke
 * @see app/Filament/Resources/Feedback/Pages/CreateFeedback.php:7
 * @route '/admin/feedback/create'
 */
        CreateFeedbackForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateFeedback.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateFeedback.form = CreateFeedbackForm
export default CreateFeedback