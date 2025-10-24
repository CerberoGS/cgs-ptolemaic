<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequiresFeature
{
    /**
     * Handle an incoming request.
     *
     * Verifica que el usuario tenga acceso a una feature específica basada en su plan.
     *
     * @param  string  $featureKey  La clave de la feature a verificar (ej: 'ai_analytics')
     * @param  int|null  $requiredLimit  Límite opcional requerido para features tipo integer
     */
    public function handle(Request $request, Closure $next, string $featureKey, ?int $requiredLimit = null): Response
    {
        $user = $request->user();

        // User must be authenticated
        if (! $user) {
            return $this->handleUnauthenticated($request);
        }

        // Check if user has the feature
        if (! $user->hasFeature($featureKey)) {
            return $this->handleUnauthorized($request, $featureKey, 'feature_not_available');
        }

        // Check limit if specified (for integer features)
        if ($requiredLimit !== null) {
            $limit = $user->getFeatureLimit($featureKey);

            // If limit is set and required exceeds it, deny
            if ($limit !== null && $requiredLimit > $limit) {
                return $this->handleUnauthorized($request, $featureKey, 'limit_exceeded', [
                    'limit' => $limit,
                    'required' => $requiredLimit,
                ]);
            }
        }

        return $next($request);
    }

    /**
     * Handle unauthenticated access
     */
    protected function handleUnauthenticated(Request $request): Response
    {
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Debes iniciar sesión para acceder a esta función.',
            ], 401);
        }

        return redirect()->route('login', ['locale' => app()->getLocale()])
            ->with('error', 'Debes iniciar sesión para acceder a esta función.');
    }

    /**
     * Handle unauthorized access
     */
    protected function handleUnauthorized(Request $request, string $featureKey, string $reason, array $context = []): Response
    {
        $locale = app()->getLocale();

        // For API requests, return JSON
        if ($request->expectsJson()) {
            return response()->json([
                'message' => $this->getMessage($featureKey, $reason, $context),
                'feature' => $featureKey,
                'reason' => $reason,
                'context' => $context,
                'current_plan' => $request->user()->plan,
                'suggested_plan' => $this->getSuggestedPlan($featureKey),
                'upgrade_url' => route('pricing.index', ['locale' => $locale]),
            ], 403);
        }

        // For web requests, redirect to pricing or settings
        $route = \Route::has('settings.plan.show')
            ? route('settings.plan.show', ['locale' => $locale])
            : route('pricing.index', ['locale' => $locale]);

        return redirect($route)
            ->with('error', $this->getMessage($featureKey, $reason, $context))
            ->with('feature_required', $featureKey)
            ->with('suggested_plan', $this->getSuggestedPlan($featureKey));
    }

    /**
     * Get user-friendly message for feature requirement
     */
    protected function getMessage(string $featureKey, string $reason, array $context = []): string
    {
        if ($reason === 'limit_exceeded') {
            return sprintf(
                'Has alcanzado el límite de tu plan (%d/%d). Actualiza para continuar.',
                $context['required'] ?? 0,
                $context['limit'] ?? 0
            );
        }

        $featureName = $this->getFeatureName($featureKey);

        return "Tu plan actual no incluye {$featureName}. Actualiza para desbloquear esta funcionalidad.";
    }

    /**
     * Get user-friendly feature name
     */
    protected function getFeatureName(string $featureKey): string
    {
        return match ($featureKey) {
            'ai_analytics' => 'Análisis con IA',
            'advanced_analytics' => 'Analíticas Avanzadas',
            'own_api_keys' => 'API Keys Propias (BYOK)',
            'managed_api_keys' => 'API Keys Gestionadas',
            'custom_integrations' => 'Integraciones Personalizadas',
            'priority_support' => 'Soporte Prioritario',
            'community_support' => 'Soporte de Comunidad',
            'export_journal' => 'Exportación de Journal',
            'advanced_journal' => 'Journal Avanzado',
            'automation' => 'Automatización',
            'team_members' => 'Gestión de Equipo',
            'admin_panel_access' => 'Panel de Administración',
            'daily_analysis_limit' => 'Límite de Análisis Diario',
            'monthly_analysis_limit' => 'Límite de Análisis Mensual',
            default => 'esta funcionalidad',
        };
    }

    /**
     * Get suggested plan for a feature
     */
    protected function getSuggestedPlan(string $featureKey): string
    {
        return match ($featureKey) {
            'ai_analytics', 'managed_api_keys', 'community_support' => 'managed',
            'own_api_keys', 'advanced_analytics', 'priority_support', 'automation' => 'pro',
            'custom_integrations', 'team_members' => 'enterprise',
            'admin_panel_access' => 'staff',
            default => 'pro',
        };
    }
}
