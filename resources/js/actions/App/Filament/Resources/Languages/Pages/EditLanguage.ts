import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Languages\Pages\EditLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/EditLanguage.php:7
 * @route '/admin/languages/{record}/edit'
 */
const EditLanguage = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditLanguage.url(args, options),
    method: 'get',
})

EditLanguage.definition = {
    methods: ["get","head"],
    url: '/admin/languages/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Languages\Pages\EditLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/EditLanguage.php:7
 * @route '/admin/languages/{record}/edit'
 */
EditLanguage.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditLanguage.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Languages\Pages\EditLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/EditLanguage.php:7
 * @route '/admin/languages/{record}/edit'
 */
EditLanguage.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditLanguage.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Languages\Pages\EditLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/EditLanguage.php:7
 * @route '/admin/languages/{record}/edit'
 */
EditLanguage.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditLanguage.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Languages\Pages\EditLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/EditLanguage.php:7
 * @route '/admin/languages/{record}/edit'
 */
    const EditLanguageForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditLanguage.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Languages\Pages\EditLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/EditLanguage.php:7
 * @route '/admin/languages/{record}/edit'
 */
        EditLanguageForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditLanguage.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Languages\Pages\EditLanguage::__invoke
 * @see app/Filament/Resources/Languages/Pages/EditLanguage.php:7
 * @route '/admin/languages/{record}/edit'
 */
        EditLanguageForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditLanguage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditLanguage.form = EditLanguageForm
export default EditLanguage