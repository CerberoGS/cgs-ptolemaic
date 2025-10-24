import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Achievements\Pages\ListAchievements::__invoke
 * @see app/Filament/Resources/Achievements/Pages/ListAchievements.php:7
 * @route '/admin/achievements'
 */
const ListAchievements = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListAchievements.url(options),
    method: 'get',
})

ListAchievements.definition = {
    methods: ["get","head"],
    url: '/admin/achievements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Achievements\Pages\ListAchievements::__invoke
 * @see app/Filament/Resources/Achievements/Pages/ListAchievements.php:7
 * @route '/admin/achievements'
 */
ListAchievements.url = (options?: RouteQueryOptions) => {
    return ListAchievements.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Achievements\Pages\ListAchievements::__invoke
 * @see app/Filament/Resources/Achievements/Pages/ListAchievements.php:7
 * @route '/admin/achievements'
 */
ListAchievements.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListAchievements.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Achievements\Pages\ListAchievements::__invoke
 * @see app/Filament/Resources/Achievements/Pages/ListAchievements.php:7
 * @route '/admin/achievements'
 */
ListAchievements.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListAchievements.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Achievements\Pages\ListAchievements::__invoke
 * @see app/Filament/Resources/Achievements/Pages/ListAchievements.php:7
 * @route '/admin/achievements'
 */
    const ListAchievementsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListAchievements.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Achievements\Pages\ListAchievements::__invoke
 * @see app/Filament/Resources/Achievements/Pages/ListAchievements.php:7
 * @route '/admin/achievements'
 */
        ListAchievementsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListAchievements.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Achievements\Pages\ListAchievements::__invoke
 * @see app/Filament/Resources/Achievements/Pages/ListAchievements.php:7
 * @route '/admin/achievements'
 */
        ListAchievementsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListAchievements.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListAchievements.form = ListAchievementsForm
export default ListAchievements