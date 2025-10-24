import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
const ListWaitlistEntries = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListWaitlistEntries.url(options),
    method: 'get',
})

ListWaitlistEntries.definition = {
    methods: ["get","head"],
    url: '/admin/waitlist-entries',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
ListWaitlistEntries.url = (options?: RouteQueryOptions) => {
    return ListWaitlistEntries.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
ListWaitlistEntries.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListWaitlistEntries.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
ListWaitlistEntries.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListWaitlistEntries.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
    const ListWaitlistEntriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListWaitlistEntries.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
        ListWaitlistEntriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListWaitlistEntries.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\ListWaitlistEntries::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/ListWaitlistEntries.php:7
 * @route '/admin/waitlist-entries'
 */
        ListWaitlistEntriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListWaitlistEntries.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListWaitlistEntries.form = ListWaitlistEntriesForm
export default ListWaitlistEntries