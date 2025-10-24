<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRoleRequest;
use App\Http\Requests\Admin\UpdateRoleRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminRoleController extends Controller
{
    /**
     * Roles que no deben modificarse ni eliminarse.
     *
     * @var array<int, string>
     */
    protected const PROTECTED_ROLES = ['Admin', 'Manager', 'User'];

    public function index(Request $request): Response
    {
        $roles = Role::query()
            ->where('guard_name', 'web')
            ->with('permissions:id,name')
            ->orderBy('name')
            ->get();

        $permissions = Permission::query()
            ->where('guard_name', 'web')
            ->orderBy('name')
            ->get(['id', 'name'])
            ->unique('name')
            ->values();

        return Inertia::render('admin/roles/index', [
            'roles' => $roles->map(function (Role $role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'permissions' => $role->permissions->pluck('name')->unique()->values(),
                    'is_protected' => in_array($role->name, self::PROTECTED_ROLES, true),
                ];
            }),
            'permissions' => $permissions->map(fn (Permission $permission) => [
                'id' => $permission->id,
                'name' => $permission->name,
            ]),
        ]);
    }

    public function store(StoreRoleRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $role = Role::create([
            'name' => $data['name'],
            'guard_name' => 'web',
        ]);

        $role->syncPermissions(Arr::wrap($data['permissions'] ?? []));

        return redirect()
            ->back()
            ->with('success', __('Role :name created successfully.', ['name' => $role->name]));
    }

    public function update(UpdateRoleRequest $request, string $locale, Role $role): RedirectResponse
    {
        $data = $request->validated();

        $role->update([
            'name' => $data['name'],
        ]);

        $role->syncPermissions(Arr::wrap($data['permissions'] ?? []));

        return redirect()
            ->back()
            ->with('success', __('Role :name updated successfully.', ['name' => $role->name]));
    }

    public function destroy(string $locale, Role $role): RedirectResponse
    {
        $this->ensureMutable($role);

        $name = $role->name;
        $role->delete();

        return redirect()
            ->back()
            ->with('success', __('Role :name deleted successfully.', ['name' => $name]));
    }

    protected function ensureMutable(Role $role): void
    {
        if (in_array($role->name, self::PROTECTED_ROLES, true)) {
            throw ValidationException::withMessages([
                'role' => __('This role cannot be modified.'),
            ]);
        }

        if ($role->guard_name !== 'web') {
            abort(404);
        }
    }
}
