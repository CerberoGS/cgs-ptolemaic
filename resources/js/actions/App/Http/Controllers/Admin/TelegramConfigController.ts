import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::index
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
 * @route '/{locale}/admin/telegram-config'
 */
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/admin/telegram-config',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::index
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
 * @route '/{locale}/admin/telegram-config'
 */
index.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return index.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::index
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
 * @route '/{locale}/admin/telegram-config'
 */
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::index
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
 * @route '/{locale}/admin/telegram-config'
 */
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::index
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
 * @route '/{locale}/admin/telegram-config'
 */
    const indexForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::index
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
 * @route '/{locale}/admin/telegram-config'
 */
        indexForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::index
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:27
 * @route '/{locale}/admin/telegram-config'
 */
        indexForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::update
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:39
 * @route '/{locale}/admin/telegram-config'
 */
export const update = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/{locale}/admin/telegram-config',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::update
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:39
 * @route '/{locale}/admin/telegram-config'
 */
update.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return update.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::update
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:39
 * @route '/{locale}/admin/telegram-config'
 */
update.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::update
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:39
 * @route '/{locale}/admin/telegram-config'
 */
    const updateForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::update
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:39
 * @route '/{locale}/admin/telegram-config'
 */
        updateForm.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::test
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:99
 * @route '/{locale}/admin/telegram-config/test'
 */
export const test = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(args, options),
    method: 'post',
})

test.definition = {
    methods: ["post"],
    url: '/{locale}/admin/telegram-config/test',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::test
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:99
 * @route '/{locale}/admin/telegram-config/test'
 */
test.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return test.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::test
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:99
 * @route '/{locale}/admin/telegram-config/test'
 */
test.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::test
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:99
 * @route '/{locale}/admin/telegram-config/test'
 */
    const testForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: test.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::test
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:99
 * @route '/{locale}/admin/telegram-config/test'
 */
        testForm.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: test.url(args, options),
            method: 'post',
        })
    
    test.form = testForm
/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::webhook
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:142
 * @route '/{locale}/telegram/webhook'
 */
export const webhook = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(args, options),
    method: 'post',
})

webhook.definition = {
    methods: ["post"],
    url: '/{locale}/telegram/webhook',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::webhook
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:142
 * @route '/{locale}/telegram/webhook'
 */
webhook.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return webhook.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TelegramConfigController::webhook
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:142
 * @route '/{locale}/telegram/webhook'
 */
webhook.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::webhook
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:142
 * @route '/{locale}/telegram/webhook'
 */
    const webhookForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: webhook.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TelegramConfigController::webhook
 * @see app/Http/Controllers/Admin/TelegramConfigController.php:142
 * @route '/{locale}/telegram/webhook'
 */
        webhookForm.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: webhook.url(args, options),
            method: 'post',
        })
    
    webhook.form = webhookForm
const TelegramConfigController = { index, update, test, webhook }

export default TelegramConfigController