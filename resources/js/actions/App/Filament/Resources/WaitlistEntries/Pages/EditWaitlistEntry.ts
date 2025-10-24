import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
const EditWaitlistEntry = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditWaitlistEntry.url(args, options),
    method: 'get',
})

EditWaitlistEntry.definition = {
    methods: ["get","head"],
    url: '/admin/waitlist-entries/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
EditWaitlistEntry.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditWaitlistEntry.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
EditWaitlistEntry.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditWaitlistEntry.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
EditWaitlistEntry.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditWaitlistEntry.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
    const EditWaitlistEntryForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditWaitlistEntry.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
        EditWaitlistEntryForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditWaitlistEntry.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\EditWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/EditWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/{record}/edit'
 */
        EditWaitlistEntryForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditWaitlistEntry.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditWaitlistEntry.form = EditWaitlistEntryForm
export default EditWaitlistEntry