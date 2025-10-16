import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useTrans } from '@/hooks/useTrans';
import { router, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface PricingPlan {
    id: number;
    plan_type: string;
    plan_name: string;
    price_monthly: number;
    price_yearly: number;
    offer_price_monthly: number | null;
    offer_price_yearly: number | null;
    offer_active: boolean;
    offer_name: string | null;
    offer_description: string | null;
    offer_starts_at: string | null;
    offer_ends_at: string | null;
    scarcity_active: boolean;
    scarcity_message: string | null;
    scarcity_limit: number | null;
    scarcity_sold: number;
    is_active: boolean;
}

interface Props {
    pricingPlan: PricingPlan;
}

export default function PricingEdit({ pricingPlan }: Props) {
    const t = useTrans();

    const { data, setData, put, processing, errors } = useForm({
        price_monthly: pricingPlan.price_monthly,
        price_yearly: pricingPlan.price_yearly,
        offer_price_monthly: pricingPlan.offer_price_monthly || '',
        offer_price_yearly: pricingPlan.offer_price_yearly || '',
        offer_active: pricingPlan.offer_active,
        offer_name: pricingPlan.offer_name || '',
        offer_description: pricingPlan.offer_description || '',
        offer_starts_at: pricingPlan.offer_starts_at || '',
        offer_ends_at: pricingPlan.offer_ends_at || '',
        scarcity_active: pricingPlan.scarcity_active,
        scarcity_message: pricingPlan.scarcity_message || '',
        scarcity_limit: pricingPlan.scarcity_limit || '',
        scarcity_sold: pricingPlan.scarcity_sold,
        is_active: pricingPlan.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/${window.location.pathname.split('/')[1]}/admin/pricing/${pricingPlan.id}`);
    };

    const handleBack = () => {
        router.visit(`/${window.location.pathname.split('/')[1]}/admin/pricing`);
    };

    return (
        <AppLayout
            title={`${t('pricing.edit_pricing')} - ${pricingPlan.plan_name}`}
            breadcrumbs={[
                { label: t('Dashboard'), href: '/dashboard' },
                { label: t('pricing.title'), href: `/${window.location.pathname.split('/')[1]}/admin/pricing` },
                { label: t('pricing.edit_pricing'), href: null },
            ]}
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('pricing.edit_pricing')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {pricingPlan.plan_name} ({pricingPlan.plan_type})
                        </p>
                    </div>
                    <Button variant="outline" onClick={handleBack} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        {t('Back')}
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Normal Pricing */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('pricing.fields.price_monthly')}</CardTitle>
                                <CardDescription>
                                    Precios normales del plan
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="price_monthly">
                                        {t('pricing.fields.price_monthly')}
                                    </Label>
                                    <Input
                                        id="price_monthly"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.price_monthly}
                                        onChange={(e) => setData('price_monthly', parseFloat(e.target.value) || 0)}
                                        className={errors.price_monthly ? 'border-red-500' : ''}
                                    />
                                    {errors.price_monthly && (
                                        <p className="text-sm text-red-600 mt-1">{errors.price_monthly}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="price_yearly">
                                        {t('pricing.fields.price_yearly')}
                                    </Label>
                                    <Input
                                        id="price_yearly"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.price_yearly}
                                        onChange={(e) => setData('price_yearly', parseFloat(e.target.value) || 0)}
                                        className={errors.price_yearly ? 'border-red-500' : ''}
                                    />
                                    {errors.price_yearly && (
                                        <p className="text-sm text-red-600 mt-1">{errors.price_yearly}</p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                    <Label htmlFor="is_active">{t('pricing.fields.is_active')}</Label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Offer Pricing */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('pricing.fields.offer_name')}</CardTitle>
                                <CardDescription>
                                    Configuración de ofertas especiales
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="offer_active"
                                        checked={data.offer_active}
                                        onCheckedChange={(checked) => setData('offer_active', checked)}
                                    />
                                    <Label htmlFor="offer_active">{t('pricing.fields.offer_active')}</Label>
                                </div>

                                {data.offer_active && (
                                    <>
                                        <div>
                                            <Label htmlFor="offer_name">
                                                {t('pricing.fields.offer_name')}
                                            </Label>
                                            <Input
                                                id="offer_name"
                                                value={data.offer_name}
                                                onChange={(e) => setData('offer_name', e.target.value)}
                                                placeholder="Black Friday Sale"
                                                className={errors.offer_name ? 'border-red-500' : ''}
                                            />
                                            {errors.offer_name && (
                                                <p className="text-sm text-red-600 mt-1">{errors.offer_name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="offer_description">
                                                {t('pricing.fields.offer_description')}
                                            </Label>
                                            <Textarea
                                                id="offer_description"
                                                value={data.offer_description}
                                                onChange={(e) => setData('offer_description', e.target.value)}
                                                placeholder="Special discount for limited time"
                                                className={errors.offer_description ? 'border-red-500' : ''}
                                            />
                                            {errors.offer_description && (
                                                <p className="text-sm text-red-600 mt-1">{errors.offer_description}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="offer_price_monthly">
                                                {t('pricing.fields.offer_price_monthly')}
                                            </Label>
                                            <Input
                                                id="offer_price_monthly"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={data.offer_price_monthly}
                                                onChange={(e) => setData('offer_price_monthly', parseFloat(e.target.value) || 0)}
                                                className={errors.offer_price_monthly ? 'border-red-500' : ''}
                                            />
                                            {errors.offer_price_monthly && (
                                                <p className="text-sm text-red-600 mt-1">{errors.offer_price_monthly}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="offer_price_yearly">
                                                {t('pricing.fields.offer_price_yearly')}
                                            </Label>
                                            <Input
                                                id="offer_price_yearly"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={data.offer_price_yearly}
                                                onChange={(e) => setData('offer_price_yearly', parseFloat(e.target.value) || 0)}
                                                className={errors.offer_price_yearly ? 'border-red-500' : ''}
                                            />
                                            {errors.offer_price_yearly && (
                                                <p className="text-sm text-red-600 mt-1">{errors.offer_price_yearly}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="offer_starts_at">
                                                {t('pricing.fields.offer_starts_at')}
                                            </Label>
                                            <Input
                                                id="offer_starts_at"
                                                type="datetime-local"
                                                value={data.offer_starts_at}
                                                onChange={(e) => setData('offer_starts_at', e.target.value)}
                                                className={errors.offer_starts_at ? 'border-red-500' : ''}
                                            />
                                            {errors.offer_starts_at && (
                                                <p className="text-sm text-red-600 mt-1">{errors.offer_starts_at}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="offer_ends_at">
                                                {t('pricing.fields.offer_ends_at')}
                                            </Label>
                                            <Input
                                                id="offer_ends_at"
                                                type="datetime-local"
                                                value={data.offer_ends_at}
                                                onChange={(e) => setData('offer_ends_at', e.target.value)}
                                                className={errors.offer_ends_at ? 'border-red-500' : ''}
                                            />
                                            {errors.offer_ends_at && (
                                                <p className="text-sm text-red-600 mt-1">{errors.offer_ends_at}</p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Scarcity Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('pricing.fields.scarcity_message')}</CardTitle>
                            <CardDescription>
                                Configuración de escasez para crear urgencia
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="scarcity_active"
                                    checked={data.scarcity_active}
                                    onCheckedChange={(checked) => setData('scarcity_active', checked)}
                                />
                                <Label htmlFor="scarcity_active">{t('pricing.fields.scarcity_active')}</Label>
                            </div>

                            {data.scarcity_active && (
                                <>
                                    <div>
                                        <Label htmlFor="scarcity_message">
                                            {t('pricing.fields.scarcity_message')}
                                        </Label>
                                        <Input
                                            id="scarcity_message"
                                            value={data.scarcity_message}
                                            onChange={(e) => setData('scarcity_message', e.target.value)}
                                            placeholder="Only 50 spots left!"
                                            className={errors.scarcity_message ? 'border-red-500' : ''}
                                        />
                                        {errors.scarcity_message && (
                                            <p className="text-sm text-red-600 mt-1">{errors.scarcity_message}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="scarcity_limit">
                                                {t('pricing.fields.scarcity_limit')}
                                            </Label>
                                            <Input
                                                id="scarcity_limit"
                                                type="number"
                                                min="1"
                                                value={data.scarcity_limit}
                                                onChange={(e) => setData('scarcity_limit', parseInt(e.target.value) || 0)}
                                                className={errors.scarcity_limit ? 'border-red-500' : ''}
                                            />
                                            {errors.scarcity_limit && (
                                                <p className="text-sm text-red-600 mt-1">{errors.scarcity_limit}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="scarcity_sold">
                                                {t('pricing.fields.scarcity_sold')}
                                            </Label>
                                            <Input
                                                id="scarcity_sold"
                                                type="number"
                                                min="0"
                                                value={data.scarcity_sold}
                                                onChange={(e) => setData('scarcity_sold', parseInt(e.target.value) || 0)}
                                                className={errors.scarcity_sold ? 'border-red-500' : ''}
                                            />
                                            {errors.scarcity_sold && (
                                                <p className="text-sm text-red-600 mt-1">{errors.scarcity_sold}</p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} className="gap-2">
                            <Save className="h-4 w-4" />
                            {processing ? t('Saving...') : t('pricing.actions.save')}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
