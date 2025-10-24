import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\AiProviderModels\Pages\ListAiProviderModels::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/ListAiProviderModels.php:7
 * @route '/admin/ai-provider-models'
 */
const ListAiProviderModels = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListAiProviderModels.url(options),
    method: 'get',
})

ListAiProviderModels.definition = {
    methods: ["get","head"],
    url: '/admin/ai-provider-models',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\AiProviderModels\Pages\ListAiProviderModels::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/ListAiProviderModels.php:7
 * @route '/admin/ai-provider-models'
 */
ListAiProviderModels.url = (options?: RouteQueryOptions) => {
    return ListAiProviderModels.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\AiProviderModels\Pages\ListAiProviderModels::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/ListAiProviderModels.php:7
 * @route '/admin/ai-provider-models'
 */
ListAiProviderModels.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListAiProviderModels.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\AiProviderModels\Pages\ListAiProviderModels::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/ListAiProviderModels.php:7
 * @route '/admin/ai-provider-models'
 */
ListAiProviderModels.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListAiProviderModels.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\AiProviderModels\Pages\ListAiProviderModels::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/ListAiProviderModels.php:7
 * @route '/admin/ai-provider-models'
 */
    const ListAiProviderModelsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListAiProviderModels.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\AiProviderModels\Pages\ListAiProviderModels::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/ListAiProviderModels.php:7
 * @route '/admin/ai-provider-models'
 */
        ListAiProviderModelsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListAiProviderModels.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\AiProviderModels\Pages\ListAiProviderModels::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/ListAiProviderModels.php:7
 * @route '/admin/ai-provider-models'
 */
        ListAiProviderModelsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListAiProviderModels.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListAiProviderModels.form = ListAiProviderModelsForm
export default ListAiProviderModels