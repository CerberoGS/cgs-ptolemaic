import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../wayfinder'
/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/.well-known/oauth-protected-resource/{path?}'
 */
export const protectedResource = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: protectedResource.url(args, options),
    method: 'get',
})

protectedResource.definition = {
    methods: ["get","head"],
    url: '/.well-known/oauth-protected-resource/{path?}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/.well-known/oauth-protected-resource/{path?}'
 */
protectedResource.url = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { path: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    path: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "path",
        ])

    const parsedArgs = {
                        path: args?.path,
                }

    return protectedResource.definition.url
            .replace('{path?}', parsedArgs.path?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/.well-known/oauth-protected-resource/{path?}'
 */
protectedResource.get = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: protectedResource.url(args, options),
    method: 'get',
})
/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/.well-known/oauth-protected-resource/{path?}'
 */
protectedResource.head = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: protectedResource.url(args, options),
    method: 'head',
})

    /**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/.well-known/oauth-protected-resource/{path?}'
 */
    const protectedResourceForm = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: protectedResource.url(args, options),
        method: 'get',
    })

            /**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/.well-known/oauth-protected-resource/{path?}'
 */
        protectedResourceForm.get = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: protectedResource.url(args, options),
            method: 'get',
        })
            /**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/.well-known/oauth-protected-resource/{path?}'
 */
        protectedResourceForm.head = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: protectedResource.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    protectedResource.form = protectedResourceForm
/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/api/.well-known/oauth-protected-resource/{path?}'
 */
export const protectedResource = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: protectedResource.url(args, options),
    method: 'get',
})

protectedResource.definition = {
    methods: ["get","head"],
    url: '/api/.well-known/oauth-protected-resource/{path?}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/api/.well-known/oauth-protected-resource/{path?}'
 */
protectedResource.url = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { path: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    path: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "path",
        ])

    const parsedArgs = {
                        path: args?.path,
                }

    return protectedResource.definition.url
            .replace('{path?}', parsedArgs.path?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/api/.well-known/oauth-protected-resource/{path?}'
 */
protectedResource.get = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: protectedResource.url(args, options),
    method: 'get',
})
/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/api/.well-known/oauth-protected-resource/{path?}'
 */
protectedResource.head = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: protectedResource.url(args, options),
    method: 'head',
})

    /**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/api/.well-known/oauth-protected-resource/{path?}'
 */
    const protectedResourceForm = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: protectedResource.url(args, options),
        method: 'get',
    })

            /**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/api/.well-known/oauth-protected-resource/{path?}'
 */
        protectedResourceForm.get = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: protectedResource.url(args, options),
            method: 'get',
        })
            /**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:88
 * @route '/api/.well-known/oauth-protected-resource/{path?}'
 */
        protectedResourceForm.head = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: protectedResource.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    protectedResource.form = protectedResourceForm
/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/.well-known/oauth-authorization-server/{path?}'
 */
export const authorizationServer = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authorizationServer.url(args, options),
    method: 'get',
})

authorizationServer.definition = {
    methods: ["get","head"],
    url: '/.well-known/oauth-authorization-server/{path?}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/.well-known/oauth-authorization-server/{path?}'
 */
authorizationServer.url = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { path: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    path: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "path",
        ])

    const parsedArgs = {
                        path: args?.path,
                }

    return authorizationServer.definition.url
            .replace('{path?}', parsedArgs.path?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/.well-known/oauth-authorization-server/{path?}'
 */
authorizationServer.get = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authorizationServer.url(args, options),
    method: 'get',
})
/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/.well-known/oauth-authorization-server/{path?}'
 */
authorizationServer.head = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: authorizationServer.url(args, options),
    method: 'head',
})

    /**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/.well-known/oauth-authorization-server/{path?}'
 */
    const authorizationServerForm = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: authorizationServer.url(args, options),
        method: 'get',
    })

            /**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/.well-known/oauth-authorization-server/{path?}'
 */
        authorizationServerForm.get = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: authorizationServer.url(args, options),
            method: 'get',
        })
            /**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/.well-known/oauth-authorization-server/{path?}'
 */
        authorizationServerForm.head = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: authorizationServer.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    authorizationServer.form = authorizationServerForm
/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/api/.well-known/oauth-authorization-server/{path?}'
 */
export const authorizationServer = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authorizationServer.url(args, options),
    method: 'get',
})

authorizationServer.definition = {
    methods: ["get","head"],
    url: '/api/.well-known/oauth-authorization-server/{path?}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/api/.well-known/oauth-authorization-server/{path?}'
 */
authorizationServer.url = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { path: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    path: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "path",
        ])

    const parsedArgs = {
                        path: args?.path,
                }

    return authorizationServer.definition.url
            .replace('{path?}', parsedArgs.path?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/api/.well-known/oauth-authorization-server/{path?}'
 */
authorizationServer.get = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authorizationServer.url(args, options),
    method: 'get',
})
/**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/api/.well-known/oauth-authorization-server/{path?}'
 */
authorizationServer.head = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: authorizationServer.url(args, options),
    method: 'head',
})

    /**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/api/.well-known/oauth-authorization-server/{path?}'
 */
    const authorizationServerForm = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: authorizationServer.url(args, options),
        method: 'get',
    })

            /**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/api/.well-known/oauth-authorization-server/{path?}'
 */
        authorizationServerForm.get = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: authorizationServer.url(args, options),
            method: 'get',
        })
            /**
 * @see vendor/laravel/mcp/src/Server/Registrar.php:94
 * @route '/api/.well-known/oauth-authorization-server/{path?}'
 */
        authorizationServerForm.head = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: authorizationServer.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    authorizationServer.form = authorizationServerForm
const oauth = {
    protectedResource: Object.assign(protectedResource, protectedResource),
authorizationServer: Object.assign(authorizationServer, authorizationServer),
}

export default oauth