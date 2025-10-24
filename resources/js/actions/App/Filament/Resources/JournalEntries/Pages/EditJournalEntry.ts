import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\JournalEntries\Pages\EditJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/EditJournalEntry.php:7
 * @route '/admin/journal-entries/{record}/edit'
 */
const EditJournalEntry = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditJournalEntry.url(args, options),
    method: 'get',
})

EditJournalEntry.definition = {
    methods: ["get","head"],
    url: '/admin/journal-entries/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\JournalEntries\Pages\EditJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/EditJournalEntry.php:7
 * @route '/admin/journal-entries/{record}/edit'
 */
EditJournalEntry.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditJournalEntry.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\JournalEntries\Pages\EditJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/EditJournalEntry.php:7
 * @route '/admin/journal-entries/{record}/edit'
 */
EditJournalEntry.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditJournalEntry.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\JournalEntries\Pages\EditJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/EditJournalEntry.php:7
 * @route '/admin/journal-entries/{record}/edit'
 */
EditJournalEntry.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditJournalEntry.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\JournalEntries\Pages\EditJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/EditJournalEntry.php:7
 * @route '/admin/journal-entries/{record}/edit'
 */
    const EditJournalEntryForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditJournalEntry.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\JournalEntries\Pages\EditJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/EditJournalEntry.php:7
 * @route '/admin/journal-entries/{record}/edit'
 */
        EditJournalEntryForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditJournalEntry.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\JournalEntries\Pages\EditJournalEntry::__invoke
 * @see app/Filament/Resources/JournalEntries/Pages/EditJournalEntry.php:7
 * @route '/admin/journal-entries/{record}/edit'
 */
        EditJournalEntryForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditJournalEntry.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditJournalEntry.form = EditJournalEntryForm
export default EditJournalEntry