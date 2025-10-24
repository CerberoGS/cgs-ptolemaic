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

type ProviderRecord = {
    id: number;
    type: string;
    slug: string;
    display_name: string;
    description?: string | null;
    base_url?: string | null;
    docs_url?: string | null;
    verification_endpoint?: string | null;
    status: string;
    requires_organization?: boolean;
    supports_historical?: boolean;
    webhook_support?: boolean;
    supports_paper_trading?: boolean;
    requires_two_factor?: boolean;
    data_frequency?: string | null;
    rate_limit_per_minute?: number | null;
    category_filters?: unknown;
    language_support?: unknown;
    market_types?: unknown;
    test_json?: unknown;
    ops_json?: unknown;
};

type PageProps = {
    providers: ProviderRecord[];
    meta: { statuses: string[] };
};

const providerDefaults = {
    type: 'ai',
    slug: '',
    display_name: '',
    description: '',
    base_url: '',
    docs_url: '',
    verification_endpoint: '',
    status: 'active',
    requires_organization: false,
    supports_historical: false,
    webhook_support: false,
    supports_paper_trading: false,
    requires_two_factor: false,
    data_frequency: '',
    rate_limit_per_minute: '',
    category_filters: '[]',
    language_support: '[]',
    market_types: '[]',
    test_json: '[]',
    ops_json: '[]',
} as const;

const PROVIDER_TYPES: Record<string, string> = {
    ai: 'AI',
    market_data: 'Market data',
    news: 'News',
    trading: 'Trading',
};

const BOOLEAN_FIELDS: Record<string, Record<string, string>> = {
    ai: { requires_organization: 'Requires organization id' },
    market_data: { supports_historical: 'Supports historical data' },
    news: { webhook_support: 'Supports webhooks' },
    trading: {
        supports_paper_trading: 'Supports paper trading',
        requires_two_factor: 'Requires two-factor authentication',
    },
};

const ARRAY_FIELDS: Record<string, Record<string, string>> = {
    market_data: {
        data_frequency: 'Data frequency',
        rate_limit_per_minute: 'Rate limit per minute',
    },
    news: {
        category_filters: 'Category filters (JSON array)',
        language_support: 'Language support (JSON array)',
    },
    trading: {
        market_types: 'Market types (JSON array)',
    },
};

const JSON_FIELDS: Record<string, string> = {
    test_json: 'Test payload (JSON)',
    ops_json: 'Operations payload (JSON)',
};

function stringify(value: unknown): string {
    if (value === null || value === undefined) {
        return '';
    }

    if (typeof value === 'string') {
        return value;
    }

    return JSON.stringify(value, null, 2);
}

function parseJson(value: unknown): unknown {
    if (typeof value !== 'string') {
        return value;
    }

    if (value.trim() === '') {
        return null;
    }

    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}

export default function ProvidersIndex({
    providers,
    meta,
}: PageProps) {
    const t = useTrans();
    const locale = useLocale();
    const { props } = usePage<{ csrfToken: string }>();
    const csrfToken = props.csrfToken;
    const statuses = meta.statuses ?? ['active', 'inactive', 'deprecated'];
    const [editing, setEditing] = useState<ProviderRecord | null>(null);
    const initialFormState = useMemo(
        () => ({
            ...providerDefaults,
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
                title: t('Providers'),
                href: adminRoutes.providers.index({ locale }).url,
            },
        ],
        [locale, t],
    );

    const isEditing = editing !== null;

    const resetForm = () => {
        setEditing(null);
        form.reset();
        form.setData('_token', csrfToken);
        form.clearErrors();
    };

    const handleEdit = (provider: ProviderRecord) => {
        setEditing(provider);
        form.setData({
            type: provider.type,
            slug: provider.slug,
            display_name: provider.display_name,
            description: provider.description ?? '',
            base_url: provider.base_url ?? '',
            docs_url: provider.docs_url ?? '',
            verification_endpoint: provider.verification_endpoint ?? '',
            status: provider.status ?? 'active',
            requires_organization: Boolean(provider.requires_organization),
            supports_historical: Boolean(provider.supports_historical),
            webhook_support: Boolean(provider.webhook_support),
            supports_paper_trading: Boolean(provider.supports_paper_trading),
            requires_two_factor: Boolean(provider.requires_two_factor),
            data_frequency: provider.data_frequency ?? '',
            rate_limit_per_minute:
                provider.rate_limit_per_minute?.toString() ?? '',
            category_filters: stringify(provider.category_filters ?? []),
            language_support: stringify(provider.language_support ?? []),
            market_types: stringify(provider.market_types ?? []),
            test_json: stringify(provider.test_json ?? []),
            ops_json: stringify(provider.ops_json ?? []),
            _token: csrfToken,
        });
        form.clearErrors();
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        form.transform((data) => {
            const trimmedFrequency = data.data_frequency.trim();
            const trimmedRateLimit = data.rate_limit_per_minute.trim();
            const parsedRateLimit =
                trimmedRateLimit === ''
                    ? null
                    : Number.parseInt(trimmedRateLimit, 10);

            return {
                ...data,
                data_frequency: trimmedFrequency === '' ? null : trimmedFrequency,
                rate_limit_per_minute: Number.isNaN(parsedRateLimit)
                    ? null
                    : parsedRateLimit,
                category_filters: parseJson(data.category_filters),
                language_support: parseJson(data.language_support),
                market_types: parseJson(data.market_types),
                test_json: parseJson(data.test_json),
                ops_json: parseJson(data.ops_json),
                _token: csrfToken,
            };
        });

        const afterSuccess = () => {
            router.reload({ only: ['providers'] });
            resetForm();
        };

        if (editing) {
            form.put(
                adminRoutes.providers.update({
                    locale,
                    type: editing.type,
                    provider: editing.id,
                }).url,
                {
                    preserveScroll: true,
                    onSuccess: afterSuccess,
                    onFinish: () => form.transform((data) => ({ ...data, _token: csrfToken })),
                },
            );
        } else {
            form.post(adminRoutes.providers.store({ locale }).url, {
                preserveScroll: true,
                onSuccess: afterSuccess,
                onFinish: () => form.transform((data) => ({ ...data, _token: csrfToken })),
            });
        }
    };

    const handleDelete = (provider: ProviderRecord) => {
        if (
            !window.confirm(
                t('Delete provider ":name"?', { name: provider.display_name }),
            )
        ) {
            return;
        }

        router.delete(
            adminRoutes.providers.destroy({
                locale,
                type: provider.type,
                provider: provider.id,
            }).url,
            {
                data: { _token: csrfToken },
                preserveScroll: true,
                onSuccess: () => {
                    if (editing?.id === provider.id) {
                        resetForm();
                    }
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Provider management')} />

            <section className="flex flex-1 flex-col gap-6 p-4">
                <header className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {t('Provider management')}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {t(
                            'Configure provider entries that will be visibles for your users.',
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
                                        ? t('Edit provider')
                                        : t('Create provider')}
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    {isEditing
                                        ? t('Update the fields and save changes.')
                                        : t('Complete the form to register a provider.')}
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
                                <Label htmlFor="type">{t('Type')}</Label>
                                <select
                                    id="type"
                                    value={form.data.type}
                                    disabled={isEditing}
                                    onChange={(event) =>
                                        form.setData('type', event.target.value)
                                    }
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
                                >
                                    {Object.entries(PROVIDER_TYPES).map(
                                        ([value, label]) => (
                                            <option key={value} value={value}>
                                                {t(label)}
                                            </option>
                                        ),
                                    )}
                                </select>
                                <InputError message={form.errors.type} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="slug">{t('Identifier')}</Label>
                                <Input
                                    id="slug"
                                    value={form.data.slug}
                                    onChange={(event) =>
                                        form.setData('slug', event.target.value)
                                    }
                                    placeholder={t('unique-slug')}
                                />
                                <InputError message={form.errors.slug} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="display_name">
                                    {t('Display name')}
                                </Label>
                                <Input
                                    id="display_name"
                                    value={form.data.display_name}
                                    onChange={(event) =>
                                        form.setData(
                                            'display_name',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={form.errors.display_name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="status">{t('Status')}</Label>
                                <select
                                    id="status"
                                    value={form.data.status}
                                    onChange={(event) =>
                                        form.setData(
                                            'status',
                                            event.target.value,
                                        )
                                    }
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
                                >
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>
                                            {t(status)}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={form.errors.status} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">
                                    {t('Description')}
                                </Label>
                                <textarea
                                    id="description"
                                    value={form.data.description}
                                    onChange={(event) =>
                                        form.setData(
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                    rows={3}
                                    className="flex h-auto w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
                                />
                                <InputError message={form.errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="base_url">{t('Base URL')}</Label>
                                <Input
                                    id="base_url"
                                    value={form.data.base_url}
                                    onChange={(event) =>
                                        form.setData(
                                            'base_url',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError message={form.errors.base_url} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="docs_url">
                                    {t('Documentation URL')}
                                </Label>
                                <Input
                                    id="docs_url"
                                    value={form.data.docs_url}
                                    onChange={(event) =>
                                        form.setData(
                                            'docs_url',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError message={form.errors.docs_url} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="verification_endpoint">
                                    {t('Verification endpoint')}
                                </Label>
                                <Input
                                    id="verification_endpoint"
                                    value={form.data.verification_endpoint}
                                    onChange={(event) =>
                                        form.setData(
                                            'verification_endpoint',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={form.errors.verification_endpoint}
                                />
                            </div>

                            {Object.entries(
                                BOOLEAN_FIELDS[form.data.type] ?? {},
                            ).map(([field, label]) => (
                                <label
                                    key={field}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <Checkbox
                                        checked={Boolean(form.data[field as keyof typeof form.data])}
                                        onCheckedChange={(checked) =>
                                            form.setData(
                                                field as keyof typeof form.data,
                                                Boolean(checked),
                                            )
                                        }
                                    />
                                    <span>{t(label)}</span>
                                </label>
                            ))}

                            {Object.entries(
                                ARRAY_FIELDS[form.data.type] ?? {},
                            ).map(([field, label]) => (
                                <div className="grid gap-2" key={field}>
                                    <Label htmlFor={field}>{t(label)}</Label>
                                    <textarea
                                        id={field}
                                        value={
                                            form.data[
                                                field as keyof typeof form.data
                                            ] as string
                                        }
                                        onChange={(event) =>
                                            form.setData(
                                                field as keyof typeof form.data,
                                                event.target.value,
                                            )
                                        }
                                        rows={2}
                                        className="flex h-auto w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
                                    />
                                    <InputError
                                        message={form.errors[field as keyof typeof form.errors]}
                                    />
                                </div>
                            ))}

                            {Object.entries(JSON_FIELDS).map(([field, label]) => (
                                <div className="grid gap-2" key={field}>
                                    <Label htmlFor={field}>{t(label)}</Label>
                                    <textarea
                                        id={field}
                                        value={
                                            form.data[
                                                field as keyof typeof form.data
                                            ] as string
                                        }
                                        onChange={(event) =>
                                            form.setData(
                                                field as keyof typeof form.data,
                                                event.target.value,
                                            )
                                        }
                                        rows={3}
                                        className="flex h-auto w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
                                    />
                                    <InputError
                                        message={form.errors[field as keyof typeof form.errors]}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button type="submit" disabled={form.processing}>
                                {isEditing ? t('Save changes') : t('Create')}
                            </Button>
                        </div>
                    </form>

                    <div className="overflow-hidden rounded-lg border border-sidebar-border/70 bg-card shadow-sm dark:border-sidebar-border">
                        <div className="border-b border-sidebar-border/60 bg-muted/40 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground dark:border-sidebar-border/50">
                            {t('Registered providers')}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border/60 text-left text-sm">
                                <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">
                                            {t('Name')}
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            {t('Type')}
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            {t('Status')}
                                        </th>
                                        <th className="px-4 py-3 font-semibold text-right">
                                            {t('Actions')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/40">
                                    {providers.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                {t('No providers yet.')}
                                            </td>
                                        </tr>
                                    )}
                                    {providers.map((provider) => (
                                        <tr key={`${provider.type}-${provider.id}`}>
                                            <td className="px-4 py-3 font-medium">
                                                <div className="flex flex-col">
                                                    <span>{provider.display_name}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {provider.slug}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 capitalize">
                                                {t(
                                                    PROVIDER_TYPES[provider.type] ??
                                                        provider.type,
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium capitalize">
                                                    {t(provider.status)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        type="button"
                                                        onClick={() => handleEdit(provider)}
                                                    >
                                                        {t('Edit')}
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        type="button"
                                                        onClick={() => handleDelete(provider)}
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





