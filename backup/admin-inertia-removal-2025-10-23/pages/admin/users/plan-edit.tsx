import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import adminRoutes from '@/routes/admin';
import { dashboard as dashboardRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useLocale, useTrans } from '@/hooks/useTrans';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';

type PlanOption = {
    value: string;
    label: string;
    description: string;
    isInternal: boolean;
};

type User = {
    id: number;
    name: string;
    email: string;
    plan: string;
    planLabel: string;
    trial_ends_at: string | null;
};

type PlanChange = {
    id: number;
    old_plan: string;
    new_plan: string;
    reason: string | null;
    changed_by: string;
    changed_at: string;
};

type PlanEditPageProps = {
    user: User;
    plans: PlanOption[];
    recentChanges: PlanChange[];
};

export default function PlanEdit({
    user,
    plans,
    recentChanges,
}: PlanEditPageProps) {
    const t = useTrans();
    const locale = useLocale();

    const pageTitle = t('Change Plan');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Dashboard'),
            href: dashboardRoute({ locale }).url,
        },
        {
            title: t('Administration'),
            href: adminRoutes.dashboard({ locale }).url,
        },
        {
            title: t('Users'),
            href: adminRoutes.users.index({ locale }).url,
        },
        {
            title: user.name,
            href: adminRoutes.users.index({ locale }).url,
        },
        {
            title: t('Change Plan'),
            href: '',
        },
    ];

    const form = useForm({
        plan: user.plan,
        trial_ends_at: user.trial_ends_at
            ? new Date(user.trial_ends_at).toISOString().split('T')[0]
            : '',
        reason: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        form.put(adminRoutes.users.plan.update({ locale, user: user.id }).url);
    };

    const selectedPlan = plans.find((p) => p.value === form.data.plan);
    const isTrialPlan = form.data.plan === 'trial';
    
    const publicPlans = plans.filter((p) => !p.isInternal);
    const internalPlans = plans.filter((p) => p.isInternal);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />

            <div className="mx-auto max-w-4xl space-y-6 p-6">
                <header>
                    <h1 className="text-3xl font-bold">{pageTitle}</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {t(
                            'Update the plan for :name. Changes will take effect immediately.',
                            { name: user.name },
                        )}
                    </p>
                </header>

                <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('User Information')}</CardTitle>
                                <CardDescription>
                                    {t('Current plan status')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {t('Name')}
                                        </p>
                                        <p className="font-medium">{user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {t('Email')}
                                        </p>
                                        <p className="font-medium">{user.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {t('Current Plan')}
                                    </p>
                                    <p className="font-medium">{user.planLabel}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('Change Plan')}</CardTitle>
                                <CardDescription>
                                    {t('Select a new plan and provide a reason')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="plan">{t('Plan')}</Label>
                                        <select
                                            id="plan"
                                            value={form.data.plan}
                                            onChange={(e) =>
                                                form.setData('plan', e.target.value)
                                            }
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        >
                                            <optgroup label={t('Public Plans')}>
                                                {publicPlans.map((plan) => (
                                                    <option
                                                        key={plan.value}
                                                        value={plan.value}
                                                    >
                                                        {plan.label}
                                                    </option>
                                                ))}
                                            </optgroup>
                                            {internalPlans.length > 0 && (
                                                <optgroup label={t('Internal Plans')}>
                                                    {internalPlans.map((plan) => (
                                                        <option
                                                            key={plan.value}
                                                            value={plan.value}
                                                        >
                                                            🛡️ {plan.label}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            )}
                                        </select>
                                        {selectedPlan && (
                                            <p className="text-sm text-muted-foreground">
                                                {selectedPlan.description}
                                            </p>
                                        )}
                                        <InputError message={form.errors.plan} />
                                    </div>

                                    {isTrialPlan && (
                                        <div className="space-y-3">
                                            <Label htmlFor="trial_ends_at">
                                                {t('Trial End Date')}
                                            </Label>
                                            <Input
                                                type="date"
                                                id="trial_ends_at"
                                                value={form.data.trial_ends_at}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'trial_ends_at',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <p className="text-sm text-muted-foreground">
                                                {t(
                                                    'When should the trial period end?',
                                                )}
                                            </p>
                                            <InputError
                                                message={form.errors.trial_ends_at}
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <Label htmlFor="reason">
                                            {t('Reason (Optional)')}
                                        </Label>
                                        <textarea
                                            id="reason"
                                            value={form.data.reason}
                                            onChange={(e) =>
                                                form.setData('reason', e.target.value)
                                            }
                                            rows={3}
                                            maxLength={500}
                                            placeholder={t(
                                                'Why are you changing this user\'s plan?',
                                            )}
                                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            {form.data.reason.length}/500
                                        </p>
                                        <InputError message={form.errors.reason} />
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            type="submit"
                                            disabled={form.processing}
                                        >
                                            {form.processing
                                                ? t('Saving...')
                                                : t('Save Changes')}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            asChild
                                        >
                                            <a
                                                href={adminRoutes.users.index({
                                                    locale,
                                                }).url}
                                            >
                                                {t('Cancel')}
                                            </a>
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('Recent Changes')}</CardTitle>
                                <CardDescription>
                                    {t('Plan change history for this user')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {recentChanges.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        {t('No recent plan changes')}
                                    </p>
                                ) : (
                                    <ul className="space-y-4">
                                        {recentChanges.map((change) => (
                                            <li
                                                key={change.id}
                                                className="rounded-lg border border-border/50 p-3 text-sm"
                                            >
                                                <div className="flex items-baseline justify-between gap-2">
                                                    <span className="font-medium">
                                                        {change.old_plan} →{' '}
                                                        {change.new_plan}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {change.changed_at}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {t('Changed by')}{' '}
                                                    {change.changed_by}
                                                </p>
                                                {change.reason && (
                                                    <p className="mt-2 text-xs italic">
                                                        {change.reason}
                                                    </p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

