
import AppSidebarLayout from '@/Layouts/app/app-sidebar-layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale, useTrans } from '@/hooks/useTrans';
import settingsRoutes from '@/routes/settings';
import { Head } from '@inertiajs/react';
import { AlertTriangle, Key, RefreshCcw } from 'lucide-react';

type ProviderItem = {
    id: number;
    type: string;
    display_name: string;
    status: string;
    slug: string;
};

type ProviderGroup = {
    type: string;
    label: string;
    items: ProviderItem[];
};

type PlanInfo = {
    type: string;
    label: string;
    summary: string;
    description: string;
    canManageProviderKeys: boolean;
    usesManagedKeys: boolean;
    hasUsageLimits: boolean;
    limits: {
        daily: number | null;
        monthly: number | null;
    };
};

interface IntegrationsPageProps {
    plan: PlanInfo;
    providers: ProviderGroup[];
    keyCounts: Record<string, number>;
}

const formatLimit = (value: number | null) => {
    if (value === null) {
        return 'N/A';
    }
    return Intl.NumberFormat().format(value);
};

export default function IntegrationsPage({
    plan,
    providers,
    keyCounts,
}: IntegrationsPageProps) {
    const t = useTrans();
    const locale = useLocale();

    const breadcrumbs = [
        {
            title: t('Settings'),
            href: settingsRoutes.index({ locale }).url,
        },
        {
            title: t('Provider integrations'),
            href: settingsRoutes.index({ locale }).url,
        },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Provider integrations')} />

            <div className="space-y-8">
                <section className="rounded-xl border bg-card p-6 shadow-sm dark:bg-neutral-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary" className="uppercase">
                                {plan.label}
                            </Badge>
                            <h1 className="text-2xl font-semibold">
                                {t('Provider integrations')}
                            </h1>
                            <p className="max-w-3xl text-muted-foreground">
                                {plan.description}
                            </p>
                            {plan.usesManagedKeys && (
                                <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-primary">
                                    <Key className="size-4" />
                                    <span>
                                        {t(
                                            'Your plan includes managed API keys. Our team rotates and secures them for you.',
                                        )}
                                    </span>
                                </div>
                            )}
                            {plan.canManageProviderKeys && (
                                <p className="text-sm text-muted-foreground">
                                    {t(
                                        'Add provider credentials below to unlock personalized automations and data ingestion workflows.',
                                    )}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            {plan.hasUsageLimits && (
                                <div className="rounded-lg border border-amber-400/50 bg-amber-50 px-3 py-3 text-sm text-amber-900 dark:border-amber-300/40 dark:bg-amber-900/20 dark:text-amber-100">
                                    <div className="flex items-center gap-2 font-medium">
                                        <AlertTriangle className="size-4" />
                                        {t('Usage limits')}
                                    </div>
                                    <p className="mt-1 text-xs">
                                        {t(':daily requests daily / :monthly monthly included.', {
                                            daily: formatLimit(plan.limits.daily),
                                            monthly: formatLimit(plan.limits.monthly),
                                        })}
                                    </p>
                                </div>
                            )}
                            <Button
                                asChild
                                className="gap-2"
                                variant={plan.canManageProviderKeys ? 'default' : 'outline'}
                                disabled={!plan.canManageProviderKeys}
                            >
                                <a href="mailto:support@cerberogrowthsolutions.com">
                                    <RefreshCcw className="size-4" />
                                    {plan.canManageProviderKeys
                                        ? t('Request provisioning support')
                                        : t('Contact support')}
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    {providers.map((group) => {
                        const keyCount = keyCounts[group.type] ?? 0;
                        const showManagedNotice =
                            plan.usesManagedKeys && !plan.canManageProviderKeys;

                        return (
                            <Card key={group.type}>
                                <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <CardTitle>{group.label}</CardTitle>
                                        <CardDescription>
                                            {t(
                                                'Configure providers to unlock automation across :category data sources.',
                                                { category: group.label.toLowerCase() },
                                            )}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="outline">
                                        {t(':count keys connected', {
                                            count: keyCount,
                                        })}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {showManagedNotice ? (
                                        <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
                                            {t(
                                                'These integrations are managed for you. Reach out when you need additional providers or increased capacity.',
                                            )}
                                        </div>
                                    ) : (
                                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                            {group.items.map((provider) => (
                                                <div
                                                    key={provider.id}
                                                    className="rounded-lg border border-dashed border-muted-foreground/30 px-4 py-3 text-sm"
                                                >
                                                    <div className="font-medium">
                                                        {provider.display_name}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {t('Status')}: {provider.status}
                                                    </div>
                                                </div>
                                            ))}
                                            {group.items.length === 0 && (
                                                <div className="text-sm text-muted-foreground">
                                                    {t('No providers available yet.')}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {plan.canManageProviderKeys && (
                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                className="border-dashed"
                                                disabled
                                            >
                                                {t('Add provider key (coming soon)')}
                                            </Button>
                                            <Button variant="ghost" asChild>
                                                <a href="mailto:support@cerberogrowthsolutions.com">
                                                    {t('Need a different provider?')}
                                                </a>
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </section>
            </div>
        </AppSidebarLayout>
    );
}
