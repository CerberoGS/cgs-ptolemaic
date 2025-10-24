import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\AffiliateRewards\Pages\CreateAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/CreateAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/create'
 */
const CreateAffiliateReward = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateAffiliateReward.url(options),
    method: 'get',
})

CreateAffiliateReward.definition = {
    methods: ["get","head"],
    url: '/admin/affiliate-rewards/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\AffiliateRewards\Pages\CreateAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/CreateAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/create'
 */
CreateAffiliateReward.url = (options?: RouteQueryOptions) => {
    return CreateAffiliateReward.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\AffiliateRewards\Pages\CreateAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/CreateAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/create'
 */
CreateAffiliateReward.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateAffiliateReward.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\AffiliateRewards\Pages\CreateAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/CreateAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/create'
 */
CreateAffiliateReward.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateAffiliateReward.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\AffiliateRewards\Pages\CreateAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/CreateAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/create'
 */
    const CreateAffiliateRewardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateAffiliateReward.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\AffiliateRewards\Pages\CreateAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/CreateAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/create'
 */
        CreateAffiliateRewardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateAffiliateReward.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\AffiliateRewards\Pages\CreateAffiliateReward::__invoke
 * @see app/Filament/Resources/AffiliateRewards/Pages/CreateAffiliateReward.php:7
 * @route '/admin/affiliate-rewards/create'
 */
        CreateAffiliateRewardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateAffiliateReward.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateAffiliateReward.form = CreateAffiliateRewardForm
export default CreateAffiliateReward