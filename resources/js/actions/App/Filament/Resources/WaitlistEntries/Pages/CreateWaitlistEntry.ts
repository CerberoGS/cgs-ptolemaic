import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
const CreateWaitlistEntry = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateWaitlistEntry.url(options),
    method: 'get',
})

CreateWaitlistEntry.definition = {
    methods: ["get","head"],
    url: '/admin/waitlist-entries/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
CreateWaitlistEntry.url = (options?: RouteQueryOptions) => {
    return CreateWaitlistEntry.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
CreateWaitlistEntry.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateWaitlistEntry.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
CreateWaitlistEntry.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateWaitlistEntry.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
    const CreateWaitlistEntryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateWaitlistEntry.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
        CreateWaitlistEntryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateWaitlistEntry.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\WaitlistEntries\Pages\CreateWaitlistEntry::__invoke
 * @see app/Filament/Resources/WaitlistEntries/Pages/CreateWaitlistEntry.php:7
 * @route '/admin/waitlist-entries/create'
 */
        CreateWaitlistEntryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateWaitlistEntry.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateWaitlistEntry.form = CreateWaitlistEntryForm
export default CreateWaitlistEntry