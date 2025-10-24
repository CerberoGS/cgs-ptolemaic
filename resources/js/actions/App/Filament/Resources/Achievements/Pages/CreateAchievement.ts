import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Achievements\Pages\CreateAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/CreateAchievement.php:7
 * @route '/admin/achievements/create'
 */
const CreateAchievement = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateAchievement.url(options),
    method: 'get',
})

CreateAchievement.definition = {
    methods: ["get","head"],
    url: '/admin/achievements/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Achievements\Pages\CreateAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/CreateAchievement.php:7
 * @route '/admin/achievements/create'
 */
CreateAchievement.url = (options?: RouteQueryOptions) => {
    return CreateAchievement.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Achievements\Pages\CreateAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/CreateAchievement.php:7
 * @route '/admin/achievements/create'
 */
CreateAchievement.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateAchievement.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Achievements\Pages\CreateAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/CreateAchievement.php:7
 * @route '/admin/achievements/create'
 */
CreateAchievement.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateAchievement.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Achievements\Pages\CreateAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/CreateAchievement.php:7
 * @route '/admin/achievements/create'
 */
    const CreateAchievementForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateAchievement.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Achievements\Pages\CreateAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/CreateAchievement.php:7
 * @route '/admin/achievements/create'
 */
        CreateAchievementForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateAchievement.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Achievements\Pages\CreateAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/CreateAchievement.php:7
 * @route '/admin/achievements/create'
 */
        CreateAchievementForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateAchievement.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateAchievement.form = CreateAchievementForm
export default CreateAchievement