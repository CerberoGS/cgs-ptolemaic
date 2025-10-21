import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\UserPlanController::edit
 * @see app/Http/Controllers/Admin/UserPlanController.php:19
 * @route '/{locale}/admin/users/{user}/plan'
 */
export const edit = (args: { locale: string | number, user: string | number | { id: string | number } } | [locale: string | number, user: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/{locale}/admin/users/{user}/plan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\UserPlanController::edit
 * @see app/Http/Controllers/Admin/UserPlanController.php:19
 * @route '/{locale}/admin/users/{user}/plan'
 */
edit.url = (args: { locale: string | number, user: string | number | { id: string | number } } | [locale: string | number, user: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    user: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return edit.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserPlanController::edit
 * @see app/Http/Controllers/Admin/UserPlanController.php:19
 * @route '/{locale}/admin/users/{user}/plan'
 */
edit.get = (args: { locale: string | number, user: string | number | { id: string | number } } | [locale: string | number, user: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\UserPlanController::edit
 * @see app/Http/Controllers/Admin/UserPlanController.php:19
 * @route '/{locale}/admin/users/{user}/plan'
 */
edit.head = (args: { locale: string | number, user: string | number | { id: string | number } } | [locale: string | number, user: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\UserPlanController::edit
 * @see app/Http/Controllers/Admin/UserPlanController.php:19
 * @route '/{locale}/admin/users/{user}/plan'
 */
    const editForm = (args: { locale: string | number, user: string | number | { id: string | number } } | [locale: string | number, user: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\UserPlanController::edit
 * @see app/Http/Controllers/Admin/UserPlanController.php:19
 * @route '/{locale}/admin/users/{user}/plan'
 */
        editForm.get = (args: { locale: string | number, user: string | number | { id: string | number } } | [locale: string | number, user: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\UserPlanController::edit
 * @see app/Http/Controllers/Admin/UserPlanController.php:19
 * @route '/{locale}/admin/users/{user}/plan'
 */
        editForm.head = (args: { locale: string | number, user: string | number | { id: string | number } } | [locale: string | number, user: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\UserPlanController::update
 * @see app/Http/Controllers/Admin/UserPlanController.php:59
 * @route '/{locale}/admin/users/{user}/plan'
 */
export const update = (args: { locale: string | number, user: string | number | { id: string | number } } | [locale: string | number, user: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/{locale}/admin/users/{user}/plan',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\UserPlanController::update
 * @see app/Http/Controllers/Admin/UserPlanController.php:59
 * @route '/{locale}/admin/users/{user}/plan'
 */
update.url = (args: { locale: string | number, user: string | number | { id: string | number } } | [locale: string | number, user: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    user: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return update.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserPlanController::update
 * @see app/Http/Controllers/Admin/UserPlanController.php:59
 * @route '/{locale}/admin/users/{user}/plan'
 */
update.put = (args: { locale: string | number, user: string | number | { id: string | number } } | [locale: string | number, user: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\UserPlanController::update
 * @see app/Http/Controllers/Admin/UserPlanController.php:59
 * @route '/{locale}/admin/users/{user}/plan'
 */
    const updateForm = (args: { locale: string | number, user: string | number | { id: string | number } } | [locale: string | number, user: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\UserPlanController::update
 * @see app/Http/Controllers/Admin/UserPlanController.php:59
 * @route '/{locale}/admin/users/{user}/plan'
 */
        updateForm.put = (args: { locale: string | number, user: string | number | { id: string | number } } | [locale: string | number, user: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const UserPlanController = { edit, update }

export default UserPlanController