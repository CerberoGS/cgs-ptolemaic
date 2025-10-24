import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\WaitlistController::store
 * @see app/Http/Controllers/Settings/WaitlistController.php:21
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist'
 */
export const store = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{locale?}/settings/waitlist',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\WaitlistController::store
 * @see app/Http/Controllers/Settings/WaitlistController.php:21
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist'
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
* @see \App\Http\Controllers\Settings\WaitlistController::store
 * @see app/Http/Controllers/Settings/WaitlistController.php:21
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist'
 */
store.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Settings\WaitlistController::store
 * @see app/Http/Controllers/Settings/WaitlistController.php:21
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist'
 */
    const storeForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\WaitlistController::store
 * @see app/Http/Controllers/Settings/WaitlistController.php:21
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist'
 */
        storeForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Settings\WaitlistController::destroy
 * @see app/Http/Controllers/Settings/WaitlistController.php:180
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist'
 */
export const destroy = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{locale?}/settings/waitlist',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\WaitlistController::destroy
 * @see app/Http/Controllers/Settings/WaitlistController.php:180
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist'
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
                        locale: args?.locale ?? '$locale',
                }

    return destroy.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\WaitlistController::destroy
 * @see app/Http/Controllers/Settings/WaitlistController.php:180
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist'
 */
destroy.delete = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Settings\WaitlistController::destroy
 * @see app/Http/Controllers/Settings/WaitlistController.php:180
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist'
 */
    const destroyForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\WaitlistController::destroy
 * @see app/Http/Controllers/Settings/WaitlistController.php:180
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist'
 */
        destroyForm.delete = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Settings\WaitlistController::status
 * @see app/Http/Controllers/Settings/WaitlistController.php:151
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist/status'
 */
export const status = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/{locale?}/settings/waitlist/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\WaitlistController::status
 * @see app/Http/Controllers/Settings/WaitlistController.php:151
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist/status'
 */
status.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\WaitlistController::status
 * @see app/Http/Controllers/Settings/WaitlistController.php:151
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist/status'
 */
status.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\WaitlistController::status
 * @see app/Http/Controllers/Settings/WaitlistController.php:151
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist/status'
 */
status.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\WaitlistController::status
 * @see app/Http/Controllers/Settings/WaitlistController.php:151
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist/status'
 */
    const statusForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: status.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\WaitlistController::status
 * @see app/Http/Controllers/Settings/WaitlistController.php:151
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist/status'
 */
        statusForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\WaitlistController::status
 * @see app/Http/Controllers/Settings/WaitlistController.php:151
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/waitlist/status'
 */
        statusForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    status.form = statusForm
const WaitlistController = { store, destroy, status }

export default WaitlistController