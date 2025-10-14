import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useLocale, useTrans } from '@/hooks/useTrans';
import { type BreadcrumbItem } from '@/types';
import { dashboard as dashboardRoute } from '@/routes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, Star, Zap } from 'lucide-react';

type Achievement = {
    id: number;
    name: string;
    description: string;
    icon: string;
    points: number;
    unlocked: boolean;
    progress: number;
};

type UserStats = {
    level: string;
    total_points: number;
    total_trades: number;
    winning_trades: number;
    win_rate: number;
    current_streak: number;
    best_streak: number;
};

type AchievementsIndexProps = {
    stats: UserStats;
    achievementsByTier: {
        platinum: Achievement[];
        gold: Achievement[];
        silver: Achievement[];
        bronze: Achievement[];
    };
};

export default function AchievementsIndex({ stats, achievementsByTier }: AchievementsIndexProps) {
    const t = useTrans();
    const locale = useLocale();
    const pageTitle = t('Achievements');

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

    const tierConfig = {
        platinum: { color: 'from-purple-500 to-pink-500', icon: Trophy, borderColor: 'border-purple-500' },
        gold: { color: 'from-yellow-500 to-orange-500', icon: Award, borderColor: 'border-yellow-500' },
        silver: { color: 'from-gray-400 to-gray-500', icon: Star, borderColor: 'border-gray-400' },
        bronze: { color: 'from-orange-700 to-amber-600', icon: Zap, borderColor: 'border-orange-700' },
    };

    const getLevelBadgeColor = (level: string) => {
        switch (level) {
            case 'Master':
                return 'bg-purple-500';
            case 'Expert':
                return 'bg-blue-500';
            case 'Advanced':
                return 'bg-green-500';
            case 'Intermediate':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
                    <p className="text-muted-foreground">{t('Your Trading Achievements')}</p>
                </div>

                {/* Stats Overview */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>{t('Your Progress')}</span>
                            <Badge className={`${getLevelBadgeColor(stats.level)} text-white`}>{stats.level}</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div>
                                <p className="text-sm text-muted-foreground">{t('Total Points')}</p>
                                <p className="text-2xl font-bold">{stats.total_points}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{t('Win Rate')}</p>
                                <p className="text-2xl font-bold">{stats.win_rate.toFixed(1)}%</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{t('Current Streak')}</p>
                                <p className="text-2xl font-bold">{stats.current_streak}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{t('Best Streak')}</p>
                                <p className="text-2xl font-bold">{stats.best_streak}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Achievements by Tier */}
                {Object.entries(achievementsByTier).map(([tier, achievements]) => {
                    const config = tierConfig[tier as keyof typeof tierConfig];
                    const Icon = config.icon;

                    return (
                        <Card key={tier} className={`border-2 ${config.borderColor}`}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Icon className="h-6 w-6" />
                                    <span className="capitalize">{tier}</span>
                                    <Badge variant="outline">
                                        {achievements.filter((a) => a.unlocked).length} / {achievements.length}
                                    </Badge>
                                </CardTitle>
                                <CardDescription>
                                    {tier === 'platinum' && t('Legendary achievements for master traders')}
                                    {tier === 'gold' && t('Advanced achievements for experienced traders')}
                                    {tier === 'silver' && t('Intermediate achievements for committed traders')}
                                    {tier === 'bronze' && t('Starting achievements for new traders')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {achievements.map((achievement) => (
                                        <Card
                                            key={achievement.id}
                                            className={`transition-all ${
                                                achievement.unlocked
                                                    ? 'border-2 border-primary bg-primary/5'
                                                    : 'opacity-60 grayscale'
                                            }`}
                                        >
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-3xl">{achievement.icon}</span>
                                                        <div>
                                                            <CardTitle className="text-base">
                                                                {achievement.name}
                                                            </CardTitle>
                                                            <p className="text-xs text-muted-foreground">
                                                                +{achievement.points} {t('points')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {achievement.unlocked && (
                                                        <Badge variant="default" className="shrink-0">
                                                            {t('Unlocked')}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="mb-2 text-sm text-muted-foreground">
                                                    {achievement.description}
                                                </p>
                                                {!achievement.unlocked && (
                                                    <div className="space-y-1">
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span>{t('Progress')}</span>
                                                            <span className="font-semibold">
                                                                {achievement.progress}%
                                                            </span>
                                                        </div>
                                                        <Progress value={achievement.progress} className="h-2" />
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </AppLayout>
    );
}

