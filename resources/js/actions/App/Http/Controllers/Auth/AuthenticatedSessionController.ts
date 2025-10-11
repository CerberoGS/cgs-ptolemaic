import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @param locale - Default: 'es'
 * @route '/{locale?}/login'
 */
export const create = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{locale?}/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @param locale - Default: 'es'
 * @route '/{locale?}/login'
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
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @param locale - Default: 'es'
 * @route '/{locale?}/login'
 */
create.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @param locale - Default: 'es'
 * @route '/{locale?}/login'
 */
create.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @param locale - Default: 'es'
 * @route '/{locale?}/login'
 */
    const createForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @param locale - Default: 'es'
 * @route '/{locale?}/login'
 */
        createForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @param locale - Default: 'es'
 * @route '/{locale?}/login'
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
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:31
 * @param locale - Default: 'es'
 * @route '/{locale?}/login'
 */
export const store = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{locale?}/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:31
 * @param locale - Default: 'es'
 * @route '/{locale?}/login'
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
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:31
 * @param locale - Default: 'es'
 * @route '/{locale?}/login'
 */
store.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:31
 * @param locale - Default: 'es'
 * @route '/{locale?}/login'
 */
    const storeForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:31
 * @param locale - Default: 'es'
 * @route '/{locale?}/login'
 */
        storeForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:56
 * @param locale - Default: 'es'
 * @route '/{locale?}/logout'
 */
export const destroy = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(args, options),
    method: 'post',
})

destroy.definition = {
    methods: ["post"],
    url: '/{locale?}/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:56
 * @param locale - Default: 'es'
 * @route '/{locale?}/logout'
 */
destroy.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:56
 * @param locale - Default: 'es'
 * @route '/{locale?}/logout'
 */
destroy.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:56
 * @param locale - Default: 'es'
 * @route '/{locale?}/logout'
 */
    const destroyForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:56
 * @param locale - Default: 'es'
 * @route '/{locale?}/logout'
 */
        destroyForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, options),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AuthenticatedSessionController = { create, store, destroy }

export default AuthenticatedSessionController