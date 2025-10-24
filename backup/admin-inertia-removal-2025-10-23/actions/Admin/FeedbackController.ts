import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\FeedbackController::index
 * @see app/Http/Controllers/Admin/FeedbackController.php:16
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback'
 */
export const index = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale?}/admin/feedback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FeedbackController::index
 * @see app/Http/Controllers/Admin/FeedbackController.php:16
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback'
 */
index.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args?.locale ?? '$locale',
                }

    return index.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FeedbackController::index
 * @see app/Http/Controllers/Admin/FeedbackController.php:16
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback'
 */
index.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\FeedbackController::index
 * @see app/Http/Controllers/Admin/FeedbackController.php:16
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback'
 */
index.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\FeedbackController::index
 * @see app/Http/Controllers/Admin/FeedbackController.php:16
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback'
 */
    const indexForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\FeedbackController::index
 * @see app/Http/Controllers/Admin/FeedbackController.php:16
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback'
 */
        indexForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\FeedbackController::index
 * @see app/Http/Controllers/Admin/FeedbackController.php:16
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback'
 */
        indexForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\FeedbackController::show
 * @see app/Http/Controllers/Admin/FeedbackController.php:95
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback/{feedback}'
 */
export const show = (args: { locale?: string | number, feedback: string | number | { id: string | number } } | [locale: string | number, feedback: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{locale?}/admin/feedback/{feedback}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FeedbackController::show
 * @see app/Http/Controllers/Admin/FeedbackController.php:95
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback/{feedback}'
 */
show.url = (args: { locale?: string | number, feedback: string | number | { id: string | number } } | [locale: string | number, feedback: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    feedback: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? '$locale',
                                feedback: typeof args.feedback === 'object'
                ? args.feedback.id
                : args.feedback,
                }

    return show.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{feedback}', parsedArgs.feedback.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FeedbackController::show
 * @see app/Http/Controllers/Admin/FeedbackController.php:95
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback/{feedback}'
 */
show.get = (args: { locale?: string | number, feedback: string | number | { id: string | number } } | [locale: string | number, feedback: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\FeedbackController::show
 * @see app/Http/Controllers/Admin/FeedbackController.php:95
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback/{feedback}'
 */
show.head = (args: { locale?: string | number, feedback: string | number | { id: string | number } } | [locale: string | number, feedback: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\FeedbackController::show
 * @see app/Http/Controllers/Admin/FeedbackController.php:95
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback/{feedback}'
 */
    const showForm = (args: { locale?: string | number, feedback: string | number | { id: string | number } } | [locale: string | number, feedback: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\FeedbackController::show
 * @see app/Http/Controllers/Admin/FeedbackController.php:95
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback/{feedback}'
 */
        showForm.get = (args: { locale?: string | number, feedback: string | number | { id: string | number } } | [locale: string | number, feedback: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\FeedbackController::show
 * @see app/Http/Controllers/Admin/FeedbackController.php:95
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback/{feedback}'
 */
        showForm.head = (args: { locale?: string | number, feedback: string | number | { id: string | number } } | [locale: string | number, feedback: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\FeedbackController::update
 * @see app/Http/Controllers/Admin/FeedbackController.php:136
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback/{feedback}'
 */
export const update = (args: { locale?: string | number, feedback: string | number | { id: string | number } } | [locale: string | number, feedback: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/{locale?}/admin/feedback/{feedback}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\FeedbackController::update
 * @see app/Http/Controllers/Admin/FeedbackController.php:136
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback/{feedback}'
 */
update.url = (args: { locale?: string | number, feedback: string | number | { id: string | number } } | [locale: string | number, feedback: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    feedback: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? '$locale',
                                feedback: typeof args.feedback === 'object'
                ? args.feedback.id
                : args.feedback,
                }

    return update.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{feedback}', parsedArgs.feedback.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FeedbackController::update
 * @see app/Http/Controllers/Admin/FeedbackController.php:136
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback/{feedback}'
 */
update.put = (args: { locale?: string | number, feedback: string | number | { id: string | number } } | [locale: string | number, feedback: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\FeedbackController::update
 * @see app/Http/Controllers/Admin/FeedbackController.php:136
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback/{feedback}'
 */
    const updateForm = (args: { locale?: string | number, feedback: string | number | { id: string | number } } | [locale: string | number, feedback: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\FeedbackController::update
 * @see app/Http/Controllers/Admin/FeedbackController.php:136
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/feedback/{feedback}'
 */
        updateForm.put = (args: { locale?: string | number, feedback: string | number | { id: string | number } } | [locale: string | number, feedback: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const FeedbackController = { index, show, update }

export default FeedbackController