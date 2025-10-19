import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\EmailVerificationPromptController::__invoke
 * @see app/Http/Controllers/Auth/EmailVerificationPromptController.php:16
 * @route '/{locale}/verify-email'
 */
export const notice = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notice.url(args, options),
    method: 'get',
})

notice.definition = {
    methods: ["get","head"],
    url: '/{locale}/verify-email',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\EmailVerificationPromptController::__invoke
 * @see app/Http/Controllers/Auth/EmailVerificationPromptController.php:16
 * @route '/{locale}/verify-email'
 */
notice.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return notice.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\EmailVerificationPromptController::__invoke
 * @see app/Http/Controllers/Auth/EmailVerificationPromptController.php:16
 * @route '/{locale}/verify-email'
 */
notice.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notice.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\EmailVerificationPromptController::__invoke
 * @see app/Http/Controllers/Auth/EmailVerificationPromptController.php:16
 * @route '/{locale}/verify-email'
 */
notice.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: notice.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\EmailVerificationPromptController::__invoke
 * @see app/Http/Controllers/Auth/EmailVerificationPromptController.php:16
 * @route '/{locale}/verify-email'
 */
    const noticeForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: notice.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\EmailVerificationPromptController::__invoke
 * @see app/Http/Controllers/Auth/EmailVerificationPromptController.php:16
 * @route '/{locale}/verify-email'
 */
        noticeForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: notice.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\EmailVerificationPromptController::__invoke
 * @see app/Http/Controllers/Auth/EmailVerificationPromptController.php:16
 * @route '/{locale}/verify-email'
 */
        noticeForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: notice.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    notice.form = noticeForm
/**
* @see \App\Http\Controllers\Auth\VerifyEmailController::__invoke
 * @see app/Http/Controllers/Auth/VerifyEmailController.php:14
 * @route '/{locale}/verify-email/{id}/{hash}'
 */
export const verify = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(args, options),
    method: 'get',
})

verify.definition = {
    methods: ["get","head"],
    url: '/{locale}/verify-email/{id}/{hash}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\VerifyEmailController::__invoke
 * @see app/Http/Controllers/Auth/VerifyEmailController.php:14
 * @route '/{locale}/verify-email/{id}/{hash}'
 */
verify.url = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                    id: args[1],
                    hash: args[2],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                                id: args.id,
                                hash: args.hash,
                }

    return verify.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace('{hash}', parsedArgs.hash.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\VerifyEmailController::__invoke
 * @see app/Http/Controllers/Auth/VerifyEmailController.php:14
 * @route '/{locale}/verify-email/{id}/{hash}'
 */
verify.get = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\VerifyEmailController::__invoke
 * @see app/Http/Controllers/Auth/VerifyEmailController.php:14
 * @route '/{locale}/verify-email/{id}/{hash}'
 */
verify.head = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\VerifyEmailController::__invoke
 * @see app/Http/Controllers/Auth/VerifyEmailController.php:14
 * @route '/{locale}/verify-email/{id}/{hash}'
 */
    const verifyForm = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: verify.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\VerifyEmailController::__invoke
 * @see app/Http/Controllers/Auth/VerifyEmailController.php:14
 * @route '/{locale}/verify-email/{id}/{hash}'
 */
        verifyForm.get = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\VerifyEmailController::__invoke
 * @see app/Http/Controllers/Auth/VerifyEmailController.php:14
 * @route '/{locale}/verify-email/{id}/{hash}'
 */
        verifyForm.head = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    verify.form = verifyForm
/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::send
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:14
 * @route '/{locale}/email/verification-notification'
 */
export const send = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(args, options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/{locale}/email/verification-notification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::send
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:14
 * @route '/{locale}/email/verification-notification'
 */
send.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return send.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::send
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:14
 * @route '/{locale}/email/verification-notification'
 */
send.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::send
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:14
 * @route '/{locale}/email/verification-notification'
 */
    const sendForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: send.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::send
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:14
 * @route '/{locale}/email/verification-notification'
 */
        sendForm.post = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: send.url(args, options),
            method: 'post',
        })
    
    send.form = sendForm
const verification = {
    notice: Object.assign(notice, notice),
verify: Object.assign(verify, verify),
send: Object.assign(send, send),
}

export default verification