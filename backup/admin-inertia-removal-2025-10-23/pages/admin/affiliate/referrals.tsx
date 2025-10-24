import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
    Users, 
    Search, 
    Filter, 
    MoreHorizontal, 
    CheckCircle, 
    XCircle,
    AlertCircle,
    Copy,
    ExternalLink,
    TrendingUp,
    Calendar,
    UserPlus,
    UserMinus,
    Eye,
    EyeOff,
    Clock
} from 'lucide-react';
import { useTrans } from '@/hooks/useTrans';
import AppLayout from '@/layouts/app-layout';
import adminRoutes from '@/routes/admin';
import { dashboard as dashboardRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { useMemo, useState } from 'react';
import { StatHelp } from '@/components/help-tooltip';

type ReferralRecord = {
    id: number;
    affiliate_name: string;
    affiliate_email: string;
    referred_name: string;
    referred_email: string;
    affiliate_code: string;
    plan: string;
    plan_icon: string;
    status: string;
    analysis_bonus: number;
    created_at: string;
};

type AffiliateReferralsPageProps = {
    referrals: {
        data: ReferralRecord[];
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

export default function AffiliateReferralsIndex({ referrals }: AffiliateReferralsPageProps) {
    const t = useTrans();
    const { locale } = usePage().props as { locale: string };
    const { props } = usePage<{ csrfToken: string }>();
    const csrfToken = props.csrfToken;
    
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'cancelled'>('all');
    const [planFilter, setPlanFilter] = useState<'all' | 'free' | 'managed' | 'pro' | 'enterprise'>('all');

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
                title: t('affiliate.referrals_title'),
                href: adminRoutes.affiliate.referrals({ locale }).url,
            },
        ],
        [locale, t],
    );

    const filteredReferrals = useMemo(() => {
        return referrals.data.filter(referral => {
            const matchesSearch = 
                referral.affiliate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                referral.affiliate_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                referral.referred_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                referral.referred_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                referral.affiliate_code.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesStatus = 
                statusFilter === 'all' || referral.status === statusFilter;
            
            const matchesPlan = 
                planFilter === 'all' || referral.plan === planFilter;
            
            return matchesSearch && matchesStatus && matchesPlan;
        });
    }, [referrals.data, searchTerm, statusFilter, planFilter]);

    const updateReferralStatus = (referralId: number, newStatus: string) => {
        router.put(`/${locale}/admin/affiliate/referrals/${referralId}/status`, {
            status: newStatus,
            _token: csrfToken,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            // You could add a toast notification here
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="size-4 text-green-500" />;
            case 'inactive':
                return <XCircle className="size-4 text-gray-500" />;
            case 'cancelled':
                return <AlertCircle className="size-4 text-red-500" />;
            default:
                return <Clock className="size-4 text-yellow-500" />;
        }
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'active':
                return 'default';
            case 'inactive':
                return 'secondary';
            case 'cancelled':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const planLabels = {
        free: 'Observador',
        managed: 'Cosmógrafo',
        pro: 'Astrónomo',
        enterprise: 'Heliópolis',
    };

    const stats = useMemo(() => {
        return {
            total: referrals.total,
            active: referrals.data.filter(r => r.status === 'active').length,
            inactive: referrals.data.filter(r => r.status === 'inactive').length,
            cancelled: referrals.data.filter(r => r.status === 'cancelled').length,
            totalAnalysisBonus: referrals.data.reduce((sum, r) => sum + r.analysis_bonus, 0),
            byPlan: {
                free: referrals.data.filter(r => r.plan === 'free').length,
                managed: referrals.data.filter(r => r.plan === 'managed').length,
                pro: referrals.data.filter(r => r.plan === 'pro').length,
                enterprise: referrals.data.filter(r => r.plan === 'enterprise').length,
            },
        };
    }, [referrals.data, referrals.total]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('affiliate.referrals_title')} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('affiliate.referrals_title')}</h1>
                        <p className="text-muted-foreground">
                            {t('affiliate.referrals_description')}
                        </p>
                    </div>
                    <Link href={adminRoutes.affiliate.index({ locale }).url}>
                        <Button variant="outline">
                            <Users className="size-4 mr-2" />
                            {t('Back to Dashboard')}
                        </Button>
                    </Link>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <Users className="size-5 text-blue-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.total}</p>
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
                                <CheckCircle className="size-5 text-green-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.active}</p>
                                    <StatHelp 
                                        title={t('affiliate.active')}
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
                                <XCircle className="size-5 text-gray-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.inactive}</p>
                                    <StatHelp 
                                        title={t('affiliate.inactive')}
                                        description={t('affiliate.help_inactive_referrals')}
                                        detailedContent={t('affiliate.help_inactive_referrals_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="size-5 text-red-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.cancelled}</p>
                                    <StatHelp 
                                        title={t('affiliate.cancelled')}
                                        description={t('affiliate.help_cancelled_referrals')}
                                        detailedContent={t('affiliate.help_cancelled_referrals_detailed')}
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
                                <Calendar className="size-5 text-orange-500" />
                                <div>
                                    <p className="text-2xl font-bold">
                                        {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}%
                                    </p>
                                    <StatHelp 
                                        title={t('affiliate.conversion_rate')}
                                        description={t('affiliate.help_conversion_rate')}
                                        detailedContent={t('affiliate.help_conversion_rate_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Plan Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('affiliate.referrals_by_plan')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(stats.byPlan).map(([plan, count]) => (
                                <div key={plan} className="text-center p-4 border rounded-lg">
                                    <div className="text-2xl mb-2">
                                        {plan === 'free' && '👁️'}
                                        {plan === 'managed' && '🧭'}
                                        {plan === 'pro' && '🔭'}
                                        {plan === 'enterprise' && '☀️'}
                                    </div>
                                    <h3 className="font-semibold">{planLabels[plan as keyof typeof planLabels]}</h3>
                                    <p className="text-sm text-muted-foreground">{count} {t('affiliate.referrals')}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

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
                                        placeholder={t('affiliate.search_by_name_email_code')}
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
                                    <option value="inactive">{t('affiliate.inactive')}</option>
                                    <option value="cancelled">{t('affiliate.cancelled')}</option>
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="plan">{t('affiliate.plan')}</Label>
                                <select
                                    id="plan"
                                    value={planFilter}
                                    onChange={(e) => setPlanFilter(e.target.value as any)}
                                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                >
                                    <option value="all">{t('affiliate.all_plans')}</option>
                                    <option value="free">{t('Observador')}</option>
                                    <option value="managed">{t('Cosmógrafo')}</option>
                                    <option value="pro">{t('Astrónomo')}</option>
                                    <option value="enterprise">{t('Heliópolis')}</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Referrals Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('affiliate.referrals_title')}</CardTitle>
                        <CardDescription>
                            {t('affiliate.showing')} {filteredReferrals.length} {t('affiliate.of')} {referrals.total} {t('affiliate.referrals')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {filteredReferrals.length > 0 ? (
                            <div className="space-y-4">
                                {filteredReferrals.map((referral) => (
                                    <div key={referral.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="text-2xl">{referral.plan_icon}</div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium">{referral.referred_name}</p>
                                                        <Badge variant={getStatusBadgeVariant(referral.status)}>
                                                            {getStatusIcon(referral.status)}
                                                            <span className="ml-1">{t(referral.status)}</span>
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{referral.referred_email}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {t('affiliate.referred_by')} {referral.affiliate_name} ({referral.affiliate_code})
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <p className="text-sm font-medium">
                                                        {planLabels[referral.plan as keyof typeof planLabels]}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        +{referral.analysis_bonus} {t('affiliate.analysis')}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {new Date(referral.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={referral.status}
                                                        onChange={(e) => updateReferralStatus(referral.id, e.target.value)}
                                                        className="text-sm rounded-md border border-input bg-background px-2 py-1 ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                    >
                                                        <option value="active">{t('affiliate.active')}</option>
                                                        <option value="inactive">{t('affiliate.inactive')}</option>
                                                        <option value="cancelled">{t('affiliate.cancelled')}</option>
                                                    </select>
                                                    
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => copyToClipboard(referral.affiliate_code)}
                                                        className="gap-2"
                                                    >
                                                        <Copy className="size-4" />
                                                        {t('affiliate.copy_code')}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <UserPlus className="size-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">
                                    {searchTerm || statusFilter !== 'all' || planFilter !== 'all'
                                        ? t('affiliate.no_referrals_match_filters') 
                                        : t('affiliate.no_referrals_found')
                                    }
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {referrals.last_page > 1 && (
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    {t('affiliate.showing')} {referrals.from} {t('affiliate.to')} {referrals.to} {t('affiliate.of')} {referrals.total} {t('affiliate.results')}
                                </p>
                                <div className="flex items-center gap-2">
                                    {referrals.links.map((link, index) => (
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
