import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\TrialController::storeManaged
 * @see app/Http/Controllers/Settings/TrialController.php:14
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/managed'
 */
export const storeManaged = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeManaged.url(args, options),
    method: 'post',
})

storeManaged.definition = {
    methods: ["post"],
    url: '/{locale?}/settings/trial/managed',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TrialController::storeManaged
 * @see app/Http/Controllers/Settings/TrialController.php:14
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/managed'
 */
storeManaged.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storeManaged.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TrialController::storeManaged
 * @see app/Http/Controllers/Settings/TrialController.php:14
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/managed'
 */
storeManaged.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeManaged.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Settings\TrialController::storeManaged
 * @see app/Http/Controllers/Settings/TrialController.php:14
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/managed'
 */
    const storeManagedForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeManaged.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\TrialController::storeManaged
 * @see app/Http/Controllers/Settings/TrialController.php:14
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/managed'
 */
        storeManagedForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeManaged.url(args, options),
            method: 'post',
        })
    
    storeManaged.form = storeManagedForm
/**
* @see \App\Http\Controllers\Settings\TrialController::storePro
 * @see app/Http/Controllers/Settings/TrialController.php:34
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/pro'
 */
export const storePro = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePro.url(args, options),
    method: 'post',
})

storePro.definition = {
    methods: ["post"],
    url: '/{locale?}/settings/trial/pro',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TrialController::storePro
 * @see app/Http/Controllers/Settings/TrialController.php:34
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/pro'
 */
storePro.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storePro.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TrialController::storePro
 * @see app/Http/Controllers/Settings/TrialController.php:34
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/pro'
 */
storePro.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePro.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Settings\TrialController::storePro
 * @see app/Http/Controllers/Settings/TrialController.php:34
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/pro'
 */
    const storeProForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storePro.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\TrialController::storePro
 * @see app/Http/Controllers/Settings/TrialController.php:34
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/trial/pro'
 */
        storeProForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storePro.url(args, options),
            method: 'post',
        })
    
    storePro.form = storeProForm
const TrialController = { storeManaged, storePro }

export default TrialController