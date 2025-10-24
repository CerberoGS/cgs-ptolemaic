import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Invitations\Pages\CreateInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/CreateInvitation.php:7
 * @route '/admin/invitations/create'
 */
const CreateInvitation = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateInvitation.url(options),
    method: 'get',
})

CreateInvitation.definition = {
    methods: ["get","head"],
    url: '/admin/invitations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Invitations\Pages\CreateInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/CreateInvitation.php:7
 * @route '/admin/invitations/create'
 */
CreateInvitation.url = (options?: RouteQueryOptions) => {
    return CreateInvitation.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Invitations\Pages\CreateInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/CreateInvitation.php:7
 * @route '/admin/invitations/create'
 */
CreateInvitation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateInvitation.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Invitations\Pages\CreateInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/CreateInvitation.php:7
 * @route '/admin/invitations/create'
 */
CreateInvitation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateInvitation.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Invitations\Pages\CreateInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/CreateInvitation.php:7
 * @route '/admin/invitations/create'
 */
    const CreateInvitationForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateInvitation.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Invitations\Pages\CreateInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/CreateInvitation.php:7
 * @route '/admin/invitations/create'
 */
        CreateInvitationForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateInvitation.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Invitations\Pages\CreateInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/CreateInvitation.php:7
 * @route '/admin/invitations/create'
 */
        CreateInvitationForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateInvitation.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateInvitation.form = CreateInvitationForm
export default CreateInvitation