import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import planRoutes from '@/routes/settings/plan';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle2, Lock } from 'lucide-react';
import { useLocale, useTrans } from '@/hooks/useTrans';
import { FormEventHandler, useState } from 'react';
import settingsRoutes from '@/routes/settings';

export default function Dashboard() {
    const t = useTrans();
    const locale = useLocale();
    const { auth } = usePage<SharedData>().props;
    const plan = auth.plan;
    const [startingTrial, setStartingTrial] = useState(false);
    const pageTitle = t('Dashboard');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: pageTitle,
            href: dashboard({ locale }).url,
        },
    ];

    if (plan?.type === 'free') {
        const upgradeUrl = planRoutes.show({ locale }).url;

        const handleStartTrial: FormEventHandler = (e) => {
            e.preventDefault();
            setStartingTrial(true);
            router.post(
                settingsRoutes.trial.store({ locale }).url,
                {},
                {
                    onFinish: () => setStartingTrial(false),
                }
            );
        };

        const availableFeatures = [
            {
                title: t('dashboard.free.available.logbook.title'),
                description: t('dashboard.free.available.logbook.description'),
            },
            {
                title: t('dashboard.free.available.forum.title'),
                description: t('dashboard.free.available.forum.description'),
            },
        ];

        const upgradeHighlights = [
            {
                title: t('dashboard.free.locked.integrations.title'),
                description: t(
                    'dashboard.free.locked.integrations.description',
                ),
            },
            {
                title: t('dashboard.free.locked.automation.title'),
                description: t(
                    'dashboard.free.locked.automation.description',
                ),
            },
            {
                title: t('dashboard.free.locked.analytics.title'),
                description: t(
                    'dashboard.free.locked.analytics.description',
                ),
            },
        ];

        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={pageTitle} />
                <div className="flex flex-col gap-6 p-4">
                    <section className="rounded-2xl border bg-card px-6 py-8 shadow-sm dark:bg-neutral-900">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="space-y-3">
                                <Badge variant="secondary" className="uppercase">
                                    {plan.label}
                                </Badge>
                                <h1 className="text-2xl font-semibold">
                                    {t('dashboard.free.heading')}
                                </h1>
                                <p className="max-w-2xl text-sm text-muted-foreground">
                                    {t('dashboard.free.subtitle')}
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={handleStartTrial}
                                    disabled={startingTrial}
                                    className="gap-2"
                                >
                                    {startingTrial
                                        ? t('Processing...')
                                        : t('Start free trial')}
                                </Button>
                                <Button asChild variant="outline" className="gap-2">
                                    <Link href={upgradeUrl}>
                                        {t('Compare plans')}
                                    </Link>
                                </Button>
                                <p className="text-xs text-muted-foreground">
                                    {t('dashboard.free.cta_helper')}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-4 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {t('dashboard.free.available.title')}
                                </CardTitle>
                                <CardDescription>
                                    {t('dashboard.free.available.description')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {availableFeatures.map((feature) => (
                                    <div
                                        key={feature.title}
                                        className="flex items-start gap-3 rounded-lg border border-muted-foreground/30 bg-muted/40 p-3"
                                    >
                                        <CheckCircle2 className="mt-0.5 size-5 text-primary" />
                                        <div className="space-y-1">
                                            <p className="font-medium">
                                                {feature.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-dashed border-primary/40">
                            <CardHeader>
                                <CardTitle>
                                    {t('dashboard.free.locked.title')}
                                </CardTitle>
                                <CardDescription>
                                    {t('dashboard.free.locked.description')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {upgradeHighlights.map((feature) => (
                                    <div
                                        key={feature.title}
                                        className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-3"
                                    >
                                        <Lock className="mt-0.5 size-5 text-primary" />
                                        <div className="space-y-1">
                                            <p className="font-medium text-primary">
                                                {feature.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
