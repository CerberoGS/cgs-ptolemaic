import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
const ProvidersManager = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ProvidersManager.url(options),
    method: 'get',
})

ProvidersManager.definition = {
    methods: ["get","head"],
    url: '/admin/providers-manager',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
ProvidersManager.url = (options?: RouteQueryOptions) => {
    return ProvidersManager.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
ProvidersManager.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ProvidersManager.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
ProvidersManager.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ProvidersManager.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
    const ProvidersManagerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ProvidersManager.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
        ProvidersManagerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ProvidersManager.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
        ProvidersManagerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ProvidersManager.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ProvidersManager.form = ProvidersManagerForm
export default ProvidersManager