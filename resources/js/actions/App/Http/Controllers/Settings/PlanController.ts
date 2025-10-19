import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @route '/{locale}/settings/plan'
 */
const PlanController = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PlanController.url(args, options),
    method: 'get',
})

PlanController.definition = {
    methods: ["get","head"],
    url: '/{locale}/settings/plan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @route '/{locale}/settings/plan'
 */
PlanController.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return PlanController.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @route '/{locale}/settings/plan'
 */
PlanController.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PlanController.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @route '/{locale}/settings/plan'
 */
PlanController.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: PlanController.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @route '/{locale}/settings/plan'
 */
    const PlanControllerForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: PlanController.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @route '/{locale}/settings/plan'
 */
        PlanControllerForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: PlanController.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\PlanController::__invoke
 * @see app/Http/Controllers/Settings/PlanController.php:16
 * @route '/{locale}/settings/plan'
 */
        PlanControllerForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: PlanController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    PlanController.form = PlanControllerForm
export default PlanController