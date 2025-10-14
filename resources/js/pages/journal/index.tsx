import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { JournalCharts } from '@/components/journal-charts';
import AppLayout from '@/layouts/app-layout';
import journalRoutes from '@/routes/journal';
import { dashboard as dashboardRoute } from '@/routes';
import { type BreadcrumbItem, type PaginatedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useLocale, useTrans } from '@/hooks/useTrans';
import { Plus, TrendingUp, TrendingDown, Activity, DollarSign, Download, FileText } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type JournalEntry = {
    id: number;
    symbol: string;
    direction: string;
    asset_type: string;
    entry_price: string;
    exit_price: string | null;
    quantity: string;
    pnl: string | null;
    pnl_percentage: string | null;
    setup_type: string | null;
    trade_date: string;
    is_closed: boolean;
    is_profitable: boolean | null;
};

type Stats = {
    total_trades: number;
    win_rate: number;
    total_pnl: number;
    avg_win: number;
    avg_loss: number;
    pnl_timeline: Array<{ date: string; pnl: number }>;
    asset_distribution: Array<{ name: string; value: number; pnl: number }>;
    win_loss_distribution: Array<{ name: string; value: number; fill: string }>;
};

type Filters = {
    asset_type?: string;
    setup_type?: string;
    status?: string;
    date_from?: string;
    date_to?: string;
};

type JournalIndexProps = {
    entries: PaginatedData<JournalEntry>;
    stats: Stats;
    filters: Filters;
};

export default function JournalIndex({ entries, stats, filters }: JournalIndexProps) {
    const t = useTrans();
    const locale = useLocale();
    const pageTitle = t('Trading Journal');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Dashboard'),
            href: dashboardRoute({ locale }).url,
        },
        {
            title: pageTitle,
            href: journalRoutes.index({ locale }).url,
        },
    ];

    const [localFilters, setLocalFilters] = useState<Filters>(filters);

    const handleFilterChange = (key: keyof Filters, value: string) => {
        setLocalFilters((prev) => ({ ...prev, [key]: value }));
    };

    const applyFilters: FormEventHandler = (e) => {
        e.preventDefault();
        router.get(journalRoutes.index({ locale }).url, localFilters as any, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({});
        router.get(journalRoutes.index({ locale }).url);
    };

    const formatCurrency = (value: number | string | null) => {
        if (value === null) {
            return '-';
        }
        const num = typeof value === 'string' ? parseFloat(value) : value;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(num);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
                        <p className="text-muted-foreground">
                            {t('Track and analyze your trading performance')}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <a href={journalRoutes.export.csv({ locale, ...filters }).url}>
                                <Download className="mr-2 h-4 w-4" />
                                {t('Export CSV')}
                            </a>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href={journalRoutes.export.pdf({ locale, ...filters }).url}>
                                <FileText className="mr-2 h-4 w-4" />
                                {t('Export PDF')}
                            </a>
                        </Button>
                        <Button asChild>
                            <Link href={journalRoutes.create({ locale }).url}>
                                <Plus className="mr-2 h-4 w-4" />
                                {t('New Entry')}
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t('Total Trades')}
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_trades}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t('Win Rate')}
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.win_rate}%</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t('Total P&L')}
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div
                                className={`text-2xl font-bold ${
                                    stats.total_pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                }`}
                            >
                                {formatCurrency(stats.total_pnl)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t('Avg Win')}
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(stats.avg_win)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t('Avg Loss')}
                            </CardTitle>
                            <TrendingDown className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {formatCurrency(stats.avg_loss)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <JournalCharts
                    pnlTimeline={stats.pnl_timeline}
                    assetDistribution={stats.asset_distribution}
                    winLossDistribution={stats.win_loss_distribution}
                />

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('Filters')}</CardTitle>
                        <CardDescription>
                            {t('Filter your trading journal entries')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={applyFilters} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                                <div className="space-y-2">
                                    <Label htmlFor="asset_type">{t('Asset Type')}</Label>
                                    <Select
                                        value={localFilters.asset_type || 'all'}
                                        onValueChange={(value) =>
                                            handleFilterChange('asset_type', value === 'all' ? '' : value)
                                        }
                                    >
                                        <SelectTrigger id="asset_type">
                                            <SelectValue placeholder={t('All')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">{t('All')}</SelectItem>
                                            <SelectItem value="stock">{t('Stock')}</SelectItem>
                                            <SelectItem value="forex">{t('Forex')}</SelectItem>
                                            <SelectItem value="crypto">{t('Crypto')}</SelectItem>
                                            <SelectItem value="option">{t('Option')}</SelectItem>
                                            <SelectItem value="future">{t('Future')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">{t('Status')}</Label>
                                    <Select
                                        value={localFilters.status || 'all'}
                                        onValueChange={(value) => handleFilterChange('status', value === 'all' ? '' : value)}
                                    >
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder={t('All')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">{t('All')}</SelectItem>
                                            <SelectItem value="open">{t('Open')}</SelectItem>
                                            <SelectItem value="closed">{t('Closed')}</SelectItem>
                                            <SelectItem value="profitable">
                                                {t('Profitable')}
                                            </SelectItem>
                                            <SelectItem value="losing">{t('Losing')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date_from">{t('From Date')}</Label>
                                    <Input
                                        id="date_from"
                                        type="date"
                                        value={localFilters.date_from || ''}
                                        onChange={(e) =>
                                            handleFilterChange('date_from', e.target.value)
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date_to">{t('To Date')}</Label>
                                    <Input
                                        id="date_to"
                                        type="date"
                                        value={localFilters.date_to || ''}
                                        onChange={(e) => handleFilterChange('date_to', e.target.value)}
                                    />
                                </div>

                                <div className="flex items-end space-x-2">
                                    <Button type="submit" className="flex-1">
                                        {t('Apply')}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={clearFilters}
                                        className="flex-1"
                                    >
                                        {t('Clear')}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Entries Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('Trading History')}</CardTitle>
                        <CardDescription>
                            {t('A comprehensive list of all your trades')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {entries.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Activity className="mb-4 h-12 w-12 text-muted-foreground" />
                                <h3 className="mb-2 text-lg font-semibold">
                                    {t('No entries yet')}
                                </h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    {t('Start tracking your trades to see them here')}
                                </p>
                                <Button asChild>
                                    <Link href={journalRoutes.create({ locale }).url}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        {t('Create First Entry')}
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-3 text-left font-semibold">
                                                {t('Date')}
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold">
                                                {t('Symbol')}
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold">
                                                {t('Type')}
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold">
                                                {t('Direction')}
                                            </th>
                                            <th className="px-4 py-3 text-right font-semibold">
                                                {t('Entry')}
                                            </th>
                                            <th className="px-4 py-3 text-right font-semibold">
                                                {t('Exit')}
                                            </th>
                                            <th className="px-4 py-3 text-right font-semibold">
                                                {t('Quantity')}
                                            </th>
                                            <th className="px-4 py-3 text-right font-semibold">
                                                {t('P&L')}
                                            </th>
                                            <th className="px-4 py-3 text-right font-semibold">
                                                {t('Actions')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {entries.data.map((entry) => (
                                            <tr
                                                key={entry.id}
                                                className="border-b hover:bg-muted/50"
                                            >
                                                <td className="px-4 py-3 text-sm">
                                                    {formatDate(entry.trade_date)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Link
                                                        href={
                                                            journalRoutes.show({
                                                                locale,
                                                                journal: entry.id,
                                                            }).url
                                                        }
                                                        className="font-medium hover:underline"
                                                    >
                                                        {entry.symbol}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge variant="outline" className="capitalize">
                                                        {entry.asset_type}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge
                                                        variant={
                                                            entry.direction === 'long'
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                        className="capitalize"
                                                    >
                                                        {entry.direction}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-right text-sm">
                                                    {formatCurrency(entry.entry_price)}
                                                </td>
                                                <td className="px-4 py-3 text-right text-sm">
                                                    {entry.exit_price
                                                        ? formatCurrency(entry.exit_price)
                                                        : '-'}
                                                </td>
                                                <td className="px-4 py-3 text-right text-sm">
                                                    {entry.quantity}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    {entry.pnl !== null ? (
                                                        <span
                                                            className={`font-semibold ${
                                                                entry.is_profitable
                                                                    ? 'text-green-600 dark:text-green-400'
                                                                    : 'text-red-600 dark:text-red-400'
                                                            }`}
                                                        >
                                                            {formatCurrency(entry.pnl)}
                                                            {entry.pnl_percentage && (
                                                                <span className="ml-1 text-xs">
                                                                    (
                                                                    {parseFloat(
                                                                        entry.pnl_percentage
                                                                    ).toFixed(2)}
                                                                    %)
                                                                </span>
                                                            )}
                                                        </span>
                                                    ) : (
                                                        <Badge>{t('Open')}</Badge>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link
                                                                href={
                                                                    journalRoutes.edit({
                                                                        locale,
                                                                        journal: entry.id,
                                                                    }).url
                                                                }
                                                            >
                                                                {t('Edit')}
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination */}
                                {entries.links && entries.links.length > 3 && (
                                    <div className="mt-4 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground">
                                            {t('Showing')} {entries.from} {t('to')} {entries.to}{' '}
                                            {t('of')} {entries.total} {t('entries')}
                                        </p>
                                        <div className="flex gap-2">
                                            {entries.links.map((link, index) => (
                                                <Button
                                                    key={index}
                                                    variant={link.active ? 'default' : 'outline'}
                                                    size="sm"
                                                    disabled={!link.url}
                                                    onClick={() => {
                                                        if (link.url) {
                                                            router.visit(link.url);
                                                        }
                                                    }}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
