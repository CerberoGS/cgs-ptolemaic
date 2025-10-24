import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { PricingCardV2, type PricingPlan } from '@/components/pricing/pricing-card-v2';
import { type BillingOption } from '@/components/pricing/billing-cycle-selector';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Check, ArrowRight, Loader2 } from 'lucide-react';
import { useLocale, useTrans } from '@/hooks/useTrans';
import { cn } from '@/lib/utils';

interface PricingPageProps {
    auth?: {
        user?: {
            plan?: string;
        };
    };
}

export default function PricingPage({ auth }: PricingPageProps) {
    const t = useTrans();
    const locale = useLocale();
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

    useEffect(() => {
        fetch(`/api/pricing`)
            .then(res => res.json())
            .then(data => {
                setPlans(data.pricing_plans || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading pricing:', err);
                setError('Failed to load pricing plans');
                setLoading(false);
            });
    }, []);

    const handleSelectPlan = (plan: PricingPlan, selectedOption: BillingOption, autopayEnabled: boolean) => {
        console.log('Plan selected:', {
            plan: plan.slug,
            billing_option: selectedOption.billing_cycle_slug,
            autopay_enabled: autopayEnabled,
        });

        // Redirect to registration or checkout
        if (auth?.user) {
            // User is logged in - go to plan change
            window.location.href = `/${locale}/settings/plan`;
        } else {
            // User is not logged in - go to registration
            window.location.href = `/${locale}/register?plan=${plan.slug}&cycle=${selectedOption.billing_cycle_slug}&autopay=${autopayEnabled ? '1' : '0'}`;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Head title={t('Pricing')} />
                <div className="text-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">Loading pricing plans...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Head title={t('Pricing')} />
                <div className="text-center space-y-4">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                    <Button onClick={() => window.location.reload()}>
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    // Get plan features from translations or hardcoded for now
    const getPlanFeatures = (slug: string): string[] => {
        const featuresMap: Record<string, string[]> = {
            free: [
                'Trading journal with unlimited entries',
                'Basic analytics and statistics',
                'Export journal to PDF',
                'Mobile-friendly interface',
            ],
            managed: [
                'All Observer features',
                'AI-powered analysis with managed keys',
                '50 daily / 1,000 monthly AI requests',
                'Pattern recognition',
                'Risk management insights',
                'Priority email support',
            ],
            pro: [
                'All Cosmographer features',
                'Bring Your Own Keys (BYOK)',
                'Unlimited AI requests',
                'Advanced analytics',
                'Custom integrations',
                'Priority support with 24h response',
            ],
            enterprise: [
                'All Astronomer features',
                'Dedicated account manager',
                'Custom AI model fine-tuning',
                'API access',
                'White-label options',
                'SLA guarantee',
            ],
        };

        return featuresMap[slug] || [];
    };

    const publicPlans = plans.filter(p => !['staff', 'beta_testing', 'internal'].includes(p.slug));

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
            <Head title={t('Pricing Plans')} />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
                <div className="container mx-auto max-w-7xl relative">
                    <div className="text-center space-y-6 max-w-3xl mx-auto">
                        <Badge className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Flexible Billing
                        </Badge>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                            Choose Your
                            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                                {' '}Trading Journey
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Start free, upgrade when you need AI insights. Cancel anytime.
                        </p>

                        {/* Billing Period Toggle */}
                        <div className="flex justify-center pt-4">
                            <Tabs value={billingPeriod} onValueChange={(v) => setBillingPeriod(v as 'monthly' | 'annual')} className="w-auto">
                                <TabsList className="grid w-[300px] grid-cols-2">
                                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                                    <TabsTrigger value="annual">
                                        Annual
                                        <Badge variant="secondary" className="ml-2">
                                            Save 20%
                                        </Badge>
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {publicPlans.map((plan) => (
                            <PricingCardV2
                                key={plan.slug}
                                plan={plan}
                                features={getPlanFeatures(plan.slug)}
                                onSelect={handleSelectPlan}
                                currentPlan={auth?.user?.plan}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Comparison */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Compare All Features
                        </h2>
                        <p className="text-muted-foreground">
                            Find the perfect plan for your trading needs
                        </p>
                    </div>

                    <Card>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-4 font-semibold">Feature</th>
                                            {publicPlans.map(plan => (
                                                <th key={plan.slug} className="text-center p-4">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <span className="text-2xl">{plan.emoji}</span>
                                                        <span className="font-semibold">{plan.name}</span>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="p-4">Trading Journal</td>
                                            {publicPlans.map(plan => (
                                                <td key={plan.slug} className="text-center p-4">
                                                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="border-b bg-muted/30">
                                            <td className="p-4">AI Analysis</td>
                                            <td className="text-center p-4 text-muted-foreground">-</td>
                                            {publicPlans.slice(1).map(plan => (
                                                <td key={plan.slug} className="text-center p-4">
                                                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-4">Bring Your Own Keys</td>
                                            <td className="text-center p-4 text-muted-foreground">-</td>
                                            <td className="text-center p-4 text-muted-foreground">-</td>
                                            {publicPlans.slice(2).map(plan => (
                                                <td key={plan.slug} className="text-center p-4">
                                                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="border-b bg-muted/30">
                                            <td className="p-4">Priority Support</td>
                                            <td className="text-center p-4 text-muted-foreground">-</td>
                                            {publicPlans.slice(1).map(plan => (
                                                <td key={plan.slug} className="text-center p-4">
                                                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="p-4">Custom Integrations</td>
                                            <td className="text-center p-4 text-muted-foreground">-</td>
                                            <td className="text-center p-4 text-muted-foreground">-</td>
                                            <td className="text-center p-4 text-muted-foreground">-</td>
                                            <td className="text-center p-4">
                                                <Check className="h-5 w-5 text-green-600 mx-auto" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 bg-muted/30">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                                <p className="text-muted-foreground">
                                    Yes! You can upgrade, downgrade, or cancel your plan at any time from your account settings.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">What happens if I cancel?</h3>
                                <p className="text-muted-foreground">
                                    You'll continue to have access until the end of your billing period. Your journal data is always preserved.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">What's the difference between Managed and Pro?</h3>
                                <p className="text-muted-foreground">
                                    Managed includes AI keys we provide with usage limits. Pro allows you to use your own API keys with unlimited requests.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                        <CardContent className="p-12">
                            <h2 className="text-3xl font-bold mb-4">
                                Start Your Free Trial Today
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                No credit card required. Full access to all features for 30 days.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Button size="lg" asChild>
                                    <a href={`/${locale}/register`}>
                                        Get Started Free
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <a href={`/${locale}/login`}>
                                        Sign In
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
