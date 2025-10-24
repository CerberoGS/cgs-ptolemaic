import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\TrialCardController::store
 * @see app/Http/Controllers/Settings/TrialCardController.php:15
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/add-card'
 */
export const store = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{locale?}/settings/trial/add-card',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TrialCardController::store
 * @see app/Http/Controllers/Settings/TrialCardController.php:15
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/add-card'
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
* @see \App\Http\Controllers\Settings\TrialCardController::store
 * @see app/Http/Controllers/Settings/TrialCardController.php:15
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/add-card'
 */
store.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Settings\TrialCardController::store
 * @see app/Http/Controllers/Settings/TrialCardController.php:15
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/add-card'
 */
    const storeForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\TrialCardController::store
 * @see app/Http/Controllers/Settings/TrialCardController.php:15
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/add-card'
 */
        storeForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const TrialCardController = { store }

export default TrialCardController