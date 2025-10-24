import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\TelegramConfigs\Pages\ListTelegramConfigs::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/ListTelegramConfigs.php:7
 * @route '/admin/telegram-configs'
 */
const ListTelegramConfigs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListTelegramConfigs.url(options),
    method: 'get',
})

ListTelegramConfigs.definition = {
    methods: ["get","head"],
    url: '/admin/telegram-configs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\TelegramConfigs\Pages\ListTelegramConfigs::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/ListTelegramConfigs.php:7
 * @route '/admin/telegram-configs'
 */
ListTelegramConfigs.url = (options?: RouteQueryOptions) => {
    return ListTelegramConfigs.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\TelegramConfigs\Pages\ListTelegramConfigs::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/ListTelegramConfigs.php:7
 * @route '/admin/telegram-configs'
 */
ListTelegramConfigs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListTelegramConfigs.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\TelegramConfigs\Pages\ListTelegramConfigs::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/ListTelegramConfigs.php:7
 * @route '/admin/telegram-configs'
 */
ListTelegramConfigs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListTelegramConfigs.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\TelegramConfigs\Pages\ListTelegramConfigs::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/ListTelegramConfigs.php:7
 * @route '/admin/telegram-configs'
 */
    const ListTelegramConfigsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListTelegramConfigs.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\TelegramConfigs\Pages\ListTelegramConfigs::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/ListTelegramConfigs.php:7
 * @route '/admin/telegram-configs'
 */
        ListTelegramConfigsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListTelegramConfigs.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\TelegramConfigs\Pages\ListTelegramConfigs::__invoke
 * @see app/Filament/Resources/TelegramConfigs/Pages/ListTelegramConfigs.php:7
 * @route '/admin/telegram-configs'
 */
        ListTelegramConfigsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListTelegramConfigs.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListTelegramConfigs.form = ListTelegramConfigsForm
export default ListTelegramConfigs