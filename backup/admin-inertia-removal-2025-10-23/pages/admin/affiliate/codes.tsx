import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
    Users, 
    Search, 
    Filter, 
    MoreHorizontal, 
    ToggleLeft, 
    ToggleRight,
    Copy,
    ExternalLink,
    TrendingUp,
    Calendar,
    Eye,
    EyeOff
} from 'lucide-react';
import { useTrans } from '@/hooks/useTrans';
import AppLayout from '@/layouts/app-layout';
import adminRoutes from '@/routes/admin';
import { dashboard as dashboardRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { useMemo, useState } from 'react';
import { StatHelp } from '@/components/help-tooltip';

type AffiliateCodeRecord = {
    id: number;
    code: string;
    user_name: string;
    user_email: string;
    is_active: boolean;
    total_referrals: number;
    active_referrals: number;
    total_earnings: number;
    created_at: string;
};

type AffiliateCodesPageProps = {
    codes: {
        data: AffiliateCodeRecord[];
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
    stats: {
        total_codes: number;
        active_codes: number;
        inactive_codes: number;
        total_earnings: number;
    };
};

export default function AffiliateCodesIndex({ codes, stats }: AffiliateCodesPageProps) {
    const t = useTrans();
    const { locale } = usePage().props as { locale: string };
    const { props } = usePage<{ csrfToken: string }>();
    const csrfToken = props.csrfToken;
    
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

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
                title: t('affiliate.affiliate_codes_title'),
                href: adminRoutes.affiliate.codes({ locale }).url,
            },
        ],
        [locale, t],
    );

    const filteredCodes = useMemo(() => {
        return codes.data.filter(code => {
            const matchesSearch = 
                code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                code.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                code.user_email.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesStatus = 
                statusFilter === 'all' || 
                (statusFilter === 'active' && code.is_active) ||
                (statusFilter === 'inactive' && !code.is_active);
            
            return matchesSearch && matchesStatus;
        });
    }, [codes.data, searchTerm, statusFilter]);

    const toggleCodeStatus = (codeId: number) => {
        router.post(`/${locale}/admin/affiliate/codes/${codeId}/toggle`, {}, {
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

    const getAffiliateLink = (code: string) => {
        return `${window.location.origin}/${locale}/ref/${code}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('affiliate.affiliate_codes_title')} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('affiliate.affiliate_codes_title')}</h1>
                        <p className="text-muted-foreground">
                            {t('affiliate.affiliate_codes_description')}
                        </p>
                    </div>
                    <Link href={adminRoutes.affiliate.index({ locale }).url}>
                        <Button variant="outline">
                            <Users className="size-4 mr-2" />
                            {t('affiliate.back_to_dashboard')}
                        </Button>
                    </Link>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <Users className="size-5 text-blue-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.total_codes}</p>
                                    <StatHelp 
                                        title={t('affiliate.total_codes')}
                                        description={t('affiliate.help_total_codes')}
                                        detailedContent={t('affiliate.help_total_codes_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <ToggleRight className="size-5 text-green-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.active_codes}</p>
                                    <StatHelp 
                                        title={t('affiliate.active_codes')}
                                        description={t('affiliate.help_active_codes')}
                                        detailedContent={t('affiliate.help_active_codes_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2">
                                <ToggleLeft className="size-5 text-gray-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.inactive_codes}</p>
                                    <StatHelp 
                                        title={t('affiliate.inactive_codes')}
                                        description={t('affiliate.help_inactive_codes')}
                                        detailedContent={t('affiliate.help_inactive_codes_detailed')}
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
                                    <p className="text-2xl font-bold">{codes.total}</p>
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
                                <Calendar className="size-5 text-orange-500" />
                                <div>
                                    <p className="text-2xl font-bold">${Number(stats.total_earnings || 0).toFixed(2)}</p>
                                    <StatHelp 
                                        title={t('affiliate.total_earnings')}
                                        description={t('affiliate.help_total_earnings')}
                                        detailedContent={t('affiliate.help_total_earnings_detailed')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="size-5" />
                            {t('affiliate.filters_search')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <Label htmlFor="search">{t('affiliate.search')}</Label>
                                <div className="relative mt-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                                    <Input
                                        id="search"
                                        placeholder={t('affiliate.search_by_code_name_email')}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="sm:w-48">
                                <Label htmlFor="status">{t('affiliate.status')}</Label>
                                <select
                                    id="status"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                >
                                    <option value="all">{t('affiliate.all_status')}</option>
                                    <option value="active">{t('affiliate.active_only')}</option>
                                    <option value="inactive">{t('affiliate.inactive_only')}</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Codes Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('affiliate.affiliate_codes_title')}</CardTitle>
                        <CardDescription>
                            {t('affiliate.showing')} {filteredCodes.length} {t('affiliate.of')} {codes.total} {t('affiliate.codes')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {filteredCodes.length > 0 ? (
                            <div className="space-y-4">
                                {filteredCodes.map((code) => (
                                    <div key={code.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <code className="px-3 py-1 bg-muted rounded-md font-mono text-sm">
                                                        {code.code}
                                                    </code>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => copyToClipboard(code.code)}
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Copy className="size-4" />
                                                    </Button>
                                                </div>
                                                <div>
                                                    <p className="font-medium">{code.user_name}</p>
                                                    <p className="text-sm text-muted-foreground">{code.user_email}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant={code.is_active ? "default" : "secondary"}>
                                                            {code.is_active ? t('Active') : t('Inactive')}
                                                        </Badge>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => toggleCodeStatus(code.id)}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            {code.is_active ? (
                                                                <Eye className="size-4" />
                                                            ) : (
                                                                <EyeOff className="size-4" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {t('affiliate.created')} {new Date(code.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                
                                                <div className="text-right min-w-[120px]">
                                                    <p className="text-sm font-medium">
                                                        {code.total_referrals} {t('referrals')}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {code.active_referrals} {t('active')}
                                                    </p>
                                                </div>
                                                
                                                <div className="text-right min-w-[100px]">
                                                    <p className="text-sm font-medium">
                                                        ${Number(code.total_earnings || 0).toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {t('affiliate.earnings')}
                                                    </p>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => copyToClipboard(getAffiliateLink(code.code))}
                                                        className="gap-2"
                                                    >
                                                        <ExternalLink className="size-4" />
                                                        {t('affiliate.copy_link')}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Users className="size-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">
                                    {searchTerm || statusFilter !== 'all' 
                                        ? t('affiliate.no_codes_match_filters') 
                                        : t('affiliate.no_affiliate_codes_found')
                                    }
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {codes.last_page > 1 && (
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    {t('affiliate.showing')} {codes.from} {t('affiliate.to')} {codes.to} {t('affiliate.of')} {codes.total} {t('affiliate.results')}
                                </p>
                                <div className="flex items-center gap-2">
                                    {codes.links.map((link, index) => (
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
