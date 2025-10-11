import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin'
 */
const AdminDashboardController = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminDashboardController.url(args, options),
    method: 'get',
})

AdminDashboardController.definition = {
    methods: ["get","head"],
    url: '/{locale?}/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin'
 */
AdminDashboardController.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return AdminDashboardController.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin'
 */
AdminDashboardController.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminDashboardController.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin'
 */
AdminDashboardController.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: AdminDashboardController.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin'
 */
    const AdminDashboardControllerForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: AdminDashboardController.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin'
 */
        AdminDashboardControllerForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminDashboardController.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:18
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin'
 */
        AdminDashboardControllerForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminDashboardController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    AdminDashboardController.form = AdminDashboardControllerForm
export default AdminDashboardController