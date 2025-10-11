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
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ShieldCheck } from 'lucide-react';
import AppLogo from './app-logo';
import { useLocale, useTrans } from '@/hooks/useTrans';

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
    const page = usePage<{ auth: { roles: string[]; permissions: string[] } }>();
    const permissions = page.props.auth?.permissions ?? [];

    const mainNavItems: NavItem[] = [
        {
            title: t('Dashboard'),
            href: dashboard({ locale }),
            icon: LayoutGrid,
        },
    ];

    const canAccessAdmin =
        permissions.includes('admin.dashboard') ||
        permissions.includes('providers.view') ||
        permissions.includes('providers.manage') ||
        permissions.includes('users.view') ||
        permissions.includes('users.manage');

    if (canAccessAdmin) {
        mainNavItems.push({
            title: t('Administration'),
            href: adminRoutes.dashboard({ locale }),
            icon: ShieldCheck,
        });
    }

    const localizedFooter = footerNavItems.map((item) => ({
        ...item,
        title: t(item.title),
    }));

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
