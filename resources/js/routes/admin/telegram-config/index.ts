import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::update
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
export const update = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/{locale?}/admin/telegram-config',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::update
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
update.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args?.locale ?? '$locale',
                }

    return update.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::update
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
update.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::update
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
    const updateForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::update
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config'
 */
        updateForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::test
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config/test'
 */
export const test = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(args, options),
    method: 'post',
})

test.definition = {
    methods: ["post"],
    url: '/{locale?}/admin/telegram-config/test',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::test
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config/test'
 */
test.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args?.locale ?? '$locale',
                }

    return test.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::test
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config/test'
 */
test.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::test
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config/test'
 */
    const testForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: test.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::test
 * @see [unknown]:0
 * @param locale - Default: '$locale'
 * @route '/{locale?}/admin/telegram-config/test'
 */
        testForm.post = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: test.url(args, options),
            method: 'post',
        })
    
    test.form = testForm
const telegramConfig = {
    update: Object.assign(update, update),
test: Object.assign(test, test),
}

export default telegramConfig