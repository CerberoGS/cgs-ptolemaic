import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist'
 */
export const index = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale?}/admin/waitlist',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist'
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
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist'
 */
index.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist'
 */
index.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist'
 */
    const indexForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist'
 */
        indexForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist'
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
* @see \App\Http\Controllers\Admin\WaitlistController::updateStatus
 * @see app/Http/Controllers/Admin/WaitlistController.php:62
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist/{waitlistEntry}/status'
 */
export const updateStatus = (args: { locale?: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

updateStatus.definition = {
    methods: ["put"],
    url: '/{locale?}/admin/waitlist/{waitlistEntry}/status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\WaitlistController::updateStatus
 * @see app/Http/Controllers/Admin/WaitlistController.php:62
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist/{waitlistEntry}/status'
 */
updateStatus.url = (args: { locale?: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    waitlistEntry: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? '$locale',
                                waitlistEntry: args.waitlistEntry,
                }

    return updateStatus.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{waitlistEntry}', parsedArgs.waitlistEntry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WaitlistController::updateStatus
 * @see app/Http/Controllers/Admin/WaitlistController.php:62
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist/{waitlistEntry}/status'
 */
updateStatus.put = (args: { locale?: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\WaitlistController::updateStatus
 * @see app/Http/Controllers/Admin/WaitlistController.php:62
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist/{waitlistEntry}/status'
 */
    const updateStatusForm = (args: { locale?: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WaitlistController::updateStatus
 * @see app/Http/Controllers/Admin/WaitlistController.php:62
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist/{waitlistEntry}/status'
 */
        updateStatusForm.put = (args: { locale?: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
/**
* @see \App\Http\Controllers\Admin\WaitlistController::destroy
 * @see app/Http/Controllers/Admin/WaitlistController.php:91
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist/{waitlistEntry}'
 */
export const destroy = (args: { locale?: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{locale?}/admin/waitlist/{waitlistEntry}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\WaitlistController::destroy
 * @see app/Http/Controllers/Admin/WaitlistController.php:91
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist/{waitlistEntry}'
 */
destroy.url = (args: { locale?: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    waitlistEntry: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? '$locale',
                                waitlistEntry: args.waitlistEntry,
                }

    return destroy.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{waitlistEntry}', parsedArgs.waitlistEntry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WaitlistController::destroy
 * @see app/Http/Controllers/Admin/WaitlistController.php:91
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist/{waitlistEntry}'
 */
destroy.delete = (args: { locale?: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\WaitlistController::destroy
 * @see app/Http/Controllers/Admin/WaitlistController.php:91
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist/{waitlistEntry}'
 */
    const destroyForm = (args: { locale?: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WaitlistController::destroy
 * @see app/Http/Controllers/Admin/WaitlistController.php:91
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/waitlist/{waitlistEntry}'
 */
        destroyForm.delete = (args: { locale?: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const WaitlistController = { index, updateStatus, destroy }

export default WaitlistController