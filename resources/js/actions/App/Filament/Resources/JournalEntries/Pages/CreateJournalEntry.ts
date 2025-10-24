import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\JournalEntries\Pages\CreateJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/CreateJournalEntry.php:7
 * @route '/admin/journal-entries/create'
 */
const CreateJournalEntry = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateJournalEntry.url(options),
    method: 'get',
})

CreateJournalEntry.definition = {
    methods: ["get","head"],
    url: '/admin/journal-entries/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\JournalEntries\Pages\CreateJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/CreateJournalEntry.php:7
 * @route '/admin/journal-entries/create'
 */
CreateJournalEntry.url = (options?: RouteQueryOptions) => {
    return CreateJournalEntry.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\JournalEntries\Pages\CreateJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/CreateJournalEntry.php:7
 * @route '/admin/journal-entries/create'
 */
CreateJournalEntry.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateJournalEntry.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\JournalEntries\Pages\CreateJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/CreateJournalEntry.php:7
 * @route '/admin/journal-entries/create'
 */
CreateJournalEntry.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateJournalEntry.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\JournalEntries\Pages\CreateJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/CreateJournalEntry.php:7
 * @route '/admin/journal-entries/create'
 */
    const CreateJournalEntryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateJournalEntry.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\JournalEntries\Pages\CreateJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/CreateJournalEntry.php:7
 * @route '/admin/journal-entries/create'
 */
        CreateJournalEntryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateJournalEntry.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\JournalEntries\Pages\CreateJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/CreateJournalEntry.php:7
 * @route '/admin/journal-entries/create'
 */
        CreateJournalEntryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateJournalEntry.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateJournalEntry.form = CreateJournalEntryForm
export default CreateJournalEntry