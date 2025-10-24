import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, Sparkles, TrendingDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BillingCycleSelector, type BillingOption } from './billing-cycle-selector';

export interface PricingPlan {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    emoji: string;
    accent_color: string;
    is_featured: boolean;
    price_monthly: number;
    price_yearly: number;
    offer_active: boolean;
    offer_name: string | null;
    offer_description: string | null;
    scarcity_active: boolean;
    scarcity_message: string | null;
    billing_options: BillingOption[];
}

interface PricingCardV2Props {
    plan: PricingPlan;
    features?: string[];
    onSelect?: (plan: PricingPlan, selectedOption: BillingOption, autopayEnabled: boolean) => void;
    currentPlan?: string;
    className?: string;
}

export function PricingCardV2({
    plan,
    features = [],
    onSelect,
    currentPlan,
    className = '',
}: PricingCardV2Props) {
    const defaultOption = plan.billing_options.find(opt => opt.is_default) || plan.billing_options[0];
    const [selectedOption, setSelectedOption] = useState<BillingOption>(defaultOption);
    const [autopayEnabled, setAutopayEnabled] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const isCurrent = currentPlan === plan.slug;
    const hasMultipleOptions = plan.billing_options.length > 1;

    const formatPrice = (price: number, currency: string = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(price);
    };

    const handleSelect = () => {
        if (onSelect) {
            onSelect(plan, selectedOption, autopayEnabled);
        }
    };

    const accentColorClasses = {
        cyan: 'from-cyan-500 to-blue-500',
        violet: 'from-violet-500 to-purple-500',
        amber: 'from-amber-500 to-orange-500',
        rose: 'from-rose-500 to-pink-500',
        emerald: 'from-emerald-500 to-green-500',
        blue: 'from-blue-500 to-indigo-500',
    }[plan.accent_color] || 'from-gray-500 to-slate-500';

    const currentPrice = autopayEnabled ? selectedOption.final_price_with_autopay : selectedOption.final_price;
    const monthlyEquivalent = autopayEnabled ? selectedOption.monthly_equivalent_with_autopay : selectedOption.monthly_equivalent;
    const savings = selectedOption.savings_percentage;

    return (
        <Card
            className={cn(
                'relative overflow-hidden transition-all hover:shadow-xl',
                isCurrent && 'border-2 border-primary ring-2 ring-primary/20',
                plan.is_featured && 'border-2 shadow-lg scale-105',
                className
            )}
        >
            {/* Gradient Header Accent */}
            <div className={cn('h-2 bg-gradient-to-r', accentColorClasses)} />

            {/* Featured Badge */}
            {plan.is_featured && (
                <div className="absolute top-6 -right-10 rotate-45 bg-gradient-to-r from-amber-500 to-orange-500 px-12 py-1 text-xs font-semibold text-white shadow-lg">
                    FEATURED
                </div>
            )}

            {/* Current Plan Badge */}
            {isCurrent && (
                <div className="absolute top-4 right-4">
                    <Badge variant="default" className="gap-1">
                        <Check className="h-3 w-3" />
                        Current Plan
                    </Badge>
                </div>
            )}

            <CardHeader className="pb-4">
                {/* Plan Name & Emoji */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-muted to-muted/50 text-2xl shadow-sm">
                        {plan.emoji}
                    </div>
                    <div>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        {plan.offer_active && plan.offer_name && (
                            <Badge className="mt-1 bg-gradient-to-r from-orange-500 to-red-500 text-white gap-1">
                                <Sparkles className="h-3 w-3" />
                                {plan.offer_name}
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Tagline */}
                <CardDescription className="text-base">
                    {plan.tagline}
                </CardDescription>

                {/* Main Pricing Display */}
                <div className="mt-4">
                    <div className="flex items-baseline gap-2">
                        <span className={cn(
                            'text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent',
                            accentColorClasses
                        )}>
                            {formatPrice(monthlyEquivalent, selectedOption.currency)}
                        </span>
                        <span className="text-muted-foreground">/month</span>
                    </div>

                    {selectedOption.billing_months > 1 && (
                        <div className="mt-2 text-sm text-muted-foreground">
                            Billed {formatPrice(currentPrice, selectedOption.currency)} every {selectedOption.billing_months} months
                        </div>
                    )}

                    {savings > 0 && (
                        <Badge variant="secondary" className="mt-2 gap-1">
                            <TrendingDown className="h-3 w-3" />
                            Save {Math.round(savings)}% vs monthly
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Offer Description */}
                {plan.offer_active && plan.offer_description && (
                    <div className="rounded-lg bg-orange-50 dark:bg-orange-900/20 p-3 text-sm text-orange-800 dark:text-orange-200">
                        {plan.offer_description}
                    </div>
                )}

                {/* Scarcity Alert */}
                {plan.scarcity_active && plan.scarcity_message && (
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm font-medium text-red-800 dark:text-red-200">
                        {plan.scarcity_message}
                    </div>
                )}

                {/* Features List */}
                {features.length > 0 && (
                    <div className="space-y-2">
                        <Separator />
                        <div className="space-y-2.5 py-2">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                                    <span className="text-sm text-foreground">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Billing Cycle Selector (Collapsible) */}
                {hasMultipleOptions && (
                    <div className="space-y-3">
                        <Separator />
                        <div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setExpanded(!expanded)}
                                className="w-full justify-between"
                            >
                                <span className="text-sm font-medium">
                                    {expanded ? 'Hide' : 'Show'} billing options
                                </span>
                                <ArrowRight className={cn(
                                    'h-4 w-4 transition-transform',
                                    expanded && 'rotate-90'
                                )} />
                            </Button>

                            {expanded && (
                                <div className="mt-4">
                                    <BillingCycleSelector
                                        options={plan.billing_options}
                                        selectedOption={selectedOption}
                                        onSelectOption={setSelectedOption}
                                        autopayEnabled={autopayEnabled}
                                        onAutopayToggle={setAutopayEnabled}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Description */}
                {plan.description && (
                    <div className="text-sm text-muted-foreground">
                        {plan.description}
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
                <Button
                    onClick={handleSelect}
                    disabled={isCurrent}
                    size="lg"
                    className={cn(
                        'w-full gap-2',
                        plan.is_featured && 'bg-gradient-to-r text-white shadow-lg',
                        plan.is_featured && accentColorClasses
                    )}
                >
                    {isCurrent ? 'Current Plan' : 'Select Plan'}
                    {!isCurrent && <ArrowRight className="h-4 w-4" />}
                </Button>

                {selectedOption.trial_days > 0 && (
                    <p className="text-xs text-center text-muted-foreground">
                        Includes {selectedOption.trial_days} days free trial
                    </p>
                )}
            </CardFooter>
        </Card>
    );
}
