import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\AffiliateCodes\Pages\CreateAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/CreateAffiliateCode.php:7
 * @route '/admin/affiliate-codes/create'
 */
const CreateAffiliateCode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateAffiliateCode.url(options),
    method: 'get',
})

CreateAffiliateCode.definition = {
    methods: ["get","head"],
    url: '/admin/affiliate-codes/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\AffiliateCodes\Pages\CreateAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/CreateAffiliateCode.php:7
 * @route '/admin/affiliate-codes/create'
 */
CreateAffiliateCode.url = (options?: RouteQueryOptions) => {
    return CreateAffiliateCode.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\AffiliateCodes\Pages\CreateAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/CreateAffiliateCode.php:7
 * @route '/admin/affiliate-codes/create'
 */
CreateAffiliateCode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateAffiliateCode.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\AffiliateCodes\Pages\CreateAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/CreateAffiliateCode.php:7
 * @route '/admin/affiliate-codes/create'
 */
CreateAffiliateCode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateAffiliateCode.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\AffiliateCodes\Pages\CreateAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/CreateAffiliateCode.php:7
 * @route '/admin/affiliate-codes/create'
 */
    const CreateAffiliateCodeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateAffiliateCode.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\AffiliateCodes\Pages\CreateAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/CreateAffiliateCode.php:7
 * @route '/admin/affiliate-codes/create'
 */
        CreateAffiliateCodeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateAffiliateCode.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\AffiliateCodes\Pages\CreateAffiliateCode::__invoke
 * @see app/Filament/Resources/AffiliateCodes/Pages/CreateAffiliateCode.php:7
 * @route '/admin/affiliate-codes/create'
 */
        CreateAffiliateCodeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateAffiliateCode.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateAffiliateCode.form = CreateAffiliateCodeForm
export default CreateAffiliateCode