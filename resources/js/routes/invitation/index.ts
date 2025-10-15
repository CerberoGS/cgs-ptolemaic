import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\InvitationRedemptionController::show
 * @see app/Http/Controllers/InvitationRedemptionController.php:16
 * @route '/invite/{code}'
 */
export const show = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/invite/{code}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvitationRedemptionController::show
 * @see app/Http/Controllers/InvitationRedemptionController.php:16
 * @route '/invite/{code}'
 */
show.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    code: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        code: args.code,
                }

    return show.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationRedemptionController::show
 * @see app/Http/Controllers/InvitationRedemptionController.php:16
 * @route '/invite/{code}'
 */
show.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\InvitationRedemptionController::show
 * @see app/Http/Controllers/InvitationRedemptionController.php:16
 * @route '/invite/{code}'
 */
show.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\InvitationRedemptionController::show
 * @see app/Http/Controllers/InvitationRedemptionController.php:16
 * @route '/invite/{code}'
 */
    const showForm = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\InvitationRedemptionController::show
 * @see app/Http/Controllers/InvitationRedemptionController.php:16
 * @route '/invite/{code}'
 */
        showForm.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\InvitationRedemptionController::show
 * @see app/Http/Controllers/InvitationRedemptionController.php:16
 * @route '/invite/{code}'
 */
        showForm.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\InvitationRedemptionController::redeem
 * @see app/Http/Controllers/InvitationRedemptionController.php:59
 * @route '/invite/{code}/redeem'
 */
export const redeem = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: redeem.url(args, options),
    method: 'post',
})

redeem.definition = {
    methods: ["post"],
    url: '/invite/{code}/redeem',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvitationRedemptionController::redeem
 * @see app/Http/Controllers/InvitationRedemptionController.php:59
 * @route '/invite/{code}/redeem'
 */
redeem.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    code: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        code: args.code,
                }

    return redeem.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationRedemptionController::redeem
 * @see app/Http/Controllers/InvitationRedemptionController.php:59
 * @route '/invite/{code}/redeem'
 */
redeem.post = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: redeem.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InvitationRedemptionController::redeem
 * @see app/Http/Controllers/InvitationRedemptionController.php:59
 * @route '/invite/{code}/redeem'
 */
    const redeemForm = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: redeem.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InvitationRedemptionController::redeem
 * @see app/Http/Controllers/InvitationRedemptionController.php:59
 * @route '/invite/{code}/redeem'
 */
        redeemForm.post = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: redeem.url(args, options),
            method: 'post',
        })
    
    redeem.form = redeemForm
const invitation = {
    show: Object.assign(show, show),
redeem: Object.assign(redeem, redeem),
}

export default invitation