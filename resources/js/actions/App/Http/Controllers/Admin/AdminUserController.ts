import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users'
 */
export const index = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale?}/admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users'
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
                        locale: args?.locale ?? 'es',
                }

    return index.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users'
 */
index.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users'
 */
index.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users'
 */
    const indexForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users'
 */
        indexForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users'
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
* @see \App\Http\Controllers\Admin\AdminUserController::updateRoles
 * @see app/Http/Controllers/Admin/AdminUserController.php:84
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/roles'
 */
export const updateRoles = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRoles.url(args, options),
    method: 'put',
})

updateRoles.definition = {
    methods: ["put"],
    url: '/{locale?}/admin/users/{user}/roles',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AdminUserController::updateRoles
 * @see app/Http/Controllers/Admin/AdminUserController.php:84
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/roles'
 */
updateRoles.url = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    user: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? 'es',
                                user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return updateRoles.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminUserController::updateRoles
 * @see app/Http/Controllers/Admin/AdminUserController.php:84
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/roles'
 */
updateRoles.put = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRoles.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AdminUserController::updateRoles
 * @see app/Http/Controllers/Admin/AdminUserController.php:84
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/roles'
 */
    const updateRolesForm = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateRoles.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminUserController::updateRoles
 * @see app/Http/Controllers/Admin/AdminUserController.php:84
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/roles'
 */
        updateRolesForm.put = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateRoles.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateRoles.form = updateRolesForm
/**
* @see \App\Http\Controllers\Admin\AdminUserController::updateDefaults
 * @see app/Http/Controllers/Admin/AdminUserController.php:94
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/defaults'
 */
export const updateDefaults = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateDefaults.url(args, options),
    method: 'put',
})

updateDefaults.definition = {
    methods: ["put"],
    url: '/{locale?}/admin/users/{user}/defaults',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AdminUserController::updateDefaults
 * @see app/Http/Controllers/Admin/AdminUserController.php:94
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/defaults'
 */
updateDefaults.url = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    user: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? 'es',
                                user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return updateDefaults.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminUserController::updateDefaults
 * @see app/Http/Controllers/Admin/AdminUserController.php:94
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/defaults'
 */
updateDefaults.put = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateDefaults.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AdminUserController::updateDefaults
 * @see app/Http/Controllers/Admin/AdminUserController.php:94
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/defaults'
 */
    const updateDefaultsForm = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateDefaults.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminUserController::updateDefaults
 * @see app/Http/Controllers/Admin/AdminUserController.php:94
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/defaults'
 */
        updateDefaultsForm.put = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateDefaults.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateDefaults.form = updateDefaultsForm
const AdminUserController = { index, updateRoles, updateDefaults }

export default AdminUserController