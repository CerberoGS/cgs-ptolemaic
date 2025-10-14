import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTrans, useLocale } from '@/hooks/useTrans';
import journalRoutes from '@/routes/journal';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

type RecentTrade = {
    id: number;
    symbol: string;
    direction: string;
    asset_type: string;
    pnl: string | null;
    pnl_percentage: string | null;
    trade_date: string;
    is_closed: boolean;
    is_profitable: boolean | null;
};

type RecentTradesWidgetProps = {
    trades: RecentTrade[];
};

export function RecentTradesWidget({ trades }: RecentTradesWidgetProps) {
    const t = useTrans();
    const locale = useLocale();

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
            month: 'short',
            day: 'numeric',
        });
    };

    if (trades.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{t('Recent Trades')}</CardTitle>
                    <CardDescription>{t('Your latest trading activity')}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="mb-4 text-sm text-muted-foreground">
                        {t('No trades recorded yet')}
                    </p>
                    <Button asChild>
                        <Link href={journalRoutes.create({ locale }).url}>
                            {t('Create First Trade')}
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                    <CardTitle>{t('Recent Trades')}</CardTitle>
                    <CardDescription>{t('Your latest trading activity')}</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                    <Link href={journalRoutes.index({ locale }).url}>
                        {t('View All')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {trades.map((trade) => (
                        <Link
                            key={trade.id}
                            href={journalRoutes.show({ locale, journal: trade.id }).url}
                            className="block rounded-lg border p-4 transition-colors hover:bg-muted/50"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                            trade.direction === 'long'
                                                ? 'bg-green-100 dark:bg-green-900/20'
                                                : 'bg-red-100 dark:bg-red-900/20'
                                        }`}
                                    >
                                        {trade.direction === 'long' ? (
                                            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        ) : (
                                            <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{trade.symbol}</span>
                                            <Badge variant="outline" className="text-xs">
                                                {trade.asset_type.toUpperCase()}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {formatDate(trade.trade_date)}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {trade.is_closed ? (
                                        <div
                                            className={`text-lg font-bold ${
                                                trade.is_profitable
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                            }`}
                                        >
                                            {formatCurrency(trade.pnl)}
                                        </div>
                                    ) : (
                                        <Badge variant="secondary">{t('Open')}</Badge>
                                    )}
                                    {trade.is_closed && trade.pnl_percentage && (
                                        <p
                                            className={`text-sm ${
                                                trade.is_profitable
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                            }`}
                                        >
                                            {trade.is_profitable ? '+' : ''}
                                            {parseFloat(trade.pnl_percentage).toFixed(2)}%
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

