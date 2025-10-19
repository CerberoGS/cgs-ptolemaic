import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import codes0f209c from './codes'
import referralsA7ebb0 from './referrals'
import rewardsA1df06 from './rewards'
/**
* @see \App\Http\Controllers\Admin\AffiliateController::index
 * @see app/Http/Controllers/Admin/AffiliateController.php:27
 * @route '/{locale}/admin/affiliate'
 */
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/admin/affiliate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AffiliateController::index
 * @see app/Http/Controllers/Admin/AffiliateController.php:27
 * @route '/{locale}/admin/affiliate'
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
* @see \App\Http\Controllers\Admin\AffiliateController::index
 * @see app/Http/Controllers/Admin/AffiliateController.php:27
 * @route '/{locale}/admin/affiliate'
 */
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AffiliateController::index
 * @see app/Http/Controllers/Admin/AffiliateController.php:27
 * @route '/{locale}/admin/affiliate'
 */
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliateController::index
 * @see app/Http/Controllers/Admin/AffiliateController.php:27
 * @route '/{locale}/admin/affiliate'
 */
    const indexForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliateController::index
 * @see app/Http/Controllers/Admin/AffiliateController.php:27
 * @route '/{locale}/admin/affiliate'
 */
        indexForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AffiliateController::index
 * @see app/Http/Controllers/Admin/AffiliateController.php:27
 * @route '/{locale}/admin/affiliate'
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
/**
* @see \App\Http\Controllers\Admin\AffiliateController::codes
 * @see app/Http/Controllers/Admin/AffiliateController.php:81
 * @route '/{locale}/admin/affiliate/codes'
 */
export const codes = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: codes.url(args, options),
    method: 'get',
})

codes.definition = {
    methods: ["get","head"],
    url: '/{locale}/admin/affiliate/codes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AffiliateController::codes
 * @see app/Http/Controllers/Admin/AffiliateController.php:81
 * @route '/{locale}/admin/affiliate/codes'
 */
codes.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return codes.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliateController::codes
 * @see app/Http/Controllers/Admin/AffiliateController.php:81
 * @route '/{locale}/admin/affiliate/codes'
 */
codes.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: codes.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AffiliateController::codes
 * @see app/Http/Controllers/Admin/AffiliateController.php:81
 * @route '/{locale}/admin/affiliate/codes'
 */
codes.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: codes.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliateController::codes
 * @see app/Http/Controllers/Admin/AffiliateController.php:81
 * @route '/{locale}/admin/affiliate/codes'
 */
    const codesForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: codes.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliateController::codes
 * @see app/Http/Controllers/Admin/AffiliateController.php:81
 * @route '/{locale}/admin/affiliate/codes'
 */
        codesForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: codes.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AffiliateController::codes
 * @see app/Http/Controllers/Admin/AffiliateController.php:81
 * @route '/{locale}/admin/affiliate/codes'
 */
        codesForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: codes.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    codes.form = codesForm
/**
* @see \App\Http\Controllers\Admin\AffiliateController::referrals
 * @see app/Http/Controllers/Admin/AffiliateController.php:117
 * @route '/{locale}/admin/affiliate/referrals'
 */
export const referrals = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: referrals.url(args, options),
    method: 'get',
})

referrals.definition = {
    methods: ["get","head"],
    url: '/{locale}/admin/affiliate/referrals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AffiliateController::referrals
 * @see app/Http/Controllers/Admin/AffiliateController.php:117
 * @route '/{locale}/admin/affiliate/referrals'
 */
referrals.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return referrals.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliateController::referrals
 * @see app/Http/Controllers/Admin/AffiliateController.php:117
 * @route '/{locale}/admin/affiliate/referrals'
 */
referrals.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: referrals.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AffiliateController::referrals
 * @see app/Http/Controllers/Admin/AffiliateController.php:117
 * @route '/{locale}/admin/affiliate/referrals'
 */
referrals.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: referrals.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliateController::referrals
 * @see app/Http/Controllers/Admin/AffiliateController.php:117
 * @route '/{locale}/admin/affiliate/referrals'
 */
    const referralsForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: referrals.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliateController::referrals
 * @see app/Http/Controllers/Admin/AffiliateController.php:117
 * @route '/{locale}/admin/affiliate/referrals'
 */
        referralsForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: referrals.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AffiliateController::referrals
 * @see app/Http/Controllers/Admin/AffiliateController.php:117
 * @route '/{locale}/admin/affiliate/referrals'
 */
        referralsForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: referrals.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    referrals.form = referralsForm
/**
* @see \App\Http\Controllers\Admin\AffiliateController::rewards
 * @see app/Http/Controllers/Admin/AffiliateController.php:146
 * @route '/{locale}/admin/affiliate/rewards'
 */
export const rewards = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rewards.url(args, options),
    method: 'get',
})

rewards.definition = {
    methods: ["get","head"],
    url: '/{locale}/admin/affiliate/rewards',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AffiliateController::rewards
 * @see app/Http/Controllers/Admin/AffiliateController.php:146
 * @route '/{locale}/admin/affiliate/rewards'
 */
rewards.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return rewards.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliateController::rewards
 * @see app/Http/Controllers/Admin/AffiliateController.php:146
 * @route '/{locale}/admin/affiliate/rewards'
 */
rewards.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rewards.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AffiliateController::rewards
 * @see app/Http/Controllers/Admin/AffiliateController.php:146
 * @route '/{locale}/admin/affiliate/rewards'
 */
rewards.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rewards.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliateController::rewards
 * @see app/Http/Controllers/Admin/AffiliateController.php:146
 * @route '/{locale}/admin/affiliate/rewards'
 */
    const rewardsForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: rewards.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliateController::rewards
 * @see app/Http/Controllers/Admin/AffiliateController.php:146
 * @route '/{locale}/admin/affiliate/rewards'
 */
        rewardsForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rewards.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AffiliateController::rewards
 * @see app/Http/Controllers/Admin/AffiliateController.php:146
 * @route '/{locale}/admin/affiliate/rewards'
 */
        rewardsForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rewards.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    rewards.form = rewardsForm
/**
* @see \App\Http\Controllers\Admin\AffiliateController::rewardConfig
 * @see app/Http/Controllers/Admin/AffiliateController.php:175
 * @route '/{locale}/admin/affiliate/reward-config'
 */
export const rewardConfig = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rewardConfig.url(args, options),
    method: 'post',
})

rewardConfig.definition = {
    methods: ["post"],
    url: '/{locale}/admin/affiliate/reward-config',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AffiliateController::rewardConfig
 * @see app/Http/Controllers/Admin/AffiliateController.php:175
 * @route '/{locale}/admin/affiliate/reward-config'
 */
rewardConfig.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return rewardConfig.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliateController::rewardConfig
 * @see app/Http/Controllers/Admin/AffiliateController.php:175
 * @route '/{locale}/admin/affiliate/reward-config'
 */
rewardConfig.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rewardConfig.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliateController::rewardConfig
 * @see app/Http/Controllers/Admin/AffiliateController.php:175
 * @route '/{locale}/admin/affiliate/reward-config'
 */
    const rewardConfigForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rewardConfig.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliateController::rewardConfig
 * @see app/Http/Controllers/Admin/AffiliateController.php:175
 * @route '/{locale}/admin/affiliate/reward-config'
 */
        rewardConfigForm.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rewardConfig.url(args, options),
            method: 'post',
        })
    
    rewardConfig.form = rewardConfigForm
const affiliate = {
    index: Object.assign(index, index),
codes: Object.assign(codes, codes0f209c),
referrals: Object.assign(referrals, referralsA7ebb0),
rewards: Object.assign(rewards, rewardsA1df06),
rewardConfig: Object.assign(rewardConfig, rewardConfig),
}

export default affiliate