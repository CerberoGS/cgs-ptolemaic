import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\LanguageController::index
 * @see app/Http/Controllers/Admin/LanguageController.php:17
 * @route '/{locale}/admin/languages'
 */
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/admin/languages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LanguageController::index
 * @see app/Http/Controllers/Admin/LanguageController.php:17
 * @route '/{locale}/admin/languages'
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
* @see \App\Http\Controllers\Admin\LanguageController::index
 * @see app/Http/Controllers/Admin/LanguageController.php:17
 * @route '/{locale}/admin/languages'
 */
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LanguageController::index
 * @see app/Http/Controllers/Admin/LanguageController.php:17
 * @route '/{locale}/admin/languages'
 */
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LanguageController::index
 * @see app/Http/Controllers/Admin/LanguageController.php:17
 * @route '/{locale}/admin/languages'
 */
    const indexForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LanguageController::index
 * @see app/Http/Controllers/Admin/LanguageController.php:17
 * @route '/{locale}/admin/languages'
 */
        indexForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LanguageController::index
 * @see app/Http/Controllers/Admin/LanguageController.php:17
 * @route '/{locale}/admin/languages'
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
* @see \App\Http\Controllers\Admin\LanguageController::create
 * @see app/Http/Controllers/Admin/LanguageController.php:26
 * @route '/{locale}/admin/languages/create'
 */
export const create = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{locale}/admin/languages/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LanguageController::create
 * @see app/Http/Controllers/Admin/LanguageController.php:26
 * @route '/{locale}/admin/languages/create'
 */
create.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LanguageController::create
 * @see app/Http/Controllers/Admin/LanguageController.php:26
 * @route '/{locale}/admin/languages/create'
 */
create.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LanguageController::create
 * @see app/Http/Controllers/Admin/LanguageController.php:26
 * @route '/{locale}/admin/languages/create'
 */
create.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LanguageController::create
 * @see app/Http/Controllers/Admin/LanguageController.php:26
 * @route '/{locale}/admin/languages/create'
 */
    const createForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LanguageController::create
 * @see app/Http/Controllers/Admin/LanguageController.php:26
 * @route '/{locale}/admin/languages/create'
 */
        createForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LanguageController::create
 * @see app/Http/Controllers/Admin/LanguageController.php:26
 * @route '/{locale}/admin/languages/create'
 */
        createForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\LanguageController::store
 * @see app/Http/Controllers/Admin/LanguageController.php:31
 * @route '/{locale}/admin/languages'
 */
export const store = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{locale}/admin/languages',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LanguageController::store
 * @see app/Http/Controllers/Admin/LanguageController.php:31
 * @route '/{locale}/admin/languages'
 */
store.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LanguageController::store
 * @see app/Http/Controllers/Admin/LanguageController.php:31
 * @route '/{locale}/admin/languages'
 */
store.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\LanguageController::store
 * @see app/Http/Controllers/Admin/LanguageController.php:31
 * @route '/{locale}/admin/languages'
 */
    const storeForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LanguageController::store
 * @see app/Http/Controllers/Admin/LanguageController.php:31
 * @route '/{locale}/admin/languages'
 */
        storeForm.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\LanguageController::show
 * @see app/Http/Controllers/Admin/LanguageController.php:0
 * @route '/{locale}/admin/languages/{language}'
 */
export const show = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{locale}/admin/languages/{language}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LanguageController::show
 * @see app/Http/Controllers/Admin/LanguageController.php:0
 * @route '/{locale}/admin/languages/{language}'
 */
show.url = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    language: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                language: args.language,
                }

    return show.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{language}', parsedArgs.language.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LanguageController::show
 * @see app/Http/Controllers/Admin/LanguageController.php:0
 * @route '/{locale}/admin/languages/{language}'
 */
show.get = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LanguageController::show
 * @see app/Http/Controllers/Admin/LanguageController.php:0
 * @route '/{locale}/admin/languages/{language}'
 */
show.head = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LanguageController::show
 * @see app/Http/Controllers/Admin/LanguageController.php:0
 * @route '/{locale}/admin/languages/{language}'
 */
    const showForm = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LanguageController::show
 * @see app/Http/Controllers/Admin/LanguageController.php:0
 * @route '/{locale}/admin/languages/{language}'
 */
        showForm.get = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LanguageController::show
 * @see app/Http/Controllers/Admin/LanguageController.php:0
 * @route '/{locale}/admin/languages/{language}'
 */
        showForm.head = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\LanguageController::edit
 * @see app/Http/Controllers/Admin/LanguageController.php:51
 * @route '/{locale}/admin/languages/{language}/edit'
 */
export const edit = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/{locale}/admin/languages/{language}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LanguageController::edit
 * @see app/Http/Controllers/Admin/LanguageController.php:51
 * @route '/{locale}/admin/languages/{language}/edit'
 */
edit.url = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    language: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                language: args.language,
                }

    return edit.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{language}', parsedArgs.language.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LanguageController::edit
 * @see app/Http/Controllers/Admin/LanguageController.php:51
 * @route '/{locale}/admin/languages/{language}/edit'
 */
edit.get = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LanguageController::edit
 * @see app/Http/Controllers/Admin/LanguageController.php:51
 * @route '/{locale}/admin/languages/{language}/edit'
 */
edit.head = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LanguageController::edit
 * @see app/Http/Controllers/Admin/LanguageController.php:51
 * @route '/{locale}/admin/languages/{language}/edit'
 */
    const editForm = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LanguageController::edit
 * @see app/Http/Controllers/Admin/LanguageController.php:51
 * @route '/{locale}/admin/languages/{language}/edit'
 */
        editForm.get = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LanguageController::edit
 * @see app/Http/Controllers/Admin/LanguageController.php:51
 * @route '/{locale}/admin/languages/{language}/edit'
 */
        editForm.head = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\LanguageController::update
 * @see app/Http/Controllers/Admin/LanguageController.php:63
 * @route '/{locale}/admin/languages/{language}'
 */
export const update = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/{locale}/admin/languages/{language}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\LanguageController::update
 * @see app/Http/Controllers/Admin/LanguageController.php:63
 * @route '/{locale}/admin/languages/{language}'
 */
update.url = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    language: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                language: args.language,
                }

    return update.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{language}', parsedArgs.language.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LanguageController::update
 * @see app/Http/Controllers/Admin/LanguageController.php:63
 * @route '/{locale}/admin/languages/{language}'
 */
update.put = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\LanguageController::update
 * @see app/Http/Controllers/Admin/LanguageController.php:63
 * @route '/{locale}/admin/languages/{language}'
 */
update.patch = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\LanguageController::update
 * @see app/Http/Controllers/Admin/LanguageController.php:63
 * @route '/{locale}/admin/languages/{language}'
 */
    const updateForm = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LanguageController::update
 * @see app/Http/Controllers/Admin/LanguageController.php:63
 * @route '/{locale}/admin/languages/{language}'
 */
        updateForm.put = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\LanguageController::update
 * @see app/Http/Controllers/Admin/LanguageController.php:63
 * @route '/{locale}/admin/languages/{language}'
 */
        updateForm.patch = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\LanguageController::destroy
 * @see app/Http/Controllers/Admin/LanguageController.php:84
 * @route '/{locale}/admin/languages/{language}'
 */
export const destroy = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{locale}/admin/languages/{language}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\LanguageController::destroy
 * @see app/Http/Controllers/Admin/LanguageController.php:84
 * @route '/{locale}/admin/languages/{language}'
 */
destroy.url = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    language: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                language: args.language,
                }

    return destroy.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{language}', parsedArgs.language.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LanguageController::destroy
 * @see app/Http/Controllers/Admin/LanguageController.php:84
 * @route '/{locale}/admin/languages/{language}'
 */
destroy.delete = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\LanguageController::destroy
 * @see app/Http/Controllers/Admin/LanguageController.php:84
 * @route '/{locale}/admin/languages/{language}'
 */
    const destroyForm = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LanguageController::destroy
 * @see app/Http/Controllers/Admin/LanguageController.php:84
 * @route '/{locale}/admin/languages/{language}'
 */
        destroyForm.delete = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Admin\LanguageController::toggleActive
 * @see app/Http/Controllers/Admin/LanguageController.php:106
 * @route '/{locale}/admin/languages/{language}/toggle-active'
 */
export const toggleActive = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/{locale}/admin/languages/{language}/toggle-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LanguageController::toggleActive
 * @see app/Http/Controllers/Admin/LanguageController.php:106
 * @route '/{locale}/admin/languages/{language}/toggle-active'
 */
toggleActive.url = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    language: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                language: args.language,
                }

    return toggleActive.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{language}', parsedArgs.language.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LanguageController::toggleActive
 * @see app/Http/Controllers/Admin/LanguageController.php:106
 * @route '/{locale}/admin/languages/{language}/toggle-active'
 */
toggleActive.post = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\LanguageController::toggleActive
 * @see app/Http/Controllers/Admin/LanguageController.php:106
 * @route '/{locale}/admin/languages/{language}/toggle-active'
 */
    const toggleActiveForm = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleActive.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LanguageController::toggleActive
 * @see app/Http/Controllers/Admin/LanguageController.php:106
 * @route '/{locale}/admin/languages/{language}/toggle-active'
 */
        toggleActiveForm.post = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleActive.url(args, options),
            method: 'post',
        })
    
    toggleActive.form = toggleActiveForm
/**
* @see \App\Http\Controllers\Admin\LanguageController::setDefault
 * @see app/Http/Controllers/Admin/LanguageController.php:121
 * @route '/{locale}/admin/languages/{language}/set-default'
 */
export const setDefault = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setDefault.url(args, options),
    method: 'post',
})

setDefault.definition = {
    methods: ["post"],
    url: '/{locale}/admin/languages/{language}/set-default',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LanguageController::setDefault
 * @see app/Http/Controllers/Admin/LanguageController.php:121
 * @route '/{locale}/admin/languages/{language}/set-default'
 */
setDefault.url = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    language: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                language: args.language,
                }

    return setDefault.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{language}', parsedArgs.language.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LanguageController::setDefault
 * @see app/Http/Controllers/Admin/LanguageController.php:121
 * @route '/{locale}/admin/languages/{language}/set-default'
 */
setDefault.post = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setDefault.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\LanguageController::setDefault
 * @see app/Http/Controllers/Admin/LanguageController.php:121
 * @route '/{locale}/admin/languages/{language}/set-default'
 */
    const setDefaultForm = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: setDefault.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LanguageController::setDefault
 * @see app/Http/Controllers/Admin/LanguageController.php:121
 * @route '/{locale}/admin/languages/{language}/set-default'
 */
        setDefaultForm.post = (args: { locale: string | number, language: string | number } | [locale: string | number, language: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: setDefault.url(args, options),
            method: 'post',
        })
    
    setDefault.form = setDefaultForm
const languages = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
toggleActive: Object.assign(toggleActive, toggleActive),
setDefault: Object.assign(setDefault, setDefault),
}

export default languages