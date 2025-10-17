import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations'
 */
export const index = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale?}/admin/invitations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations'
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
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations'
 */
index.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations'
 */
index.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations'
 */
    const indexForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations'
 */
        indexForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations'
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
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:87
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/create'
 */
export const create = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{locale?}/admin/invitations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:87
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/create'
 */
create.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:87
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/create'
 */
create.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:87
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/create'
 */
create.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:87
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/create'
 */
    const createForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:87
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/create'
 */
        createForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:87
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/create'
 */
        createForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\InvitationController::store
 * @see app/Http/Controllers/Admin/InvitationController.php:103
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations'
 */
export const store = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{locale?}/admin/invitations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::store
 * @see app/Http/Controllers/Admin/InvitationController.php:103
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations'
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
                        locale: args?.locale ?? 'es',
                }

    return store.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::store
 * @see app/Http/Controllers/Admin/InvitationController.php:103
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations'
 */
store.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::store
 * @see app/Http/Controllers/Admin/InvitationController.php:103
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations'
 */
    const storeForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::store
 * @see app/Http/Controllers/Admin/InvitationController.php:103
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations'
 */
        storeForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:133
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
export const show = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{locale?}/admin/invitations/{invitation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:133
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
show.url = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    invitation: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? 'es',
                                invitation: args.invitation,
                }

    return show.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:133
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
show.get = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:133
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
show.head = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:133
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
    const showForm = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:133
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
        showForm.get = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:133
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
        showForm.head = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\InvitationController::update
 * @see app/Http/Controllers/Admin/InvitationController.php:188
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
export const update = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/{locale?}/admin/invitations/{invitation}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::update
 * @see app/Http/Controllers/Admin/InvitationController.php:188
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
update.url = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    invitation: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? 'es',
                                invitation: args.invitation,
                }

    return update.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::update
 * @see app/Http/Controllers/Admin/InvitationController.php:188
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
update.put = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::update
 * @see app/Http/Controllers/Admin/InvitationController.php:188
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
    const updateForm = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::update
 * @see app/Http/Controllers/Admin/InvitationController.php:188
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
        updateForm.put = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\InvitationController::destroy
 * @see app/Http/Controllers/Admin/InvitationController.php:211
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
export const destroy = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{locale?}/admin/invitations/{invitation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::destroy
 * @see app/Http/Controllers/Admin/InvitationController.php:211
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
destroy.url = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    invitation: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? 'es',
                                invitation: args.invitation,
                }

    return destroy.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::destroy
 * @see app/Http/Controllers/Admin/InvitationController.php:211
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
destroy.delete = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::destroy
 * @see app/Http/Controllers/Admin/InvitationController.php:211
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
    const destroyForm = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::destroy
 * @see app/Http/Controllers/Admin/InvitationController.php:211
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/invitations/{invitation}'
 */
        destroyForm.delete = (args: { locale?: string | number, invitation: string | number } | [locale: string | number, invitation: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const InvitationController = { index, create, store, show, update, destroy }

export default InvitationController