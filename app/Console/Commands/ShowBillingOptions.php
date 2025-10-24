<?php

namespace App\Console\Commands;

use App\Models\PlanBillingOption;
use App\Models\PricingPlan;
use Illuminate\Console\Command;

class ShowBillingOptions extends Command
{
    protected $signature = 'billing:show {plan?}';

    protected $description = 'Display all billing options for pricing plans';

    public function handle(): int
    {
        $planSlug = $this->argument('plan');

        if ($planSlug) {
            $this->showPlanOptions($planSlug);
        } else {
            $this->showAllOptions();
        }

        return Command::SUCCESS;
    }

    private function showAllOptions(): void
    {
        $plans = PricingPlan::with('billingOptions')->orderBy('display_order')->get();

        $this->info('╔═══════════════════════════════════════════════════════════════════════╗');
        $this->info('║        OPCIONES DE FACTURACIÓN - TODOS LOS PLANES                    ║');
        $this->info('╚═══════════════════════════════════════════════════════════════════════╝');
        $this->newLine();

        foreach ($plans as $plan) {
            $this->line("<fg=cyan;options=bold>━━━ {$plan->slug} - {$plan->name()} ━━━</>");
            $this->line("Opciones disponibles: {$plan->billingOptions->count()}");
            $this->newLine();

            if ($plan->billingOptions->isEmpty()) {
                $this->warn('  Sin opciones de facturación');
                $this->newLine();

                continue;
            }

            $monthlyOption = $plan->billingOptions->firstWhere('billing_cycle_slug', 'monthly');

            foreach ($plan->billingOptions as $option) {
                $this->displayOption($option, $monthlyOption);
            }

            $this->newLine();
        }
    }

    private function showPlanOptions(string $planSlug): void
    {
        $plan = PricingPlan::with('billingOptions')
            ->where('slug', $planSlug)
            ->first();

        if (! $plan) {
            $this->error("Plan '{$planSlug}' no encontrado");

            return;
        }

        $this->info('╔═══════════════════════════════════════════════════════════════════════╗');
        $this->info("║        {$plan->name()} - OPCIONES DE FACTURACIÓN                     ");
        $this->info('╚═══════════════════════════════════════════════════════════════════════╝');
        $this->newLine();

        if ($plan->billingOptions->isEmpty()) {
            $this->warn('Sin opciones de facturación configuradas');

            return;
        }

        $monthlyOption = $plan->billingOptions->firstWhere('billing_cycle_slug', 'monthly');

        foreach ($plan->billingOptions as $option) {
            $this->displayOption($option, $monthlyOption, true);
        }
    }

    private function displayOption(PlanBillingOption $option, ?PlanBillingOption $monthlyOption, bool $detailed = false): void
    {
        $badges = [];
        if ($option->is_default) {
            $badges[] = '<fg=green>[DEFAULT]</>';
        }
        if ($option->is_popular) {
            $badges[] = '<fg=yellow>[POPULAR]</>';
        }
        if (! $option->is_active) {
            $badges[] = '<fg=red>[INACTIVO]</>';
        }

        $badgeStr = empty($badges) ? '' : ' '.implode(' ', $badges);

        $this->line("  <fg=white;options=bold>{$option->name()}</>{$badgeStr}");
        $this->line("  └─ Período: {$option->billing_months} ".($option->billing_months === 1 ? 'mes' : 'meses'));
        $this->line('  └─ Precio base: $'.number_format($option->base_price, 2));

        if ($option->upfront_discount_percentage > 0) {
            $this->line("  └─ Descuento adelantado: <fg=green>{$option->upfront_discount_percentage}%</>");
        }

        if ($option->has_autopay_discount && $option->autopay_discount_value > 0) {
            $discountText = $option->autopay_discount_type === 'percentage'
                ? "{$option->autopay_discount_value}%"
                : '$'.number_format($option->autopay_discount_value, 2);
            $this->line("  └─ Descuento autopago: <fg=green>{$discountText}</>");
        }

        $finalPrice = $option->calculateFinalPrice(false);
        $finalPriceWithAutopay = $option->calculateFinalPrice(true);

        $this->line('  └─ Precio final: <fg=cyan;options=bold>$'.number_format($finalPrice, 2).'</>');

        if ($option->has_autopay_discount) {
            $this->line('  └─ Con autopago: <fg=cyan;options=bold>$'.number_format($finalPriceWithAutopay, 2).'</>');
        }

        if ($option->billing_months > 1) {
            $monthlyEquiv = $option->monthlyEquivalent(false);
            $this->line('  └─ Equivalente mensual: $'.number_format($monthlyEquiv, 2).'/mes');

            if ($monthlyOption && $monthlyOption->id !== $option->id) {
                $savings = $option->savingsVsMonthly((float) $monthlyOption->base_price, false);
                $savingsPercent = $option->savingsPercentage((float) $monthlyOption->base_price, false);

                if ($savings > 0) {
                    $this->line('  └─ Ahorras: <fg=green;options=bold>$'.number_format($savings, 2)." ({$savingsPercent}%)</>");
                }
            }
        }

        if ($option->setup_fee > 0) {
            $this->line('  └─ Cuota inicial: $'.number_format($option->setup_fee, 2));
        }

        if ($option->trial_days > 0) {
            $this->line("  └─ Prueba gratis: {$option->trial_days} días");
        }

        $this->newLine();
    }
}
