import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { useLocale, useTrans } from '@/hooks/useTrans';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import planRoutes from '@/routes/settings/plan';
import { type PlanSummary, type User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { CreditCard, LogOut, Settings, Shield } from 'lucide-react';

interface UserMenuContentProps {
    user: User;
    plan: PlanSummary | null;
}

export function UserMenuContent({ user, plan }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();
    const t = useTrans();
    const locale = useLocale();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            {plan && (
                <div className="flex items-center justify-between px-1.5 pb-2 text-xs text-muted-foreground">
                    <span>{t('components.current_plan')}</span>
                    <span
                        className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 ${
                            plan.isInternal
                                ? 'bg-primary/20 text-primary'
                                : 'bg-primary/10 text-primary'
                        }`}
                    >
                        {plan.isInternal && <Shield className="size-3" />}
                        {!plan.isInternal && plan.emoji && <span className="text-xs">{plan.emoji}</span>}
                        <span className="font-medium">{plan.label}</span>
                    </span>
                </div>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href={edit()}
                        as="button"
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="mr-2" />
                        {t('components.settings')}
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href={planRoutes.show({ locale }).url}
                        as="button"
                        prefetch
                        onClick={cleanup}
                    >
                        <CreditCard className="mr-2" />
                        {t('Plan & Billing')}
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full"
                    href={logout()}
                    method="post"
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    {t('components.log_out')}
                </Link>
            </DropdownMenuItem>
        </>
    );
}
