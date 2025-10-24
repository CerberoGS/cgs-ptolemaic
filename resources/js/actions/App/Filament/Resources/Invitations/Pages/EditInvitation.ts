import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Invitations\Pages\EditInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/EditInvitation.php:7
 * @route '/admin/invitations/{record}/edit'
 */
const EditInvitation = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditInvitation.url(args, options),
    method: 'get',
})

EditInvitation.definition = {
    methods: ["get","head"],
    url: '/admin/invitations/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Invitations\Pages\EditInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/EditInvitation.php:7
 * @route '/admin/invitations/{record}/edit'
 */
EditInvitation.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditInvitation.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Invitations\Pages\EditInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/EditInvitation.php:7
 * @route '/admin/invitations/{record}/edit'
 */
EditInvitation.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditInvitation.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Invitations\Pages\EditInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/EditInvitation.php:7
 * @route '/admin/invitations/{record}/edit'
 */
EditInvitation.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditInvitation.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Invitations\Pages\EditInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/EditInvitation.php:7
 * @route '/admin/invitations/{record}/edit'
 */
    const EditInvitationForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditInvitation.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Invitations\Pages\EditInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/EditInvitation.php:7
 * @route '/admin/invitations/{record}/edit'
 */
        EditInvitationForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditInvitation.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Invitations\Pages\EditInvitation::__invoke
 * @see app/Filament/Resources/Invitations/Pages/EditInvitation.php:7
 * @route '/admin/invitations/{record}/edit'
 */
        EditInvitationForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditInvitation.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditInvitation.form = EditInvitationForm
export default EditInvitation