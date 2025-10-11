import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
import providers from './providers'
import users from './users'
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: 'es'
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
 * @param locale - Default: 'es'
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
                        locale: args?.locale ?? 'es',
                }

    return dashboard.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin'
 */
dashboard.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin'
 */
dashboard.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin'
 */
    const dashboardForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin'
 */
        dashboardForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: 'es'
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
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
providers: Object.assign(providers, providers),
users: Object.assign(users, users),
}

export default admin