import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminRoleController::index
 * @see app/Http/Controllers/Admin/AdminRoleController.php:26
 * @route '/{locale}/admin/roles'
 */
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/admin/roles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminRoleController::index
 * @see app/Http/Controllers/Admin/AdminRoleController.php:26
 * @route '/{locale}/admin/roles'
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
* @see \App\Http\Controllers\Admin\AdminRoleController::index
 * @see app/Http/Controllers/Admin/AdminRoleController.php:26
 * @route '/{locale}/admin/roles'
 */
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminRoleController::index
 * @see app/Http/Controllers/Admin/AdminRoleController.php:26
 * @route '/{locale}/admin/roles'
 */
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminRoleController::index
 * @see app/Http/Controllers/Admin/AdminRoleController.php:26
 * @route '/{locale}/admin/roles'
 */
    const indexForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminRoleController::index
 * @see app/Http/Controllers/Admin/AdminRoleController.php:26
 * @route '/{locale}/admin/roles'
 */
        indexForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminRoleController::index
 * @see app/Http/Controllers/Admin/AdminRoleController.php:26
 * @route '/{locale}/admin/roles'
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
* @see \App\Http\Controllers\Admin\AdminRoleController::store
 * @see app/Http/Controllers/Admin/AdminRoleController.php:57
 * @route '/{locale}/admin/roles'
 */
export const store = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{locale}/admin/roles',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminRoleController::store
 * @see app/Http/Controllers/Admin/AdminRoleController.php:57
 * @route '/{locale}/admin/roles'
 */
store.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminRoleController::store
 * @see app/Http/Controllers/Admin/AdminRoleController.php:57
 * @route '/{locale}/admin/roles'
 */
store.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminRoleController::store
 * @see app/Http/Controllers/Admin/AdminRoleController.php:57
 * @route '/{locale}/admin/roles'
 */
    const storeForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminRoleController::store
 * @see app/Http/Controllers/Admin/AdminRoleController.php:57
 * @route '/{locale}/admin/roles'
 */
        storeForm.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\AdminRoleController::update
 * @see app/Http/Controllers/Admin/AdminRoleController.php:73
 * @route '/{locale}/admin/roles/{role}'
 */
export const update = (args: { locale: string | number, role: string | number | { id: string | number } } | [locale: string | number, role: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/{locale}/admin/roles/{role}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AdminRoleController::update
 * @see app/Http/Controllers/Admin/AdminRoleController.php:73
 * @route '/{locale}/admin/roles/{role}'
 */
update.url = (args: { locale: string | number, role: string | number | { id: string | number } } | [locale: string | number, role: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    role: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                role: typeof args.role === 'object'
                ? args.role.id
                : args.role,
                }

    return update.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminRoleController::update
 * @see app/Http/Controllers/Admin/AdminRoleController.php:73
 * @route '/{locale}/admin/roles/{role}'
 */
update.put = (args: { locale: string | number, role: string | number | { id: string | number } } | [locale: string | number, role: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AdminRoleController::update
 * @see app/Http/Controllers/Admin/AdminRoleController.php:73
 * @route '/{locale}/admin/roles/{role}'
 */
    const updateForm = (args: { locale: string | number, role: string | number | { id: string | number } } | [locale: string | number, role: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminRoleController::update
 * @see app/Http/Controllers/Admin/AdminRoleController.php:73
 * @route '/{locale}/admin/roles/{role}'
 */
        updateForm.put = (args: { locale: string | number, role: string | number | { id: string | number } } | [locale: string | number, role: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\AdminRoleController::destroy
 * @see app/Http/Controllers/Admin/AdminRoleController.php:88
 * @route '/{locale}/admin/roles/{role}'
 */
export const destroy = (args: { locale: string | number, role: string | number | { id: string | number } } | [locale: string | number, role: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{locale}/admin/roles/{role}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\AdminRoleController::destroy
 * @see app/Http/Controllers/Admin/AdminRoleController.php:88
 * @route '/{locale}/admin/roles/{role}'
 */
destroy.url = (args: { locale: string | number, role: string | number | { id: string | number } } | [locale: string | number, role: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    role: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                role: typeof args.role === 'object'
                ? args.role.id
                : args.role,
                }

    return destroy.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminRoleController::destroy
 * @see app/Http/Controllers/Admin/AdminRoleController.php:88
 * @route '/{locale}/admin/roles/{role}'
 */
destroy.delete = (args: { locale: string | number, role: string | number | { id: string | number } } | [locale: string | number, role: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\AdminRoleController::destroy
 * @see app/Http/Controllers/Admin/AdminRoleController.php:88
 * @route '/{locale}/admin/roles/{role}'
 */
    const destroyForm = (args: { locale: string | number, role: string | number | { id: string | number } } | [locale: string | number, role: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminRoleController::destroy
 * @see app/Http/Controllers/Admin/AdminRoleController.php:88
 * @route '/{locale}/admin/roles/{role}'
 */
        destroyForm.delete = (args: { locale: string | number, role: string | number | { id: string | number } } | [locale: string | number, role: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AdminRoleController = { index, store, update, destroy }

export default AdminRoleController