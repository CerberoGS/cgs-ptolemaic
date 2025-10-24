import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Languages\Pages\ListLanguages::__invoke
 * @see app/Filament/Resources/Languages/Pages/ListLanguages.php:7
 * @route '/admin/languages'
 */
const ListLanguages = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListLanguages.url(options),
    method: 'get',
})

ListLanguages.definition = {
    methods: ["get","head"],
    url: '/admin/languages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Languages\Pages\ListLanguages::__invoke
 * @see app/Filament/Resources/Languages/Pages/ListLanguages.php:7
 * @route '/admin/languages'
 */
ListLanguages.url = (options?: RouteQueryOptions) => {
    return ListLanguages.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Languages\Pages\ListLanguages::__invoke
 * @see app/Filament/Resources/Languages/Pages/ListLanguages.php:7
 * @route '/admin/languages'
 */
ListLanguages.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListLanguages.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Languages\Pages\ListLanguages::__invoke
 * @see app/Filament/Resources/Languages/Pages/ListLanguages.php:7
 * @route '/admin/languages'
 */
ListLanguages.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListLanguages.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Languages\Pages\ListLanguages::__invoke
 * @see app/Filament/Resources/Languages/Pages/ListLanguages.php:7
 * @route '/admin/languages'
 */
    const ListLanguagesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListLanguages.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Languages\Pages\ListLanguages::__invoke
 * @see app/Filament/Resources/Languages/Pages/ListLanguages.php:7
 * @route '/admin/languages'
 */
        ListLanguagesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListLanguages.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Languages\Pages\ListLanguages::__invoke
 * @see app/Filament/Resources/Languages/Pages/ListLanguages.php:7
 * @route '/admin/languages'
 */
        ListLanguagesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListLanguages.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListLanguages.form = ListLanguagesForm
export default ListLanguages