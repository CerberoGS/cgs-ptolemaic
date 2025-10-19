import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::create
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @route '/{locale}/forgot-password'
 */
export const create = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{locale}/forgot-password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::create
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @route '/{locale}/forgot-password'
 */
create.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::create
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @route '/{locale}/forgot-password'
 */
create.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::create
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @route '/{locale}/forgot-password'
 */
create.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::create
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @route '/{locale}/forgot-password'
 */
    const createForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::create
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @route '/{locale}/forgot-password'
 */
        createForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::create
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:17
 * @route '/{locale}/forgot-password'
 */
        createForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::store
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:29
 * @route '/{locale}/forgot-password'
 */
export const store = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{locale}/forgot-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::store
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:29
 * @route '/{locale}/forgot-password'
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
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::store
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:29
 * @route '/{locale}/forgot-password'
 */
store.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::store
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:29
 * @route '/{locale}/forgot-password'
 */
    const storeForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::store
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:29
 * @route '/{locale}/forgot-password'
 */
        storeForm.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const PasswordResetLinkController = { create, store }

export default PasswordResetLinkController