import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\AiProviderModels\Pages\CreateAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/CreateAiProviderModel.php:7
 * @route '/admin/ai-provider-models/create'
 */
const CreateAiProviderModel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateAiProviderModel.url(options),
    method: 'get',
})

CreateAiProviderModel.definition = {
    methods: ["get","head"],
    url: '/admin/ai-provider-models/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\AiProviderModels\Pages\CreateAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/CreateAiProviderModel.php:7
 * @route '/admin/ai-provider-models/create'
 */
CreateAiProviderModel.url = (options?: RouteQueryOptions) => {
    return CreateAiProviderModel.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\AiProviderModels\Pages\CreateAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/CreateAiProviderModel.php:7
 * @route '/admin/ai-provider-models/create'
 */
CreateAiProviderModel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateAiProviderModel.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\AiProviderModels\Pages\CreateAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/CreateAiProviderModel.php:7
 * @route '/admin/ai-provider-models/create'
 */
CreateAiProviderModel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateAiProviderModel.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\AiProviderModels\Pages\CreateAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/CreateAiProviderModel.php:7
 * @route '/admin/ai-provider-models/create'
 */
    const CreateAiProviderModelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateAiProviderModel.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\AiProviderModels\Pages\CreateAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/CreateAiProviderModel.php:7
 * @route '/admin/ai-provider-models/create'
 */
        CreateAiProviderModelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateAiProviderModel.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\AiProviderModels\Pages\CreateAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/CreateAiProviderModel.php:7
 * @route '/admin/ai-provider-models/create'
 */
        CreateAiProviderModelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateAiProviderModel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateAiProviderModel.form = CreateAiProviderModelForm
export default CreateAiProviderModel