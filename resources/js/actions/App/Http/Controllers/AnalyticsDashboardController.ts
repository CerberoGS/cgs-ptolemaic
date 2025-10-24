import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AnalyticsDashboardController::index
 * @see app/Http/Controllers/AnalyticsDashboardController.php:17
 * @param locale - Default: '$locale'
 * @route '/{locale?}/analytics'
 */
export const index = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale?}/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsDashboardController::index
 * @see app/Http/Controllers/AnalyticsDashboardController.php:17
 * @param locale - Default: '$locale'
 * @route '/{locale?}/analytics'
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
                        locale: args?.locale ?? '$locale',
                }

    return index.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsDashboardController::index
 * @see app/Http/Controllers/AnalyticsDashboardController.php:17
 * @param locale - Default: '$locale'
 * @route '/{locale?}/analytics'
 */
index.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnalyticsDashboardController::index
 * @see app/Http/Controllers/AnalyticsDashboardController.php:17
 * @param locale - Default: '$locale'
 * @route '/{locale?}/analytics'
 */
index.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AnalyticsDashboardController::index
 * @see app/Http/Controllers/AnalyticsDashboardController.php:17
 * @param locale - Default: '$locale'
 * @route '/{locale?}/analytics'
 */
    const indexForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AnalyticsDashboardController::index
 * @see app/Http/Controllers/AnalyticsDashboardController.php:17
 * @param locale - Default: '$locale'
 * @route '/{locale?}/analytics'
 */
        indexForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AnalyticsDashboardController::index
 * @see app/Http/Controllers/AnalyticsDashboardController.php:17
 * @param locale - Default: '$locale'
 * @route '/{locale?}/analytics'
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
const AnalyticsDashboardController = { index }

export default AnalyticsDashboardController