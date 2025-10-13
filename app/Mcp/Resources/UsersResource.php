<?php

namespace App\Mcp\Resources;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Validation\Rule;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Resource;

class UsersResource extends Resource
{
    protected string $name = 'users';

    protected string $title = 'Registered Users';

    protected string $mimeType = 'application/json';

    protected string $description = <<<'MARKDOWN'
        Provides a snapshot of the registered users, including their verification status and assigned roles. Optional filters:
        - `search`: string contained in the name or email.
        - `role`: exact role name.
        - `verified`: boolean flag (`true` / `false`).
        - `limit`: number of records to return (max 50, default 25).
    MARKDOWN;

    public function handle(Request $request): Response
    {
        $filters = $request->validate([
            'search' => ['sometimes', 'string', 'max:255'],
            'role' => ['sometimes', 'string', 'max:255'],
            'verified' => ['sometimes', Rule::in([true, false, 'true', 'false', 1, 0, '1', '0'])],
            'limit' => ['sometimes', 'integer', 'min:1', 'max:50'],
        ]);

        $limit = (int) ($filters['limit'] ?? 25);
        $search = isset($filters['search']) ? trim((string) $filters['search']) : null;
        $roleFilter = isset($filters['role']) ? trim((string) $filters['role']) : null;
        $verifiedFilter = array_key_exists('verified', $filters) ? filter_var($filters['verified'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) : null;

        $users = User::query()
            ->with('roles:id,name')
            ->when($search, fn (Builder $query) => $query->where(function (Builder $query) use ($search): void {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            }))
            ->when($roleFilter, fn (Builder $query) => $query->whereHas('roles', fn (Builder $roleQuery) => $roleQuery->where('name', $roleFilter)))
            ->when($verifiedFilter !== null, fn (Builder $query) => $verifiedFilter
                ? $query->whereNotNull('email_verified_at')
                : $query->whereNull('email_verified_at'))
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get()
            ->map(fn (User $user): array => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified' => $user->email_verified_at !== null,
                'has_password' => (bool) $user->password,
                'roles' => $user->roles->pluck('name')->values(),
                'created_at' => optional($user->created_at)->toIso8601String(),
                'last_updated' => optional($user->updated_at)->toIso8601String(),
                'google_oauth' => $user->google_id !== null,
            ]);

        return Response::json([
            'filters' => [
                'search' => $search,
                'role' => $roleFilter,
                'verified' => $verifiedFilter,
                'limit' => $limit,
            ],
            'count' => $users->count(),
            'users' => $users,
        ]);
    }
}
