import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/waitlist-entries',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/waitlist-entries/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
export const edit = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/waitlist-entries/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
edit.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return edit.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
edit.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
edit.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
    const editForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
        editForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
        editForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
const waitlistEntries = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
edit: Object.assign(edit, edit),
}

export default waitlistEntries