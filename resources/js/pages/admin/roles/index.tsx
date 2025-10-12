import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import adminRoutes from '@/routes/admin';
import { dashboard as dashboardRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useLocale, useTrans } from '@/hooks/useTrans';
import { useMemo, useState } from 'react';

type RoleRecord = {
    id: number;
    name: string;
    permissions: string[];
    is_protected: boolean;
};

type PermissionOption = {
    id: number;
    name: string;
};

type PageProps = {
    roles: RoleRecord[];
    permissions: PermissionOption[];
};

export default function RolesIndex({ roles, permissions }: PageProps) {
    const t = useTrans();
    const locale = useLocale();
    const {
        props: { csrfToken },
    } = usePage<{ csrfToken: string }>();
    const [editing, setEditing] = useState<RoleRecord | null>(null);

    const initialFormState = useMemo(
        () => ({
            name: '',
            permissions: [] as string[],
            _token: csrfToken,
        }),
        [csrfToken],
    );

    const form = useForm(initialFormState);

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
                title: t('Roles'),
                href: adminRoutes.roles.index({ locale }).url,
            },
        ],
        [locale, t],
    );

    const isEditing = editing !== null;

    const resetForm = () => {
        setEditing(null);
        form.reset();
        form.setData(initialFormState);
        form.clearErrors();
    };

    const handleEdit = (role: RoleRecord) => {
        setEditing(role);
        form.setData({
            name: role.name,
            permissions: [...role.permissions],
            _token: csrfToken,
        });
        form.clearErrors();
    };

    const togglePermission = (permission: string) => {
        const current = form.data.permissions;

        if (current.includes(permission)) {
            form.setData(
                'permissions',
                current.filter((item) => item !== permission),
            );

            return;
        }

        form.setData('permissions', [...current, permission]);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        form.transform((data) => ({
            ...data,
            permissions: data.permissions,
            _token: csrfToken,
        }));

        const afterSuccess = () => {
            router.reload({ only: ['roles'] });
            resetForm();
        };

        if (isEditing) {
            form.put(
                adminRoutes.roles.update({
                    locale,
                    role: editing!.id,
                }).url,
                {
                    preserveScroll: true,
                    onSuccess: afterSuccess,
                    onFinish: () =>
                        form.transform((data) => ({
                            ...data,
                            _token: csrfToken,
                        })),
                },
            );

            return;
        }

        form.post(adminRoutes.roles.store({ locale }).url, {
            preserveScroll: true,
            onSuccess: afterSuccess,
            onFinish: () =>
                form.transform((data) => ({
                    ...data,
                    _token: csrfToken,
                })),
        });
    };

    const handleDelete = (role: RoleRecord) => {
        if (role.is_protected) {
            return;
        }

        if (
            !window.confirm(
                t('Delete role ":name"?', {
                    name: role.name,
                }),
            )
        ) {
            return;
        }

        router.delete(
            adminRoutes.roles.destroy({
                locale,
                role: role.id,
            }).url,
            {
                data: { _token: csrfToken },
                preserveScroll: true,
                onSuccess: () => {
                    if (editing?.id === role.id) {
                        resetForm();
                    }
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Role management')} />

            <section className="flex flex-1 flex-col gap-6 p-4">
                <header className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {t('Role management')}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {t(
                            'Create roles and assign permissions that control access to management features.',
                        )}
                    </p>
                </header>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,420px),1fr]">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 rounded-lg border border-sidebar-border/70 bg-card p-4 shadow-sm dark:border-sidebar-border"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h2 className="text-base font-semibold">
                                    {isEditing
                                        ? t('Edit role')
                                        : t('Create role')}
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    {isEditing
                                        ? t(
                                              'Update the name and permissions assigned to this role.',
                                          )
                                        : t(
                                              'Define a role and choose the permissions it should grant.',
                                          )}
                                </p>
                            </div>
                            {isEditing && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={resetForm}
                                >
                                    {t('Cancel')}
                                </Button>
                            )}
                        </div>

                        <div className="grid gap-3">
                            <div className="grid gap-2">
                                <Label htmlFor="name">{t('Name')}</Label>
                                <Input
                                    id="name"
                                    value={form.data.name}
                                    onChange={(event) =>
                                        form.setData('name', event.target.value)
                                    }
                                    placeholder={t('Role name')}
                                />
                                <InputError message={form.errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <span className="text-sm font-semibold">
                                    {t('Permissions')}
                                </span>
                                {permissions.length === 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        {t('No permissions defined yet.')}
                                    </p>
                                )}
                                <div className="grid gap-2">
                                    {permissions.map((permission) => (
                                        <label
                                            key={permission.id}
                                            className="flex items-center gap-2 text-sm"
                                        >
                                            <Checkbox
                                                checked={form.data.permissions.includes(
                                                    permission.name,
                                                )}
                                                onCheckedChange={() =>
                                                    togglePermission(
                                                        permission.name,
                                                    )
                                                }
                                            />
                                            <span>{permission.name}</span>
                                        </label>
                                    ))}
                                </div>
                                <InputError
                                    message={form.errors.permissions}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button type="submit" disabled={form.processing}>
                                {isEditing ? t('Save changes') : t('Create')}
                            </Button>
                        </div>
                    </form>

                    <div className="overflow-hidden rounded-lg border border-sidebar-border/70 bg-card shadow-sm dark:border-sidebar-border">
                        <div className="border-b border-sidebar-border/60 bg-muted/40 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground dark:border-sidebar-border/50">
                            {t('Existing roles')}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border/60 text-left text-sm">
                                <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">
                                            {t('Name')}
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            {t('Permissions')}
                                        </th>
                                        <th className="px-4 py-3 font-semibold text-right">
                                            {t('Actions')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/40">
                                    {roles.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                {t(
                                                    'No roles have been created yet.',
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                    {roles.map((role) => (
                                        <tr key={role.id}>
                                            <td className="px-4 py-3 font-medium">
                                                {role.name}
                                                {role.is_protected && (
                                                    <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                                        {t('Protected')}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap gap-2">
                                                    {role.permissions.length ===
                                                    0 ? (
                                                        <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                                                            {t(
                                                                'No permissions',
                                                            )}
                                                        </span>
                                                    ) : (
                                                        role.permissions.map(
                                                            (permission) => (
                                                                <span
                                                                    key={`${role.id}-${permission}`}
                                                                    className="rounded-full bg-muted px-2 py-1 text-xs font-medium"
                                                                >
                                                                    {
                                                                        permission
                                                                    }
                                                                </span>
                                                            ),
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(role)
                                                        }
                                                    >
                                                        {t('Edit')}
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(role)
                                                        }
                                                        disabled={
                                                            role.is_protected
                                                        }
                                                    >
                                                        {t('Delete')}
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
