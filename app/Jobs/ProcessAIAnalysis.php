<?php

namespace App\Jobs;

use App\Models\JournalEntry;
use App\Services\PtolemeoAI;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessAIAnalysis implements ShouldQueue
{
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The number of seconds to wait before retrying the job.
     */
    public int $backoff = 60;

    /**
     * The maximum number of seconds the job can run.
     */
    public int $timeout = 120;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public JournalEntry $entry
    ) {
        // Queue on 'ai-requests' queue
        $this->onQueue(config('prism.queue.queue', 'ai-requests'));
    }

    /**
     * Execute the job.
     */
    public function handle(PtolemeoAI $ptolomeo): void
    {
        Log::info('ProcessAIAnalysis: Starting analysis', [
            'entry_id' => $this->entry->id,
            'attempt' => $this->attempts(),
        ]);

        try {
            // Perform AI analysis
            $result = $ptolomeo->analyzeJournalEntry($this->entry);

            if ($result['success']) {
                // Update journal entry with analysis
                $this->entry->update([
                    'ai_analysis' => $result['analysis'],
                    'analyzed_at' => now(),
                    'analyzed_by_provider' => $result['provider'],
                    'analysis_tokens_used' => $result['tokens_used'] ?? null,
                ]);

                Log::info('ProcessAIAnalysis: Analysis completed successfully', [
                    'entry_id' => $this->entry->id,
                    'provider' => $result['provider'],
                    'tokens' => $result['tokens_used'] ?? 0,
                ]);
            } else {
                Log::error('ProcessAIAnalysis: Analysis failed', [
                    'entry_id' => $this->entry->id,
                    'error' => $result['error'] ?? 'Unknown error',
                ]);

                // Mark analysis as failed
                $this->entry->update([
                    'analysis_failed_at' => now(),
                    'analysis_error' => $result['error'] ?? 'AI analysis failed',
                ]);

                // Fail the job to trigger retry
                $this->fail(new \Exception($result['error'] ?? 'AI analysis failed'));
            }
        } catch (\Exception $e) {
            Log::error('ProcessAIAnalysis: Exception occurred', [
                'entry_id' => $this->entry->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // Update entry with error info
            $this->entry->update([
                'analysis_failed_at' => now(),
                'analysis_error' => $e->getMessage(),
            ]);

            // Re-throw to trigger retry
            throw $e;
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('ProcessAIAnalysis: Job failed after all retries', [
            'entry_id' => $this->entry->id,
            'attempts' => $this->attempts(),
            'error' => $exception->getMessage(),
        ]);

        // Mark entry as permanently failed
        $this->entry->update([
            'analysis_failed_at' => now(),
            'analysis_error' => 'Analysis failed after '.$this->tries.' attempts: '.$exception->getMessage(),
        ]);

        // TODO: Notify admin/user of permanent failure
        // You could dispatch a notification event here
    }
}
