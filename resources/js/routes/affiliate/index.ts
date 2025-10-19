import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
 * @see routes/web.php:299
 * @route '/ref/{code}'
 */
export const legacy = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: legacy.url(args, options),
    method: 'get',
})

legacy.definition = {
    methods: ["get","head"],
    url: '/ref/{code}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:299
 * @route '/ref/{code}'
 */
legacy.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    code: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        code: args.code,
                }

    return legacy.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:299
 * @route '/ref/{code}'
 */
legacy.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: legacy.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:299
 * @route '/ref/{code}'
 */
legacy.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: legacy.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:299
 * @route '/ref/{code}'
 */
    const legacyForm = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: legacy.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:299
 * @route '/ref/{code}'
 */
        legacyForm.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: legacy.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:299
 * @route '/ref/{code}'
 */
        legacyForm.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: legacy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    legacy.form = legacyForm
const affiliate = {
    legacy: Object.assign(legacy, legacy),
}

export default affiliate