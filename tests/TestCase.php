<?php

namespace Tests;

use App\Http\Middleware\CheckSessionExpiration;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Inertia::setRootView('testing');

        URL::defaults(['locale' => config('app.locale')]);

        $this->withoutMiddleware(CheckSessionExpiration::class);

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $permissions = [
            'dashboard.view',
            'admin.dashboard',
            'providers.view',
            'providers.manage',
            'users.view',
            'users.manage',
            'roles.view',
            'roles.manage',
            'feedback.manage',
            'invitations.manage',
            'pricing.manage',
            'languages.manage',
            'affiliate.manage',
            'admin.manage',
        ];

        foreach ($permissions as $permission) {
            Permission::query()->firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }
    }

    protected function tearDown(): void
    {
        URL::defaults([]);

        Inertia::setRootView('app');

        parent::tearDown();
    }
}
