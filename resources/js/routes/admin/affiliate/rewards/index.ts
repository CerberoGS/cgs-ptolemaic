import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AffiliateController::status
 * @see app/Http/Controllers/Admin/AffiliateController.php:228
 * @route '/{locale}/admin/affiliate/rewards/{reward}/status'
 */
export const status = (args: { locale: string | number, reward: string | number } | [locale: string | number, reward: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

status.definition = {
    methods: ["put"],
    url: '/{locale}/admin/affiliate/rewards/{reward}/status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AffiliateController::status
 * @see app/Http/Controllers/Admin/AffiliateController.php:228
 * @route '/{locale}/admin/affiliate/rewards/{reward}/status'
 */
status.url = (args: { locale: string | number, reward: string | number } | [locale: string | number, reward: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    reward: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                reward: args.reward,
                }

    return status.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{reward}', parsedArgs.reward.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliateController::status
 * @see app/Http/Controllers/Admin/AffiliateController.php:228
 * @route '/{locale}/admin/affiliate/rewards/{reward}/status'
 */
status.put = (args: { locale: string | number, reward: string | number } | [locale: string | number, reward: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliateController::status
 * @see app/Http/Controllers/Admin/AffiliateController.php:228
 * @route '/{locale}/admin/affiliate/rewards/{reward}/status'
 */
    const statusForm = (args: { locale: string | number, reward: string | number } | [locale: string | number, reward: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliateController::status
 * @see app/Http/Controllers/Admin/AffiliateController.php:228
 * @route '/{locale}/admin/affiliate/rewards/{reward}/status'
 */
        statusForm.put = (args: { locale: string | number, reward: string | number } | [locale: string | number, reward: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
const rewards = {
    status: Object.assign(status, status),
}

export default rewards