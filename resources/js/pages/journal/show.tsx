import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import journalRoutes from '@/routes/journal';
import { dashboard as dashboardRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useLocale, useTrans } from '@/hooks/useTrans';
import { ArrowLeft, Edit, TrendingUp, TrendingDown, Clock } from 'lucide-react';

type JournalShowProps = {
    entry: {
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
        notes: string | null;
        tags: string[];
        emotion: number | null;
        trade_date: string;
        entry_time: string | null;
        exit_time: string | null;
        is_closed: boolean;
        is_profitable: boolean | null;
        hold_time: string | null;
        created_at: string;
    };
};

export default function JournalShow({ entry }: JournalShowProps) {
    const t = useTrans();
    const locale = useLocale();
    const pageTitle = `${entry.symbol} - ${t('Trade Details')}`;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Dashboard'),
            href: dashboardRoute({ locale }).url,
        },
        {
            title: t('Trading Journal'),
            href: journalRoutes.index({ locale }).url,
        },
        {
            title: entry.symbol,
            href: journalRoutes.show({ locale, journal: entry.id }).url,
        },
    ];

    const formatCurrency = (value: string | null) => {
        if (value === null) {
            return '-';
        }
        const num = parseFloat(value);
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(num);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (time: string | null) => {
        if (!time) {
            return '-';
        }
        return new Date(time).toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />

            <div className="mx-auto max-w-4xl space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={journalRoutes.index({ locale }).url}>
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{entry.symbol}</h1>
                            <p className="text-muted-foreground">
                                {formatDate(entry.trade_date)}
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={journalRoutes.edit({ locale, journal: entry.id }).url}>
                            <Edit className="mr-2 h-4 w-4" />
                            {t('Edit')}
                        </Link>
                    </Button>
                </div>

                {/* Status Badge & P&L */}
                {entry.is_closed && entry.pnl !== null && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {entry.is_profitable ? (
                                        <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                                    ) : (
                                        <TrendingDown className="h-8 w-8 text-red-600 dark:text-red-400" />
                                    )}
                                    <div>
                                        <p className="text-sm text-muted-foreground">{t('P&L')}</p>
                                        <p
                                            className={`text-3xl font-bold ${
                                                entry.is_profitable
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                            }`}
                                        >
                                            {formatCurrency(entry.pnl)}
                                            {entry.pnl_percentage && (
                                                <span className="ml-2 text-lg">
                                                    ({parseFloat(entry.pnl_percentage).toFixed(2)}
                                                    %)
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                {entry.hold_time && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span className="text-sm">{entry.hold_time}</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Trade Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('Trade Information')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="grid gap-4 md:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    {t('Asset Type')}
                                </dt>
                                <dd className="mt-1">
                                    <Badge variant="outline" className="capitalize">
                                        {entry.asset_type}
                                    </Badge>
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    {t('Direction')}
                                </dt>
                                <dd className="mt-1">
                                    <Badge
                                        variant={
                                            entry.direction === 'long' ? 'default' : 'secondary'
                                        }
                                        className="capitalize"
                                    >
                                        {entry.direction === 'long' ? t('Long') : t('Short')}
                                    </Badge>
                                </dd>
                            </div>

                            {entry.setup_type && (
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">
                                        {t('Setup Type')}
                                    </dt>
                                    <dd className="mt-1 text-sm">{entry.setup_type}</dd>
                                </div>
                            )}

                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    {t('Status')}
                                </dt>
                                <dd className="mt-1">
                                    <Badge>{entry.is_closed ? t('Closed') : t('Open')}</Badge>
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    {t('Entry Price')}
                                </dt>
                                <dd className="mt-1 text-sm font-semibold">
                                    {formatCurrency(entry.entry_price)}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    {t('Exit Price')}
                                </dt>
                                <dd className="mt-1 text-sm font-semibold">
                                    {entry.exit_price
                                        ? formatCurrency(entry.exit_price)
                                        : t('Not closed yet')}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    {t('Quantity')}
                                </dt>
                                <dd className="mt-1 text-sm">{entry.quantity}</dd>
                            </div>

                            {entry.emotion !== null && (
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">
                                        {t('Emotion Level')}
                                    </dt>
                                    <dd className="mt-1 text-sm">
                                        {entry.emotion}/5
                                        <span className="ml-2 text-xs text-muted-foreground">
                                            (
                                            {entry.emotion >= 4
                                                ? t('Confident')
                                                : entry.emotion <= 2
                                                  ? t('Fearful')
                                                  : t('Neutral')}
                                            )
                                        </span>
                                    </dd>
                                </div>
                            )}

                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    {t('Entry Time')}
                                </dt>
                                <dd className="mt-1 text-sm">{formatTime(entry.entry_time)}</dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    {t('Exit Time')}
                                </dt>
                                <dd className="mt-1 text-sm">{formatTime(entry.exit_time)}</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>

                {/* Notes */}
                {entry.notes && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Notes')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap text-sm">{entry.notes}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Tags */}
                {entry.tags && entry.tags.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Tags')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {entry.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Metadata */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('Metadata')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="grid gap-2">
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    {t('Created at')}
                                </dt>
                                <dd className="mt-1 text-sm">
                                    {new Date(entry.created_at).toLocaleString(locale)}
                                </dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
