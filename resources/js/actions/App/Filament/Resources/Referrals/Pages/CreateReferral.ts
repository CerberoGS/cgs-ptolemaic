import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
 */
const CreateReferral = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateReferral.url(options),
    method: 'get',
})

CreateReferral.definition = {
    methods: ["get","head"],
    url: '/admin/referrals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
 */
CreateReferral.url = (options?: RouteQueryOptions) => {
    return CreateReferral.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
 */
CreateReferral.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateReferral.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
 */
CreateReferral.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateReferral.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
 */
    const CreateReferralForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateReferral.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
 */
        CreateReferralForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateReferral.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Referrals\Pages\CreateReferral::__invoke
 * @see app/Filament/Resources/Referrals/Pages/CreateReferral.php:7
 * @route '/admin/referrals/create'
 */
        CreateReferralForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateReferral.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateReferral.form = CreateReferralForm
export default CreateReferral