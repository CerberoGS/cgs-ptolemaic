import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useTrans, useLocale } from '@/hooks/useTrans';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Copy, ExternalLink, Plus, Search } from 'lucide-react';
import { useState } from 'react';

type InvitationStatus = {
    value: string;
    label: string;
    color: string;
};

type TargetPlan = {
    value: string;
    label: string;
    emoji: string;
};

type Invitation = {
    id: number;
    code: string;
    name: string;
    description: string | null;
    target_plan: TargetPlan;
    price_monthly: string | null;
    discount_percent: number;
    trial_duration_days: number | null;
    usage_limit: number | null;
    usage_count: number;
    redemptions_count: number;
    available_redemptions: string | number;
    expires_at: string | null;
    status: InvitationStatus;
    creator: { name: string; email: string } | null;
    referred_by: string | null;
    created_at: string;
    is_valid: boolean;
};

type Props = {
    invitations: {
        data: Invitation[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: {
        search?: string;
        status?: string;
        target_plan?: string;
    };
};

export default function InvitationsIndex({ invitations, filters }: Props) {
    const t = useTrans();
    const locale = useLocale();
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            `/${locale}/admin/invitations`,
            { search },
            { preserveState: true, replace: true }
        );
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const getStatusBadge = (status: InvitationStatus) => {
        const colorMap: Record<string, string> = {
            green: 'bg-green-500/10 text-green-600 dark:text-green-400',
            gray: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
            red: 'bg-red-500/10 text-red-600 dark:text-red-400',
        };

        return (
            <Badge variant="secondary" className={colorMap[status.color] || ''}>
                {status.label}
            </Badge>
        );
    };

    return (
        <AppSidebarLayout>
            <Head title={t('Invitations')} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('Invitations')}</h1>
                        <p className="mt-2 text-muted-foreground">
                            {t('Manage invitation codes and track redemptions')}
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={`/${locale}/admin/invitations/create`}>
                            <Plus className="mr-2 size-4" />
                            {t('Create Invitation')}
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('Search')}</CardTitle>
                        <CardDescription>{t('Filter invitations by name or code')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder={t('Search invitations...')}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button type="submit">{t('Search')}</Button>
                            {filters.search && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setSearch('');
                                        router.get(`/${locale}/admin/invitations`, {}, { preserveState: true });
                                    }}
                                >
                                    {t('Clear')}
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('Code')}</TableHead>
                                    <TableHead>{t('Name')}</TableHead>
                                    <TableHead>{t('Target Plan')}</TableHead>
                                    <TableHead className="text-center">{t('Redemptions')}</TableHead>
                                    <TableHead className="text-center">{t('Available')}</TableHead>
                                    <TableHead>{t('Status')}</TableHead>
                                    <TableHead className="text-right">{t('Actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invitations.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            {t('No invitations found')}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    invitations.data.map((invitation) => (
                                        <TableRow key={invitation.id}>
                                            <TableCell className="font-mono">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold">{invitation.code}</span>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="size-6 p-0"
                                                        onClick={() => copyToClipboard(invitation.code)}
                                                    >
                                                        <Copy className="size-3" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{invitation.name}</div>
                                                    {invitation.description && (
                                                        <div className="text-sm text-muted-foreground">
                                                            {invitation.description.substring(0, 50)}...
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span>{invitation.target_plan.emoji}</span>
                                                    <span>{invitation.target_plan.label}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {invitation.redemptions_count}
                                                {invitation.usage_limit && ` / ${invitation.usage_limit}`}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline">
                                                    {invitation.available_redemptions}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(invitation.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        asChild
                                                    >
                                                        <a
                                                            href={`${window.location.origin}/invite/${invitation.code}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <ExternalLink className="size-4" />
                                                        </a>
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        asChild
                                                    >
                                                        <Link href={`/${locale}/admin/invitations/${invitation.id}`}>
                                                            {t('View')}
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Pagination */}
                {invitations.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {invitations.links.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppSidebarLayout>
    );
}

