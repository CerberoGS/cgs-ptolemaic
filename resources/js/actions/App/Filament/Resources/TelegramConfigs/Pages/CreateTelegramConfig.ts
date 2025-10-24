import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\TelegramConfigs\Pages\CreateTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/CreateTelegramConfig.php:7
 * @route '/admin/telegram-configs/create'
 */
const CreateTelegramConfig = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateTelegramConfig.url(options),
    method: 'get',
})

CreateTelegramConfig.definition = {
    methods: ["get","head"],
    url: '/admin/telegram-configs/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\TelegramConfigs\Pages\CreateTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/CreateTelegramConfig.php:7
 * @route '/admin/telegram-configs/create'
 */
CreateTelegramConfig.url = (options?: RouteQueryOptions) => {
    return CreateTelegramConfig.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\TelegramConfigs\Pages\CreateTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/CreateTelegramConfig.php:7
 * @route '/admin/telegram-configs/create'
 */
CreateTelegramConfig.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateTelegramConfig.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\TelegramConfigs\Pages\CreateTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/CreateTelegramConfig.php:7
 * @route '/admin/telegram-configs/create'
 */
CreateTelegramConfig.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateTelegramConfig.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\TelegramConfigs\Pages\CreateTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/CreateTelegramConfig.php:7
 * @route '/admin/telegram-configs/create'
 */
    const CreateTelegramConfigForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateTelegramConfig.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\TelegramConfigs\Pages\CreateTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/CreateTelegramConfig.php:7
 * @route '/admin/telegram-configs/create'
 */
        CreateTelegramConfigForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateTelegramConfig.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\TelegramConfigs\Pages\CreateTelegramConfig::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/CreateTelegramConfig.php:7
 * @route '/admin/telegram-configs/create'
 */
        CreateTelegramConfigForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateTelegramConfig.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateTelegramConfig.form = CreateTelegramConfigForm
export default CreateTelegramConfig