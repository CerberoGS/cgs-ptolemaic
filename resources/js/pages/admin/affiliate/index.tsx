import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Users, TrendingUp, Gift, Star, Settings, Eye, UserCheck } from 'lucide-react';
import { useTrans } from '@/hooks/useTrans';
import AppLayout from '@/layouts/app-layout';
import { StatHelp } from '@/components/help-tooltip';

interface AffiliateStats {
    total_affiliates: number;
    total_referrals: number;
    active_referrals: number;
    total_rewards_given: number;
    active_rewards: number;
}

interface RecentReferral {
    id: number;
    affiliate_name: string;
    referred_name: string;
    plan: string;
    plan_icon: string;
    analysis_bonus: number;
    created_at: string;
}

interface TopAffiliate {
    id: number;
    name: string;
    email: string;
    affiliate_code: string;
    active_referrals_count: number;
    monthly_analysis_bonus: number;
    discount_percentage: number;
}

interface RewardConfig {
    free: number;
    managed: number;
    pro: number;
    enterprise: number;
}

interface Props {
    stats: AffiliateStats;
    recentReferrals: RecentReferral[];
    topAffiliates: TopAffiliate[];
    rewardConfig: RewardConfig;
}

export default function AdminAffiliateIndex({ stats, recentReferrals, topAffiliates, rewardConfig }: Props) {
    const t = useTrans();
    const { locale } = usePage().props as { locale: string };

    const updateRewardConfig = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const config = {
            free: parseInt(formData.get('free') as string),
            managed: parseInt(formData.get('managed') as string),
            pro: parseInt(formData.get('pro') as string),
            enterprise: parseInt(formData.get('enterprise') as string),
        };

        router.post(`/${locale}/admin/affiliate/reward-config`, config, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const planLabels = {
        free: 'Observador',
        managed: 'Cosmógrafo',
        pro: 'Astrónomo',
        enterprise: 'Heliópolis',
    };

    const planIcons = {
        free: '👁️',
        managed: '🧭',
        pro: '🔭',
        enterprise: '☀️',
    };

    return (
        <AppLayout>
            <Head title={t('affiliate.affiliate_management')} />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t('affiliate.affiliate_management')}</h1>
                    <p className="text-muted-foreground">
                        {t('Manage affiliate system, rewards, and track performance')}
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <Users className="size-5 text-blue-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.total_affiliates}</p>
                                    <StatHelp 
                                        title={t('affiliate.total_affiliates')}
                                        description={t('affiliate.help_total_affiliates')}
                                        detailedContent={t('affiliate.help_total_affiliates_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="size-5 text-green-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.total_referrals}</p>
                                    <StatHelp 
                                        title={t('affiliate.total_referrals')}
                                        description={t('affiliate.help_total_referrals')}
                                        detailedContent={t('affiliate.help_total_referrals_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <UserCheck className="size-5 text-purple-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.active_referrals}</p>
                                    <StatHelp 
                                        title={t('affiliate.active_referrals')}
                                        description={t('affiliate.help_active_referrals')}
                                        detailedContent={t('affiliate.help_active_referrals_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <Gift className="size-5 text-yellow-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.total_rewards_given}</p>
                                    <StatHelp 
                                        title={t('affiliate.total_rewards')}
                                        description={t('affiliate.help_total_rewards')}
                                        detailedContent={t('affiliate.help_total_rewards_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <Star className="size-5 text-orange-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.active_rewards}</p>
                                    <StatHelp 
                                        title={t('affiliate.active_rewards')}
                                        description={t('affiliate.help_active_rewards')}
                                        detailedContent={t('affiliate.help_active_rewards_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Reward Configuration */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="size-5" />
                                {t('Reward Configuration')}
                            </CardTitle>
                            <CardDescription>
                                {t('Configure analysis bonuses for each plan')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={updateRewardConfig} className="space-y-4">
                                {Object.entries(rewardConfig).map(([plan, bonus]) => (
                                    <div key={plan} className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 min-w-[120px]">
                                            <span className="text-2xl">{planIcons[plan as keyof typeof planIcons]}</span>
                                            <span className="font-medium">{planLabels[plan as keyof typeof planLabels]}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Label htmlFor={plan} className="text-sm">+</Label>
                                            <Input
                                                id={plan}
                                                name={plan}
                                                type="number"
                                                min="0"
                                                max="100"
                                                defaultValue={bonus}
                                                className="w-20"
                                            />
                                            <span className="text-sm text-muted-foreground">{t('analysis')}</span>
                                        </div>
                                    </div>
                                ))}
                                <Button type="submit" className="w-full">
                                    {t('Update Configuration')}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Quick Actions')}</CardTitle>
                            <CardDescription>
                                {t('Manage affiliate system components')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href={`/${locale}/admin/affiliate/codes`}>
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <Users className="size-4" />
                                    {t('Manage Affiliate Codes')}
                                </Button>
                            </Link>
                            <Link href={`/${locale}/admin/affiliate/referrals`}>
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <TrendingUp className="size-4" />
                                    {t('View All Referrals')}
                                </Button>
                            </Link>
                            <Link href={`/${locale}/admin/affiliate/rewards`}>
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <Gift className="size-4" />
                                    {t('Manage Rewards')}
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Referrals */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Recent Referrals')}</CardTitle>
                            <CardDescription>
                                {t('Latest affiliate referrals')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentReferrals.length > 0 ? (
                                <div className="space-y-3">
                                    {recentReferrals.map((referral) => (
                                        <div key={referral.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">{referral.plan_icon}</div>
                                                <div>
                                                    <p className="font-medium">{referral.referred_name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {t('Referred by')} {referral.affiliate_name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant="secondary">{referral.plan}</Badge>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    +{referral.analysis_bonus} {t('analysis')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">
                                    {t('No referrals yet')}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Top Affiliates */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Top Affiliates')}</CardTitle>
                            <CardDescription>
                                {t('Users with most active referrals')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {topAffiliates.length > 0 ? (
                                <div className="space-y-3">
                                    {topAffiliates.map((affiliate, index) => (
                                        <div key={affiliate.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{affiliate.name}</p>
                                                    <p className="text-sm text-muted-foreground">{affiliate.affiliate_code}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">{affiliate.active_referrals_count} {t('referrals')}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    +{affiliate.monthly_analysis_bonus} {t('analysis')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">
                                    {t('No affiliates yet')}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
