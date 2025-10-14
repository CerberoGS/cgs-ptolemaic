import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\IntegrationsController::index
 * @see app/Http/Controllers/Settings/IntegrationsController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/integrations'
 */
export const index = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale?}/settings/integrations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\IntegrationsController::index
 * @see app/Http/Controllers/Settings/IntegrationsController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/integrations'
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
* @see \App\Http\Controllers\Settings\IntegrationsController::index
 * @see app/Http/Controllers/Settings/IntegrationsController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/integrations'
 */
index.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\IntegrationsController::index
 * @see app/Http/Controllers/Settings/IntegrationsController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/integrations'
 */
index.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\IntegrationsController::index
 * @see app/Http/Controllers/Settings/IntegrationsController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/integrations'
 */
    const indexForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\IntegrationsController::index
 * @see app/Http/Controllers/Settings/IntegrationsController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/integrations'
 */
        indexForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\IntegrationsController::index
 * @see app/Http/Controllers/Settings/IntegrationsController.php:16
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/integrations'
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
const IntegrationsController = { index }

export default IntegrationsController