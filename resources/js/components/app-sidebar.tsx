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
import { dashboard, home } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
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

    const mainNavItems: NavItem[] = [
        {
            title: t('Dashboard'),
            href: dashboard({ locale }),
            icon: LayoutGrid,
        },
    ];

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
