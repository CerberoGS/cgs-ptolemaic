import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\VerifyEmailController::__invoke
 * @see app/Http/Controllers/Auth/VerifyEmailController.php:14
 * @route '/{locale}/verify-email/{id}/{hash}'
 */
const VerifyEmailController = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: VerifyEmailController.url(args, options),
    method: 'get',
})

VerifyEmailController.definition = {
    methods: ["get","head"],
    url: '/{locale}/verify-email/{id}/{hash}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\VerifyEmailController::__invoke
 * @see app/Http/Controllers/Auth/VerifyEmailController.php:14
 * @route '/{locale}/verify-email/{id}/{hash}'
 */
VerifyEmailController.url = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions) => {
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

    return VerifyEmailController.definition.url
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
VerifyEmailController.get = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: VerifyEmailController.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\VerifyEmailController::__invoke
 * @see app/Http/Controllers/Auth/VerifyEmailController.php:14
 * @route '/{locale}/verify-email/{id}/{hash}'
 */
VerifyEmailController.head = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: VerifyEmailController.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\VerifyEmailController::__invoke
 * @see app/Http/Controllers/Auth/VerifyEmailController.php:14
 * @route '/{locale}/verify-email/{id}/{hash}'
 */
    const VerifyEmailControllerForm = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: VerifyEmailController.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\VerifyEmailController::__invoke
 * @see app/Http/Controllers/Auth/VerifyEmailController.php:14
 * @route '/{locale}/verify-email/{id}/{hash}'
 */
        VerifyEmailControllerForm.get = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: VerifyEmailController.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\VerifyEmailController::__invoke
 * @see app/Http/Controllers/Auth/VerifyEmailController.php:14
 * @route '/{locale}/verify-email/{id}/{hash}'
 */
        VerifyEmailControllerForm.head = (args: { locale: string | number, id: string | number, hash: string | number } | [locale: string | number, id: string | number, hash: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: VerifyEmailController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    VerifyEmailController.form = VerifyEmailControllerForm
export default VerifyEmailController