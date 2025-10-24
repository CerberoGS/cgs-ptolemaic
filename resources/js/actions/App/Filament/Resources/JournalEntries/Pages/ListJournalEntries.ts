import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\JournalEntries\Pages\ListJournalEntries::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/ListJournalEntries.php:7
 * @route '/admin/journal-entries'
 */
const ListJournalEntries = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListJournalEntries.url(options),
    method: 'get',
})

ListJournalEntries.definition = {
    methods: ["get","head"],
    url: '/admin/journal-entries',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\JournalEntries\Pages\ListJournalEntries::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/ListJournalEntries.php:7
 * @route '/admin/journal-entries'
 */
ListJournalEntries.url = (options?: RouteQueryOptions) => {
    return ListJournalEntries.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\JournalEntries\Pages\ListJournalEntries::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/ListJournalEntries.php:7
 * @route '/admin/journal-entries'
 */
ListJournalEntries.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListJournalEntries.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\JournalEntries\Pages\ListJournalEntries::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/ListJournalEntries.php:7
 * @route '/admin/journal-entries'
 */
ListJournalEntries.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListJournalEntries.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\JournalEntries\Pages\ListJournalEntries::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/ListJournalEntries.php:7
 * @route '/admin/journal-entries'
 */
    const ListJournalEntriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListJournalEntries.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\JournalEntries\Pages\ListJournalEntries::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/ListJournalEntries.php:7
 * @route '/admin/journal-entries'
 */
        ListJournalEntriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListJournalEntries.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\JournalEntries\Pages\ListJournalEntries::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/ListJournalEntries.php:7
 * @route '/admin/journal-entries'
 */
        ListJournalEntriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListJournalEntries.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListJournalEntries.form = ListJournalEntriesForm
export default ListJournalEntries