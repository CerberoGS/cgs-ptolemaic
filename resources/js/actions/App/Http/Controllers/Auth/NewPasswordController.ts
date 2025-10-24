import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\NewPasswordController::create
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/reset-password/{token}'
 */
export const create = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{locale?}/reset-password/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\NewPasswordController::create
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/reset-password/{token}'
 */
create.url = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions) => {
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
                        locale: args.locale ?? '$locale',
                                token: args.token,
                }

    return create.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\NewPasswordController::create
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/reset-password/{token}'
 */
create.get = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\NewPasswordController::create
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/reset-password/{token}'
 */
create.head = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\NewPasswordController::create
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/reset-password/{token}'
 */
    const createForm = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\NewPasswordController::create
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/reset-password/{token}'
 */
        createForm.get = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\NewPasswordController::create
 * @see app/Http/Controllers/Auth/NewPasswordController.php:23
 * @param locale - Default: '$locale'
 * @route '/{locale?}/reset-password/{token}'
 */
        createForm.head = (args: { locale?: string | number, token: string | number } | [locale: string | number, token: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Auth\NewPasswordController::store
 * @see app/Http/Controllers/Auth/NewPasswordController.php:36
 * @param locale - Default: '$locale'
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
 * @param locale - Default: '$locale'
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
                        locale: args?.locale ?? '$locale',
                }

    return store.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\NewPasswordController::store
 * @see app/Http/Controllers/Auth/NewPasswordController.php:36
 * @param locale - Default: '$locale'
 * @route '/{locale?}/reset-password'
 */
store.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\NewPasswordController::store
 * @see app/Http/Controllers/Auth/NewPasswordController.php:36
 * @param locale - Default: '$locale'
 * @route '/{locale?}/reset-password'
 */
    const storeForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\NewPasswordController::store
 * @see app/Http/Controllers/Auth/NewPasswordController.php:36
 * @param locale - Default: '$locale'
 * @route '/{locale?}/reset-password'
 */
        storeForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const NewPasswordController = { create, store }

export default NewPasswordController