import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrans } from '@/hooks/useTrans';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

type PnLTimelineData = {
    date: string;
    pnl: number;
};

type AssetDistributionData = {
    name: string;
    value: number;
    pnl: number;
};

type WinLossDistributionData = {
    name: string;
    value: number;
    fill: string;
};

type JournalChartsProps = {
    pnlTimeline: PnLTimelineData[];
    assetDistribution: AssetDistributionData[];
    winLossDistribution: WinLossDistributionData[];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function JournalCharts({
    pnlTimeline,
    assetDistribution,
    winLossDistribution,
}: JournalChartsProps) {
    const t = useTrans();

    if (
        pnlTimeline.length === 0 &&
        assetDistribution.length === 0 &&
        winLossDistribution.every((item) => item.value === 0)
    ) {
        return null;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* P&L Timeline Chart */}
            {pnlTimeline.length > 0 && (
                <Card className="col-span-full lg:col-span-2">
                    <CardHeader>
                        <CardTitle>{t('P&L Timeline')}</CardTitle>
                        <CardDescription>{t('Your profit and loss over time')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={pnlTimeline}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis
                                    dataKey="date"
                                    className="text-xs text-muted-foreground"
                                />
                                <YAxis className="text-xs text-muted-foreground" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="pnl"
                                    name={t('P&L')}
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                    dot={{ fill: 'hsl(var(--primary))' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            )}

            {/* Win/Loss Distribution Pie Chart */}
            {winLossDistribution.some((item) => item.value > 0) && (
                <Card>
                    <CardHeader>
                        <CardTitle>{t('Win/Loss Ratio')}</CardTitle>
                        <CardDescription>{t('Distribution of winning vs losing trades')}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={winLossDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {winLossDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '8px',
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            )}

            {/* Asset Type Distribution Bar Chart */}
            {assetDistribution.length > 0 && (
                <Card className="col-span-full lg:col-span-2">
                    <CardHeader>
                        <CardTitle>{t('Performance by Asset Type')}</CardTitle>
                        <CardDescription>
                            {t('Number of trades and P&L by asset type')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={assetDistribution}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis
                                    dataKey="name"
                                    className="text-xs text-muted-foreground"
                                />
                                <YAxis className="text-xs text-muted-foreground" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="value"
                                    name={t('Trades')}
                                    fill={COLORS[0]}
                                    radius={[8, 8, 0, 0]}
                                />
                                <Bar
                                    dataKey="pnl"
                                    name={t('P&L')}
                                    fill={COLORS[1]}
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

