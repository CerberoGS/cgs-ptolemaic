import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
 * @see routes/web.php:205
 * @route '/{locale}/google-callback'
 */
export const callback = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(args, options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/{locale}/google-callback',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:205
 * @route '/{locale}/google-callback'
 */
callback.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return callback.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:205
 * @route '/{locale}/google-callback'
 */
callback.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:205
 * @route '/{locale}/google-callback'
 */
callback.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:205
 * @route '/{locale}/google-callback'
 */
    const callbackForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: callback.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:205
 * @route '/{locale}/google-callback'
 */
        callbackForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: callback.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:205
 * @route '/{locale}/google-callback'
 */
        callbackForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: callback.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    callback.form = callbackForm
const google = {
    callback: Object.assign(callback, callback),
}

export default google