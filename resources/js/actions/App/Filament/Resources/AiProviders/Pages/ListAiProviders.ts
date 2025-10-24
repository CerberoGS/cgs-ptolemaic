import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\AiProviders\Pages\ListAiProviders::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/ListAiProviders.php:7
 * @route '/admin/ai-providers'
 */
const ListAiProviders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListAiProviders.url(options),
    method: 'get',
})

ListAiProviders.definition = {
    methods: ["get","head"],
    url: '/admin/ai-providers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\AiProviders\Pages\ListAiProviders::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/ListAiProviders.php:7
 * @route '/admin/ai-providers'
 */
ListAiProviders.url = (options?: RouteQueryOptions) => {
    return ListAiProviders.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\AiProviders\Pages\ListAiProviders::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/ListAiProviders.php:7
 * @route '/admin/ai-providers'
 */
ListAiProviders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListAiProviders.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\AiProviders\Pages\ListAiProviders::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/ListAiProviders.php:7
 * @route '/admin/ai-providers'
 */
ListAiProviders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListAiProviders.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\AiProviders\Pages\ListAiProviders::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/ListAiProviders.php:7
 * @route '/admin/ai-providers'
 */
    const ListAiProvidersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListAiProviders.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\AiProviders\Pages\ListAiProviders::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/ListAiProviders.php:7
 * @route '/admin/ai-providers'
 */
        ListAiProvidersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListAiProviders.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\AiProviders\Pages\ListAiProviders::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/ListAiProviders.php:7
 * @route '/admin/ai-providers'
 */
        ListAiProvidersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListAiProviders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListAiProviders.form = ListAiProvidersForm
export default ListAiProviders