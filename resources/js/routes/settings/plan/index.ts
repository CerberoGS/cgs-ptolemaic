import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/plan'
 */
export const show = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{locale?}/settings/plan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/plan'
 */
show.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/plan'
 */
show.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/plan'
 */
show.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/plan'
 */
    const showForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/plan'
 */
        showForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/plan'
 */
        showForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const plan = {
    show: Object.assign(show, show),
}

export default plan