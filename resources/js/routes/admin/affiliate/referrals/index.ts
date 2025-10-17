import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AffiliateController::status
 * @see app/Http/Controllers/Admin/AffiliateController.php:199
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/affiliate/referrals/{referral}/status'
 */
export const status = (args: { locale?: string | number, referral: string | number } | [locale: string | number, referral: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

status.definition = {
    methods: ["put"],
    url: '/{locale?}/admin/affiliate/referrals/{referral}/status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AffiliateController::status
 * @see app/Http/Controllers/Admin/AffiliateController.php:199
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/affiliate/referrals/{referral}/status'
 */
status.url = (args: { locale?: string | number, referral: string | number } | [locale: string | number, referral: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    referral: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? 'es',
                                referral: args.referral,
                }

    return status.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{referral}', parsedArgs.referral.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliateController::status
 * @see app/Http/Controllers/Admin/AffiliateController.php:199
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/affiliate/referrals/{referral}/status'
 */
status.put = (args: { locale?: string | number, referral: string | number } | [locale: string | number, referral: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliateController::status
 * @see app/Http/Controllers/Admin/AffiliateController.php:199
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/affiliate/referrals/{referral}/status'
 */
    const statusForm = (args: { locale?: string | number, referral: string | number } | [locale: string | number, referral: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Admin/AffiliateController.php:199
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/affiliate/referrals/{referral}/status'
 */
        statusForm.put = (args: { locale?: string | number, referral: string | number } | [locale: string | number, referral: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
const referrals = {
    status: Object.assign(status, status),
}

export default referrals