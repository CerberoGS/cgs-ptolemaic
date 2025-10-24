import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Languages\Pages\CreateLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/CreateLanguage.php:7
 * @route '/admin/languages/create'
 */
const CreateLanguage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateLanguage.url(options),
    method: 'get',
})

CreateLanguage.definition = {
    methods: ["get","head"],
    url: '/admin/languages/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Languages\Pages\CreateLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/CreateLanguage.php:7
 * @route '/admin/languages/create'
 */
CreateLanguage.url = (options?: RouteQueryOptions) => {
    return CreateLanguage.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Languages\Pages\CreateLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/CreateLanguage.php:7
 * @route '/admin/languages/create'
 */
CreateLanguage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateLanguage.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Languages\Pages\CreateLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/CreateLanguage.php:7
 * @route '/admin/languages/create'
 */
CreateLanguage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateLanguage.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Languages\Pages\CreateLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/CreateLanguage.php:7
 * @route '/admin/languages/create'
 */
    const CreateLanguageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateLanguage.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Languages\Pages\CreateLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/CreateLanguage.php:7
 * @route '/admin/languages/create'
 */
        CreateLanguageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateLanguage.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Languages\Pages\CreateLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/CreateLanguage.php:7
 * @route '/admin/languages/create'
 */
        CreateLanguageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateLanguage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateLanguage.form = CreateLanguageForm
export default CreateLanguage