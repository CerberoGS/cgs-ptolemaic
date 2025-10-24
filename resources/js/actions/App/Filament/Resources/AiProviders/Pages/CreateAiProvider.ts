import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\AiProviders\Pages\CreateAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/CreateAiProvider.php:7
 * @route '/admin/ai-providers/create'
 */
const CreateAiProvider = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateAiProvider.url(options),
    method: 'get',
})

CreateAiProvider.definition = {
    methods: ["get","head"],
    url: '/admin/ai-providers/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\AiProviders\Pages\CreateAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/CreateAiProvider.php:7
 * @route '/admin/ai-providers/create'
 */
CreateAiProvider.url = (options?: RouteQueryOptions) => {
    return CreateAiProvider.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\AiProviders\Pages\CreateAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/CreateAiProvider.php:7
 * @route '/admin/ai-providers/create'
 */
CreateAiProvider.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateAiProvider.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\AiProviders\Pages\CreateAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/CreateAiProvider.php:7
 * @route '/admin/ai-providers/create'
 */
CreateAiProvider.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateAiProvider.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\AiProviders\Pages\CreateAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/CreateAiProvider.php:7
 * @route '/admin/ai-providers/create'
 */
    const CreateAiProviderForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateAiProvider.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\AiProviders\Pages\CreateAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/CreateAiProvider.php:7
 * @route '/admin/ai-providers/create'
 */
        CreateAiProviderForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateAiProvider.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\AiProviders\Pages\CreateAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/CreateAiProvider.php:7
 * @route '/admin/ai-providers/create'
 */
        CreateAiProviderForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateAiProvider.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateAiProvider.form = CreateAiProviderForm
export default CreateAiProvider