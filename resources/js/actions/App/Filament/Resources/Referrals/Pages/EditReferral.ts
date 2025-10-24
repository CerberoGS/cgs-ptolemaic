import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
 */
const EditReferral = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditReferral.url(args, options),
    method: 'get',
})

EditReferral.definition = {
    methods: ["get","head"],
    url: '/admin/referrals/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
 */
EditReferral.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditReferral.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
 */
EditReferral.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditReferral.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
 */
EditReferral.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditReferral.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
 */
    const EditReferralForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditReferral.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
 */
        EditReferralForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditReferral.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Referrals\Pages\EditReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/EditReferral.php:7
 * @route '/admin/referrals/{record}/edit'
 */
        EditReferralForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditReferral.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditReferral.form = EditReferralForm
export default EditReferral