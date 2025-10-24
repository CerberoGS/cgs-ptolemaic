import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTrans } from '@/hooks/useTrans';
import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';

type Feedback = {
    id: number;
    type: string;
    typeLabel: string;
    typeIcon: string;
    typeColor: string;
    status: string;
    statusLabel: string;
    statusColor: string;
    priority: string;
    priorityLabel: string;
    priorityColor: string;
    subject: string;
    message: string;
    url: string | null;
    screenshot: string | null;
    user: {
        id: number;
        name: string;
        email: string;
    } | null;
    created_at: string;
    created_at_full: string;
};

type Props = {
    feedbacks: {
        data: Feedback[];
    };
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        type?: string;
        status?: string;
        priority?: string;
        search?: string;
    };
    types: Array<{ value: string; label: string; icon: string }>;
    statuses: Array<{ value: string; label: string }>;
    priorities: Array<{ value: string; label: string }>;
};

export default function FeedbackIndex({ feedbacks, pagination, filters, types, statuses, priorities }: Props) {
    const t = useTrans();
    const { props } = usePage();
    const locale = (props as { locale?: string }).locale || 'en';

    const [search, setSearch] = useState(filters.search || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || 'all');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [priorityFilter, setPriorityFilter] = useState(filters.priority || 'all');

    const handleFilter = () => {
        router.get(
            `/${locale}/admin/feedback`,
            {
                search: search || undefined,
                type: typeFilter !== 'all' ? typeFilter : undefined,
                status: statusFilter !== 'all' ? statusFilter : undefined,
                priority: priorityFilter !== 'all' ? priorityFilter : undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const breadcrumbs = [
        { label: t('Admin'), href: '#' },
        { label: t('Feedback'), href: `/${locale}/admin/feedback` },
    ];

    const getColorClasses = (color: string) => {
        const colorMap: Record<string, string> = {
            red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
            blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
            yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
            green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
            orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
            gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100',
        };
        return colorMap[color] || colorMap.gray;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Feedback Management')} />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{t('Feedback Management')}</h1>
                        <p className="text-muted-foreground">{t('View and manage user feedback')}</p>
                    </div>
                    <Badge variant="outline" className="text-lg">
                        {pagination.total} {t('total')}
                    </Badge>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('Filters')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                            <div className="space-y-2">
                                <Label>{t('Search')}</Label>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder={t('Search subject or message...')}
                                        className="pl-8"
                                        onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>{t('Type')}</Label>
                                <Select value={typeFilter} onValueChange={setTypeFilter}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">{t('All Types')}</SelectItem>
                                        {types.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.icon} {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>{t('Status')}</Label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">{t('All Statuses')}</SelectItem>
                                        {statuses.map((status) => (
                                            <SelectItem key={status.value} value={status.value}>
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>{t('Priority')}</Label>
                                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">{t('All Priorities')}</SelectItem>
                                        {priorities.map((priority) => (
                                            <SelectItem key={priority.value} value={priority.value}>
                                                {priority.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-end">
                                <Button onClick={handleFilter} className="w-full">
                                    {t('Apply Filters')}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Feedback List */}
                <div className="space-y-3">
                    {feedbacks.data.length === 0 ? (
                        <Card>
                            <CardContent className="flex min-h-[200px] items-center justify-center">
                                <p className="text-muted-foreground">{t('No feedback found.')}</p>
                            </CardContent>
                        </Card>
                    ) : (
                        feedbacks.data.map((feedback) => (
                            <Card key={feedback.id} className="transition-shadow hover:shadow-md">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Badge className={getColorClasses(feedback.typeColor)}>
                                                    {feedback.typeIcon} {feedback.typeLabel}
                                                </Badge>
                                                <Badge className={getColorClasses(feedback.statusColor)}>
                                                    {feedback.statusLabel}
                                                </Badge>
                                                <Badge className={getColorClasses(feedback.priorityColor)}>
                                                    {feedback.priorityLabel}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">{feedback.created_at}</span>
                                            </div>

                                            <h3 className="font-semibold">{feedback.subject}</h3>
                                            <p className="line-clamp-2 text-sm text-muted-foreground">{feedback.message}</p>

                                            <div className="flex items-center gap-4 text-sm">
                                                {feedback.user && (
                                                    <span className="text-muted-foreground">
                                                        👤 {feedback.user.name} ({feedback.user.email})
                                                    </span>
                                                )}
                                                {feedback.url && (
                                                    <a
                                                        href={feedback.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 text-primary hover:underline"
                                                    >
                                                        <ExternalLink className="h-3 w-3" />
                                                        {t('View Page')}
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <Link href={`/${locale}/admin/feedback/${feedback.id}`}>
                                            <Button variant="outline" size="sm">
                                                {t('View Details')}
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {pagination.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === pagination.current_page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => {
                                    router.get(
                                        `/${locale}/admin/feedback`,
                                        {
                                            page,
                                            search: search || undefined,
                                            type: typeFilter !== 'all' ? typeFilter : undefined,
                                            status: statusFilter !== 'all' ? statusFilter : undefined,
                                            priority: priorityFilter !== 'all' ? priorityFilter : undefined,
                                        },
                                        {
                                            preserveState: true,
                                        }
                                    );
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

