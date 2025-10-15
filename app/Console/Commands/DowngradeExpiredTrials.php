<?php

namespace App\Console\Commands;

use App\Enums\PlanType;
use App\Models\User;
use Illuminate\Console\Command;

class DowngradeExpiredTrials extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trials:downgrade
                            {--dry-run : Show users that would be downgraded without actually doing it}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Downgrade users with expired trials to Free plan';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $dryRun = $this->option('dry-run');

        $expiredTrialUsers = User::query()
            ->whereIn('plan', [PlanType::Managed->value, PlanType::Pro->value])
            ->whereNotNull('trial_ends_at')
            ->where('trial_ends_at', '<', now())
            ->get();

        if ($expiredTrialUsers->isEmpty()) {
            $this->info('No users with expired trials found.');

            return self::SUCCESS;
        }

        $this->info("Found {$expiredTrialUsers->count()} users with expired trials.");

        if ($dryRun) {
            $this->warn('DRY RUN MODE - No changes will be made');
            $this->table(
                ['ID', 'Name', 'Email', 'Plan', 'Trial Ended'],
                $expiredTrialUsers->map(fn (User $user): array => [
                    $user->id,
                    $user->name,
                    $user->email,
                    $user->plan->label(),
                    $user->trial_ends_at?->diffForHumans(),
                ])
            );

            return self::SUCCESS;
        }

        $bar = $this->output->createProgressBar($expiredTrialUsers->count());
        $bar->start();

        $downgraded = 0;

        foreach ($expiredTrialUsers as $user) {
            try {
                $user->downgradeToFree();
                $downgraded++;

                $this->newLine();
                $this->info("✓ Downgraded {$user->email} to Free plan");
            } catch (\Exception $e) {
                $this->newLine();
                $this->error("✗ Failed to downgrade {$user->email}: {$e->getMessage()}");
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);

        $this->info("Successfully downgraded {$downgraded} / {$expiredTrialUsers->count()} users.");

        return self::SUCCESS;
    }
}
