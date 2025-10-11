<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateUserDefaultProvidersRequest;
use App\Http\Requests\Admin\UpdateUserRolesRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class AdminUserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::query()
            ->with([
                'roles:id,name',
                'defaultProviderSetting',
                'aiProviderKeys.provider:id,display_name',
                'aiProviderKeys.model:id,display_name',
                'marketDataProviderKeys.provider:id,display_name',
                'newsProviderKeys.provider:id,display_name',
                'tradingProviderKeys.provider:id,display_name',
            ])
            ->orderBy('name')
            ->get();

        $roles = Role::query()
            ->orderBy('name')
            ->get(['id', 'name', 'guard_name']);

        return Inertia::render('admin/users/index', [
            'users' => $users->map(function (User $user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $user->roles->pluck('name')->values(),
                    'defaults' => [
                        'ai_provider_key_id' => $user->defaultProviderSetting->ai_provider_key_id ?? null,
                        'ai_provider_model_id' => $user->defaultProviderSetting->ai_provider_model_id ?? null,
                        'market_data_provider_key_id' => $user->defaultProviderSetting->market_data_provider_key_id ?? null,
                        'news_provider_key_id' => $user->defaultProviderSetting->news_provider_key_id ?? null,
                        'trading_provider_key_id' => $user->defaultProviderSetting->trading_provider_key_id ?? null,
                    ],
                    'keys' => [
                        'ai' => $user->aiProviderKeys->map(fn ($key) => [
                            'id' => $key->id,
                            'label' => $key->label,
                            'provider' => $key->provider?->display_name,
                            'model' => $key->model?->display_name,
                        ]),
                        'market_data' => $user->marketDataProviderKeys->map(fn ($key) => [
                            'id' => $key->id,
                            'label' => $key->label,
                            'provider' => $key->provider?->display_name,
                        ]),
                        'news' => $user->newsProviderKeys->map(fn ($key) => [
                            'id' => $key->id,
                            'label' => $key->label,
                            'provider' => $key->provider?->display_name,
                        ]),
                        'trading' => $user->tradingProviderKeys->map(fn ($key) => [
                            'id' => $key->id,
                            'label' => $key->label,
                            'provider' => $key->provider?->display_name,
                        ]),
                    ],
                ];
            }),
            'roles' => $roles->map(fn (Role $role) => [
                'id' => $role->id,
                'name' => $role->name,
            ]),
        ]);
    }

    public function updateRoles(UpdateUserRolesRequest $request, string $locale, User $user): RedirectResponse
    {
        $roles = $request->validated('roles') ?? [];
        $user->syncRoles($roles);

        return redirect()
            ->back()
            ->with('success', __('Roles updated for :name.', ['name' => $user->name]));
    }

    public function updateDefaults(UpdateUserDefaultProvidersRequest $request, string $locale, User $user): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['ai_provider_key_id'])) {
            $data['ai_provider_model_id'] = null;
        }

        $user->defaultProviderSetting()
            ->updateOrCreate([], [
                'ai_provider_key_id' => $data['ai_provider_key_id'] ?? null,
                'ai_provider_model_id' => $data['ai_provider_model_id'] ?? null,
                'market_data_provider_key_id' => $data['market_data_provider_key_id'] ?? null,
                'news_provider_key_id' => $data['news_provider_key_id'] ?? null,
                'trading_provider_key_id' => $data['trading_provider_key_id'] ?? null,
            ]);

        return redirect()
            ->back()
            ->with('success', __('Default provider preferences updated for :name.', ['name' => $user->name]));
    }
}
