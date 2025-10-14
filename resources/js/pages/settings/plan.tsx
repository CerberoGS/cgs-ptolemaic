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
import { Head } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, Lock, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

export default function PlanPage({ currentPlan, plans }: PlanPageProps) {
    const t = useTrans();
    const locale = useLocale();

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

    const trialEndsMessage =
        currentPlan.isTrial && currentPlan.trialEndsAt
            ? t('Trial ends on :date', {
                  date: new Date(currentPlan.trialEndsAt).toLocaleDateString(),
              })
            : currentPlan.isTrial
              ? t('Trial active')
              : undefined;

    const managedLimitsDescription =
        currentPlan.usesManagedKeys && currentPlan.managedLimits.daily
            ? t(':daily requests per day / :monthly per month', {
                  daily: formatLimit(currentPlan.managedLimits.daily),
                  monthly: formatLimit(currentPlan.managedLimits.monthly),
              })
            : undefined;

    const publicPlans = plans.filter((p) => !p.isInternal);
    const internalPlans = plans.filter((p) => p.isInternal);

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Plan & Billing')} />

            <div className="space-y-8">
                <section className="rounded-xl border bg-card p-6 shadow-sm dark:bg-neutral-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="uppercase">
                                    {t('Current')}
                                </Badge>
                                {currentPlan.isInternal && (
                                    <Badge
                                        variant="outline"
                                        className="gap-1 border-primary text-primary"
                                    >
                                        <Shield className="size-3" />
                                        {t('Internal Plan')}
                                    </Badge>
                                )}
                            </div>
                            <h1 className="text-2xl font-semibold">
                                {currentPlan.label}
                            </h1>
                            <p className="max-w-2xl text-muted-foreground">
                                {currentPlan.description}
                            </p>
                            {currentPlan.isInternal && (
                                <Alert className="border-primary/50 bg-primary/5">
                                    <Shield className="size-4" />
                                    <AlertDescription>
                                        {t(
                                            'This plan is assigned automatically based on your role.',
                                        )}{' '}
                                        {t(
                                            'You cannot change your plan. Contact an administrator if you need changes.',
                                        )}
                                    </AlertDescription>
                                </Alert>
                            )}
                            {trialEndsMessage && (
                                <p className="text-sm text-primary">
                                    {trialEndsMessage}
                                </p>
                            )}
                            {managedLimitsDescription && (
                                <p className="text-sm text-muted-foreground">
                                    {managedLimitsDescription}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Button
                                asChild
                                variant="outline"
                                className="justify-between gap-2"
                            >
                                <a href="mailto:support@cerberogrowthsolutions.com">
                                    {t('Talk to sales')}
                                    <ArrowRight className="size-4" />
                                </a>
                            </Button>
                            {currentPlan.canManageProviderKeys ? (
                                <Button asChild className="gap-2">
                                    <a href={integrationsRoutes.index({ locale }).url}>
                                        {t('Go to provider integrations')}
                                        <ArrowRight className="size-4" />
                                    </a>
                                </Button>
                            ) : (
                                <Button disabled className="gap-2" variant="outline">
                                    {t('Go to provider integrations')}
                                    <ArrowRight className="size-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold">
                            {t('Public Plans')}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {t(
                                'Choose the plan that aligns with how you prefer to manage providers and automation.',
                            )}
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {publicPlans.map((plan) => {
                            const isCurrent = plan.isCurrent;

                            return (
                                <Card
                                    key={plan.type}
                                    className={cn(
                                        'h-full border-muted-foreground/20',
                                        isCurrent &&
                                            'border-primary shadow-lg shadow-primary/10',
                                    )}
                                >
                                    <CardHeader className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xl">
                                                {plan.label}
                                            </CardTitle>
                                            {isCurrent && (
                                                <Badge variant="default">
                                                    {t('Current')}
                                                </Badge>
                                            )}
                                        </div>
                                        <CardDescription className="text-base">
                                            {plan.summary}
                                        </CardDescription>
                                        <p className="text-sm font-semibold text-primary">
                                            {plan.price}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <ul className="space-y-2 text-sm">
                                            {plan.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-start gap-2 text-left"
                                                >
                                                    <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter className="flex flex-col items-start gap-2">
                                        <div className="text-xs text-muted-foreground">
                                            {plan.canManageProviderKeys
                                                ? t('Bring your own provider keys.')
                                                : plan.usesManagedKeys
                                                  ? t('Keys managed for you by CGS.')
                                                  : t('Community access plan.')}
                                        </div>
                                        {plan.hasUsageLimits && (
                                            <div className="text-xs text-muted-foreground">
                                                {t(':daily daily / :monthly monthly requests included.', {
                                                    daily: formatLimit(plan.usageLimits.daily),
                                                    monthly: formatLimit(plan.usageLimits.monthly),
                                                })}
                                            </div>
                                        )}
                                        <Button
                                            variant={
                                                isCurrent ? 'outline' : 'default'
                                            }
                                            className="mt-2 w-full justify-center"
                                            asChild
                                        >
                                            <a href="mailto:support@cerberogrowthsolutions.com">
                                                {isCurrent
                                                    ? t('Contact support')
                                                    : t('Request upgrade')}
                                            </a>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>

                    {internalPlans.length > 0 && (
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-2">
                                <Lock className="size-5 text-muted-foreground" />
                                <div>
                                    <h3 className="text-base font-semibold">
                                        {t('Internal Plans')}
                                    </h3>
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
                                            <CardHeader className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="flex items-center gap-2 text-xl">
                                                        <Shield className="size-5 text-primary" />
                                                        {plan.label}
                                                    </CardTitle>
                                                    {isCurrent && (
                                                        <Badge variant="default">
                                                            {t('Current')}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <CardDescription className="text-base">
                                                    {plan.summary}
                                                </CardDescription>
                                                <p className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                                                    <Lock className="size-3" />
                                                    {plan.price}
                                                </p>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <ul className="space-y-2 text-sm">
                                                    {plan.features.map((feature) => (
                                                        <li
                                                            key={feature}
                                                            className="flex items-start gap-2 text-left"
                                                        >
                                                            <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                            <CardFooter className="flex flex-col items-start gap-2">
                                                <div className="text-xs text-muted-foreground">
                                                    {t('Assigned by role')}
                                                </div>
                                                {plan.hasUsageLimits && (
                                                    <div className="text-xs text-muted-foreground">
                                                        {t(':daily daily / :monthly monthly requests included.', {
                                                            daily: formatLimit(
                                                                plan.usageLimits.daily,
                                                            ),
                                                            monthly: formatLimit(
                                                                plan.usageLimits.monthly,
                                                            ),
                                                        })}
                                                    </div>
                                                )}
                                                <Button
                                                    variant="outline"
                                                    className="mt-2 w-full justify-center"
                                                    disabled
                                                >
                                                    {t('Cannot be changed')}
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
