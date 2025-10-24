import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/referrals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Referrals\Pages\ListReferrals::__invoke
 * @see app/Filament/Resources/Referrals/Pages/ListReferrals.php:7
 * @route '/admin/referrals'
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
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/referrals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
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
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
 */
export const edit = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/referrals/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
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
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
 */
edit.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
 */
edit.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
 */
    const editForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
 */
        editForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
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
const referrals = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
edit: Object.assign(edit, edit),
}

export default referrals