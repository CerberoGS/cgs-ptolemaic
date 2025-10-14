import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import adminRoutes from '@/routes/admin';
import { dashboard as dashboardRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { type PageProps } from '@inertiajs/react/types/types';
import { useLocale, useTrans } from '@/hooks/useTrans';

type AdminDashboardProps = PageProps<{
    stats: {
        categories: Array<{
            id: number;
            name: string;
            display_name: string;
            description?: string | null;
        }>;
        providers: Record<string, number>;
        users: {
            total: number;
            admins: number;
        };
    };
}>;

export default function AdminDashboard({ stats }: AdminDashboardProps) {
    const t = useTrans();
    const locale = useLocale();

    const pageTitle = t('Administration');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Dashboard'),
            href: dashboardRoute({ locale }).url,
        },
        {
            title: pageTitle,
            href: adminRoutes.dashboard({ locale }).url,
        },
    ];

    const providerTotals = Object.entries(stats.providers ?? {});

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />
            <section className="flex flex-1 flex-col gap-6 p-4">
                <header className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {t('Administration')}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl text-sm">
                        {t(
                            'Configura proveedores disponibles y gestiona a los usuarios con acceso administrador.',
                        )}
                    </p>
                </header>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <article className="rounded-lg border border-sidebar-border/70 bg-card p-4 shadow-sm dark:border-sidebar-border">
                        <h2 className="text-sm font-semibold text-muted-foreground">
                            {t('Usuarios')}
                        </h2>
                        <div className="mt-2 flex items-end justify-between">
                            <span className="text-3xl font-semibold">
                                {stats.users.total}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {t('{count} administradores', {
                                    count: stats.users.admins,
                                })}
                            </span>
                        </div>
                    </article>

                    <article className="rounded-lg border border-sidebar-border/70 bg-card p-4 shadow-sm dark:border-sidebar-border">
                        <h2 className="text-sm font-semibold text-muted-foreground">
                            {t('Proveedores registrados')}
                        </h2>
                        <div className="mt-3 space-y-2">
                            {providerTotals.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    {t('Aún no tienes proveedores configurados.')}
                                </p>
                            )}
                            {providerTotals.map(([type, total]) => (
                                <div
                                    key={type}
                                    className="flex items-center justify-between rounded-md bg-muted/40 p-2"
                                >
                                    <span className="text-sm font-medium capitalize">
                                        {t(type.replace('_', ' '))}
                                    </span>
                                    <span className="text-base font-semibold">
                                        {total}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-lg border border-sidebar-border/70 bg-card p-4 shadow-sm dark:border-sidebar-border md:col-span-2 lg:col-span-1">
                        <h2 className="text-sm font-semibold text-muted-foreground">
                            {t('Categorías')}
                        </h2>
                        <ul className="mt-3 space-y-2 text-sm">
                            {stats.categories.map((category) => (
                                <li
                                    key={category.id}
                                    className="rounded-md border border-border/60 px-3 py-2 dark:border-border/40"
                                >
                                    <div className="font-semibold">
                                        {category.display_name}
                                    </div>
                                    {category.description && (
                                        <p className="text-muted-foreground text-xs">
                                            {category.description}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>

                <div className="flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                    <span>{t('Need to configure something right away?')}</span>
                    <div className="flex flex-wrap gap-2">
                        <Button asChild variant="outline" size="sm">
                            <Link href={adminRoutes.providers.index({ locale }).url}>
                                {t('Manage providers')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href={adminRoutes.roles.index({ locale }).url}>
                                {t('Manage roles')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href={adminRoutes.users.index({ locale }).url}>
                                {t('Manage users')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href={`/${locale}/admin/feedback`}>
                                {t('Manage feedback')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
