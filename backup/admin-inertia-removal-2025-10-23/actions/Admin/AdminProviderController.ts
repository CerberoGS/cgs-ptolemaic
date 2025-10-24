import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminProviderController::index
 * @see app/Http/Controllers/Admin/AdminProviderController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers'
 */
export const index = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale?}/admin/providers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminProviderController::index
 * @see app/Http/Controllers/Admin/AdminProviderController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers'
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
* @see \App\Http\Controllers\Admin\AdminProviderController::index
 * @see app/Http/Controllers/Admin/AdminProviderController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers'
 */
index.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminProviderController::index
 * @see app/Http/Controllers/Admin/AdminProviderController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers'
 */
index.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminProviderController::index
 * @see app/Http/Controllers/Admin/AdminProviderController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers'
 */
    const indexForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminProviderController::index
 * @see app/Http/Controllers/Admin/AdminProviderController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers'
 */
        indexForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminProviderController::index
 * @see app/Http/Controllers/Admin/AdminProviderController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers'
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
* @see \App\Http\Controllers\Admin\AdminProviderController::store
 * @see app/Http/Controllers/Admin/AdminProviderController.php:63
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers'
 */
export const store = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{locale?}/admin/providers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminProviderController::store
 * @see app/Http/Controllers/Admin/AdminProviderController.php:63
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers'
 */
store.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminProviderController::store
 * @see app/Http/Controllers/Admin/AdminProviderController.php:63
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers'
 */
store.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminProviderController::store
 * @see app/Http/Controllers/Admin/AdminProviderController.php:63
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers'
 */
    const storeForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminProviderController::store
 * @see app/Http/Controllers/Admin/AdminProviderController.php:63
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers'
 */
        storeForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\AdminProviderController::update
 * @see app/Http/Controllers/Admin/AdminProviderController.php:82
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers/{type}/{provider}'
 */
export const update = (args: { locale?: string | number, type: string | number, provider: string | number } | [locale: string | number, type: string | number, provider: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/{locale?}/admin/providers/{type}/{provider}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AdminProviderController::update
 * @see app/Http/Controllers/Admin/AdminProviderController.php:82
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers/{type}/{provider}'
 */
update.url = (args: { locale?: string | number, type: string | number, provider: string | number } | [locale: string | number, type: string | number, provider: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    type: args[1],
                    provider: args[2],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? '$locale',
                                type: args.type,
                                provider: args.provider,
                }

    return update.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{type}', parsedArgs.type.toString())
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminProviderController::update
 * @see app/Http/Controllers/Admin/AdminProviderController.php:82
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers/{type}/{provider}'
 */
update.put = (args: { locale?: string | number, type: string | number, provider: string | number } | [locale: string | number, type: string | number, provider: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AdminProviderController::update
 * @see app/Http/Controllers/Admin/AdminProviderController.php:82
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers/{type}/{provider}'
 */
    const updateForm = (args: { locale?: string | number, type: string | number, provider: string | number } | [locale: string | number, type: string | number, provider: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminProviderController::update
 * @see app/Http/Controllers/Admin/AdminProviderController.php:82
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers/{type}/{provider}'
 */
        updateForm.put = (args: { locale?: string | number, type: string | number, provider: string | number } | [locale: string | number, type: string | number, provider: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\AdminProviderController::destroy
 * @see app/Http/Controllers/Admin/AdminProviderController.php:97
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers/{type}/{provider}'
 */
export const destroy = (args: { locale?: string | number, type: string | number, provider: string | number } | [locale: string | number, type: string | number, provider: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{locale?}/admin/providers/{type}/{provider}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\AdminProviderController::destroy
 * @see app/Http/Controllers/Admin/AdminProviderController.php:97
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers/{type}/{provider}'
 */
destroy.url = (args: { locale?: string | number, type: string | number, provider: string | number } | [locale: string | number, type: string | number, provider: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    type: args[1],
                    provider: args[2],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? '$locale',
                                type: args.type,
                                provider: args.provider,
                }

    return destroy.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{type}', parsedArgs.type.toString())
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminProviderController::destroy
 * @see app/Http/Controllers/Admin/AdminProviderController.php:97
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers/{type}/{provider}'
 */
destroy.delete = (args: { locale?: string | number, type: string | number, provider: string | number } | [locale: string | number, type: string | number, provider: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\AdminProviderController::destroy
 * @see app/Http/Controllers/Admin/AdminProviderController.php:97
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers/{type}/{provider}'
 */
    const destroyForm = (args: { locale?: string | number, type: string | number, provider: string | number } | [locale: string | number, type: string | number, provider: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminProviderController::destroy
 * @see app/Http/Controllers/Admin/AdminProviderController.php:97
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/providers/{type}/{provider}'
 */
        destroyForm.delete = (args: { locale?: string | number, type: string | number, provider: string | number } | [locale: string | number, type: string | number, provider: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AdminProviderController = { index, store, update, destroy }

export default AdminProviderController