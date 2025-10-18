import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import adminRoutes from '@/routes/admin';
import { dashboard, home } from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, CreditCard, Folder, LayoutGrid, Plug, ShieldCheck, BookText, Trophy, BarChart3, MessageSquare, Ticket, DollarSign, Globe, Users, Bot } from 'lucide-react';
import AppLogo from './app-logo';
import { useLocale, useTrans } from '@/hooks/useTrans';
import integrationsRoutes from '@/routes/settings/integrations';
import planRoutes from '@/routes/settings/plan';
import affiliateRoutes from '@/routes/settings/affiliate';
import journalRoutes from '@/routes/journal';
import achievementsRoutes from '@/routes/achievements';
import analyticsRoutes from '@/routes/analytics';

const footerNavItems: NavItem[] = [
    {
        title: 'Cerbero G.S LLC',
        href: 'https://cerberogrowthsolutions.com/',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://cerberogrowthsolutions.com/docs/',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const locale = useLocale();
    const t = useTrans();
    const page = usePage<SharedData>();
    const permissions = page.props.auth?.permissions ?? [];
    const plan = page.props.auth?.plan;

    // DEBUG: Log permissions and user info
    console.log('🔍 DEBUG SIDEBAR:', {
        user: page.props.auth?.user?.email,
        permissions: permissions,
        hasAdminManage: permissions.includes('admin.manage'),
        hasAdminDashboard: permissions.includes('admin.dashboard'),
        hasAffiliateManage: permissions.includes('affiliate.manage'),
    });

    const mainNavItems: NavItem[] = [
        {
            title: t('components.dashboard'),
            href: dashboard({ locale }),
            icon: LayoutGrid,
        },
        {
            title: t('components.trading_journal'),
            href: journalRoutes.index({ locale }),
            icon: BookText,
        },
        {
            title: t('components.analytics'),
            href: analyticsRoutes.index({ locale }),
            icon: BarChart3,
        },
        {
            title: t('components.achievements'),
            href: achievementsRoutes.index({ locale }),
            icon: Trophy,
        },
    ];

    // Feedback access for managers and admins
    if (permissions.includes('feedback.manage')) {
        mainNavItems.push({
            title: t('components.feedback'),
            href: `/${locale}/admin/feedback`,
            icon: MessageSquare,
        });
    }

    // Invitations access for admins
    if (permissions.includes('invitations.manage')) {
        mainNavItems.push({
            title: t('components.invitations'),
            href: `/${locale}/admin/invitations`,
            icon: Ticket,
        });
    }

    // Pricing access for admins
    if (permissions.includes('pricing.manage')) {
        mainNavItems.push({
            title: t('pricing.title'),
            href: `/${locale}/admin/pricing`,
            icon: DollarSign,
        });
    }

    // Languages access for admins
    if (permissions.includes('languages.manage')) {
        mainNavItems.push({
            title: t('admin.languages'),
            href: `/${locale}/admin/languages`,
            icon: Globe,
        });
    }

    // Waitlist access for admins
    if (permissions.includes('admin.dashboard')) {
        mainNavItems.push({
            title: t('Waitlist Management'),
            href: `/${locale}/admin/waitlist`,
            icon: Users,
        });
    }

    // Affiliate management access for admins
    if (permissions.includes('affiliate.manage')) {
        mainNavItems.push({
            title: t('Affiliate Management'),
            href: `/${locale}/admin/affiliate`,
            icon: Users,
        });
    }

    // Telegram configuration access for admins
    if (permissions.includes('admin.manage')) {
        mainNavItems.push({
            title: t('admin.telegram_config.title'),
            href: adminRoutes.telegramConfig({ locale }),
            icon: Bot,
        });
    }

    // Administration access (only for users with admin dashboard permission)
    const canAccessAdmin =
        permissions.includes('admin.dashboard') ||
        permissions.includes('providers.view') ||
        permissions.includes('providers.manage') ||
        permissions.includes('users.view') ||
        permissions.includes('users.manage') ||
        permissions.includes('roles.view') ||
        permissions.includes('roles.manage');

    if (canAccessAdmin) {
        mainNavItems.push({
            title: t('components.administration'),
            href: adminRoutes.dashboard({ locale }),
            icon: ShieldCheck,
        });
    }

    if (plan?.canAccessIntegrations) {
        mainNavItems.push({
            title: t('components.integrations'),
            href: integrationsRoutes.index({ locale }),
            icon: Plug,
        });
    }

    mainNavItems.push({
        title: t('Plan & Billing'),
        href: planRoutes.show({ locale }),
        icon: CreditCard,
    });

    // Affiliate program for non-internal users
    if (!plan?.isInternal) {
        mainNavItems.push({
            title: t('Affiliate Program'),
            href: affiliateRoutes.index({ locale }),
            icon: Users,
        });
    }

    const localizedFooter = footerNavItems.map((item) => ({
        ...item,
        title: t(item.title),
    }));

    // DEBUG: Log final menu items
    console.log('📋 FINAL MENU ITEMS:', mainNavItems.map(item => ({
        title: item.title,
        href: item.href,
        hasIcon: !!item.icon
    })));

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={home({ locale })} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={localizedFooter} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
