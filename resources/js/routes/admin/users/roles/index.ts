import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminUserController::update
 * @see app/Http/Controllers/Admin/AdminUserController.php:82
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/roles'
 */
export const update = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/{locale?}/admin/users/{user}/roles',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AdminUserController::update
 * @see app/Http/Controllers/Admin/AdminUserController.php:82
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/roles'
 */
update.url = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    user: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? 'es',
                                user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return update.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminUserController::update
 * @see app/Http/Controllers/Admin/AdminUserController.php:82
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/roles'
 */
update.put = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AdminUserController::update
 * @see app/Http/Controllers/Admin/AdminUserController.php:82
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/roles'
 */
    const updateForm = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminUserController::update
 * @see app/Http/Controllers/Admin/AdminUserController.php:82
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/users/{user}/roles'
 */
        updateForm.put = (args: { locale?: string | number, user: number | { id: number } } | [locale: string | number, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const roles = {
    update: Object.assign(update, update),
}

export default roles