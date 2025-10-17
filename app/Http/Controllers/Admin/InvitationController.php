<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PlanType;
use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvitationController extends Controller
{
    /**
     * Display a listing of invitations
     */
    public function index(Request $request): Response
    {
        $query = Invitation::query()
            ->with(['creator:id,name,email', 'redemptions'])
            ->withCount('redemptions');

        // Filters
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('target_plan')) {
            $query->where('target_plan', $request->input('target_plan'));
        }

        $invitations = $query->latest()->paginate(15)->withQueryString();

        $invitations->getCollection()->transform(function ($invitation) {
            return [
                'id' => $invitation->id,
                'code' => $invitation->code,
                'name' => $invitation->name,
                'description' => $invitation->description,
                'target_plan' => [
                    'value' => $invitation->target_plan->value,
                    'label' => $invitation->target_plan->label(),
                    'emoji' => $invitation->target_plan->emoji(),
                ],
                'price_monthly' => $invitation->price_monthly,
                'discount_percent' => $invitation->discount_percent,
                'trial_duration_days' => $invitation->trial_duration_days,
                'usage_limit' => $invitation->usage_limit,
                'usage_count' => $invitation->usage_count,
                'redemptions_count' => $invitation->redemptions_count,
                'available_redemptions' => $invitation->availableRedemptions(),
                'expires_at' => $invitation->expires_at?->toIso8601String(),
                'status' => [
                    'value' => $invitation->status->value,
                    'label' => $invitation->status->label(),
                    'color' => $invitation->status->color(),
                ],
                'creator' => $invitation->creator ? [
                    'name' => $invitation->creator->name,
                    'email' => $invitation->creator->email,
                ] : null,
                'referred_by' => $invitation->referred_by,
                'created_at' => $invitation->created_at->toIso8601String(),
                'is_valid' => $invitation->isValid(),
            ];
        });

        return Inertia::render('admin/invitations/index', [
            'invitations' => $invitations,
            'filters' => $request->only(['search', 'status', 'target_plan']),
        ]);
    }

    /**
     * Show the form for creating a new invitation
     */
    public function create(): Response
    {
        $plans = collect(PlanType::cases())->map(fn (PlanType $plan) => [
            'value' => $plan->value,
            'label' => $plan->label(),
            'emoji' => $plan->emoji(),
        ])->values();

        return Inertia::render('admin/invitations/create', [
            'plans' => $plans,
        ]);
    }

    /**
     * Store a newly created invitation
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'target_plan' => ['required', 'string'],
            'price_monthly' => ['nullable', 'numeric', 'min:0'],
            'discount_percent' => ['nullable', 'integer', 'min:0', 'max:100'],
            'trial_duration_days' => ['nullable', 'integer', 'min:1', 'max:365'],
            'usage_limit' => ['nullable', 'integer', 'min:1'],
            'expires_at' => ['nullable', 'date', 'after:now'],
            'referred_by' => ['nullable', 'string', 'max:255'],
        ]);

        $invitation = Invitation::create([
            ...$validated,
            'code' => Invitation::generateUniqueCode(),
            'created_by' => $request->user()->id,
            'usage_count' => 0,
            'status' => 'active',
        ]);

        return redirect()
            ->route('admin.invitations.show', ['invitation' => $invitation->id])
            ->with('success', __('Invitation created successfully!'));
    }

    /**
     * Display the specified invitation
     */
    public function show(string $locale, $invitation): Response
    {
        // Handle both model binding and manual ID resolution
        if (is_string($invitation) || is_numeric($invitation)) {
            $invitation = Invitation::findOrFail($invitation);
        }
        
        $invitation->load(['creator:id,name,email', 'redemptions.user:id,name,email']);

        return Inertia::render('admin/invitations/show', [
            'invitation' => [
                'id' => $invitation->id,
                'code' => $invitation->code,
                'name' => $invitation->name,
                'description' => $invitation->description,
                'target_plan' => [
                    'value' => $invitation->target_plan->value,
                    'label' => $invitation->target_plan->label(),
                    'emoji' => $invitation->target_plan->emoji(),
                ],
                'price_monthly' => $invitation->price_monthly,
                'discount_percent' => $invitation->discount_percent,
                'trial_duration_days' => $invitation->trial_duration_days,
                'usage_limit' => $invitation->usage_limit,
                'usage_count' => $invitation->usage_count,
                'available_redemptions' => $invitation->availableRedemptions(),
                'expires_at' => $invitation->expires_at?->toIso8601String(),
                'status' => [
                    'value' => $invitation->status->value,
                    'label' => $invitation->status->label(),
                    'color' => $invitation->status->color(),
                ],
                'creator' => $invitation->creator ? [
                    'name' => $invitation->creator->name,
                    'email' => $invitation->creator->email,
                ] : null,
                'referred_by' => $invitation->referred_by,
                'created_at' => $invitation->created_at->toIso8601String(),
                'is_valid' => $invitation->isValid(),
                'redemptions' => $invitation->redemptions->map(fn ($redemption) => [
                    'id' => $redemption->id,
                    'user' => [
                        'name' => $redemption->user->name,
                        'email' => $redemption->user->email,
                    ],
                    'ip_address' => $redemption->ip_address,
                    'created_at' => $redemption->created_at->toIso8601String(),
                ]),
            ],
        ]);
    }

    /**
     * Update the specified invitation
     */
    public function update(Request $request, string $locale, $invitation): RedirectResponse
    {
        // Handle both model binding and manual ID resolution
        if (is_string($invitation) || is_numeric($invitation)) {
            $invitation = Invitation::findOrFail($invitation);
        }
        
        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'expires_at' => ['nullable', 'date'],
            'usage_limit' => ['nullable', 'integer', 'min:1'],
            'status' => ['sometimes', 'string', 'in:active,disabled'],
        ]);

        $invitation->update($validated);

        return back()->with('success', __('Invitation updated successfully!'));
    }

    /**
     * Remove the specified invitation
     */
    public function destroy(string $locale, $invitation): RedirectResponse
    {
        // Handle both model binding and manual ID resolution
        if (is_string($invitation) || is_numeric($invitation)) {
            $invitation = Invitation::findOrFail($invitation);
        }
        
        $invitation->delete();

        return redirect()
            ->route('admin.invitations.index')
            ->with('success', __('Invitation deleted successfully!'));
    }
}
