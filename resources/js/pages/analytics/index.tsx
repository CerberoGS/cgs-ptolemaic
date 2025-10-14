import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useLocale, useTrans } from '@/hooks/useTrans';
import { type BreadcrumbItem } from '@/types';
import { dashboard as dashboardRoute } from '@/routes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PositionSizingCalculator } from '@/components/position-sizing-calculator';
import {
    TrendingUp,
    TrendingDown,
    Target,
    Clock,
    BarChart3,
    Activity,
    Brain,
    Calendar,
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend,
} from 'recharts';

type AdvancedMetrics = {
    sharpe_ratio: number;
    max_drawdown: number;
    avg_risk_reward: number;
    profit_factor: number;
    expectancy: number;
    avg_hold_time: number;
    best_day: { date: string | null; pnl: number };
    worst_day: { date: string | null; pnl: number };
};

type SetupAnalysis = {
    setup: string;
    total_trades: number;
    win_rate: number;
    total_pnl: number;
    avg_pnl: number;
};

type EmotionAnalysis = {
    emotion: number;
    emotion_label: string;
    total_trades: number;
    win_rate: number;
    avg_pnl: number;
};

type HeatmapData = {
    day: number;
    hour: number;
    trades: number;
    pnl: number;
};

type AnalyticsIndexProps = {
    metrics: AdvancedMetrics;
    setupAnalysis: SetupAnalysis[];
    emotionAnalysis: EmotionAnalysis[];
    heatmapData: HeatmapData[];
};

export default function AnalyticsIndex({
    metrics,
    setupAnalysis,
    emotionAnalysis,
    heatmapData,
}: AnalyticsIndexProps) {
    const t = useTrans();
    const locale = useLocale();
    const pageTitle = t('Performance Analytics');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Dashboard'),
            href: dashboardRoute({ locale }).url,
        },
        {
            title: pageTitle,
            href: '#',
        },
    ];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
                    <p className="text-muted-foreground">{t('Deep dive into your trading performance')}</p>
                </div>

                {/* Advanced Metrics Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('Sharpe Ratio')}</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.sharpe_ratio.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">
                                {metrics.sharpe_ratio > 1 ? t('Excellent') : metrics.sharpe_ratio > 0 ? t('Good') : t('Needs improvement')}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('Max Drawdown')}</CardTitle>
                            <TrendingDown className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-500">
                                {formatCurrency(metrics.max_drawdown)}
                            </div>
                            <p className="text-xs text-muted-foreground">{t('Largest peak-to-trough decline')}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('Profit Factor')}</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.profit_factor.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">
                                {metrics.profit_factor > 2 ? t('Strong') : metrics.profit_factor > 1 ? t('Profitable') : t('Losing')}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('Avg Hold Time')}</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.avg_hold_time.toFixed(1)}h</div>
                            <p className="text-xs text-muted-foreground">{t('Average trade duration')}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('Expectancy')}</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${metrics.expectancy >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {formatCurrency(metrics.expectancy)}
                            </div>
                            <p className="text-xs text-muted-foreground">{t('Average $ per trade')}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('Avg R:R')}</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.avg_risk_reward.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">{t('Risk/Reward ratio')}</p>
                        </CardContent>
                    </Card>

                    <Card className="border-green-500/20 bg-green-50 dark:bg-green-950/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('Best Day')}</CardTitle>
                            <Calendar className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-500">
                                {formatCurrency(metrics.best_day.pnl)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {metrics.best_day.date || t('No data')}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-red-500/20 bg-red-50 dark:bg-red-950/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('Worst Day')}</CardTitle>
                            <Calendar className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-500">
                                {formatCurrency(metrics.worst_day.pnl)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {metrics.worst_day.date || t('No data')}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Setup Analysis */}
                {setupAnalysis.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                {t('Performance by Setup Type')}
                            </CardTitle>
                            <CardDescription>
                                {t('Which strategies work best for you?')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={setupAnalysis}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="setup" />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation="right" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="win_rate" fill="#22c55e" name="Win Rate %" />
                                    <Bar yAxisId="right" dataKey="total_pnl" fill="#3b82f6" name="Total P&L" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                )}

                {/* Emotion Analysis */}
                {emotionAnalysis.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Brain className="h-5 w-5" />
                                {t('Emotional Analysis')}
                            </CardTitle>
                            <CardDescription>
                                {t('How does your emotional state affect performance?')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart data={emotionAnalysis}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="emotion_label" />
                                    <PolarRadiusAxis />
                                    <Radar
                                        name="Win Rate %"
                                        dataKey="win_rate"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.6}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                )}

                {/* Position Sizing Calculator */}
                <PositionSizingCalculator />
            </div>
        </AppLayout>
    );
}

