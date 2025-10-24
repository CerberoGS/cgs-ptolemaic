import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\AffiliateRewards\Pages\EditAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/EditAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/{record}/edit'
 */
const EditAffiliateReward = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditAffiliateReward.url(args, options),
    method: 'get',
})

EditAffiliateReward.definition = {
    methods: ["get","head"],
    url: '/admin/affiliate-rewards/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\AffiliateRewards\Pages\EditAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/EditAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/{record}/edit'
 */
EditAffiliateReward.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditAffiliateReward.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\AffiliateRewards\Pages\EditAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/EditAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/{record}/edit'
 */
EditAffiliateReward.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditAffiliateReward.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\AffiliateRewards\Pages\EditAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/EditAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/{record}/edit'
 */
EditAffiliateReward.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditAffiliateReward.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\AffiliateRewards\Pages\EditAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/EditAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/{record}/edit'
 */
    const EditAffiliateRewardForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditAffiliateReward.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\AffiliateRewards\Pages\EditAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/EditAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/{record}/edit'
 */
        EditAffiliateRewardForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditAffiliateReward.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\AffiliateRewards\Pages\EditAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/EditAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/{record}/edit'
 */
        EditAffiliateRewardForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditAffiliateReward.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditAffiliateReward.form = EditAffiliateRewardForm
export default EditAffiliateReward