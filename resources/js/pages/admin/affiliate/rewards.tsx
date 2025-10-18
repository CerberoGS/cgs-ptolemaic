import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
    Gift, 
    Search, 
    Filter, 
    Plus,
    CheckCircle, 
    XCircle,
    AlertCircle,
    Clock,
    TrendingUp,
    Calendar,
    Star,
    Percent,
    User,
    Edit,
    Trash2
} from 'lucide-react';
import { useTrans } from '@/hooks/useTrans';
import AppLayout from '@/layouts/app-layout';
import adminRoutes from '@/routes/admin';
import { dashboard as dashboardRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { useMemo, useState } from 'react';
import { StatHelp } from '@/components/help-tooltip';

type RewardRecord = {
    id: number;
    user_name: string;
    user_email: string;
    reward_type: string;
    analysis_bonus: number | null;
    discount_percentage: number | null;
    referrals_count: number;
    status: string;
    expires_at: string | null;
    notes: string | null;
    created_at: string;
};

type AffiliateRewardsPageProps = {
    rewards: {
        data: RewardRecord[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
};

export default function AffiliateRewardsIndex({ rewards }: AffiliateRewardsPageProps) {
    const t = useTrans();
    const { locale } = usePage().props as { locale: string };
    const { props } = usePage<{ csrfToken: string }>();
    const csrfToken = props.csrfToken;
    
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'redeemed' | 'expired'>('all');
    const [typeFilter, setTypeFilter] = useState<'all' | 'analysis_bonus' | 'discount_percentage'>('all');
    const [showCreateForm, setShowCreateForm] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => [
            {
                title: t('Dashboard'),
                href: dashboardRoute({ locale }).url,
            },
            {
                title: t('Administration'),
                href: adminRoutes.dashboard({ locale }).url,
            },
            {
                title: t('Affiliate Management'),
                href: adminRoutes.affiliate.index({ locale }).url,
            },
            {
                title: t('affiliate.rewards_title'),
                href: adminRoutes.affiliate.rewards({ locale }).url,
            },
        ],
        [locale, t],
    );

    const filteredRewards = useMemo(() => {
        return rewards.data.filter(reward => {
            const matchesSearch = 
                reward.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reward.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (reward.notes && reward.notes.toLowerCase().includes(searchTerm.toLowerCase()));
            
            const matchesStatus = 
                statusFilter === 'all' || reward.status === statusFilter;
            
            const matchesType = 
                typeFilter === 'all' || reward.reward_type === typeFilter;
            
            return matchesSearch && matchesStatus && matchesType;
        });
    }, [rewards.data, searchTerm, statusFilter, typeFilter]);

    const updateRewardStatus = (rewardId: number, newStatus: string) => {
        router.put(`/${locale}/admin/affiliate/rewards/${rewardId}/status`, {
            status: newStatus,
            _token: csrfToken,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="size-4 text-green-500" />;
            case 'redeemed':
                return <Star className="size-4 text-blue-500" />;
            case 'expired':
                return <XCircle className="size-4 text-red-500" />;
            default:
                return <Clock className="size-4 text-yellow-500" />;
        }
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'active':
                return 'default';
            case 'redeemed':
                return 'secondary';
            case 'expired':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getRewardIcon = (type: string) => {
        switch (type) {
            case 'analysis_bonus':
                return <TrendingUp className="size-4 text-purple-500" />;
            case 'discount_percentage':
                return <Percent className="size-4 text-green-500" />;
            default:
                return <Gift className="size-4 text-orange-500" />;
        }
    };

    const getRewardDescription = (reward: RewardRecord) => {
        switch (reward.reward_type) {
            case 'analysis_bonus':
                return `+${reward.analysis_bonus} ${t('analysis')}`;
            case 'discount_percentage':
                return `${reward.discount_percentage}% ${t('discount')}`;
            default:
                return t('Custom reward');
        }
    };

    const stats = useMemo(() => {
        return {
            total: rewards.total,
            active: rewards.data.filter(r => r.status === 'active').length,
            redeemed: rewards.data.filter(r => r.status === 'redeemed').length,
            expired: rewards.data.filter(r => r.status === 'expired').length,
            totalAnalysisBonus: rewards.data
                .filter(r => r.reward_type === 'analysis_bonus')
                .reduce((sum, r) => sum + (r.analysis_bonus || 0), 0),
            totalDiscountPercentage: rewards.data
                .filter(r => r.reward_type === 'discount_percentage')
                .reduce((sum, r) => sum + (r.discount_percentage || 0), 0),
            byType: {
                analysis_bonus: rewards.data.filter(r => r.reward_type === 'analysis_bonus').length,
                discount_percentage: rewards.data.filter(r => r.reward_type === 'discount_percentage').length,
            },
        };
    }, [rewards.data, rewards.total]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('affiliate.rewards_title')} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('affiliate.rewards_title')}</h1>
                        <p className="text-muted-foreground">
                            {t('affiliate.rewards_description')}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => setShowCreateForm(!showCreateForm)}
                            className="gap-2"
                        >
                            <Plus className="size-4" />
                            {t('Create Reward')}
                        </Button>
                        <Link href={adminRoutes.affiliate.index({ locale }).url}>
                            <Button variant="outline">
                                <Gift className="size-4 mr-2" />
                                {t('Back to Dashboard')}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <Gift className="size-5 text-blue-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.total}</p>
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
                                <CheckCircle className="size-5 text-green-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.active}</p>
                                    <StatHelp 
                                        title={t('affiliate.active')}
                                        description={t('affiliate.help_active_rewards')}
                                        detailedContent={t('affiliate.help_active_rewards_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <Star className="size-5 text-blue-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.redeemed}</p>
                                    <StatHelp 
                                        title={t('affiliate.redeemed')}
                                        description={t('affiliate.help_redeemed_rewards')}
                                        detailedContent={t('affiliate.help_redeemed_rewards_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <XCircle className="size-5 text-red-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.expired}</p>
                                    <StatHelp 
                                        title={t('affiliate.expired')}
                                        description={t('affiliate.help_expired_rewards')}
                                        detailedContent={t('affiliate.help_expired_rewards_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="size-5 text-purple-500" />
                                <div>
                                    <p className="text-2xl font-bold">+{stats.totalAnalysisBonus}</p>
                                    <StatHelp 
                                        title={t('affiliate.analysis_bonus')}
                                        description={t('affiliate.help_analysis_bonus')}
                                        detailedContent={t('affiliate.help_analysis_bonus_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <Percent className="size-5 text-green-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.totalDiscountPercentage}%</p>
                                    <StatHelp 
                                        title={t('affiliate.total_discount')}
                                        description={t('affiliate.help_total_discount')}
                                        detailedContent={t('affiliate.help_total_discount_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Reward Type Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('affiliate.rewards_by_type')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="text-center p-4 border rounded-lg">
                                <div className="flex justify-center mb-2">
                                    <TrendingUp className="size-8 text-purple-500" />
                                </div>
                                <h3 className="font-semibold">{t('affiliate.analysis_bonus')}</h3>
                                <p className="text-sm text-muted-foreground">{stats.byType.analysis_bonus} {t('affiliate.rewards')}</p>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="flex justify-center mb-2">
                                    <Percent className="size-8 text-green-500" />
                                </div>
                                <h3 className="font-semibold">{t('affiliate.discount_percentage')}</h3>
                                <p className="text-sm text-muted-foreground">{stats.byType.discount_percentage} {t('affiliate.rewards')}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Create Reward Form */}
                {showCreateForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('affiliate.create_new_reward')}</CardTitle>
                            <CardDescription>
                                {t('affiliate.manually_create_reward')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="user_email">{t('affiliate.user_email')}</Label>
                                    <Input
                                        id="user_email"
                                        placeholder={t('affiliate.user_example_com')}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="reward_type">{t('affiliate.reward_type')}</Label>
                                    <select
                                        id="reward_type"
                                        className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    >
                                        <option value="analysis_bonus">{t('affiliate.analysis_bonus')}</option>
                                        <option value="discount_percentage">{t('affiliate.discount_percentage')}</option>
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="value">{t('affiliate.value')}</Label>
                                    <Input
                                        id="value"
                                        type="number"
                                        placeholder="10"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="expires_at">{t('affiliate.expires_at')}</Label>
                                    <Input
                                        id="expires_at"
                                        type="date"
                                        className="mt-1"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Label htmlFor="notes">{t('affiliate.notes')}</Label>
                                    <Input
                                        id="notes"
                                        placeholder={t('affiliate.optional_notes_reward')}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <Button>
                                    <Plus className="size-4 mr-2" />
                                    {t('affiliate.create_reward')}
                                </Button>
                                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                                    {t('affiliate.cancel')}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Filters and Search */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="size-5" />
                            {t('affiliate.filters_search')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="lg:col-span-2">
                                <Label htmlFor="search">{t('affiliate.search')}</Label>
                                <div className="relative mt-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                                    <Input
                                        id="search"
                                        placeholder={t('affiliate.search_by_name_email_notes')}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="status">{t('affiliate.status')}</Label>
                                <select
                                    id="status"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as any)}
                                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                >
                                    <option value="all">{t('affiliate.all_status')}</option>
                                    <option value="active">{t('affiliate.active')}</option>
                                    <option value="redeemed">{t('affiliate.redeemed')}</option>
                                    <option value="expired">{t('affiliate.expired')}</option>
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="type">{t('affiliate.type')}</Label>
                                <select
                                    id="type"
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value as any)}
                                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                >
                                    <option value="all">{t('affiliate.all_types')}</option>
                                    <option value="analysis_bonus">{t('affiliate.analysis_bonus')}</option>
                                    <option value="discount_percentage">{t('affiliate.discount_percentage')}</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Rewards Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('affiliate.rewards_title')}</CardTitle>
                        <CardDescription>
                            {t('affiliate.showing')} {filteredRewards.length} {t('affiliate.of')} {rewards.total} {t('affiliate.rewards')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {filteredRewards.length > 0 ? (
                            <div className="space-y-4">
                                {filteredRewards.map((reward) => (
                                    <div key={reward.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    {getRewardIcon(reward.reward_type)}
                                                    <Badge variant={getStatusBadgeVariant(reward.status)}>
                                                        {getStatusIcon(reward.status)}
                                                        <span className="ml-1">{t(reward.status)}</span>
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <p className="font-medium">{reward.user_name}</p>
                                                    <p className="text-sm text-muted-foreground">{reward.user_email}</p>
                                                    {reward.notes && (
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {reward.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <p className="text-sm font-medium">
                                                        {getRewardDescription(reward)}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {reward.referrals_count} {t('referrals')}
                                                    </p>
                                                    {reward.expires_at && (
                                                        <p className="text-xs text-muted-foreground">
                                                            {t('affiliate.expires')} {new Date(reward.expires_at).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={reward.status}
                                                        onChange={(e) => updateRewardStatus(reward.id, e.target.value)}
                                                        className="text-sm rounded-md border border-input bg-background px-2 py-1 ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                    >
                                                        <option value="active">{t('affiliate.active')}</option>
                                                        <option value="redeemed">{t('affiliate.redeemed')}</option>
                                                        <option value="expired">{t('affiliate.expired')}</option>
                                                    </select>
                                                    
                                                    <Button variant="outline" size="sm" className="gap-2">
                                                        <Edit className="size-4" />
                                                        {t('affiliate.edit')}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Gift className="size-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">
                                    {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                                        ? t('affiliate.no_rewards_match_filters') 
                                        : t('affiliate.no_rewards_found')
                                    }
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {rewards.last_page > 1 && (
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    {t('affiliate.showing')} {rewards.from} {t('affiliate.to')} {rewards.to} {t('affiliate.of')} {rewards.total} {t('affiliate.results')}
                                </p>
                                <div className="flex items-center gap-2">
                                    {rewards.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 text-sm rounded-md ${
                                                link.active
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                            } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
