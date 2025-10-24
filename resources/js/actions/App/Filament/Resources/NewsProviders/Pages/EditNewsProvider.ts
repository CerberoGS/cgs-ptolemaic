import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\NewsProviders\Pages\EditNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/EditNewsProvider.php:7
 * @route '/admin/news-providers/{record}/edit'
 */
const EditNewsProvider = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditNewsProvider.url(args, options),
    method: 'get',
})

EditNewsProvider.definition = {
    methods: ["get","head"],
    url: '/admin/news-providers/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\NewsProviders\Pages\EditNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/EditNewsProvider.php:7
 * @route '/admin/news-providers/{record}/edit'
 */
EditNewsProvider.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return EditNewsProvider.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\NewsProviders\Pages\EditNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/EditNewsProvider.php:7
 * @route '/admin/news-providers/{record}/edit'
 */
EditNewsProvider.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditNewsProvider.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\NewsProviders\Pages\EditNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/EditNewsProvider.php:7
 * @route '/admin/news-providers/{record}/edit'
 */
EditNewsProvider.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditNewsProvider.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\NewsProviders\Pages\EditNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/EditNewsProvider.php:7
 * @route '/admin/news-providers/{record}/edit'
 */
    const EditNewsProviderForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditNewsProvider.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\NewsProviders\Pages\EditNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/EditNewsProvider.php:7
 * @route '/admin/news-providers/{record}/edit'
 */
        EditNewsProviderForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditNewsProvider.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\NewsProviders\Pages\EditNewsProvider::__invoke
 * @see app/Filament/Resources/NewsProviders/Pages/EditNewsProvider.php:7
 * @route '/admin/news-providers/{record}/edit'
 */
        EditNewsProviderForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditNewsProvider.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditNewsProvider.form = EditNewsProviderForm
export default EditNewsProvider