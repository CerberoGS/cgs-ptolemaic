import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::store
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:14
 * @param locale - Default: 'es'
 * @route '/{locale?}/email/verification-notification'
 */
export const store = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{locale?}/email/verification-notification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::store
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:14
 * @param locale - Default: 'es'
 * @route '/{locale?}/email/verification-notification'
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
                        locale: args?.locale ?? 'es',
                }

    return store.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::store
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:14
 * @param locale - Default: 'es'
 * @route '/{locale?}/email/verification-notification'
 */
store.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::store
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:14
 * @param locale - Default: 'es'
 * @route '/{locale?}/email/verification-notification'
 */
    const storeForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::store
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:14
 * @param locale - Default: 'es'
 * @route '/{locale?}/email/verification-notification'
 */
        storeForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const EmailVerificationNotificationController = { store }

export default EmailVerificationNotificationController