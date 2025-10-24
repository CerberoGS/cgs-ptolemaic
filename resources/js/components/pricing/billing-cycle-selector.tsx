import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sparkles, TrendingDown, Clock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BillingOption {
    id: number;
    billing_cycle_slug: string;
    billing_cycle_name: string;
    billing_months: number;
    base_price: number;
    currency: string;
    has_autopay_discount: boolean;
    autopay_discount_type: string;
    autopay_discount_value: number | null;
    upfront_discount_percentage: number;
    setup_fee: number;
    trial_days: number;
    is_default: boolean;
    is_popular: boolean;
    description: string | null;
    highlight_text: string | null;
    final_price: number;
    final_price_with_autopay: number;
    monthly_equivalent: number;
    monthly_equivalent_with_autopay: number;
    savings_vs_monthly: number;
    savings_percentage: number;
    total_discount_percentage: number;
    total_discount_percentage_with_autopay: number;
}

interface BillingCycleSelectorProps {
    options: BillingOption[];
    selectedOption: BillingOption;
    onSelectOption: (option: BillingOption) => void;
    autopayEnabled?: boolean;
    onAutopayToggle?: (enabled: boolean) => void;
    className?: string;
}

export function BillingCycleSelector({
    options,
    selectedOption,
    onSelectOption,
    autopayEnabled = false,
    onAutopayToggle,
    className = '',
}: BillingCycleSelectorProps) {
    const formatPrice = (price: number, currency: string = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
        }).format(price);
    };

    const formatPercentage = (percentage: number) => {
        return Math.round(percentage);
    };

    const getCycleBadge = (option: BillingOption) => {
        if (option.is_popular) {
            return (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white gap-1">
                    <Sparkles className="h-3 w-3" />
                    Popular
                </Badge>
            );
        }
        if (option.savings_percentage >= 20) {
            return (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white gap-1">
                    <TrendingDown className="h-3 w-3" />
                    Best Value
                </Badge>
            );
        }
        if (option.is_default) {
            return (
                <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" />
                    Default
                </Badge>
            );
        }
        return null;
    };

    const hasAnyAutopayDiscount = options.some(opt => opt.has_autopay_discount);
    const currentPrice = autopayEnabled ? selectedOption.final_price_with_autopay : selectedOption.final_price;
    const currentMonthlyEquivalent = autopayEnabled ? selectedOption.monthly_equivalent_with_autopay : selectedOption.monthly_equivalent;

    return (
        <div className={cn('space-y-6', className)}>
            {/* Autopay Toggle */}
            {hasAnyAutopayDiscount && onAutopayToggle && (
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="autopay-toggle" className="font-semibold text-blue-900 dark:text-blue-100 cursor-pointer">
                                    Enable Autopay
                                </Label>
                                <Badge variant="outline" className="bg-white/50 dark:bg-black/20">
                                    Save more
                                </Badge>
                            </div>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                Get additional discounts with automatic payments
                            </p>
                        </div>
                        <Switch
                            id="autopay-toggle"
                            checked={autopayEnabled}
                            onCheckedChange={onAutopayToggle}
                            className="data-[state=checked]:bg-blue-600"
                        />
                    </div>
                </Card>
            )}

            {/* Cycle Options Grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {options.map((option) => {
                    const isSelected = option.id === selectedOption.id;
                    const optionPrice = autopayEnabled ? option.final_price_with_autopay : option.final_price;
                    const optionMonthlyEquivalent = autopayEnabled ? option.monthly_equivalent_with_autopay : option.monthly_equivalent;
                    const savings = option.savings_percentage;
                    const badge = getCycleBadge(option);

                    return (
                        <button
                            key={option.id}
                            onClick={() => onSelectOption(option)}
                            className={cn(
                                'relative rounded-lg border-2 p-4 text-left transition-all',
                                'hover:shadow-md hover:scale-[1.02]',
                                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                                isSelected
                                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                                    : 'border-gray-200 dark:border-gray-700 bg-card hover:border-primary/50'
                            )}
                        >
                            {/* Selection Indicator */}
                            {isSelected && (
                                <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                                    <Check className="h-4 w-4" />
                                </div>
                            )}

                            {/* Badge */}
                            {badge && (
                                <div className="absolute -top-3 left-4">
                                    {badge}
                                </div>
                            )}

                            <div className="space-y-2 pt-2">
                                {/* Cycle Name */}
                                <div className="font-semibold text-foreground">
                                    {option.billing_cycle_name}
                                </div>

                                {/* Pricing */}
                                <div className="space-y-1">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-primary">
                                            {formatPrice(optionPrice, option.currency)}
                                        </span>
                                        {option.billing_months > 1 && (
                                            <span className="text-sm text-muted-foreground">
                                                /{option.billing_months}mo
                                            </span>
                                        )}
                                    </div>

                                    {/* Monthly Equivalent */}
                                    {option.billing_months > 1 && (
                                        <div className="text-xs text-muted-foreground">
                                            {formatPrice(optionMonthlyEquivalent, option.currency)}/month
                                        </div>
                                    )}
                                </div>

                                {/* Savings Badge */}
                                {savings > 0 && (
                                    <Badge variant="secondary" className="text-xs gap-1">
                                        <TrendingDown className="h-3 w-3" />
                                        Save {formatPercentage(savings)}%
                                    </Badge>
                                )}

                                {/* Autopay Discount Indicator */}
                                {option.has_autopay_discount && autopayEnabled && (
                                    <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                        + Autopay discount applied
                                    </div>
                                )}

                                {/* Setup Fee */}
                                {option.setup_fee > 0 && (
                                    <div className="text-xs text-amber-600 dark:text-amber-400">
                                        +{formatPrice(option.setup_fee, option.currency)} setup fee
                                    </div>
                                )}

                                {/* Trial Days */}
                                {option.trial_days > 0 && (
                                    <div className="text-xs text-green-600 dark:text-green-400">
                                        {option.trial_days} days free trial
                                    </div>
                                )}

                                {/* Highlight Text */}
                                {option.highlight_text && (
                                    <div className="text-xs font-medium text-primary">
                                        {option.highlight_text}
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Selected Option Summary */}
            <Card className="p-4 bg-muted/50">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="text-sm font-medium text-muted-foreground">
                            Your selection
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                            {selectedOption.billing_cycle_name}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                            {selectedOption.billing_months > 1 ? 'Total' : 'Monthly'}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                            {formatPrice(currentPrice, selectedOption.currency)}
                        </div>
                        {selectedOption.billing_months > 1 && (
                            <div className="text-xs text-muted-foreground">
                                {formatPrice(currentMonthlyEquivalent, selectedOption.currency)}/month
                            </div>
                        )}
                    </div>
                </div>

                {/* Savings Summary */}
                {selectedOption.savings_percentage > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                vs. Monthly billing
                            </span>
                            <span className="font-semibold text-green-600 dark:text-green-400">
                                Save {formatPrice(selectedOption.savings_vs_monthly, selectedOption.currency)} ({formatPercentage(selectedOption.savings_percentage)}%)
                            </span>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
