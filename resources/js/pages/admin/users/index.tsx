import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import adminRoutes from '@/routes/admin';
import { dashboard as dashboardRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useLocale, useTrans } from '@/hooks/useTrans';
import { useMemo, useState } from 'react';

type UserRoleOption = {
    id: number;
    name: string;
};

type ProviderKeyOption = {
    id: number;
    label: string;
    provider?: string;
    model?: string;
};

type UserRecord = {
    id: number;
    name: string;
    email: string;
    plan?: string;
    planLabel?: string;
    roles: string[];
    defaults: {
        ai_provider_key_id: number | null;
        market_data_provider_key_id: number | null;
        news_provider_key_id: number | null;
        trading_provider_key_id: number | null;
        ai_provider_model_id: number | null;
    };
    keys: {
        ai: ProviderKeyOption[];
        market_data: ProviderKeyOption[];
        news: ProviderKeyOption[];
        trading: ProviderKeyOption[];
    };
};

type UsersPageProps = {
    users: UserRecord[];
    roles: UserRoleOption[];
};

const providerKeyLabels: Record<string, string> = {
    ai: 'AI provider key',
    market_data: 'Market data key',
    news: 'News key',
    trading: 'Trading key',
};

export default function UsersIndex({ users, roles }: UsersPageProps) {
    const t = useTrans();
    const locale = useLocale();
    const {
        props: { csrfToken, auth },
    } = usePage<{ csrfToken: string; auth: { permissions: string[] } }>();
    const permissions = auth?.permissions ?? [];
    const canManageUsers = permissions.includes('users.manage');
    const [selected, setSelected] = useState<UserRecord | null>(null);

    const rolesForm = useForm<{ roles: string[]; _token: string }>({
        roles: [],
        _token: csrfToken,
    });

    const defaultsForm = useForm({
        ai_provider_key_id: '',
        market_data_provider_key_id: '',
        news_provider_key_id: '',
        trading_provider_key_id: '',
        ai_provider_model_id: '',
        _token: csrfToken,
    });

    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => [
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
        ],
        [locale, t],
    );

    const handleSelect = (user: UserRecord) => {
        setSelected(user);
        rolesForm.setData({
            roles: user.roles.length > 0 ? [user.roles[0]] : [],
            _token: csrfToken,
        });
        defaultsForm.setData({
            ai_provider_key_id: user.defaults.ai_provider_key_id?.toString() ?? '',
            market_data_provider_key_id:
                user.defaults.market_data_provider_key_id?.toString() ?? '',
            news_provider_key_id:
                user.defaults.news_provider_key_id?.toString() ?? '',
            trading_provider_key_id:
                user.defaults.trading_provider_key_id?.toString() ?? '',
            ai_provider_model_id:
                user.defaults.ai_provider_model_id?.toString() ?? '',
            _token: csrfToken,
        });
        rolesForm.clearErrors();
        defaultsForm.clearErrors();
    };

    const handleRolesSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (!selected || !canManageUsers) {
            return;
        }

        rolesForm.setData('_token', csrfToken);

        rolesForm.put(
            adminRoutes.users.roles.update({
                locale,
                user: selected.id,
            }).url,
            {
                preserveScroll: true,
                onSuccess: () => rolesForm.clearErrors(),
            },
        );
    };

    const handleDefaultsSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (!selected || !canManageUsers) {
            return;
        }

        defaultsForm.transform((data) => ({
            _token: csrfToken,
            ai_provider_key_id: data.ai_provider_key_id || null,
            market_data_provider_key_id: data.market_data_provider_key_id || null,
            news_provider_key_id: data.news_provider_key_id || null,
            trading_provider_key_id: data.trading_provider_key_id || null,
            ai_provider_model_id: data.ai_provider_model_id || null,
        }));

    defaultsForm.put(
        adminRoutes.users.defaults.update({
            locale,
            user: selected.id,
        }).url,
        {
            preserveScroll: true,
            onSuccess: () => defaultsForm.clearErrors(),
            onFinish: () => defaultsForm.setData('_token', csrfToken),
        },
    );
    };

    const handleReset = () => {
        setSelected(null);
        rolesForm.reset();
        rolesForm.setData({
            roles: [],
            _token: csrfToken,
        });
        defaultsForm.reset();
        defaultsForm.setData({
            ai_provider_key_id: '',
            market_data_provider_key_id: '',
            news_provider_key_id: '',
            trading_provider_key_id: '',
            ai_provider_model_id: '',
            _token: csrfToken,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('User management')} />

            <section className="flex flex-1 flex-col gap-6 p-4">
                <header className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {t('User management')}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {t(
                            'Assign administrative roles and configure default provider keys for every user.',
                        )}
                    </p>
                </header>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,420px),1fr]">
                    <div className="overflow-hidden rounded-lg border border-sidebar-border/70 bg-card shadow-sm dark:border-sidebar-border">
                        <div className="border-b border-sidebar-border/60 bg-muted/40 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground dark:border-sidebar-border/50">
                            {t('Users')}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border/60 text-left text-sm">
                                <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">
                                            {t('Name')}
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            {t('Email')}
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            {t('Plan')}
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            {t('Roles')}
                                        </th>
                                        <th className="px-4 py-3 font-semibold text-right">
                                            {t('Actions')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/40">
                                    {users.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                {t('No users found.')}
                                            </td>
                                        </tr>
                                    )}
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-4 py-3 font-medium">
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                                    {user.planLabel || 'Free'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap gap-2">
                                                    {user.roles.length === 0 && (
                                                        <span className="rounded-full bg-muted px-2 py-1 text-xs">
                                                            {t('No roles')}
                                                        </span>
                                                    )}
                                                    {user.roles.map((role) => (
                                                        <span
                                                            key={`${user.id}-${role}`}
                                                            className="rounded-full bg-muted px-2 py-1 text-xs font-medium capitalize"
                                                        >
                                                            {role}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        type="button"
                                                        asChild
                                                    >
                                                        <a href={adminRoutes.users.plan.edit({ locale, user: user.id }).url}>
                                                            {t('Change Plan')}
                                                        </a>
                                                    </Button>
                                                    <Button
                                                        variant={
                                                            selected?.id === user.id
                                                                ? 'secondary'
                                                                : 'outline'
                                                        }
                                                        size="sm"
                                                        type="button"
                                                        onClick={() =>
                                                            selected?.id === user.id
                                                                ? handleReset()
                                                                : handleSelect(user)
                                                        }
                                                    >
                                                        {selected?.id === user.id
                                                            ? t('Close')
                                                            : t('Manage')}
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {!selected && (
                            <div className="rounded-lg border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                                {t(
                                    'Select a user from the list to edit their roles or default providers.',
                                )}
                            </div>
                        )}

                        {selected && (
                            <>
                                <form
                                    onSubmit={handleRolesSubmit}
                                    className="space-y-4 rounded-lg border border-sidebar-border/70 bg-card p-4 shadow-sm dark:border-sidebar-border"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <h2 className="text-base font-semibold">
                                                {t('Roles for :name', {
                                                    name: selected.name,
                                                })}
                                            </h2>
                                            <p className="text-xs text-muted-foreground">
                                                {t(
                                                    'Toggle the roles that should be assigned to this user.',
                                                )}
                                            </p>
                                        </div>
                                        {rolesForm.isDirty && canManageUsers && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => {
                                                    rolesForm.reset();
                                                rolesForm.setData({
                                                    roles:
                                                        selected.roles.length > 0
                                                            ? [selected.roles[0]]
                                                            : [],
                                                    _token: csrfToken,
                                                });
                                            }}
                                            >
                                                {t('Reset')}
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        {roles.map((roleOption) => {
                                            const checked =
                                                rolesForm.data.roles[0] ===
                                                roleOption.name;

                                            return (
                                                <label
                                                    key={roleOption.id}
                                                    className="flex items-center gap-2 text-sm"
                                                >
                                                    <input
                                                        type="radio"
                                                        className="h-4 w-4 rounded border border-input accent-foreground"
                                                        checked={checked}
                                                        disabled={!canManageUsers}
                                                        onChange={(event) => {
                                                            const roleName =
                                                                roleOption.name;
                                                            rolesForm.setData({
                                                                roles: event.target.checked
                                                                    ? [roleName]
                                                                    : [],
                                                                _token: csrfToken,
                                                            });
                                                        }}
                                                    />
                                                    <span className="capitalize">
                                                        {roleOption.name}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                        <InputError
                                            message={rolesForm.errors.roles}
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={!canManageUsers || rolesForm.processing}
                                        >
                                            {t('Save roles')}
                                        </Button>
                                    </div>
                                </form>

                                <form
                                    onSubmit={handleDefaultsSubmit}
                                    className="space-y-4 rounded-lg border border-sidebar-border/70 bg-card p-4 shadow-sm dark:border-sidebar-border"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <h2 className="text-base font-semibold">
                                                {t('Default providers')}
                                            </h2>
                                            <p className="text-xs text-muted-foreground">
                                                {t(
                                                    'Assign the preferred credential for each category.',
                                                )}
                                            </p>
                                        </div>
                                        {defaultsForm.isDirty && canManageUsers && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => {
                                                    defaultsForm.reset();
                                                    defaultsForm.setData({
                                                        ai_provider_key_id:
                                                            selected.defaults.ai_provider_key_id?.toString() ?? '',
                                                        market_data_provider_key_id:
                                                            selected.defaults.market_data_provider_key_id?.toString() ??
                                                            '',
                                                        news_provider_key_id:
                                                            selected.defaults.news_provider_key_id?.toString() ?? '',
                                                        trading_provider_key_id:
                                                            selected.defaults.trading_provider_key_id?.toString() ?? '',
                                                        ai_provider_model_id:
                                                            selected.defaults.ai_provider_model_id?.toString() ?? '',
                                                        _token: csrfToken,
                                                    });
                                                }}
                                            >
                                                {t('Reset')}
                                            </Button>
                                        )}
                                    </div>

                                    {Object.entries(selected.keys).map(
                                        ([key, options]) => (
                                            <div className="grid gap-2" key={key}>
                                                <Label htmlFor={`${key}_key`}>
                                                    {t(
                                                        providerKeyLabels[key] ?? key,
                                                    )}
                                                </Label>
                                                <select
                                                    id={`${key}_key`}
                                                    value={
                                                        defaultsForm.data[
                                                            `${key}_provider_key_id` as keyof typeof defaultsForm.data
                                                        ] as string
                                                    }
                                                    disabled={!canManageUsers}
                                                    onChange={(event) => {
                                                        if (!canManageUsers) {
                                                            return;
                                                        }

                                                        defaultsForm.setData(
                                                            `${key}_provider_key_id` as keyof typeof defaultsForm.data,
                                                            event.target.value,
                                                        );
                                                    }}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
                                                >
                                                    <option value="">
                                                        {t('None')}
                                                    </option>
                                                    {options.map((option) => (
                                                        <option
                                                            key={option.id}
                                                            value={option.id}
                                                        >
                                                            {option.label}
                                                            {option.provider
                                                                ? ` · ${option.provider}`
                                                                : ''}
                                                            {option.model
                                                                ? ` · ${option.model}`
                                                                : ''}
                                                        </option>
                                                    ))}
                                                </select>
                                                <InputError
                                                    message={
                                                        defaultsForm.errors[
                                                            `${key}_provider_key_id` as keyof typeof defaultsForm.errors
                                                        ]
                                                    }
                                                />
                                            </div>
                                        ),
                                    )}

                                    <div className="grid gap-2">
                                        <Label htmlFor="ai_provider_model_id">
                                            {t('AI model (optional id)')}
                                        </Label>
                                        <Input
                                            id="ai_provider_model_id"
                                            value={
                                                defaultsForm.data.ai_provider_model_id
                                            }
                                            disabled={!canManageUsers}
                                            onChange={(event) => {
                                                if (!canManageUsers) {
                                                    return;
                                                }

                                                defaultsForm.setData(
                                                    'ai_provider_model_id',
                                                    event.target.value,
                                                );
                                            }}
                                            placeholder={t('Model id')}
                                        />
                                        <InputError
                                            message={
                                                defaultsForm.errors
                                                    .ai_provider_model_id
                                            }
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <Button
                                            type="submit"
                                            disabled={!canManageUsers || defaultsForm.processing}
                                        >
                                            {t('Save defaults')}
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
