import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\NewsProviders\Pages\ListNewsProviders::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/ListNewsProviders.php:7
 * @route '/admin/news-providers'
 */
const ListNewsProviders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListNewsProviders.url(options),
    method: 'get',
})

ListNewsProviders.definition = {
    methods: ["get","head"],
    url: '/admin/news-providers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\NewsProviders\Pages\ListNewsProviders::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/ListNewsProviders.php:7
 * @route '/admin/news-providers'
 */
ListNewsProviders.url = (options?: RouteQueryOptions) => {
    return ListNewsProviders.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\NewsProviders\Pages\ListNewsProviders::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/ListNewsProviders.php:7
 * @route '/admin/news-providers'
 */
ListNewsProviders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListNewsProviders.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\NewsProviders\Pages\ListNewsProviders::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/ListNewsProviders.php:7
 * @route '/admin/news-providers'
 */
ListNewsProviders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListNewsProviders.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\NewsProviders\Pages\ListNewsProviders::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/ListNewsProviders.php:7
 * @route '/admin/news-providers'
 */
    const ListNewsProvidersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListNewsProviders.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\NewsProviders\Pages\ListNewsProviders::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/ListNewsProviders.php:7
 * @route '/admin/news-providers'
 */
        ListNewsProvidersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListNewsProviders.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\NewsProviders\Pages\ListNewsProviders::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/ListNewsProviders.php:7
 * @route '/admin/news-providers'
 */
        ListNewsProvidersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListNewsProviders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListNewsProviders.form = ListNewsProvidersForm
export default ListNewsProviders