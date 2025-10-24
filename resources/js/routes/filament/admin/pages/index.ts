import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Filament\Pages\Dashboard::__invoke
 * @see vendor/filament/filament/src/Pages/Dashboard.php:7
 * @route '/admin'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Filament\Pages\Dashboard::__invoke
 * @see vendor/filament/filament/src/Pages/Dashboard.php:7
 * @route '/admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Filament\Pages\Dashboard::__invoke
 * @see vendor/filament/filament/src/Pages/Dashboard.php:7
 * @route '/admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Filament\Pages\Dashboard::__invoke
 * @see vendor/filament/filament/src/Pages/Dashboard.php:7
 * @route '/admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Filament\Pages\Dashboard::__invoke
 * @see vendor/filament/filament/src/Pages/Dashboard.php:7
 * @route '/admin'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Filament\Pages\Dashboard::__invoke
 * @see vendor/filament/filament/src/Pages/Dashboard.php:7
 * @route '/admin'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Filament\Pages\Dashboard::__invoke
 * @see vendor/filament/filament/src/Pages/Dashboard.php:7
 * @route '/admin'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
export const providersManager = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: providersManager.url(options),
    method: 'get',
})

providersManager.definition = {
    methods: ["get","head"],
    url: '/admin/providers-manager',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
providersManager.url = (options?: RouteQueryOptions) => {
    return providersManager.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
providersManager.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: providersManager.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
providersManager.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: providersManager.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
    const providersManagerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: providersManager.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
        providersManagerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: providersManager.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Pages\ProvidersManager::__invoke
 * @see app/Filament/Pages/ProvidersManager.php:7
 * @route '/admin/providers-manager'
 */
        providersManagerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: providersManager.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    providersManager.form = providersManagerForm
const pages = {
    dashboard: Object.assign(dashboard, dashboard),
providersManager: Object.assign(providersManager, providersManager),
}

export default pages