import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Invitations\Pages\ListInvitations::__invoke
 * @see app/Filament/Resources/Invitations/Pages/ListInvitations.php:7
 * @route '/admin/invitations'
 */
const ListInvitations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListInvitations.url(options),
    method: 'get',
})

ListInvitations.definition = {
    methods: ["get","head"],
    url: '/admin/invitations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Invitations\Pages\ListInvitations::__invoke
 * @see app/Filament/Resources/Invitations/Pages/ListInvitations.php:7
 * @route '/admin/invitations'
 */
ListInvitations.url = (options?: RouteQueryOptions) => {
    return ListInvitations.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Invitations\Pages\ListInvitations::__invoke
 * @see app/Filament/Resources/Invitations/Pages/ListInvitations.php:7
 * @route '/admin/invitations'
 */
ListInvitations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListInvitations.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Invitations\Pages\ListInvitations::__invoke
 * @see app/Filament/Resources/Invitations/Pages/ListInvitations.php:7
 * @route '/admin/invitations'
 */
ListInvitations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListInvitations.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Invitations\Pages\ListInvitations::__invoke
 * @see app/Filament/Resources/Invitations/Pages/ListInvitations.php:7
 * @route '/admin/invitations'
 */
    const ListInvitationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListInvitations.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Invitations\Pages\ListInvitations::__invoke
 * @see app/Filament/Resources/Invitations/Pages/ListInvitations.php:7
 * @route '/admin/invitations'
 */
        ListInvitationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListInvitations.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Invitations\Pages\ListInvitations::__invoke
 * @see app/Filament/Resources/Invitations/Pages/ListInvitations.php:7
 * @route '/admin/invitations'
 */
        ListInvitationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListInvitations.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListInvitations.form = ListInvitationsForm
export default ListInvitations