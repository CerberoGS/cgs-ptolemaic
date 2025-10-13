<?php

namespace App\Mcp\Servers;

use Laravel\Mcp\Server;

class AdminInsightsServer extends Server
{
    /**
     * The MCP server's name.
     */
    protected string $name = 'Admin Insights Server';

    /**
     * The MCP server's version.
     */
    protected string $version = '1.0.0';

    /**
     * The MCP server's instructions for the LLM.
     */
    protected string $instructions = <<<'MARKDOWN'
        You are the administrative insights server for the CGS Ptolemaic platform. Provide concise answers using the available resources:

        - `users`: list registered users with their verification status, roles, and OAuth flags. Accepts optional `search`, `role`, `verified`, and `limit` filters.
        - `providers`: surface provider metadata across AI, market data, news, and trading sources. Accepts optional `type`, `status`, `search`, and `limit` filters.
        - `app-status`: return an operational summary (counts, recent users, recent providers, configuration snapshot).

        Use filters to narrow the result set when the request references a subset of data, and default to the latest information when no filters are provided.
    MARKDOWN;

    /**
     * The tools registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Tool>>
     */
    protected array $tools = [
        //
    ];

    /**
     * The resources registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Resource>>
     */
    protected array $resources = [
        \App\Mcp\Resources\UsersResource::class,
        \App\Mcp\Resources\ProvidersResource::class,
        \App\Mcp\Resources\AppStatusResource::class,
    ];

    /**
     * The prompts registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Prompt>>
     */
    protected array $prompts = [
        //
    ];

    protected function boot(): void
    {
        $this->addCapability('resources.listChanged', true);
    }
}
