import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Achievements\Pages\EditAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/EditAchievement.php:7
 * @route '/admin/achievements/{record}/edit'
 */
const EditAchievement = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditAchievement.url(args, options),
    method: 'get',
})

EditAchievement.definition = {
    methods: ["get","head"],
    url: '/admin/achievements/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Achievements\Pages\EditAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/EditAchievement.php:7
 * @route '/admin/achievements/{record}/edit'
 */
EditAchievement.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditAchievement.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Achievements\Pages\EditAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/EditAchievement.php:7
 * @route '/admin/achievements/{record}/edit'
 */
EditAchievement.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditAchievement.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Achievements\Pages\EditAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/EditAchievement.php:7
 * @route '/admin/achievements/{record}/edit'
 */
EditAchievement.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditAchievement.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Achievements\Pages\EditAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/EditAchievement.php:7
 * @route '/admin/achievements/{record}/edit'
 */
    const EditAchievementForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditAchievement.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Achievements\Pages\EditAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/EditAchievement.php:7
 * @route '/admin/achievements/{record}/edit'
 */
        EditAchievementForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditAchievement.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Achievements\Pages\EditAchievement::__invoke
 * @see app/Filament/Resources/Achievements/Pages/EditAchievement.php:7
 * @route '/admin/achievements/{record}/edit'
 */
        EditAchievementForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditAchievement.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditAchievement.form = EditAchievementForm
export default EditAchievement