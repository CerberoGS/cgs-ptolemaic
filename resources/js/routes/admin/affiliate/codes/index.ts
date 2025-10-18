import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AffiliateController::toggle
 * @see app/Http/Controllers/Admin/AffiliateController.php:192
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/affiliate/codes/{affiliateCode}/toggle'
 */
export const toggle = (args: { locale?: string | number, affiliateCode: string | number } | [locale: string | number, affiliateCode: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/{locale?}/admin/affiliate/codes/{affiliateCode}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AffiliateController::toggle
 * @see app/Http/Controllers/Admin/AffiliateController.php:192
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/affiliate/codes/{affiliateCode}/toggle'
 */
toggle.url = (args: { locale?: string | number, affiliateCode: string | number } | [locale: string | number, affiliateCode: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    affiliateCode: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? 'es',
                                affiliateCode: args.affiliateCode,
                }

    return toggle.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{affiliateCode}', parsedArgs.affiliateCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliateController::toggle
 * @see app/Http/Controllers/Admin/AffiliateController.php:192
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/affiliate/codes/{affiliateCode}/toggle'
 */
toggle.post = (args: { locale?: string | number, affiliateCode: string | number } | [locale: string | number, affiliateCode: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliateController::toggle
 * @see app/Http/Controllers/Admin/AffiliateController.php:192
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/affiliate/codes/{affiliateCode}/toggle'
 */
    const toggleForm = (args: { locale?: string | number, affiliateCode: string | number } | [locale: string | number, affiliateCode: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliateController::toggle
 * @see app/Http/Controllers/Admin/AffiliateController.php:192
 * @param locale - Default: 'es'
 * @route '/{locale?}/admin/affiliate/codes/{affiliateCode}/toggle'
 */
        toggleForm.post = (args: { locale?: string | number, affiliateCode: string | number } | [locale: string | number, affiliateCode: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, options),
            method: 'post',
        })
    
    toggle.form = toggleForm
const codes = {
    toggle: Object.assign(toggle, toggle),
}

export default codes