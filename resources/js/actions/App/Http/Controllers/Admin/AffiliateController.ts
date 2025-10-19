import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\Admin\AffiliateController::updateRewardConfig
 * @see app/Http/Controllers/Admin/AffiliateController.php:175
 * @route '/{locale}/admin/affiliate/reward-config'
 */
export const updateRewardConfig = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateRewardConfig.url(args, options),
    method: 'post',
})

updateRewardConfig.definition = {
    methods: ["post"],
    url: '/{locale}/admin/affiliate/reward-config',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AffiliateController::updateRewardConfig
 * @see app/Http/Controllers/Admin/AffiliateController.php:175
 * @route '/{locale}/admin/affiliate/reward-config'
 */
updateRewardConfig.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateRewardConfig.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliateController::updateRewardConfig
 * @see app/Http/Controllers/Admin/AffiliateController.php:175
 * @route '/{locale}/admin/affiliate/reward-config'
 */
updateRewardConfig.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateRewardConfig.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliateController::updateRewardConfig
 * @see app/Http/Controllers/Admin/AffiliateController.php:175
 * @route '/{locale}/admin/affiliate/reward-config'
 */
    const updateRewardConfigForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateRewardConfig.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliateController::updateRewardConfig
 * @see app/Http/Controllers/Admin/AffiliateController.php:175
 * @route '/{locale}/admin/affiliate/reward-config'
 */
        updateRewardConfigForm.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateRewardConfig.url(args, options),
            method: 'post',
        })
    
    updateRewardConfig.form = updateRewardConfigForm
/**
* @see \App\Http\Controllers\Admin\AffiliateController::toggleCodeStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:192
 * @route '/{locale}/admin/affiliate/codes/{affiliateCode}/toggle'
 */
export const toggleCodeStatus = (args: { locale: string | number, affiliateCode: string | number } | [locale: string | number, affiliateCode: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleCodeStatus.url(args, options),
    method: 'post',
})

toggleCodeStatus.definition = {
    methods: ["post"],
    url: '/{locale}/admin/affiliate/codes/{affiliateCode}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AffiliateController::toggleCodeStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:192
 * @route '/{locale}/admin/affiliate/codes/{affiliateCode}/toggle'
 */
toggleCodeStatus.url = (args: { locale: string | number, affiliateCode: string | number } | [locale: string | number, affiliateCode: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    affiliateCode: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                affiliateCode: args.affiliateCode,
                }

    return toggleCodeStatus.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{affiliateCode}', parsedArgs.affiliateCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliateController::toggleCodeStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:192
 * @route '/{locale}/admin/affiliate/codes/{affiliateCode}/toggle'
 */
toggleCodeStatus.post = (args: { locale: string | number, affiliateCode: string | number } | [locale: string | number, affiliateCode: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleCodeStatus.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliateController::toggleCodeStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:192
 * @route '/{locale}/admin/affiliate/codes/{affiliateCode}/toggle'
 */
    const toggleCodeStatusForm = (args: { locale: string | number, affiliateCode: string | number } | [locale: string | number, affiliateCode: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleCodeStatus.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliateController::toggleCodeStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:192
 * @route '/{locale}/admin/affiliate/codes/{affiliateCode}/toggle'
 */
        toggleCodeStatusForm.post = (args: { locale: string | number, affiliateCode: string | number } | [locale: string | number, affiliateCode: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleCodeStatus.url(args, options),
            method: 'post',
        })
    
    toggleCodeStatus.form = toggleCodeStatusForm
/**
* @see \App\Http\Controllers\Admin\AffiliateController::updateReferralStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:209
 * @route '/{locale}/admin/affiliate/referrals/{referral}/status'
 */
export const updateReferralStatus = (args: { locale: string | number, referral: string | number } | [locale: string | number, referral: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateReferralStatus.url(args, options),
    method: 'put',
})

updateReferralStatus.definition = {
    methods: ["put"],
    url: '/{locale}/admin/affiliate/referrals/{referral}/status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AffiliateController::updateReferralStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:209
 * @route '/{locale}/admin/affiliate/referrals/{referral}/status'
 */
updateReferralStatus.url = (args: { locale: string | number, referral: string | number } | [locale: string | number, referral: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    referral: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                referral: args.referral,
                }

    return updateReferralStatus.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{referral}', parsedArgs.referral.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliateController::updateReferralStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:209
 * @route '/{locale}/admin/affiliate/referrals/{referral}/status'
 */
updateReferralStatus.put = (args: { locale: string | number, referral: string | number } | [locale: string | number, referral: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateReferralStatus.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliateController::updateReferralStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:209
 * @route '/{locale}/admin/affiliate/referrals/{referral}/status'
 */
    const updateReferralStatusForm = (args: { locale: string | number, referral: string | number } | [locale: string | number, referral: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateReferralStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliateController::updateReferralStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:209
 * @route '/{locale}/admin/affiliate/referrals/{referral}/status'
 */
        updateReferralStatusForm.put = (args: { locale: string | number, referral: string | number } | [locale: string | number, referral: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateReferralStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateReferralStatus.form = updateReferralStatusForm
/**
* @see \App\Http\Controllers\Admin\AffiliateController::updateRewardStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:228
 * @route '/{locale}/admin/affiliate/rewards/{reward}/status'
 */
export const updateRewardStatus = (args: { locale: string | number, reward: string | number } | [locale: string | number, reward: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRewardStatus.url(args, options),
    method: 'put',
})

updateRewardStatus.definition = {
    methods: ["put"],
    url: '/{locale}/admin/affiliate/rewards/{reward}/status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AffiliateController::updateRewardStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:228
 * @route '/{locale}/admin/affiliate/rewards/{reward}/status'
 */
updateRewardStatus.url = (args: { locale: string | number, reward: string | number } | [locale: string | number, reward: string | number ], options?: RouteQueryOptions) => {
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

    return updateRewardStatus.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{reward}', parsedArgs.reward.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AffiliateController::updateRewardStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:228
 * @route '/{locale}/admin/affiliate/rewards/{reward}/status'
 */
updateRewardStatus.put = (args: { locale: string | number, reward: string | number } | [locale: string | number, reward: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRewardStatus.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AffiliateController::updateRewardStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:228
 * @route '/{locale}/admin/affiliate/rewards/{reward}/status'
 */
    const updateRewardStatusForm = (args: { locale: string | number, reward: string | number } | [locale: string | number, reward: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateRewardStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AffiliateController::updateRewardStatus
 * @see app/Http/Controllers/Admin/AffiliateController.php:228
 * @route '/{locale}/admin/affiliate/rewards/{reward}/status'
 */
        updateRewardStatusForm.put = (args: { locale: string | number, reward: string | number } | [locale: string | number, reward: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateRewardStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateRewardStatus.form = updateRewardStatusForm
const AffiliateController = { index, codes, referrals, rewards, updateRewardConfig, toggleCodeStatus, updateReferralStatus, updateRewardStatus }

export default AffiliateController