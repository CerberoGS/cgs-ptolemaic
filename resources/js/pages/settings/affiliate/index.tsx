import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, ExternalLink, Gift, Users, TrendingUp, Star } from 'lucide-react';
import { useTrans } from '@/hooks/useTrans';
import AppLayout from '@/layouts/app-layout';

interface AffiliateStats {
    total_referrals: number;
    active_referrals: number;
    monthly_analysis_bonus: number;
    discount_percentage: number;
    can_redeem_discount: boolean;
    referrals_by_plan: Record<string, number>;
    referrals: Array<{
        id: number;
        user_name: string;
        user_email: string;
        plan: string;
        plan_icon: string;
        analysis_bonus: number;
        created_at: string;
    }>;
}

interface RewardConfig {
    free: number;
    managed: number;
    pro: number;
    enterprise: number;
}

interface Props {
    affiliateCode: string;
    affiliateLink: string;
    stats: AffiliateStats;
    rewardConfig: RewardConfig;
}

export default function AffiliateIndex({ affiliateCode, affiliateLink, stats, rewardConfig }: Props) {
    const t = useTrans();
    const { locale } = usePage().props as { locale: string };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(affiliateLink);
            router.post(`/${locale}/settings/affiliate/copy-link`, {}, {
                preserveState: true,
                preserveScroll: true,
            });
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const redeemDiscount = () => {
        router.post(`/${locale}/settings/affiliate/redeem-discount`, {}, {
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
            <Head title={t('Affiliate Program')} />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t('Affiliate Program')}</h1>
                    <p className="text-muted-foreground">
                        {t('Invite friends and earn analysis bonuses for each referral')}
                    </p>
                </div>

                {/* Affiliate Code & Link */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="size-5" />
                            {t('Your Affiliate Information')}
                        </CardTitle>
                        <CardDescription>
                            {t('Share your unique link to invite friends and earn rewards')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    {t('Your Code')}
                                </label>
                                <div className="flex items-center gap-2 mt-1">
                                    <code className="px-3 py-2 bg-muted rounded-md font-mono text-sm">
                                        {affiliateCode}
                                    </code>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={copyToClipboard}
                                        className="gap-2"
                                    >
                                        <Copy className="size-4" />
                                        {t('Copy')}
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    {t('Your Link')}
                                </label>
                                <div className="flex items-center gap-2 mt-1">
                                    <code className="px-3 py-2 bg-muted rounded-md font-mono text-sm flex-1 truncate">
                                        {affiliateLink}
                                    </code>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={copyToClipboard}
                                        className="gap-2"
                                    >
                                        <Copy className="size-4" />
                                        {t('Copy')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <Users className="size-5 text-blue-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.total_referrals}</p>
                                    <p className="text-sm text-muted-foreground">{t('Total Referrals')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="size-5 text-green-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.active_referrals}</p>
                                    <p className="text-sm text-muted-foreground">{t('Active Referrals')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <Star className="size-5 text-yellow-500" />
                                <div>
                                    <p className="text-2xl font-bold">+{stats.monthly_analysis_bonus}</p>
                                    <p className="text-sm text-muted-foreground">{t('Monthly Analysis Bonus')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <Gift className="size-5 text-purple-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.discount_percentage}%</p>
                                    <p className="text-sm text-muted-foreground">{t('Discount')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Reward System */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('Reward System')}</CardTitle>
                        <CardDescription>
                            {t('Earn analysis bonuses for each friend you refer')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.entries(rewardConfig).map(([plan, bonus]) => (
                                <div key={plan} className="text-center p-4 border rounded-lg">
                                    <div className="text-2xl mb-2">{planIcons[plan as keyof typeof planIcons]}</div>
                                    <h3 className="font-semibold">{planLabels[plan as keyof typeof planLabels]}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        +{bonus} {t('analysis')}
                                    </p>
                                </div>
                            ))}
                        </div>
                        
                        <Separator className="my-6" />
                        
                        <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                    <Gift className="size-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-purple-700 dark:text-purple-300">{t('Special Reward')}</h3>
                            <p className="text-muted-foreground mb-4">
                                {t('Reach 10 active referrals to unlock permanent discount')}
                            </p>
                            
                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                    <span>{t('Progress')}</span>
                                    <span>{stats.active_referrals}/10</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                    <div 
                                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min((stats.active_referrals / 10) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>

                            {stats.can_redeem_discount ? (
                                <div className="space-y-3">
                                    <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                                        🎉 {t('Congratulations! You can redeem your discount!')}
                                    </div>
                                    <Button onClick={redeemDiscount} size="lg" className="gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                                        <Gift className="size-5" />
                                        {t('Redeem 10% Permanent Discount')}
                                    </Button>
                                    <p className="text-sm text-muted-foreground">
                                        {t('This discount will be applied to all future payments')}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                                        {t('Keep going!')}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {t('Need')} <span className="font-bold text-purple-600 dark:text-purple-400">{10 - stats.active_referrals}</span> {t('more referrals')}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {t('Each referral brings you closer to permanent savings!')}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Referrals List */}
                {stats.referrals.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Your Referrals')}</CardTitle>
                            <CardDescription>
                                {t('People who joined using your affiliate link')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.referrals.map((referral) => (
                                    <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">{referral.plan_icon}</div>
                                            <div>
                                                <p className="font-medium">{referral.user_name}</p>
                                                <p className="text-sm text-muted-foreground">{referral.user_email}</p>
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
                        </CardContent>
                    </Card>
                )}

                {/* How it Works */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('How It Works')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                                </div>
                                <h3 className="font-semibold mb-2">{t('Share Your Link')}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('Share your unique affiliate link with friends')}
                                </p>
                            </div>
                            <div className="text-center p-4">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                                </div>
                                <h3 className="font-semibold mb-2">{t('They Join')}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('Your friends register using your link')}
                                </p>
                            </div>
                            <div className="text-center p-4">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                                </div>
                                <h3 className="font-semibold mb-2">{t('You Earn')}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('Get analysis bonuses for each active referral')}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
