import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\AiProviders\Pages\EditAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/EditAiProvider.php:7
 * @route '/admin/ai-providers/{record}/edit'
 */
const EditAiProvider = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditAiProvider.url(args, options),
    method: 'get',
})

EditAiProvider.definition = {
    methods: ["get","head"],
    url: '/admin/ai-providers/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\AiProviders\Pages\EditAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/EditAiProvider.php:7
 * @route '/admin/ai-providers/{record}/edit'
 */
EditAiProvider.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditAiProvider.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\AiProviders\Pages\EditAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/EditAiProvider.php:7
 * @route '/admin/ai-providers/{record}/edit'
 */
EditAiProvider.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditAiProvider.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\AiProviders\Pages\EditAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/EditAiProvider.php:7
 * @route '/admin/ai-providers/{record}/edit'
 */
EditAiProvider.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditAiProvider.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\AiProviders\Pages\EditAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/EditAiProvider.php:7
 * @route '/admin/ai-providers/{record}/edit'
 */
    const EditAiProviderForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditAiProvider.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\AiProviders\Pages\EditAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/EditAiProvider.php:7
 * @route '/admin/ai-providers/{record}/edit'
 */
        EditAiProviderForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditAiProvider.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\AiProviders\Pages\EditAiProvider::__invoke
 * @see app/Filament/Resources/AiProviders/Pages/EditAiProvider.php:7
 * @route '/admin/ai-providers/{record}/edit'
 */
        EditAiProviderForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditAiProvider.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditAiProvider.form = EditAiProviderForm
export default EditAiProvider