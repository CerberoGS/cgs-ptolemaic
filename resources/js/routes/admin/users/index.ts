import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import roles from './roles'
import defaults from './defaults'
import plan from './plan'
/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @route '/{locale}/admin/users'
 */
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @route '/{locale}/admin/users'
 */
index.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return index.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @route '/{locale}/admin/users'
 */
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @route '/{locale}/admin/users'
 */
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @route '/{locale}/admin/users'
 */
    const indexForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @route '/{locale}/admin/users'
 */
        indexForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminUserController::index
 * @see app/Http/Controllers/Admin/AdminUserController.php:17
 * @route '/{locale}/admin/users'
 */
        indexForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const users = {
    index: Object.assign(index, index),
roles: Object.assign(roles, roles),
defaults: Object.assign(defaults, defaults),
plan: Object.assign(plan, plan),
}

export default users