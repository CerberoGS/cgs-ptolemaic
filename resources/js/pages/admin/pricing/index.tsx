import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTrans } from '@/hooks/useTrans';
import { router } from '@inertiajs/react';
import { Edit, ToggleLeft, ToggleRight, Plus, Minus, RotateCcw, Clock, Users, Percent } from 'lucide-react';

interface PricingPlan {
    id: number;
    plan_type: string;
    plan_name: string;
    price_monthly: number;
    price_yearly: number;
    offer_active: boolean;
    offer_name: string | null;
    offer_price_monthly: number | null;
    offer_price_yearly: number | null;
    offer_starts_at: string | null;
    offer_ends_at: string | null;
    scarcity_active: boolean;
    scarcity_message: string | null;
    scarcity_limit: number | null;
    scarcity_sold: number;
    is_active: boolean;
    discount_percentage: number;
    time_remaining: string | null;
    scarcity_percentage: number;
    remaining_slots: number;
}

interface Props {
    pricingPlans: PricingPlan[];
}

export default function PricingIndex({ pricingPlans }: Props) {
    const t = useTrans();

    const handleEdit = (planId: number) => {
        router.visit(`/${window.location.pathname.split('/')[1]}/admin/pricing/${planId}/edit`);
    };

    const handleToggleOffer = (planId: number) => {
        router.post(`/${window.location.pathname.split('/')[1]}/admin/pricing/${planId}/toggle-offer`);
    };

    const handleToggleScarcity = (planId: number) => {
        router.post(`/${window.location.pathname.split('/')[1]}/admin/pricing/${planId}/toggle-scarcity`);
    };

    const handleIncrementScarcity = (planId: number) => {
        router.post(`/${window.location.pathname.split('/')[1]}/admin/pricing/${planId}/increment-scarcity`);
    };

    const handleResetScarcity = (planId: number) => {
        router.post(`/${window.location.pathname.split('/')[1]}/admin/pricing/${planId}/reset-scarcity`);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <AppLayout
            title={t('pricing.title')}
            breadcrumbs={[
                { label: t('Dashboard'), href: '/dashboard' },
                { label: t('pricing.title'), href: null },
            ]}
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('pricing.title')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('pricing.pricing_plans')}
                        </p>
                    </div>
                </div>

                <div className="grid gap-6">
                    {pricingPlans.map((plan) => (
                        <Card key={plan.id} className="overflow-hidden">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg font-semibold">
                                            {plan.plan_name}
                                        </CardTitle>
                                        <CardDescription>
                                            {t('pricing.fields.plan_type')}: {plan.plan_type}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {plan.offer_active && (
                                            <Badge variant="destructive" className="gap-1">
                                                <Percent className="h-3 w-3" />
                                                {plan.discount_percentage}% OFF
                                            </Badge>
                                        )}
                                        {plan.scarcity_active && (
                                            <Badge variant="outline" className="gap-1">
                                                <Users className="h-3 w-3" />
                                                {plan.remaining_slots} left
                                            </Badge>
                                        )}
                                        <Badge variant={plan.is_active ? 'default' : 'secondary'}>
                                            {plan.is_active ? t('pricing.status.active') : t('pricing.status.inactive')}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Pricing Info */}
                                    <div>
                                        <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
                                            {t('pricing.fields.price_monthly')}
                                        </h4>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-semibold">
                                                    {formatPrice(plan.price_monthly)}
                                                </span>
                                                {plan.offer_active && plan.offer_price_monthly && (
                                                    <span className="text-sm text-gray-500 line-through">
                                                        {formatPrice(plan.offer_price_monthly)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {t('pricing.fields.price_yearly')}: {formatPrice(plan.price_yearly)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Offer Info */}
                                    <div>
                                        <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
                                            {t('pricing.fields.offer_name')}
                                        </h4>
                                        <div className="space-y-1">
                                            {plan.offer_active ? (
                                                <>
                                                    <div className="text-sm font-medium">
                                                        {plan.offer_name || 'Active Offer'}
                                                    </div>
                                                    {plan.time_remaining && (
                                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {plan.time_remaining}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="text-sm text-gray-500">
                                                    {t('pricing.status.offer_inactive')}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Scarcity Info */}
                                    <div>
                                        <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
                                            {t('pricing.fields.scarcity_message')}
                                        </h4>
                                        <div className="space-y-1">
                                            {plan.scarcity_active ? (
                                                <>
                                                    <div className="text-sm">
                                                        {plan.scarcity_message || 'Limited availability'}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {plan.scarcity_sold} / {plan.scarcity_limit} sold ({plan.scarcity_percentage}%)
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-sm text-gray-500">
                                                    {t('pricing.status.scarcity_inactive')}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(plan.id)}
                                            className="gap-2"
                                        >
                                            <Edit className="h-4 w-4" />
                                            {t('pricing.actions.edit')}
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleToggleOffer(plan.id)}
                                            className="gap-2"
                                        >
                                            {plan.offer_active ? (
                                                <ToggleRight className="h-4 w-4" />
                                            ) : (
                                                <ToggleLeft className="h-4 w-4" />
                                            )}
                                            {t('pricing.actions.toggle_offer')}
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleToggleScarcity(plan.id)}
                                            className="gap-2"
                                        >
                                            {plan.scarcity_active ? (
                                                <ToggleRight className="h-4 w-4" />
                                            ) : (
                                                <ToggleLeft className="h-4 w-4" />
                                            )}
                                            {t('pricing.actions.toggle_scarcity')}
                                        </Button>

                                        {plan.scarcity_active && (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleIncrementScarcity(plan.id)}
                                                    className="gap-2"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    {t('pricing.actions.increment_scarcity')}
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleResetScarcity(plan.id)}
                                                    className="gap-2"
                                                >
                                                    <RotateCcw className="h-4 w-4" />
                                                    {t('pricing.actions.reset_scarcity')}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
