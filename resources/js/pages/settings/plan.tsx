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
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAjax } from '@/hooks/use-ajax';
import { PlanHeader } from '@/components/plans/plan-header';
import { FeatureItem } from '@/components/plans/feature-item';
import { TrialBanner } from '@/components/plans/trial-banner';
import { UpgradeCTA } from '@/components/plans/upgrade-cta';
import { PlanCTA } from '@/components/plans/plan-cta';

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
    const [waitlistStatus, setWaitlistStatus] = useState<{
        is_on_waitlist: boolean;
        current_plan: string | null;
        current_plan_label: string | null;
    }>({
        is_on_waitlist: false,
        current_plan: null,
        current_plan_label: null,
    });
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<{
        planType: string;
        planLabel: string;
        action: 'add' | 'switch' | 'remove';
        currentPlan?: string;
    } | null>(null);

    // Load waitlist status on component mount
    useEffect(() => {
        // Get waitlist status from the current page props if available
        if (window.waitlistStatus) {
            setWaitlistStatus(window.waitlistStatus);
        } else {
            // Load waitlist status from server
            const loadWaitlistStatus = async () => {
                try {
                    const response = await fetch(`/${locale}/settings/waitlist/status`, {
                        method: 'GET',
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Accept': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setWaitlistStatus(data.waitlistStatus);
                    }
                } catch (error) {
                    console.error('Error loading waitlist status:', error);
                }
            };

            loadWaitlistStatus();
        }
    }, [locale]);

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

    const handleWaitlistAction = (planType: string, planLabel: string) => {
        const isOnThisPlan = waitlistStatus.is_on_waitlist && waitlistStatus.current_plan === planType;
        const isOnOtherPlan = waitlistStatus.is_on_waitlist && waitlistStatus.current_plan !== planType;

        if (isOnThisPlan) {
            // User is already on this plan's waitlist - offer to remove
            setModalData({
                planType,
                planLabel,
                action: 'remove',
            });
        } else if (isOnOtherPlan) {
            // User is on another plan's waitlist - offer to switch
            setModalData({
                planType,
                planLabel,
                action: 'switch',
                currentPlan: waitlistStatus.current_plan_label || '',
            });
        } else {
            // User is not on any waitlist - offer to add
            setModalData({
                planType,
                planLabel,
                action: 'add',
            });
        }
        setShowModal(true);
    };

    const confirmWaitlistAction = async () => {
        if (!modalData) {
            console.error('No modal data available');
            return;
        }

        console.log('Starting waitlist action:', modalData);
        setProcessing(true);
        
        try {
            // Make the real request to the server
            const formData = new FormData();
            formData.append('plan_type', modalData.planType);
            formData.append('action', modalData.action);
            
            const response = await fetch(`/${locale}/settings/waitlist`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Waitlist action completed:', data);
            
            // Close modal and update status
            setShowModal(false);
            setModalData(null);
            
            // Reload waitlist status from server to ensure consistency
            try {
                const statusResponse = await fetch(`/${locale}/settings/waitlist/status`, {
                    method: 'GET',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json',
                    },
                });

                if (statusResponse.ok) {
                    const statusData = await statusResponse.json();
                    setWaitlistStatus(statusData.waitlistStatus);
                }
            } catch (statusError) {
                console.error('Error reloading waitlist status:', statusError);
                // Fallback to optimistic update
                setWaitlistStatus({
                    is_on_waitlist: true,
                    current_plan: modalData.planType,
                    current_plan_label: modalData.planLabel,
                });
            }
            
            // Show success message
            alert(data.message || 'Successfully added to waitlist!');
            
        } catch (error) {
            console.error('Error in waitlist action:', error);
            alert('Error: ' + error.message);
        } finally {
            setProcessing(false);
        }
    };

    const getPlanCardCTA = (planType: string, isCurrent: boolean) => {
        // PLANES INTERNOS - Mostrar CTAs específicos para cada plan
        if (currentPlan.isInternal) {
            switch (planType) {
                case 'free':
                    return {
                        text: t('View Observer Plan'),
                        variant: 'outline' as const,
                        action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Observer Plan Information',
                    };
                case 'managed':
                    const isOnManaged = waitlistStatus.is_on_waitlist && waitlistStatus.current_plan === 'managed';
                    console.log('Managed plan check:', { isOnManaged, waitlistStatus }); // Debug log
                    return {
                        text: isOnManaged ? t('In Waitlist') : t('Coming Soon - Join Waitlist'),
                        variant: isOnManaged ? 'secondary' as const : 'default' as const,
                        action: () => handleWaitlistAction('managed', 'Cosmógrafo'),
                    };
                case 'pro':
                    const isOnPro = waitlistStatus.is_on_waitlist && waitlistStatus.current_plan === 'pro';
                    return {
                        text: isOnPro ? t('In Waitlist') : t('Coming Soon - Join Waitlist'),
                        variant: isOnPro ? 'secondary' as const : 'default' as const,
                        action: () => handleWaitlistAction('pro', 'Astrónomo'),
                    };
                case 'enterprise':
                    const isOnEnterprise = waitlistStatus.is_on_waitlist && waitlistStatus.current_plan === 'enterprise';
                    return {
                        text: isOnEnterprise ? t('In Waitlist') : t('Coming Soon - Join Waitlist'),
                        variant: isOnEnterprise ? 'secondary' as const : 'default' as const,
                        action: () => handleWaitlistAction('enterprise', 'Heliópolis'),
                    };
                default:
                    return {
                        text: t('Learn more'),
                        variant: 'outline' as const,
                        action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com',
                    };
            }
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
                const isOnManagedUpgrade = waitlistStatus.is_on_waitlist && waitlistStatus.current_plan === 'managed';
                return {
                    text: isOnManagedUpgrade ? t('In Waitlist') : t('Coming Soon - Join Waitlist'),
                    variant: isOnManagedUpgrade ? 'secondary' as const : 'default' as const,
                    action: () => handleWaitlistAction('managed', 'Cosmógrafo'),
                };
            case 'pro':
                const isOnProUpgrade = waitlistStatus.is_on_waitlist && waitlistStatus.current_plan === 'pro';
                return {
                    text: isOnProUpgrade ? t('In Waitlist') : t('Coming Soon - Join Waitlist'),
                    variant: isOnProUpgrade ? 'secondary' as const : 'default' as const,
                    action: () => handleWaitlistAction('pro', 'Astrónomo'),
                };
            case 'enterprise':
                const isOnEnterpriseUpgrade = waitlistStatus.is_on_waitlist && waitlistStatus.current_plan === 'enterprise';
                return {
                    text: isOnEnterpriseUpgrade ? t('In Waitlist') : t('Coming Soon - Join Waitlist'),
                    variant: isOnEnterpriseUpgrade ? 'secondary' as const : 'default' as const,
                    action: () => handleWaitlistAction('enterprise', 'Heliópolis'),
                };
            default:
                return {
                    text: t('Coming Soon - Join Waitlist'),
                    variant: 'default' as const,
                    action: () => window.location.href = 'mailto:support@cerberogrowthsolutions.com?subject=Plan Upgrade - Join Waitlist',
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

            {/* Modal de confirmación para lista de espera */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {modalData?.action === 'add' && t('Add to :plan waitlist?', { plan: modalData.planLabel })}
                            {modalData?.action === 'switch' && t('You are already on the :currentPlan waitlist. Do you want to switch to :newPlan?', { 
                                currentPlan: modalData.currentPlan, 
                                newPlan: modalData.planLabel 
                            })}
                            {modalData?.action === 'remove' && t('You are already on the :plan waitlist. Do you want to remove yourself from the list?', { 
                                plan: modalData.planLabel 
                            })}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setShowModal(false)}
                            disabled={processing}
                        >
                            {t('Cancel')}
                        </Button>
                        <Button
                            onClick={confirmWaitlistAction}
                            disabled={processing}
                        >
                            {processing ? t('Processing...') : (
                                modalData?.action === 'add' ? t('Confirm') :
                                modalData?.action === 'switch' ? t('Switch to :plan', { plan: modalData.planLabel }) :
                                t('Remove from list')
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppSidebarLayout>
    );
}
