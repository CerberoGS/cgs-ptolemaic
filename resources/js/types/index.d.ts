import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User | null;
    roles: string[];
    permissions: string[];
    hasPassword?: boolean;
    plan: PlanSummary | null;
    gates: AuthGates | null;
}

export interface AuthGates {
    // Plan-based features
    canAccessIntegrations: boolean;
    canManageOwnApiKeys: boolean;
    canUseManagedKeys: boolean;

    // AI Features
    canUseAiAnalysis: boolean;
    canUseAdvancedAutomation: boolean;
    canUseAdvancedAnalytics: boolean;

    // Plan checks
    isPaidPlan: boolean;
    hasActiveTrial: boolean;
    withinDailyLimit: boolean;

    // Combined checks
    canAccessAdminFeatures: boolean;
    canManageFeedback: boolean;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface PlanSummary {
    type: string;
    label: string;
    isTrial: boolean;
    isPaid: boolean;
    trialEndsAt: string | null;
    canAccessIntegrations: boolean;
    canManageProviderKeys: boolean;
    usesManagedKeys: boolean;
    isInternal: boolean;
    managedLimits: {
        daily: number | null;
        monthly: number | null;
    };
    emoji: string;
    accentColor: string;
    tagline: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
