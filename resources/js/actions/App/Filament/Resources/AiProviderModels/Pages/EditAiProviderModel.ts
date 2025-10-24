import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\AiProviderModels\Pages\EditAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/EditAiProviderModel.php:7
 * @route '/admin/ai-provider-models/{record}/edit'
 */
const EditAiProviderModel = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditAiProviderModel.url(args, options),
    method: 'get',
})

EditAiProviderModel.definition = {
    methods: ["get","head"],
    url: '/admin/ai-provider-models/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\AiProviderModels\Pages\EditAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/EditAiProviderModel.php:7
 * @route '/admin/ai-provider-models/{record}/edit'
 */
EditAiProviderModel.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditAiProviderModel.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\AiProviderModels\Pages\EditAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/EditAiProviderModel.php:7
 * @route '/admin/ai-provider-models/{record}/edit'
 */
EditAiProviderModel.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditAiProviderModel.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\AiProviderModels\Pages\EditAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/EditAiProviderModel.php:7
 * @route '/admin/ai-provider-models/{record}/edit'
 */
EditAiProviderModel.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditAiProviderModel.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\AiProviderModels\Pages\EditAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/EditAiProviderModel.php:7
 * @route '/admin/ai-provider-models/{record}/edit'
 */
    const EditAiProviderModelForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditAiProviderModel.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\AiProviderModels\Pages\EditAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/EditAiProviderModel.php:7
 * @route '/admin/ai-provider-models/{record}/edit'
 */
        EditAiProviderModelForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditAiProviderModel.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\AiProviderModels\Pages\EditAiProviderModel::__invoke
 * @see app/Filament/Resources/AiProviderModels/Pages/EditAiProviderModel.php:7
 * @route '/admin/ai-provider-models/{record}/edit'
 */
        EditAiProviderModelForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditAiProviderModel.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditAiProviderModel.form = EditAiProviderModelForm
export default EditAiProviderModel