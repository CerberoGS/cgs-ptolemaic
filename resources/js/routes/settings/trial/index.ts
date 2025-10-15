import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\TrialController::managed
 * @see app/Http/Controllers/Settings/TrialController.php:15
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/managed'
 */
export const managed = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: managed.url(args, options),
    method: 'post',
})

managed.definition = {
    methods: ["post"],
    url: '/{locale?}/settings/trial/managed',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TrialController::managed
 * @see app/Http/Controllers/Settings/TrialController.php:15
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/managed'
 */
managed.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return managed.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TrialController::managed
 * @see app/Http/Controllers/Settings/TrialController.php:15
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/managed'
 */
managed.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: managed.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Settings\TrialController::managed
 * @see app/Http/Controllers/Settings/TrialController.php:15
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/managed'
 */
    const managedForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: managed.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\TrialController::managed
 * @see app/Http/Controllers/Settings/TrialController.php:15
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/managed'
 */
        managedForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: managed.url(args, options),
            method: 'post',
        })
    
    managed.form = managedForm
/**
* @see \App\Http\Controllers\Settings\TrialController::pro
 * @see app/Http/Controllers/Settings/TrialController.php:35
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/pro'
 */
export const pro = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pro.url(args, options),
    method: 'post',
})

pro.definition = {
    methods: ["post"],
    url: '/{locale?}/settings/trial/pro',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TrialController::pro
 * @see app/Http/Controllers/Settings/TrialController.php:35
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/pro'
 */
pro.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return pro.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TrialController::pro
 * @see app/Http/Controllers/Settings/TrialController.php:35
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/pro'
 */
pro.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pro.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Settings\TrialController::pro
 * @see app/Http/Controllers/Settings/TrialController.php:35
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/pro'
 */
    const proForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: pro.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\TrialController::pro
 * @see app/Http/Controllers/Settings/TrialController.php:35
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/pro'
 */
        proForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: pro.url(args, options),
            method: 'post',
        })
    
    pro.form = proForm
/**
* @see \App\Http\Controllers\Settings\TrialCardController::addCard
 * @see app/Http/Controllers/Settings/TrialCardController.php:15
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/add-card'
 */
export const addCard = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addCard.url(args, options),
    method: 'post',
})

addCard.definition = {
    methods: ["post"],
    url: '/{locale?}/settings/trial/add-card',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TrialCardController::addCard
 * @see app/Http/Controllers/Settings/TrialCardController.php:15
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/add-card'
 */
addCard.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return addCard.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TrialCardController::addCard
 * @see app/Http/Controllers/Settings/TrialCardController.php:15
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/add-card'
 */
addCard.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addCard.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Settings\TrialCardController::addCard
 * @see app/Http/Controllers/Settings/TrialCardController.php:15
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/add-card'
 */
    const addCardForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addCard.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\TrialCardController::addCard
 * @see app/Http/Controllers/Settings/TrialCardController.php:15
 * @param locale - Default: 'es'
 * @route '/{locale?}/settings/trial/add-card'
 */
        addCardForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addCard.url(args, options),
            method: 'post',
        })
    
    addCard.form = addCardForm
const trial = {
    managed: Object.assign(managed, managed),
pro: Object.assign(pro, pro),
addCard: Object.assign(addCard, addCard),
}

export default trial