import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::webhook
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:142
 * @param locale - Default: 'es'
 * @route '/{locale?}/telegram/webhook'
 */
export const webhook = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(args, options),
    method: 'post',
})

webhook.definition = {
    methods: ["post"],
    url: '/{locale?}/telegram/webhook',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::webhook
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:142
 * @param locale - Default: 'es'
 * @route '/{locale?}/telegram/webhook'
 */
webhook.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return webhook.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::webhook
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:142
 * @param locale - Default: 'es'
 * @route '/{locale?}/telegram/webhook'
 */
webhook.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::webhook
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:142
 * @param locale - Default: 'es'
 * @route '/{locale?}/telegram/webhook'
 */
    const webhookForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: webhook.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::webhook
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:142
 * @param locale - Default: 'es'
 * @route '/{locale?}/telegram/webhook'
 */
        webhookForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: webhook.url(args, options),
            method: 'post',
        })
    
    webhook.form = webhookForm
const telegram = {
    webhook: Object.assign(webhook, webhook),
}

export default telegram