import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
import providers from './providers'
import users from './users'
import roles from './roles'
import feedback from './feedback'
import invitations from './invitations'
import pricing from './pricing'
import languages from './languages'
import affiliate from './affiliate'
import waitlist from './waitlist'
import telegramConfig826c57 from './telegram-config'
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin'
 */
export const dashboard = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(args, options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/{locale?}/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin'
 */
dashboard.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return dashboard.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin'
 */
dashboard.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin'
 */
dashboard.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin'
 */
    const dashboardForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin'
 */
        dashboardForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin'
 */
        dashboardForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::telegramConfig
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
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
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
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
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
telegramConfig.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: telegramConfig.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::telegramConfig
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
telegramConfig.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: telegramConfig.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::telegramConfig
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
    const telegramConfigForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: telegramConfig.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::telegramConfig
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
        telegramConfigForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: telegramConfig.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::telegramConfig
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
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
    dashboard: Object.assign(dashboard, dashboard),
providers: Object.assign(providers, providers),
users: Object.assign(users, users),
roles: Object.assign(roles, roles),
feedback: Object.assign(feedback, feedback),
invitations: Object.assign(invitations, invitations),
pricing: Object.assign(pricing, pricing),
languages: Object.assign(languages, languages),
affiliate: Object.assign(affiliate, affiliate),
waitlist: Object.assign(waitlist, waitlist),
telegramConfig: Object.assign(telegramConfig, telegramConfig826c57),
}

export default admin