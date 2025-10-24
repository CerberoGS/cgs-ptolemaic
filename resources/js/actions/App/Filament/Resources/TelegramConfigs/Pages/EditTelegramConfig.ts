import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\TelegramConfigs\Pages\EditTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/EditTelegramConfig.php:7
 * @route '/admin/telegram-configs/{record}/edit'
 */
const EditTelegramConfig = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditTelegramConfig.url(args, options),
    method: 'get',
})

EditTelegramConfig.definition = {
    methods: ["get","head"],
    url: '/admin/telegram-configs/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\TelegramConfigs\Pages\EditTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/EditTelegramConfig.php:7
 * @route '/admin/telegram-configs/{record}/edit'
 */
EditTelegramConfig.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditTelegramConfig.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\TelegramConfigs\Pages\EditTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/EditTelegramConfig.php:7
 * @route '/admin/telegram-configs/{record}/edit'
 */
EditTelegramConfig.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditTelegramConfig.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\TelegramConfigs\Pages\EditTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/EditTelegramConfig.php:7
 * @route '/admin/telegram-configs/{record}/edit'
 */
EditTelegramConfig.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditTelegramConfig.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\TelegramConfigs\Pages\EditTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/EditTelegramConfig.php:7
 * @route '/admin/telegram-configs/{record}/edit'
 */
    const EditTelegramConfigForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditTelegramConfig.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\TelegramConfigs\Pages\EditTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/EditTelegramConfig.php:7
 * @route '/admin/telegram-configs/{record}/edit'
 */
        EditTelegramConfigForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditTelegramConfig.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\TelegramConfigs\Pages\EditTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/EditTelegramConfig.php:7
 * @route '/admin/telegram-configs/{record}/edit'
 */
        EditTelegramConfigForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditTelegramConfig.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditTelegramConfig.form = EditTelegramConfigForm
export default EditTelegramConfig