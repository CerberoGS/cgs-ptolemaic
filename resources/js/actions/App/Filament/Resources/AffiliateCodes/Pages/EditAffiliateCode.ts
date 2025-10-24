import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\AffiliateCodes\Pages\EditAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/EditAffiliateCode.php:7
 * @route '/admin/affiliate-codes/{record}/edit'
 */
const EditAffiliateCode = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditAffiliateCode.url(args, options),
    method: 'get',
})

EditAffiliateCode.definition = {
    methods: ["get","head"],
    url: '/admin/affiliate-codes/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\AffiliateCodes\Pages\EditAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/EditAffiliateCode.php:7
 * @route '/admin/affiliate-codes/{record}/edit'
 */
EditAffiliateCode.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditAffiliateCode.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\AffiliateCodes\Pages\EditAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/EditAffiliateCode.php:7
 * @route '/admin/affiliate-codes/{record}/edit'
 */
EditAffiliateCode.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditAffiliateCode.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\AffiliateCodes\Pages\EditAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/EditAffiliateCode.php:7
 * @route '/admin/affiliate-codes/{record}/edit'
 */
EditAffiliateCode.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditAffiliateCode.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\AffiliateCodes\Pages\EditAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/EditAffiliateCode.php:7
 * @route '/admin/affiliate-codes/{record}/edit'
 */
    const EditAffiliateCodeForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditAffiliateCode.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\AffiliateCodes\Pages\EditAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/EditAffiliateCode.php:7
 * @route '/admin/affiliate-codes/{record}/edit'
 */
        EditAffiliateCodeForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditAffiliateCode.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\AffiliateCodes\Pages\EditAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/EditAffiliateCode.php:7
 * @route '/admin/affiliate-codes/{record}/edit'
 */
        EditAffiliateCodeForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditAffiliateCode.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditAffiliateCode.form = EditAffiliateCodeForm
export default EditAffiliateCode