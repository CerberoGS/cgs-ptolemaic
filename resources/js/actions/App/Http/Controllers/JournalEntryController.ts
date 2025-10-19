import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\JournalEntryController::exportCsv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @route '/{locale}/journal/export/csv'
 */
export const exportCsv = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCsv.url(args, options),
    method: 'get',
})

exportCsv.definition = {
    methods: ["get","head"],
    url: '/{locale}/journal/export/csv',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JournalEntryController::exportCsv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @route '/{locale}/journal/export/csv'
 */
exportCsv.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return exportCsv.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JournalEntryController::exportCsv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @route '/{locale}/journal/export/csv'
 */
exportCsv.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCsv.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JournalEntryController::exportCsv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @route '/{locale}/journal/export/csv'
 */
exportCsv.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportCsv.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JournalEntryController::exportCsv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @route '/{locale}/journal/export/csv'
 */
    const exportCsvForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportCsv.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JournalEntryController::exportCsv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @route '/{locale}/journal/export/csv'
 */
        exportCsvForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportCsv.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JournalEntryController::exportCsv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @route '/{locale}/journal/export/csv'
 */
        exportCsvForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportCsv.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportCsv.form = exportCsvForm
/**
* @see \App\Http\Controllers\JournalEntryController::exportPdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @route '/{locale}/journal/export/pdf'
 */
export const exportPdf = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(args, options),
    method: 'get',
})

exportPdf.definition = {
    methods: ["get","head"],
    url: '/{locale}/journal/export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JournalEntryController::exportPdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @route '/{locale}/journal/export/pdf'
 */
exportPdf.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return exportPdf.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JournalEntryController::exportPdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @route '/{locale}/journal/export/pdf'
 */
exportPdf.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JournalEntryController::exportPdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @route '/{locale}/journal/export/pdf'
 */
exportPdf.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportPdf.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JournalEntryController::exportPdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @route '/{locale}/journal/export/pdf'
 */
    const exportPdfForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportPdf.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JournalEntryController::exportPdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @route '/{locale}/journal/export/pdf'
 */
        exportPdfForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPdf.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JournalEntryController::exportPdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @route '/{locale}/journal/export/pdf'
 */
        exportPdfForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportPdf.form = exportPdfForm
/**
* @see \App\Http\Controllers\JournalEntryController::index
 * @see app/Http/Controllers/JournalEntryController.php:22
 * @route '/{locale}/journal'
 */
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/journal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JournalEntryController::index
 * @see app/Http/Controllers/JournalEntryController.php:22
 * @route '/{locale}/journal'
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
* @see \App\Http\Controllers\JournalEntryController::index
 * @see app/Http/Controllers/JournalEntryController.php:22
 * @route '/{locale}/journal'
 */
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JournalEntryController::index
 * @see app/Http/Controllers/JournalEntryController.php:22
 * @route '/{locale}/journal'
 */
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JournalEntryController::index
 * @see app/Http/Controllers/JournalEntryController.php:22
 * @route '/{locale}/journal'
 */
    const indexForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JournalEntryController::index
 * @see app/Http/Controllers/JournalEntryController.php:22
 * @route '/{locale}/journal'
 */
        indexForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JournalEntryController::index
 * @see app/Http/Controllers/JournalEntryController.php:22
 * @route '/{locale}/journal'
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
* @see \App\Http\Controllers\JournalEntryController::create
 * @see app/Http/Controllers/JournalEntryController.php:70
 * @route '/{locale}/journal/create'
 */
export const create = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{locale}/journal/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JournalEntryController::create
 * @see app/Http/Controllers/JournalEntryController.php:70
 * @route '/{locale}/journal/create'
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
* @see \App\Http\Controllers\JournalEntryController::create
 * @see app/Http/Controllers/JournalEntryController.php:70
 * @route '/{locale}/journal/create'
 */
create.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JournalEntryController::create
 * @see app/Http/Controllers/JournalEntryController.php:70
 * @route '/{locale}/journal/create'
 */
create.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JournalEntryController::create
 * @see app/Http/Controllers/JournalEntryController.php:70
 * @route '/{locale}/journal/create'
 */
    const createForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JournalEntryController::create
 * @see app/Http/Controllers/JournalEntryController.php:70
 * @route '/{locale}/journal/create'
 */
        createForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JournalEntryController::create
 * @see app/Http/Controllers/JournalEntryController.php:70
 * @route '/{locale}/journal/create'
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
* @see \App\Http\Controllers\JournalEntryController::store
 * @see app/Http/Controllers/JournalEntryController.php:78
 * @route '/{locale}/journal'
 */
export const store = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{locale}/journal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JournalEntryController::store
 * @see app/Http/Controllers/JournalEntryController.php:78
 * @route '/{locale}/journal'
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
* @see \App\Http\Controllers\JournalEntryController::store
 * @see app/Http/Controllers/JournalEntryController.php:78
 * @route '/{locale}/journal'
 */
store.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\JournalEntryController::store
 * @see app/Http/Controllers/JournalEntryController.php:78
 * @route '/{locale}/journal'
 */
    const storeForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JournalEntryController::store
 * @see app/Http/Controllers/JournalEntryController.php:78
 * @route '/{locale}/journal'
 */
        storeForm.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\JournalEntryController::show
 * @see app/Http/Controllers/JournalEntryController.php:147
 * @route '/{locale}/journal/{journal}'
 */
export const show = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{locale}/journal/{journal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JournalEntryController::show
 * @see app/Http/Controllers/JournalEntryController.php:147
 * @route '/{locale}/journal/{journal}'
 */
show.url = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    journal: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                journal: typeof args.journal === 'object'
                ? args.journal.id
                : args.journal,
                }

    return show.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{journal}', parsedArgs.journal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JournalEntryController::show
 * @see app/Http/Controllers/JournalEntryController.php:147
 * @route '/{locale}/journal/{journal}'
 */
show.get = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JournalEntryController::show
 * @see app/Http/Controllers/JournalEntryController.php:147
 * @route '/{locale}/journal/{journal}'
 */
show.head = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JournalEntryController::show
 * @see app/Http/Controllers/JournalEntryController.php:147
 * @route '/{locale}/journal/{journal}'
 */
    const showForm = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JournalEntryController::show
 * @see app/Http/Controllers/JournalEntryController.php:147
 * @route '/{locale}/journal/{journal}'
 */
        showForm.get = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JournalEntryController::show
 * @see app/Http/Controllers/JournalEntryController.php:147
 * @route '/{locale}/journal/{journal}'
 */
        showForm.head = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\JournalEntryController::edit
 * @see app/Http/Controllers/JournalEntryController.php:184
 * @route '/{locale}/journal/{journal}/edit'
 */
export const edit = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/{locale}/journal/{journal}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JournalEntryController::edit
 * @see app/Http/Controllers/JournalEntryController.php:184
 * @route '/{locale}/journal/{journal}/edit'
 */
edit.url = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    journal: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                journal: typeof args.journal === 'object'
                ? args.journal.id
                : args.journal,
                }

    return edit.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{journal}', parsedArgs.journal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JournalEntryController::edit
 * @see app/Http/Controllers/JournalEntryController.php:184
 * @route '/{locale}/journal/{journal}/edit'
 */
edit.get = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JournalEntryController::edit
 * @see app/Http/Controllers/JournalEntryController.php:184
 * @route '/{locale}/journal/{journal}/edit'
 */
edit.head = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JournalEntryController::edit
 * @see app/Http/Controllers/JournalEntryController.php:184
 * @route '/{locale}/journal/{journal}/edit'
 */
    const editForm = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JournalEntryController::edit
 * @see app/Http/Controllers/JournalEntryController.php:184
 * @route '/{locale}/journal/{journal}/edit'
 */
        editForm.get = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JournalEntryController::edit
 * @see app/Http/Controllers/JournalEntryController.php:184
 * @route '/{locale}/journal/{journal}/edit'
 */
        editForm.head = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\JournalEntryController::update
 * @see app/Http/Controllers/JournalEntryController.php:213
 * @route '/{locale}/journal/{journal}'
 */
export const update = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/{locale}/journal/{journal}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\JournalEntryController::update
 * @see app/Http/Controllers/JournalEntryController.php:213
 * @route '/{locale}/journal/{journal}'
 */
update.url = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    journal: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                journal: typeof args.journal === 'object'
                ? args.journal.id
                : args.journal,
                }

    return update.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{journal}', parsedArgs.journal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JournalEntryController::update
 * @see app/Http/Controllers/JournalEntryController.php:213
 * @route '/{locale}/journal/{journal}'
 */
update.put = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\JournalEntryController::update
 * @see app/Http/Controllers/JournalEntryController.php:213
 * @route '/{locale}/journal/{journal}'
 */
update.patch = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\JournalEntryController::update
 * @see app/Http/Controllers/JournalEntryController.php:213
 * @route '/{locale}/journal/{journal}'
 */
    const updateForm = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JournalEntryController::update
 * @see app/Http/Controllers/JournalEntryController.php:213
 * @route '/{locale}/journal/{journal}'
 */
        updateForm.put = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\JournalEntryController::update
 * @see app/Http/Controllers/JournalEntryController.php:213
 * @route '/{locale}/journal/{journal}'
 */
        updateForm.patch = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\JournalEntryController::destroy
 * @see app/Http/Controllers/JournalEntryController.php:285
 * @route '/{locale}/journal/{journal}'
 */
export const destroy = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{locale}/journal/{journal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\JournalEntryController::destroy
 * @see app/Http/Controllers/JournalEntryController.php:285
 * @route '/{locale}/journal/{journal}'
 */
destroy.url = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    journal: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                journal: typeof args.journal === 'object'
                ? args.journal.id
                : args.journal,
                }

    return destroy.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{journal}', parsedArgs.journal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JournalEntryController::destroy
 * @see app/Http/Controllers/JournalEntryController.php:285
 * @route '/{locale}/journal/{journal}'
 */
destroy.delete = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\JournalEntryController::destroy
 * @see app/Http/Controllers/JournalEntryController.php:285
 * @route '/{locale}/journal/{journal}'
 */
    const destroyForm = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JournalEntryController::destroy
 * @see app/Http/Controllers/JournalEntryController.php:285
 * @route '/{locale}/journal/{journal}'
 */
        destroyForm.delete = (args: { locale: string | number, journal: number | { id: number } } | [locale: string | number, journal: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const JournalEntryController = { exportCsv, exportPdf, index, create, store, show, edit, update, destroy }

export default JournalEntryController