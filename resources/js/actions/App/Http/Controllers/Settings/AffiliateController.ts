import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\AffiliateController::index
 * @see app/Http/Controllers/Settings/AffiliateController.php:24
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate'
 */
export const index = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale?}/settings/affiliate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\AffiliateController::index
 * @see app/Http/Controllers/Settings/AffiliateController.php:24
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate'
 */
index.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\AffiliateController::index
 * @see app/Http/Controllers/Settings/AffiliateController.php:24
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate'
 */
index.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\AffiliateController::index
 * @see app/Http/Controllers/Settings/AffiliateController.php:24
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate'
 */
index.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\AffiliateController::index
 * @see app/Http/Controllers/Settings/AffiliateController.php:24
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate'
 */
    const indexForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\AffiliateController::index
 * @see app/Http/Controllers/Settings/AffiliateController.php:24
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate'
 */
        indexForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\AffiliateController::index
 * @see app/Http/Controllers/Settings/AffiliateController.php:24
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate'
 */
        indexForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Settings\AffiliateController::redeemDiscount
 * @see app/Http/Controllers/Settings/AffiliateController.php:46
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate/redeem-discount'
 */
export const redeemDiscount = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: redeemDiscount.url(args, options),
    method: 'post',
})

redeemDiscount.definition = {
    methods: ["post"],
    url: '/{locale?}/settings/affiliate/redeem-discount',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\AffiliateController::redeemDiscount
 * @see app/Http/Controllers/Settings/AffiliateController.php:46
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate/redeem-discount'
 */
redeemDiscount.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return redeemDiscount.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\AffiliateController::redeemDiscount
 * @see app/Http/Controllers/Settings/AffiliateController.php:46
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate/redeem-discount'
 */
redeemDiscount.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: redeemDiscount.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Settings\AffiliateController::redeemDiscount
 * @see app/Http/Controllers/Settings/AffiliateController.php:46
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate/redeem-discount'
 */
    const redeemDiscountForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: redeemDiscount.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\AffiliateController::redeemDiscount
 * @see app/Http/Controllers/Settings/AffiliateController.php:46
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate/redeem-discount'
 */
        redeemDiscountForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: redeemDiscount.url(args, options),
            method: 'post',
        })
    
    redeemDiscount.form = redeemDiscountForm
/**
* @see \App\Http\Controllers\Settings\AffiliateController::copyLink
 * @see app/Http/Controllers/Settings/AffiliateController.php:60
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate/copy-link'
 */
export const copyLink = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: copyLink.url(args, options),
    method: 'post',
})

copyLink.definition = {
    methods: ["post"],
    url: '/{locale?}/settings/affiliate/copy-link',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\AffiliateController::copyLink
 * @see app/Http/Controllers/Settings/AffiliateController.php:60
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate/copy-link'
 */
copyLink.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return copyLink.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\AffiliateController::copyLink
 * @see app/Http/Controllers/Settings/AffiliateController.php:60
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate/copy-link'
 */
copyLink.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: copyLink.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Settings\AffiliateController::copyLink
 * @see app/Http/Controllers/Settings/AffiliateController.php:60
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate/copy-link'
 */
    const copyLinkForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: copyLink.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\AffiliateController::copyLink
 * @see app/Http/Controllers/Settings/AffiliateController.php:60
 * @param locale - Default: '$locale'
 * @route '/{locale?}/settings/affiliate/copy-link'
 */
        copyLinkForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: copyLink.url(args, options),
            method: 'post',
        })
    
    copyLink.form = copyLinkForm
const AffiliateController = { index, redeemDiscount, copyLink }

export default AffiliateController