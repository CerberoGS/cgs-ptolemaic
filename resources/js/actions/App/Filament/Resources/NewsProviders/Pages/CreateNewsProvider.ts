import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\NewsProviders\Pages\CreateNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/CreateNewsProvider.php:7
 * @route '/admin/news-providers/create'
 */
const CreateNewsProvider = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateNewsProvider.url(options),
    method: 'get',
})

CreateNewsProvider.definition = {
    methods: ["get","head"],
    url: '/admin/news-providers/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\NewsProviders\Pages\CreateNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/CreateNewsProvider.php:7
 * @route '/admin/news-providers/create'
 */
CreateNewsProvider.url = (options?: RouteQueryOptions) => {
    return CreateNewsProvider.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\NewsProviders\Pages\CreateNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/CreateNewsProvider.php:7
 * @route '/admin/news-providers/create'
 */
CreateNewsProvider.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateNewsProvider.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\NewsProviders\Pages\CreateNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/CreateNewsProvider.php:7
 * @route '/admin/news-providers/create'
 */
CreateNewsProvider.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateNewsProvider.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\NewsProviders\Pages\CreateNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/CreateNewsProvider.php:7
 * @route '/admin/news-providers/create'
 */
    const CreateNewsProviderForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateNewsProvider.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\NewsProviders\Pages\CreateNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/CreateNewsProvider.php:7
 * @route '/admin/news-providers/create'
 */
        CreateNewsProviderForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateNewsProvider.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\NewsProviders\Pages\CreateNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/CreateNewsProvider.php:7
 * @route '/admin/news-providers/create'
 */
        CreateNewsProviderForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateNewsProvider.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateNewsProvider.form = CreateNewsProviderForm
export default CreateNewsProvider