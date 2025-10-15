import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
import plan from './plan'
import trial from './trial'
import integrations from './integrations'
/**
 * @see routes/settings.php:14
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings'
 */
export const index = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale?}/settings',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/settings.php:14
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings'
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
 * @see routes/settings.php:14
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings'
 */
index.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
 * @see routes/settings.php:14
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings'
 */
index.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
 * @see routes/settings.php:14
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings'
 */
    const indexForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/settings.php:14
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings'
 */
        indexForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/settings.php:14
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings'
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
const settings = {
    index: Object.assign(index, index),
plan: Object.assign(plan, plan),
trial: Object.assign(trial, trial),
integrations: Object.assign(integrations, integrations),
}

export default settings