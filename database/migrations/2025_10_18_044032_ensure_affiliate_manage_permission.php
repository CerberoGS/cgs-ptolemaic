<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    public function up(): void
    {
        /** @var Permission $permission */
        $permission = Permission::query()->firstOrCreate(
            ['name' => 'affiliate.manage', 'guard_name' => 'web'],
        );

        /** @var Role|null $adminRole */
        $adminRole = Role::query()->where('name', 'Admin')->where('guard_name', 'web')->first();

        if ($adminRole !== null && ! $adminRole->hasPermissionTo($permission)) {
            $adminRole->givePermissionTo($permission);
        }

        $adminEmails = [
            'test@example.com',
            'alexisrb76@gmail.com',
            'admin@cerberomart.com',
        ];

        if ($adminRole !== null) {
            User::query()
                ->whereIn('email', $adminEmails)
                ->each(function (User $user) use ($adminRole): void {
                    if (! $user->hasRole($adminRole)) {
                        $user->assignRole($adminRole);
                    }
                });
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void {}
};
