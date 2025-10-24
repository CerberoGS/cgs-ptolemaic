<?php

use App\Mcp\Servers\AdminInsightsServer;
use Laravel\Mcp\Facades\Mcp;

Mcp::local('admin-insights', AdminInsightsServer::class);

Mcp::web('/mcp/admin-insights', AdminInsightsServer::class);
