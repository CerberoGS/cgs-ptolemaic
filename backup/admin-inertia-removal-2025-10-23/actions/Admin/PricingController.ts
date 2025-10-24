import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PricingController::index
 * @see app/Http/Controllers/Admin/PricingController.php:15
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing'
 */
export const index = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale?}/admin/pricing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PricingController::index
 * @see app/Http/Controllers/Admin/PricingController.php:15
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing'
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
* @see \App\Http\Controllers\Admin\PricingController::index
 * @see app/Http/Controllers/Admin/PricingController.php:15
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing'
 */
index.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PricingController::index
 * @see app/Http/Controllers/Admin/PricingController.php:15
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing'
 */
index.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PricingController::index
 * @see app/Http/Controllers/Admin/PricingController.php:15
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing'
 */
    const indexForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PricingController::index
 * @see app/Http/Controllers/Admin/PricingController.php:15
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing'
 */
        indexForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PricingController::index
 * @see app/Http/Controllers/Admin/PricingController.php:15
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing'
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
* @see \App\Http\Controllers\Admin\PricingController::edit
 * @see app/Http/Controllers/Admin/PricingController.php:53
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/edit'
 */
export const edit = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/{locale?}/admin/pricing/{pricingPlan}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PricingController::edit
 * @see app/Http/Controllers/Admin/PricingController.php:53
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/edit'
 */
edit.url = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    pricingPlan: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? '$locale',
                                pricingPlan: args.pricingPlan,
                }

    return edit.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{pricingPlan}', parsedArgs.pricingPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingController::edit
 * @see app/Http/Controllers/Admin/PricingController.php:53
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/edit'
 */
edit.get = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PricingController::edit
 * @see app/Http/Controllers/Admin/PricingController.php:53
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/edit'
 */
edit.head = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PricingController::edit
 * @see app/Http/Controllers/Admin/PricingController.php:53
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/edit'
 */
    const editForm = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PricingController::edit
 * @see app/Http/Controllers/Admin/PricingController.php:53
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/edit'
 */
        editForm.get = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PricingController::edit
 * @see app/Http/Controllers/Admin/PricingController.php:53
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/edit'
 */
        editForm.head = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\PricingController::update
 * @see app/Http/Controllers/Admin/PricingController.php:85
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}'
 */
export const update = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/{locale?}/admin/pricing/{pricingPlan}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\PricingController::update
 * @see app/Http/Controllers/Admin/PricingController.php:85
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}'
 */
update.url = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    pricingPlan: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? '$locale',
                                pricingPlan: args.pricingPlan,
                }

    return update.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{pricingPlan}', parsedArgs.pricingPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingController::update
 * @see app/Http/Controllers/Admin/PricingController.php:85
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}'
 */
update.put = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\PricingController::update
 * @see app/Http/Controllers/Admin/PricingController.php:85
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}'
 */
    const updateForm = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PricingController::update
 * @see app/Http/Controllers/Admin/PricingController.php:85
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}'
 */
        updateForm.put = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\PricingController::toggleOffer
 * @see app/Http/Controllers/Admin/PricingController.php:110
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/toggle-offer'
 */
export const toggleOffer = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleOffer.url(args, options),
    method: 'post',
})

toggleOffer.definition = {
    methods: ["post"],
    url: '/{locale?}/admin/pricing/{pricingPlan}/toggle-offer',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PricingController::toggleOffer
 * @see app/Http/Controllers/Admin/PricingController.php:110
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/toggle-offer'
 */
toggleOffer.url = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    pricingPlan: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? '$locale',
                                pricingPlan: args.pricingPlan,
                }

    return toggleOffer.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{pricingPlan}', parsedArgs.pricingPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingController::toggleOffer
 * @see app/Http/Controllers/Admin/PricingController.php:110
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/toggle-offer'
 */
toggleOffer.post = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleOffer.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PricingController::toggleOffer
 * @see app/Http/Controllers/Admin/PricingController.php:110
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/toggle-offer'
 */
    const toggleOfferForm = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleOffer.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PricingController::toggleOffer
 * @see app/Http/Controllers/Admin/PricingController.php:110
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/toggle-offer'
 */
        toggleOfferForm.post = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleOffer.url(args, options),
            method: 'post',
        })
    
    toggleOffer.form = toggleOfferForm
/**
* @see \App\Http\Controllers\Admin\PricingController::toggleScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:129
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/toggle-scarcity'
 */
export const toggleScarcity = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleScarcity.url(args, options),
    method: 'post',
})

toggleScarcity.definition = {
    methods: ["post"],
    url: '/{locale?}/admin/pricing/{pricingPlan}/toggle-scarcity',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PricingController::toggleScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:129
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/toggle-scarcity'
 */
toggleScarcity.url = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    pricingPlan: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? '$locale',
                                pricingPlan: args.pricingPlan,
                }

    return toggleScarcity.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{pricingPlan}', parsedArgs.pricingPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingController::toggleScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:129
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/toggle-scarcity'
 */
toggleScarcity.post = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleScarcity.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PricingController::toggleScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:129
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/toggle-scarcity'
 */
    const toggleScarcityForm = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleScarcity.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PricingController::toggleScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:129
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/toggle-scarcity'
 */
        toggleScarcityForm.post = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleScarcity.url(args, options),
            method: 'post',
        })
    
    toggleScarcity.form = toggleScarcityForm
/**
* @see \App\Http\Controllers\Admin\PricingController::incrementScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:148
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/increment-scarcity'
 */
export const incrementScarcity = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: incrementScarcity.url(args, options),
    method: 'post',
})

incrementScarcity.definition = {
    methods: ["post"],
    url: '/{locale?}/admin/pricing/{pricingPlan}/increment-scarcity',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PricingController::incrementScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:148
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/increment-scarcity'
 */
incrementScarcity.url = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    pricingPlan: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? '$locale',
                                pricingPlan: args.pricingPlan,
                }

    return incrementScarcity.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{pricingPlan}', parsedArgs.pricingPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingController::incrementScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:148
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/increment-scarcity'
 */
incrementScarcity.post = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: incrementScarcity.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PricingController::incrementScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:148
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/increment-scarcity'
 */
    const incrementScarcityForm = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: incrementScarcity.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PricingController::incrementScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:148
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/increment-scarcity'
 */
        incrementScarcityForm.post = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: incrementScarcity.url(args, options),
            method: 'post',
        })
    
    incrementScarcity.form = incrementScarcityForm
/**
* @see \App\Http\Controllers\Admin\PricingController::resetScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:165
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/reset-scarcity'
 */
export const resetScarcity = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetScarcity.url(args, options),
    method: 'post',
})

resetScarcity.definition = {
    methods: ["post"],
    url: '/{locale?}/admin/pricing/{pricingPlan}/reset-scarcity',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PricingController::resetScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:165
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/reset-scarcity'
 */
resetScarcity.url = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    pricingPlan: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args.locale ?? '$locale',
                                pricingPlan: args.pricingPlan,
                }

    return resetScarcity.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace('{pricingPlan}', parsedArgs.pricingPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingController::resetScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:165
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/reset-scarcity'
 */
resetScarcity.post = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetScarcity.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PricingController::resetScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:165
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/reset-scarcity'
 */
    const resetScarcityForm = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resetScarcity.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PricingController::resetScarcity
 * @see app/Http/Controllers/Admin/PricingController.php:165
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/pricing/{pricingPlan}/reset-scarcity'
 */
        resetScarcityForm.post = (args: { locale?: string | number, pricingPlan: string | number } | [locale: string | number, pricingPlan: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resetScarcity.url(args, options),
            method: 'post',
        })
    
    resetScarcity.form = resetScarcityForm
const PricingController = { index, edit, update, toggleOffer, toggleScarcity, incrementScarcity, resetScarcity }

export default PricingController