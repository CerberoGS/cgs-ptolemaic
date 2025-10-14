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
import { ArrowRight, CheckCircle2 } from 'lucide-react';

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

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Plan & Billing')} />

            <div className="space-y-8">
                <section className="rounded-xl border bg-card p-6 shadow-sm dark:bg-neutral-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary" className="uppercase">
                                {t('Current')}
                            </Badge>
                            <h1 className="text-2xl font-semibold">
                                {currentPlan.label}
                            </h1>
                            <p className="max-w-2xl text-muted-foreground">
                                {currentPlan.description}
                            </p>
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

                <section className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold">
                            {t('Compare plans')}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {t(
                                'Choose the plan that aligns with how you prefer to manage providers and automation.',
                            )}
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {plans.map((plan) => {
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
                </section>
            </div>
        </AppSidebarLayout>
    );
}
