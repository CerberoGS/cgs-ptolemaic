import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PricingController::index
 * @see app/Http/Controllers/PricingController.php:12
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing'
 */
export const index = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale?}/api/pricing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PricingController::index
 * @see app/Http/Controllers/PricingController.php:12
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing'
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
* @see \App\Http\Controllers\PricingController::index
 * @see app/Http/Controllers/PricingController.php:12
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing'
 */
index.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PricingController::index
 * @see app/Http/Controllers/PricingController.php:12
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing'
 */
index.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PricingController::index
 * @see app/Http/Controllers/PricingController.php:12
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing'
 */
    const indexForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PricingController::index
 * @see app/Http/Controllers/PricingController.php:12
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing'
 */
        indexForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PricingController::index
 * @see app/Http/Controllers/PricingController.php:12
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing'
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
* @see \App\Http\Controllers\PricingController::show
 * @see app/Http/Controllers/PricingController.php:69
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing/{planType}'
 */
export const show = (args: { locale?: string | number, planType: string | number } | [locale: string | number, planType: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{locale?}/api/pricing/{planType}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PricingController::show
 * @see app/Http/Controllers/PricingController.php:69
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing/{planType}'
 */
show.url = (args: { locale?: string | number, planType: string | number } | [locale: string | number, planType: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    planType: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? '$locale',
                                planType: args.planType,
                }

    return show.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{planType}', parsedArgs.planType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PricingController::show
 * @see app/Http/Controllers/PricingController.php:69
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing/{planType}'
 */
show.get = (args: { locale?: string | number, planType: string | number } | [locale: string | number, planType: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PricingController::show
 * @see app/Http/Controllers/PricingController.php:69
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing/{planType}'
 */
show.head = (args: { locale?: string | number, planType: string | number } | [locale: string | number, planType: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PricingController::show
 * @see app/Http/Controllers/PricingController.php:69
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing/{planType}'
 */
    const showForm = (args: { locale?: string | number, planType: string | number } | [locale: string | number, planType: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PricingController::show
 * @see app/Http/Controllers/PricingController.php:69
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing/{planType}'
 */
        showForm.get = (args: { locale?: string | number, planType: string | number } | [locale: string | number, planType: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PricingController::show
 * @see app/Http/Controllers/PricingController.php:69
 * @param locale - Default: '$locale'
 * @route '/{locale?}/api/pricing/{planType}'
 */
        showForm.head = (args: { locale?: string | number, planType: string | number } | [locale: string | number, planType: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm