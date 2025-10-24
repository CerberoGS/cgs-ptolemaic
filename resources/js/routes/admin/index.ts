import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
import telegramConfig826c57 from './telegram-config'
/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::telegramConfig
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
export const telegramConfig = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: telegramConfig.url(args, options),
    method: 'get',
})

telegramConfig.definition = {
    methods: ["get","head"],
    url: '/{locale?}/admin/telegram-config',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::telegramConfig
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
telegramConfig.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return telegramConfig.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::telegramConfig
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
telegramConfig.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: telegramConfig.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::telegramConfig
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
telegramConfig.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: telegramConfig.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::telegramConfig
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
    const telegramConfigForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: telegramConfig.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::telegramConfig
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
        telegramConfigForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: telegramConfig.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::telegramConfig
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
        telegramConfigForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: telegramConfig.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    telegramConfig.form = telegramConfigForm
const admin = {
    telegramConfig: Object.assign(telegramConfig, telegramConfig826c57),
}

export default admin