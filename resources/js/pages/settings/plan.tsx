import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale, useTrans } from '@/hooks/useTrans';
import settingsRoutes from '@/routes/settings';
import integrationsRoutes from '@/routes/settings/integrations';
import { cn } from '@/lib/utils';
import { Head, router } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, CreditCard, Lock, Mail } from 'lucide-react';
import { PlanHeader } from '@/components/plans/plan-header';
import { FeatureItem } from '@/components/plans/feature-item';
import { TrialBanner } from '@/components/plans/trial-banner';
import { UpgradeCTA } from '@/components/plans/upgrade-cta';
import { PlanCTA } from '@/components/plans/plan-cta';
import { useState } from 'react';

type PlanFeature = string;

type PlanCard = {
    type: string;
    label: string;
    price: string;
    summary: string;
    description: string;
    features: PlanFeature[];
    canAccessIntegrations: boolean;
    canManageProviderKeys: boolean;
    usesManagedKeys: boolean;
    hasUsageLimits: boolean;
    usageLimits: {
        daily: number | null;
        monthly: number | null;
    };
    isCurrent: boolean;
    isInternal: boolean;
    emoji: string;
    accentColor: string;
    tagline: string;
};

type CurrentPlan = {
    type: string;
    label: string;
    description: string;
    isTrial: boolean;
    trialEndsAt: string | null;
    canManageProviderKeys: boolean;
    usesManagedKeys: boolean;
    managedLimits: {
        daily: number | null;
        monthly: number | null;
    };
    isInternal: boolean;
    emoji: string;
    accentColor: string;
    tagline: string;
};

interface PlanPageProps {
    currentPlan: CurrentPlan;
    plans: PlanCard[];
}

const formatLimit = (value: number | null) => {
    if (value === null) {
        return 'N/A';
    }

    return Intl.NumberFormat().format(value);
};

const calculateDaysLeft = (trialEndsAt: string | null): number => {
    if (!trialEndsAt) {
        return 0;
    }

    const endDate = new Date(trialEndsAt);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return Math.max(0, diffDays);
};

export default function PlanPage({ currentPlan, plans }: PlanPageProps) {
    const t = useTrans();
    const locale = useLocale();
    const [processing, setProcessing] = useState(false);

    const breadcrumbs = [
        {
            title: t('Settings'),
            href: settingsRoutes.index({ locale }).url,
        },
        {
            title: t('Plan & Billing'),
            href: settingsRoutes.index({ locale }).url,
        },
    ];

    const daysLeft = currentPlan.isTrial ? calculateDaysLeft(currentPlan.trialEndsAt) : 0;
    const showTrialBanner = currentPlan.isTrial && daysLeft > 0;
    const showCardExtension = currentPlan.type === 'pro' && daysLeft > 0;

    const publicPlans = plans.filter((p) => !p.isInternal);
    const internalPlans = plans.filter((p) => p.isInternal);

    const handleAction = (action: () => void) => {
        setProcessing(true);
        action();
        setTimeout(() => setProcessing(false), 2000);
    };

    const getPlanCardCTA = (planType: string, isCurrent: boolean) => {
        // PLANES INTERNOS
        if (currentPlan.isInternal) {
            return {
                text: t('Contact support'),
                variant: 'outline' as const,
                action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com',
            };
        }

        // PLAN ACTUAL
        if (isCurrent) {
            switch (planType) {
                case 'free':
                    return {
                        text: t('Explore features'),
                        variant: 'outline' as const,
                        action: () => {
                            // Scroll to features section
                            document.querySelector('[data-plan="managed"]')?.scrollIntoView({ behavior: 'smooth' });
                        },
                    };
                case 'managed':
                    if (currentPlan.isTrial) {
                        return {
                            text: t('Activate Cosmographer'),
                            variant: 'default' as const,
                            action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Activate Cosmographer',
                        };
                    }
                    return {
                        text: t('Manage subscription'),
                        variant: 'outline' as const,
                        action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Manage Subscription',
                    };
                case 'pro':
                    if (currentPlan.isTrial) {
                        return {
                            text: t('Activate Astronomer'),
                            variant: 'default' as const,
                            action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Activate Astronomer',
                        };
                    }
                    return {
                        text: t('Manage Pro subscription'),
                        variant: 'outline' as const,
                        action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Manage Pro Subscription',
                    };
                default:
                    return {
                        text: t('Contact support'),
                        variant: 'outline' as const,
                        action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com',
                    };
            }
        }

        // PLANES NO ACTUALES - CTAs de upgrade
        switch (planType) {
            case 'free':
                return {
                    text: t('Stay on Observer'),
                    variant: 'outline' as const,
                    action: () => {},
                    disabled: true,
                };
            case 'managed':
                if (currentPlan.type === 'free') {
                    return {
                        text: t('Upgrade to Cosmographer'),
                        variant: 'default' as const,
                        action: () => router.post(`/${locale}/settings/trial/managed`),
                    };
                }
                return {
                    text: t('Switch to Cosmographer'),
                    variant: 'default' as const,
                    action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Switch to Cosmographer',
                };
            case 'pro':
                if (currentPlan.type === 'free') {
                    return {
                        text: t('Upgrade to Astronomer'),
                        variant: 'default' as const,
                        action: () => router.post(`/${locale}/settings/trial/pro`),
                    };
                }
                if (currentPlan.type === 'managed') {
                    return {
                        text: t('Upgrade to Astronomer'),
                        variant: 'default' as const,
                        action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Upgrade to Astronomer',
                    };
                }
                return {
                    text: t('Switch to Astronomer'),
                    variant: 'default' as const,
                    action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Switch to Astronomer',
                };
            case 'enterprise':
                return {
                    text: t('Contact for Enterprise'),
                    variant: 'default' as const,
                    action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Enterprise Plan',
                };
            default:
                return {
                    text: t('Request upgrade'),
                    variant: 'default' as const,
                    action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com',
                };
        }
    };

    const renderPlanCTA = () => {
        // PLANES INTERNOS - No mostrar CTAs especiales
        if (currentPlan.isInternal) {
            return (
                <div className="flex gap-3">
                    {currentPlan.canManageProviderKeys ? (
                        <Button asChild className="gap-2">
                            <a href={integrationsRoutes.index({ locale }).url}>
                                {t('Manage integrations')}
                                <ArrowRight className="size-4" />
                            </a>
                        </Button>
                    ) : (
                        <Button disabled className="gap-2" variant="outline">
                            <Lock className="size-4" />
                            {t('Integrations')}
                        </Button>
                    )}

                    <Button asChild variant="outline" className="gap-2">
                        <a href="mailto:support@cerberogrowthsolutions.com">
                            <Mail className="size-4" />
                            {t('Talk to sales')}
                        </a>
                    </Button>
                </div>
            );
        }

        // OBSERVADOR (Free) - Pretrial
        if (currentPlan.type === 'free' && !currentPlan.isTrial) {
            return (
                <PlanCTA
                    primaryText={t('Try Cosmographer 30 days (no card)')}
                    primaryAction={() => handleAction(() => router.post(`/${locale}/settings/trial/managed`))}
                    secondaryText={t('See Cosmographer benefits')}
                    secondaryAction={() => {
                        document.querySelector('[data-plan="managed"]')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    secondaryVariant="link"
                    note={t('When it ends, you return to Observer. You don\'t lose your journal.')}
                    processing={processing}
                />
            );
        }

        // COSMÓGRAFO - Trial
        if (currentPlan.type === 'managed' && currentPlan.isTrial) {
            return (
                <PlanCTA
                    primaryText={t('Continue without interruptions — Activate for $49/month')}
                    primaryAction={() => handleAction(() => {
                        // TODO: Integrar con Stripe/Payment Gateway
                        window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Activate Cosmographer';
                    })}
                    primaryIcon="card"
                    secondaryText={t('Switch to annual and save 15%')}
                    secondaryAction={() => {
                        window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Annual Plan';
                    }}
                    note={t(':days days remaining in your trial', { days: daysLeft })}
                    noteVariant={daysLeft <= 5 ? 'warning' : 'info'}
                    processing={processing}
                />
            );
        }

        // COSMÓGRAFO - Paid
        if (currentPlan.type === 'managed' && !currentPlan.isTrial) {
            return (
                <PlanCTA
                    primaryText={t('Manage subscription')}
                    primaryAction={() => {
                        // TODO: Portal de Stripe
                        window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Manage Subscription';
                    }}
                    primaryIcon="external"
                    secondaryText={t('Switch to annual (–15%)')}
                    secondaryAction={() => {
                        window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Annual Discount';
                    }}
                    processing={processing}
                />
            );
        }

        // ASTRÓNOMO - Pretrial (Free users)
        if (currentPlan.type === 'free') {
            // This is already handled by the UpgradeCTA section
            return null;
        }

        // ASTRÓNOMO - Trial (sin tarjeta)
        if (currentPlan.type === 'pro' && currentPlan.isTrial && !currentPlan.usesManagedKeys) {
            return (
                <PlanCTA
                    primaryText={t('Add card and extend +30 days')}
                    primaryAction={() => handleAction(() => router.post(`/${locale}/settings/trial/add-card`))}
                    primaryIcon="card"
                    secondaryText={t('Activate now for $99/month')}
                    secondaryAction={() => {
                        window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Activate Astronomer';
                    }}
                    note={t(':days days remaining. Add your card to get +30 extra days free.', { days: daysLeft })}
                    noteVariant={daysLeft <= 5 ? 'warning' : 'success'}
                    processing={processing}
                />
            );
        }

        // ASTRÓNOMO - Paid
        if (currentPlan.type === 'pro' && !currentPlan.isTrial) {
            return (
                <PlanCTA
                    primaryText={t('Manage Pro subscription')}
                    primaryAction={() => {
                        window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Manage Pro Subscription';
                    }}
                    primaryIcon="external"
                    secondaryText={t('Switch to annual (–20%)')}
                    secondaryAction={() => {
                        window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Annual Pro Discount';
                    }}
                    processing={processing}
                />
            );
        }

        // Default: Integrations button
        return (
            <div className="flex gap-3">
                {currentPlan.canManageProviderKeys ? (
                    <Button asChild className="gap-2">
                        <a href={integrationsRoutes.index({ locale }).url}>
                            {t('Manage integrations')}
                            <ArrowRight className="size-4" />
                        </a>
                    </Button>
                ) : (
                    <Button disabled className="gap-2" variant="outline">
                        <Lock className="size-4" />
                        {t('Integrations')}
                    </Button>
                )}

                <Button asChild variant="outline" className="gap-2">
                    <a href="mailto:support@cerberogrowthsolutions.com">
                        <Mail className="size-4" />
                        {t('Talk to sales')}
                    </a>
                </Button>
            </div>
        );
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Plan & Billing')} />

            <div className="space-y-8">
                {/* Current Plan Header */}
                <section className="rounded-2xl border bg-gradient-to-br from-background via-background to-muted/30 p-8 shadow-lg">
                    <PlanHeader
                        name={currentPlan.label}
                        emoji={currentPlan.emoji}
                        tagline={currentPlan.tagline}
                        status={currentPlan.isTrial ? 'trial' : 'active'}
                        trialDaysLeft={daysLeft}
                        accentColor={currentPlan.accentColor}
                        isInternal={currentPlan.isInternal}
                    />

                    {/* Trial Banner */}
                    {showTrialBanner && (
                        <div className="mt-6">
                            <TrialBanner
                                daysLeft={daysLeft}
                                variant={daysLeft <= 5 ? 'warning' : 'info'}
                                showCardExtension={showCardExtension}
                                onAddCard={() => {
                                    router.post(
                                        settingsRoutes.trial['add-card']({ locale }).url,
                                        {},
                                        {
                                            preserveScroll: true,
                                            onSuccess: () => {
                                                // Success message handled by backend
                                            },
                                        },
                                    );
                                }}
                            />
                        </div>
                    )}

                    {/* Plan-specific CTAs */}
                    <div className="mt-6">
                        {renderPlanCTA()}
                    </div>
                </section>

                {/* Upgrade CTAs (for Free users) */}
                {currentPlan.type === 'free' && !currentPlan.isTrial && (
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card
                            className="cursor-pointer border-2 border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/10 transition-all hover:border-cyan-500/40 hover:shadow-lg"
                            onClick={() => router.post(`/${locale}/settings/trial/managed`)}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/50 text-2xl backdrop-blur-sm">
                                        🧭
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h3 className="font-semibold">{t('Try Cosmographer Free')}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {t('30 days free trial. We handle the AI setup.')}
                                        </p>
                                        <Button size="sm" className="mt-2 w-full">
                                            {t('Start 30-day trial')}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card
                            className="cursor-pointer border-2 border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-violet-500/10 transition-all hover:border-violet-500/40 hover:shadow-lg"
                            onClick={() => router.post(`/${locale}/settings/trial/pro`)}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/50 text-2xl backdrop-blur-sm">
                                        🔭
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h3 className="font-semibold">{t('Try Astronomer Free')}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {t('30 days free + 30 bonus days with card.')}
                                        </p>
                                        <Button size="sm" variant="secondary" className="mt-2 w-full">
                                            {t('Start trial & get bonus')}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Public Plans */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold">{t('Public Plans')}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {t('Choose the plan that aligns with how you prefer to manage providers and automation.')}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {publicPlans.map((plan) => {
                            const isCurrent = plan.isCurrent;

                            return (
                                <Card
                                    key={plan.type}
                                    data-plan={plan.type}
                                    className={cn(
                                        'relative h-full border-2 transition-all hover:shadow-lg',
                                        isCurrent && 'border-primary shadow-lg shadow-primary/10',
                                    )}
                                >
                                    <CardHeader className="space-y-3 pb-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{plan.emoji}</span>
                                                <CardTitle className="text-xl">{plan.label}</CardTitle>
                                            </div>
                                            {isCurrent && (
                                                <Badge variant="default">{t('Current')}</Badge>
                                            )}
                                        </div>
                                        <CardDescription className="text-base">
                                            {plan.tagline}
                                        </CardDescription>
                                        <div className="flex items-baseline gap-1">
                                            <p className="text-2xl font-bold text-primary">{plan.price}</p>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4 pb-4">
                                        <div className="space-y-2.5">
                                            {plan.features.map((feature) => (
                                                <FeatureItem key={feature} feature={feature} />
                                            ))}
                                        </div>

                                        {plan.hasUsageLimits && (
                                            <div className="rounded-lg bg-muted/50 p-3">
                                                <p className="text-xs text-muted-foreground">
                                                    {t(':daily daily / :monthly monthly requests included.', {
                                                        daily: formatLimit(plan.usageLimits.daily),
                                                        monthly: formatLimit(plan.usageLimits.monthly),
                                                    })}
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>

                                    <CardFooter className="flex flex-col items-stretch gap-2 pt-4">
                                        {(() => {
                                            const cta = getPlanCardCTA(plan.type, isCurrent);
                                            return (
                                                <Button
                                                    variant={cta.variant}
                                                    className="w-full justify-center"
                                                    onClick={cta.action}
                                                    disabled={cta.disabled}
                                                >
                                                    {cta.text}
                                                </Button>
                                            );
                                        })()}
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Internal Plans (Admin Only) */}
                    {internalPlans.length > 0 && (
                        <div className="mt-12 space-y-4">
                            <div className="flex items-center gap-2">
                                <Lock className="size-5 text-muted-foreground" />
                                <div>
                                    <h3 className="text-base font-semibold">{t('Internal Plans')}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t('Internal plans (Administration only)')}
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {internalPlans.map((plan) => {
                                    const isCurrent = plan.isCurrent;

                                    return (
                                        <Card
                                            key={plan.type}
                                            className={cn(
                                                'h-full border-muted-foreground/20 opacity-90',
                                                isCurrent &&
                                                    'border-primary opacity-100 shadow-lg shadow-primary/10',
                                            )}
                                        >
                                            <CardHeader className="space-y-3 pb-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-2xl">{plan.emoji}</span>
                                                        <CardTitle className="text-xl">{plan.label}</CardTitle>
                                                    </div>
                                                    {isCurrent && (
                                                        <Badge variant="default">{t('Current')}</Badge>
                                                    )}
                                                </div>
                                                <CardDescription className="text-base">
                                                    {plan.tagline}
                                                </CardDescription>
                                                <p className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                                                    <Lock className="size-3" />
                                                    {plan.price}
                                                </p>
                                            </CardHeader>

                                            <CardContent className="space-y-4 pb-4">
                                                <div className="space-y-2.5">
                                                    {plan.features.map((feature) => (
                                                        <FeatureItem key={feature} feature={feature} />
                                                    ))}
                                                </div>
                                            </CardContent>

                                            <CardFooter className="flex flex-col items-stretch gap-2 pt-4">
                                                <Button variant="outline" className="w-full justify-center" disabled>
                                                    {t('Assigned by role')}
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </AppSidebarLayout>
    );
}
