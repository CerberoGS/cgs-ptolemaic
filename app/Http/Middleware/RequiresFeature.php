<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class RequiresFeature
{
    /**
     * Handle an incoming request.
     *
     * Verifica que el usuario tenga acceso a una feature específica basada en su plan.
     *
     * @param  string  $gate  El nombre del Gate a verificar
     */
    public function handle(Request $request, Closure $next, string $gate): Response
    {
        // Si no hay usuario autenticado, redirigir a login
        if (! $request->user()) {
            if (\Illuminate\Support\Facades\Route::has('login')) {
                return redirect()->route('login', ['locale' => app()->getLocale()])
                    ->with('error', __('Debes iniciar sesión para acceder a esta función.'));
            }

            abort(401, __('Debes iniciar sesión para acceder a esta función.'));
        }

        // Verificar si el usuario tiene acceso a la feature
        if (! Gate::allows($gate)) {
            // Para peticiones JSON (API)
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => __('Tu plan actual no incluye esta funcionalidad.'),
                    'upgrade_required' => true,
                    'current_plan' => $request->user()->plan->value,
                    'gate_required' => $gate,
                    'suggested_plan' => $this->getSuggestedPlan($gate),
                ], 403);
            }

            // Para peticiones web
            $locale = app()->getLocale();

            // Verificar si la ruta de plan existe
            if (! \Illuminate\Support\Facades\Route::has('settings.plan.show')) {
                abort(403, __('Esta función requiere un plan superior.'));
            }

            return redirect()
                ->route('settings.plan.show', ['locale' => $locale])
                ->with('upgrade_prompt', [
                    'message' => $this->getFeatureMessage($gate),
                    'feature' => $this->getFeatureName($gate),
                    'required_gate' => $gate,
                    'current_plan' => $request->user()->plan->value,
                    'suggested_plan' => $this->getSuggestedPlan($gate),
                ]);
        }

        return $next($request);
    }

    /**
     * Get a user-friendly feature name
     */
    private function getFeatureName(string $gate): string
    {
        return match ($gate) {
            'access-integrations' => __('Integraciones de Proveedores'),
            'manage-own-api-keys' => __('Gestión de API Keys'),
            'use-managed-keys' => __('Keys Gestionadas'),
            'use-ai-analysis' => __('Análisis con IA'),
            'use-advanced-automation' => __('Automatización Avanzada'),
            'use-advanced-analytics' => __('Analíticas Avanzadas'),
            'is-paid-plan' => __('Funciones Premium'),
            default => __('Esta función'),
        };
    }

    /**
     * Get a marketing message for the feature
     */
    private function getFeatureMessage(string $gate): string
    {
        return match ($gate) {
            'access-integrations' => __('Conecta tus proveedores favoritos y lleva tu trading al siguiente nivel.'),
            'manage-own-api-keys' => __('Usa tus propias API keys para un control total sin límites de uso.'),
            'use-managed-keys' => __('Deja que nosotros gestionemos tus API keys mientras te enfocas en tradear.'),
            'use-ai-analysis' => __('Obtén insights potenciados por IA para mejorar tu estrategia.'),
            'use-advanced-automation' => __('Exporta tus datos en PDF y CSV para análisis profundos.'),
            'use-advanced-analytics' => __('Descubre patrones ocultos con nuestras analíticas avanzadas.'),
            'is-paid-plan' => __('Desbloquea todas las funcionalidades premium para maximizar tu potencial.'),
            default => __('Actualiza tu plan para acceder a esta funcionalidad.'),
        };
    }

    /**
     * Get suggested plan for a gate
     */
    private function getSuggestedPlan(string $gate): string
    {
        return match ($gate) {
            'access-integrations', 'use-ai-analysis' => 'managed',
            'manage-own-api-keys', 'use-advanced-automation', 'use-advanced-analytics' => 'pro',
            'use-managed-keys' => 'managed',
            'is-paid-plan' => 'managed',
            default => 'pro',
        };
    }
}
