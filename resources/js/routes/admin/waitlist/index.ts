import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @route '/{locale}/admin/waitlist'
 */
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/admin/waitlist',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @route '/{locale}/admin/waitlist'
 */
index.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return index.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @route '/{locale}/admin/waitlist'
 */
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @route '/{locale}/admin/waitlist'
 */
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @route '/{locale}/admin/waitlist'
 */
    const indexForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @route '/{locale}/admin/waitlist'
 */
        indexForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\WaitlistController::index
 * @see app/Http/Controllers/Admin/WaitlistController.php:20
 * @route '/{locale}/admin/waitlist'
 */
        indexForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\WaitlistController::status
 * @see app/Http/Controllers/Admin/WaitlistController.php:62
 * @route '/{locale}/admin/waitlist/{waitlistEntry}/status'
 */
export const status = (args: { locale: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

status.definition = {
    methods: ["put"],
    url: '/{locale}/admin/waitlist/{waitlistEntry}/status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\WaitlistController::status
 * @see app/Http/Controllers/Admin/WaitlistController.php:62
 * @route '/{locale}/admin/waitlist/{waitlistEntry}/status'
 */
status.url = (args: { locale: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    waitlistEntry: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                waitlistEntry: args.waitlistEntry,
                }

    return status.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{waitlistEntry}', parsedArgs.waitlistEntry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WaitlistController::status
 * @see app/Http/Controllers/Admin/WaitlistController.php:62
 * @route '/{locale}/admin/waitlist/{waitlistEntry}/status'
 */
status.put = (args: { locale: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\WaitlistController::status
 * @see app/Http/Controllers/Admin/WaitlistController.php:62
 * @route '/{locale}/admin/waitlist/{waitlistEntry}/status'
 */
    const statusForm = (args: { locale: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WaitlistController::status
 * @see app/Http/Controllers/Admin/WaitlistController.php:62
 * @route '/{locale}/admin/waitlist/{waitlistEntry}/status'
 */
        statusForm.put = (args: { locale: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
/**
* @see \App\Http\Controllers\Admin\WaitlistController::destroy
 * @see app/Http/Controllers/Admin/WaitlistController.php:91
 * @route '/{locale}/admin/waitlist/{waitlistEntry}'
 */
export const destroy = (args: { locale: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{locale}/admin/waitlist/{waitlistEntry}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\WaitlistController::destroy
 * @see app/Http/Controllers/Admin/WaitlistController.php:91
 * @route '/{locale}/admin/waitlist/{waitlistEntry}'
 */
destroy.url = (args: { locale: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    waitlistEntry: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                waitlistEntry: args.waitlistEntry,
                }

    return destroy.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{waitlistEntry}', parsedArgs.waitlistEntry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WaitlistController::destroy
 * @see app/Http/Controllers/Admin/WaitlistController.php:91
 * @route '/{locale}/admin/waitlist/{waitlistEntry}'
 */
destroy.delete = (args: { locale: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\WaitlistController::destroy
 * @see app/Http/Controllers/Admin/WaitlistController.php:91
 * @route '/{locale}/admin/waitlist/{waitlistEntry}'
 */
    const destroyForm = (args: { locale: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @route '/{locale}/admin/waitlist/{waitlistEntry}'
 */
        destroyForm.delete = (args: { locale: string | number, waitlistEntry: string | number } | [locale: string | number, waitlistEntry: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const waitlist = {
    index: Object.assign(index, index),
status: Object.assign(status, status),
destroy: Object.assign(destroy, destroy),
}

export default waitlist