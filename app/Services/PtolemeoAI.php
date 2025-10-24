<?php

namespace App\Services;

use App\Models\JournalEntry;
use App\Models\User;
use EchoLabs\Prism\Facades\Prism;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class PtolemeoAI
{
    protected string $provider;

    protected int $maxRetries;

    protected array $failoverProviders;

    /**
     * Create a new PtolemeoAI instance
     */
    public function __construct(?string $provider = null)
    {
        $this->provider = $provider ?? config('prism.default', 'fingpt');
        $this->maxRetries = config('prism.failover.max_retries', 3);
        $this->failoverProviders = config('prism.failover.providers', ['fingpt', 'openai', 'anthropic']);
    }

    /**
     * Analyze a journal entry with AI
     *
     * Returns comprehensive analysis including:
     * - Technical analysis
     * - Risk management insights
     * - Lessons learned
     * - Actionable recommendations
     */
    public function analyzeJournalEntry(JournalEntry $entry): array
    {
        try {
            Log::info('PtolemeoAI: Analyzing journal entry', [
                'entry_id' => $entry->id,
                'provider' => $this->provider,
            ]);

            $response = Prism::text()
                ->using($this->provider)
                ->withPrompt($this->buildAnalysisPrompt($entry))
                ->withMaxTokens(1500)
                ->withTemperature(0.7)
                ->generate();

            return [
                'success' => true,
                'analysis' => $response->text,
                'provider' => $this->provider,
                'tokens_used' => $response->usage->totalTokens ?? null,
            ];
        } catch (\Exception $e) {
            Log::warning('PtolemeoAI: Primary provider failed', [
                'provider' => $this->provider,
                'error' => $e->getMessage(),
                'entry_id' => $entry->id,
            ]);

            return $this->handleFailover($entry, $e, 'analyzeJournalEntry');
        }
    }

    /**
     * Generate personalized trading recommendations for a user
     *
     * Returns recommendations based on:
     * - Recent trading history
     * - Performance metrics
     * - Risk profile
     * - Market conditions
     */
    public function generateRecommendations(User $user): array
    {
        $cacheKey = "ptolomeo_recommendations.{$user->id}";

        return Cache::remember($cacheKey, 3600, function () use ($user) {
            try {
                Log::info('PtolemeoAI: Generating recommendations', [
                    'user_id' => $user->id,
                    'provider' => $this->provider,
                ]);

                $response = Prism::text()
                    ->using($this->provider)
                    ->withPrompt($this->buildRecommendationsPrompt($user))
                    ->withMaxTokens(1000)
                    ->withTemperature(0.6)
                    ->generate();

                return [
                    'success' => true,
                    'recommendations' => $response->text,
                    'provider' => $this->provider,
                    'tokens_used' => $response->usage->totalTokens ?? null,
                ];
            } catch (\Exception $e) {
                Log::warning('PtolemeoAI: Recommendations generation failed', [
                    'provider' => $this->provider,
                    'error' => $e->getMessage(),
                    'user_id' => $user->id,
                ]);

                return $this->handleFailover($user, $e, 'generateRecommendations');
            }
        });
    }

    /**
     * Analyze trade idea or strategy
     */
    public function analyzeTradeIdea(string $idea, ?User $user = null): array
    {
        try {
            $prompt = $this->buildTradeIdeaPrompt($idea, $user);

            $response = Prism::text()
                ->using($this->provider)
                ->withPrompt($prompt)
                ->withMaxTokens(800)
                ->withTemperature(0.5)
                ->generate();

            return [
                'success' => true,
                'analysis' => $response->text,
                'provider' => $this->provider,
            ];
        } catch (\Exception $e) {
            Log::warning('PtolemeoAI: Trade idea analysis failed', [
                'provider' => $this->provider,
                'error' => $e->getMessage(),
            ]);

            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    /**
     * Handle automatic failover to backup providers
     */
    protected function handleFailover(mixed $data, \Exception $error, string $method): array
    {
        Log::warning('PtolemeoAI: Initiating failover', [
            'original_provider' => $this->provider,
            'error' => $error->getMessage(),
            'method' => $method,
        ]);

        foreach ($this->failoverProviders as $provider) {
            // Skip the provider that just failed
            if ($provider === $this->provider) {
                continue;
            }

            try {
                Log::info('PtolemeoAI: Attempting failover', [
                    'provider' => $provider,
                    'method' => $method,
                ]);

                // Temporarily switch provider
                $originalProvider = $this->provider;
                $this->provider = $provider;

                // Retry the operation
                $result = $this->$method($data);

                // If successful, return result
                if ($result['success'] ?? false) {
                    Log::info('PtolemeoAI: Failover successful', [
                        'from' => $originalProvider,
                        'to' => $provider,
                    ]);

                    return $result;
                }
            } catch (\Exception $e) {
                Log::warning('PtolemeoAI: Failover provider failed', [
                    'provider' => $provider,
                    'error' => $e->getMessage(),
                ]);

                continue;
            }
        }

        // All providers failed
        Log::error('PtolemeoAI: All providers failed', [
            'method' => $method,
            'providers_attempted' => $this->failoverProviders,
        ]);

        return [
            'success' => false,
            'error' => 'All AI providers unavailable. Please try again later.',
        ];
    }

    /**
     * Build analysis prompt for journal entry
     */
    protected function buildAnalysisPrompt(JournalEntry $entry): string
    {
        $entryData = [
            'asset' => $entry->asset ?? 'N/A',
            'entry_price' => $entry->entry_price ?? 'N/A',
            'exit_price' => $entry->exit_price ?? 'N/A',
            'pnl' => $entry->pnl ?? 'N/A',
            'notes' => $entry->notes ?? 'N/A',
            'strategy' => $entry->strategy ?? 'N/A',
            'emotions' => $entry->emotions ?? 'N/A',
        ];

        return <<<PROMPT
Eres Ptolomeo, un copiloto de trading experto especializado en análisis financiero.

Analiza la siguiente operación de trading:

**Activo**: {$entryData['asset']}
**Precio de entrada**: {$entryData['entry_price']}
**Precio de salida**: {$entryData['exit_price']}
**P&L**: {$entryData['pnl']}
**Estrategia**: {$entryData['strategy']}
**Emociones**: {$entryData['emotions']}
**Notas del trader**: {$entryData['notes']}

Proporciona un análisis estructurado que incluya:

1. **Análisis Técnico**: Evaluación de la entrada, salida y ejecución
2. **Gestión de Riesgo**: Análisis de risk/reward y tamaño de posición
3. **Aspectos Psicológicos**: Impacto de las emociones en la decisión
4. **Lecciones Clave**: Qué se puede aprender de esta operación
5. **Recomendaciones**: Acciones específicas para mejorar

Sé directo, profesional y constructivo. Enfócate en información accionable.
PROMPT;
    }

    /**
     * Build recommendations prompt for user
     */
    protected function buildRecommendationsPrompt(User $user): string
    {
        // Get user's recent stats
        $recentEntries = $user->journalEntries()
            ->latest()
            ->limit(10)
            ->get();

        $winRate = $recentEntries->where('pnl', '>', 0)->count() / max($recentEntries->count(), 1) * 100;
        $avgPnL = $recentEntries->avg('pnl');

        return <<<PROMPT
Eres Ptolomeo, un copiloto de trading experto.

Genera recomendaciones personalizadas para un trader con el siguiente perfil:

**Estadísticas recientes** (últimas 10 operaciones):
- Tasa de éxito: {$winRate}%
- P&L promedio: {$avgPnL}
- Total de operaciones: {$recentEntries->count()}

**Análisis requerido**:
1. Identificar patrones en el desempeño
2. Áreas de mejora prioritarias
3. Estrategias recomendadas para incrementar consistencia
4. Plan de acción semanal

Proporciona recomendaciones concretas y accionables. Sé motivador pero realista.
PROMPT;
    }

    /**
     * Build trade idea analysis prompt
     */
    protected function buildTradeIdeaPrompt(string $idea, ?User $user = null): string
    {
        $userContext = $user ? 'El trader tiene experiencia y busca validar su análisis.' : 'Evaluación objetiva sin contexto previo.';

        return <<<PROMPT
Eres Ptolomeo, un analista de trading experto.

Analiza la siguiente idea de trading:

"{$idea}"

Contexto: {$userContext}

Proporciona:
1. **Validez de la idea**: ¿Es fundamentalmente sólida?
2. **Riesgos potenciales**: ¿Qué podría salir mal?
3. **Oportunidades**: ¿Qué condiciones la favorecen?
4. **Recomendación**: ¿Proceder, esperar o descartar?

Sé conciso y directo (máximo 150 palabras).
PROMPT;
    }

    /**
     * Get current provider name
     */
    public function getProvider(): string
    {
        return $this->provider;
    }

    /**
     * Switch provider manually
     */
    public function switchProvider(string $provider): self
    {
        $this->provider = $provider;

        return $this;
    }
}
