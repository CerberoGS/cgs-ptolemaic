<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Gate;

/**
 * EJEMPLOS DE USO DE GATES - FASE 1
 *
 * Este controlador muestra diferentes formas de usar los Gates
 * que acabamos de implementar en AuthServiceProvider
 */
class ExampleGateController extends Controller
{
    /**
     * EJEMPLO 1: Verificar en método (forma simple)
     */
    public function checkIntegrationsAccess()
    {
        if (! Gate::allows('access-integrations')) {
            return response()->json([
                'error' => 'Tu plan no incluye acceso a integraciones',
                'current_plan' => auth()->user()->plan->value,
                'upgrade_to' => 'managed',
            ], 403);
        }

        return response()->json([
            'message' => 'Tienes acceso a integraciones',
            'can_manage_keys' => Gate::allows('manage-own-api-keys'),
        ]);
    }

    /**
     * EJEMPLO 2: Usando authorize() - Lanza 403 automáticamente
     */
    public function manageApiKeys()
    {
        // Si no tiene permiso, Laravel lanza 403 automáticamente
        $this->authorize('manage-own-api-keys');

        return response()->json([
            'message' => 'Puedes gestionar tus API keys',
            'plan' => auth()->user()->plan->value,
        ]);
    }

    /**
     * EJEMPLO 3: Verificar múltiples gates
     */
    public function advancedFeatures()
    {
        $user = auth()->user();

        $features = [
            'integrations' => Gate::allows('access-integrations'),
            'own_api_keys' => Gate::allows('manage-own-api-keys'),
            'advanced_automation' => Gate::allows('use-advanced-automation'),
            'advanced_analytics' => Gate::allows('use-advanced-analytics'),
            'is_paid' => Gate::allows('is-paid-plan'),
            'on_trial' => Gate::allows('has-active-trial'),
        ];

        return response()->json([
            'plan' => $user->plan->value,
            'features' => $features,
            'available_count' => count(array_filter($features)),
        ]);
    }

    /**
     * EJEMPLO 4: Gate::check() - alias de allows()
     */
    public function checkUsageLimits()
    {
        if (Gate::check('within-daily-limit')) {
            return response()->json([
                'message' => 'Puedes hacer más solicitudes hoy',
                'limit' => auth()->user()->managedDailyLimit(),
            ]);
        }

        return response()->json([
            'error' => 'Has alcanzado tu límite diario',
            'limit' => auth()->user()->managedDailyLimit(),
        ], 429);
    }

    /**
     * EJEMPLO 5: Gate::any() - Al menos uno debe ser true
     */
    public function feedbackAccess()
    {
        // El usuario puede acceder si tiene CUALQUIERA de estos gates
        if (Gate::any(['manage-feedback', 'access-admin-features'])) {
            return response()->json([
                'message' => 'Tienes acceso al sistema de feedback',
            ]);
        }

        return response()->json([
            'error' => 'No tienes acceso a gestionar feedback',
        ], 403);
    }

    /**
     * EJEMPLO 6: Gate::none() - Ninguno debe ser true
     */
    public function freeUserCheck()
    {
        // Verifica que el usuario NO tenga features de pago
        if (Gate::none(['is-paid-plan', 'use-advanced-automation'])) {
            return response()->json([
                'message' => 'Usuario Free confirmado',
                'upgrade_message' => 'Actualiza para desbloquear más funciones',
            ]);
        }

        return response()->json([
            'message' => 'Usuario con plan de pago',
        ]);
    }

    /**
     * EJEMPLO 7: Combinando con Spatie Permissions
     */
    public function adminPanelAccess()
    {
        $user = auth()->user();

        // Gate personalizado que combina plan + permiso
        if (! Gate::allows('access-admin-features')) {
            return response()->json([
                'error' => 'Requiere permiso de admin Y plan activo',
                'has_permission' => $user->hasPermissionTo('admin.dashboard'),
                'trial_expired' => $user->hasTrialExpired(),
            ], 403);
        }

        return response()->json([
            'message' => 'Acceso al panel de administración',
        ]);
    }
}
