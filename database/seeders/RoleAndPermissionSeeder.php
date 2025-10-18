<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $adminEmails = [
            'test@example.com',
            'alexisrb76@gmail.com',
            'admin@cerberomart.com',
        ];

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
            Permission::query()->firstOrCreate(
                ['name' => $permission, 'guard_name' => 'web'],
            );
        }

        $rolesWithPermissions = [
            'User' => ['dashboard.view'],
            'Manager' => [
                'dashboard.view',
                'feedback.manage',
            ],
            'Admin' => $permissions,
        ];

        /** @var array<string, Role> $roles */
        $roles = [];

        foreach ($rolesWithPermissions as $roleName => $rolePermissions) {
            $role = Role::query()->firstOrCreate(
                ['name' => $roleName, 'guard_name' => 'web'],
            );

            $role->syncPermissions($rolePermissions);
            $roles[$roleName] = $role;
        }

        $userRole = $roles['User'];
        $adminRole = $roles['Admin'];

        User::query()->get()->each(function (User $user) use ($userRole, $adminRole, $adminEmails): void {
            if (in_array($user->email, $adminEmails, true)) {
                $user->syncRoles([$adminRole->name]);

                return;
            }

            $user->syncRoles([$userRole->name]);
        });
    }
}
