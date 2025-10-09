import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
import confirmD7e05f from './confirm'
/**
* @see \App\Http\Controllers\Settings\PasswordController::edit
 * @see app/Http/Controllers/Settings/PasswordController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/password'
 */
export const edit = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/{locale?}/settings/password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\PasswordController::edit
 * @see app/Http/Controllers/Settings/PasswordController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/password'
 */
edit.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\PasswordController::edit
 * @see app/Http/Controllers/Settings/PasswordController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/password'
 */
edit.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\PasswordController::edit
 * @see app/Http/Controllers/Settings/PasswordController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/password'
 */
edit.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\PasswordController::edit
 * @see app/Http/Controllers/Settings/PasswordController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/password'
 */
    const editForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\PasswordController::edit
 * @see app/Http/Controllers/Settings/PasswordController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/password'
 */
        editForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\PasswordController::edit
 * @see app/Http/Controllers/Settings/PasswordController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/password'
 */
        editForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Settings\PasswordController::update
 * @see app/Http/Controllers/Settings/PasswordController.php:26
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/password'
 */
export const update = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/{locale?}/settings/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Settings\PasswordController::update
 * @see app/Http/Controllers/Settings/PasswordController.php:26
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/password'
 */
update.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\PasswordController::update
 * @see app/Http/Controllers/Settings/PasswordController.php:26
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/password'
 */
update.put = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Settings\PasswordController::update
 * @see app/Http/Controllers/Settings/PasswordController.php:26
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/password'
 */
    const updateForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\PasswordController::update
 * @see app/Http/Controllers/Settings/PasswordController.php:26
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/password'
 */
        updateForm.put = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/forgot-password'
 */
export const request = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: request.url(args, options),
    method: 'get',
})

request.definition = {
    methods: ["get","head"],
    url: '/{locale?}/forgot-password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/forgot-password'
 */
request.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return request.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/forgot-password'
 */
request.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: request.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/forgot-password'
 */
request.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: request.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/forgot-password'
 */
    const requestForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: request.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/forgot-password'
 */
        requestForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: request.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @param locale - Default: 'es'
 * @route '/{locale?}/forgot-password'
 */
        requestForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: request.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    request.form = requestForm
/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::email
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:29
 * @param locale - Default: 'es'
 * @route '/{locale?}/forgot-password'
 */
export const email = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: email.url(args, options),
    method: 'post',
})

email.definition = {
    methods: ["post"],
    url: '/{locale?}/forgot-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::email
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:29
 * @param locale - Default: 'es'
 * @route '/{locale?}/forgot-password'
 */
email.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return email.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::email
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:29
 * @param locale - Default: 'es'
 * @route '/{locale?}/forgot-password'
 */
email.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: email.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::email
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:29
 * @param locale - Default: 'es'
 * @route '/{locale?}/forgot-password'
 */
    const emailForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: email.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::email
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:29
 * @param locale - Default: 'es'
 * @route '/{locale?}/forgot-password'
 */
        emailForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: email.url(args, options),
            method: 'post',
        })
    
    email.form = emailForm
/**
* @see \App\Http\Controllers\Auth\NewPasswordController::reset
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: 'es'
 * @route '/{locale?}/reset-password/{token}'
 */
export const reset = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reset.url(args, options),
    method: 'get',
})

reset.definition = {
    methods: ["get","head"],
    url: '/{locale?}/reset-password/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\NewPasswordController::reset
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: 'es'
 * @route '/{locale?}/reset-password/{token}'
 */
reset.url = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    token: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? 'es',
                                token: args.token,
                }

    return reset.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\NewPasswordController::reset
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: 'es'
 * @route '/{locale?}/reset-password/{token}'
 */
reset.get = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reset.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\NewPasswordController::reset
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: 'es'
 * @route '/{locale?}/reset-password/{token}'
 */
reset.head = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reset.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\NewPasswordController::reset
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: 'es'
 * @route '/{locale?}/reset-password/{token}'
 */
    const resetForm = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reset.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\NewPasswordController::reset
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: 'es'
 * @route '/{locale?}/reset-password/{token}'
 */
        resetForm.get = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reset.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\NewPasswordController::reset
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: 'es'
 * @route '/{locale?}/reset-password/{token}'
 */
        resetForm.head = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reset.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reset.form = resetForm
/**
* @see \App\Http\Controllers\Auth\NewPasswordController::store
 * @see app/Http/Controllers/Auth/NewPasswordController.php:36
 * @param locale - Default: 'es'
 * @route '/{locale?}/reset-password'
 */
export const store = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{locale?}/reset-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\NewPasswordController::store
 * @see app/Http/Controllers/Auth/NewPasswordController.php:36
 * @param locale - Default: 'es'
 * @route '/{locale?}/reset-password'
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
* @see \App\Http\Controllers\Auth\NewPasswordController::store
 * @see app/Http/Controllers/Auth/NewPasswordController.php:36
 * @param locale - Default: 'es'
 * @route '/{locale?}/reset-password'
 */
store.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\NewPasswordController::store
 * @see app/Http/Controllers/Auth/NewPasswordController.php:36
 * @param locale - Default: 'es'
 * @route '/{locale?}/reset-password'
 */
    const storeForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\NewPasswordController::store
 * @see app/Http/Controllers/Auth/NewPasswordController.php:36
 * @param locale - Default: 'es'
 * @route '/{locale?}/reset-password'
 */
        storeForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
 * @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:41
 * @param locale - Default: 'es'
 * @route '/{locale?}/confirm-password'
 */
export const confirm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirm.url(args, options),
    method: 'get',
})

confirm.definition = {
    methods: ["get","head"],
    url: '/{locale?}/confirm-password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
 * @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:41
 * @param locale - Default: 'es'
 * @route '/{locale?}/confirm-password'
 */
confirm.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return confirm.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
 * @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:41
 * @param locale - Default: 'es'
 * @route '/{locale?}/confirm-password'
 */
confirm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirm.url(args, options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
 * @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:41
 * @param locale - Default: 'es'
 * @route '/{locale?}/confirm-password'
 */
confirm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirm.url(args, options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
 * @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:41
 * @param locale - Default: 'es'
 * @route '/{locale?}/confirm-password'
 */
    const confirmForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: confirm.url(args, options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
 * @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:41
 * @param locale - Default: 'es'
 * @route '/{locale?}/confirm-password'
 */
        confirmForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirm.url(args, options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
 * @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:41
 * @param locale - Default: 'es'
 * @route '/{locale?}/confirm-password'
 */
        confirmForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirm.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    confirm.form = confirmForm
const password = {
    edit: Object.assign(edit, edit),
update: Object.assign(update, update),
request: Object.assign(request, request),
email: Object.assign(email, email),
reset: Object.assign(reset, reset),
store: Object.assign(store, store),
confirm: Object.assign(confirm, confirmD7e05f),
}

export default password