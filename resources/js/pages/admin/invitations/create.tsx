import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTrans, useLocale } from '@/hooks/useTrans';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

type Plan = {
    value: string;
    label: string;
    emoji: string;
};

type Props = {
    plans: Plan[];
};

export default function InvitationsCreate({ plans }: Props) {
    const t = useTrans();
    const locale = useLocale();

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        target_plan: '',
        price_monthly: '',
        discount_percent: '',
        trial_duration_days: '',
        usage_limit: '',
        expires_at: '',
        referred_by: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/${locale}/admin/invitations`);
    };

    return (
        <AppSidebarLayout>
            <Head title={t('Create Invitation')} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/${locale}/admin/invitations`}>
                            <ArrowLeft className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('Create Invitation')}</h1>
                        <p className="mt-2 text-muted-foreground">
                            {t('Generate a new invitation code with custom settings')}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Basic Information')}</CardTitle>
                            <CardDescription>
                                {t('Provide a name and description for this invitation')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="name">{t('Name')} *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder={t('e.g., Partner Program, Beta Access')}
                                    className={errors.name ? 'border-red-500' : ''}
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description">{t('Description')}</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder={t('Optional description for internal use')}
                                    rows={3}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Plan Configuration')}</CardTitle>
                            <CardDescription>
                                {t('Configure the target plan and pricing')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="target_plan">{t('Target Plan')} *</Label>
                                <Select value={data.target_plan} onValueChange={(value) => setData('target_plan', value)}>
                                    <SelectTrigger className={errors.target_plan ? 'border-red-500' : ''}>
                                        <SelectValue placeholder={t('Select a plan')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {plans.map((plan) => (
                                            <SelectItem key={plan.value} value={plan.value}>
                                                <span className="flex items-center gap-2">
                                                    <span>{plan.emoji}</span>
                                                    <span>{plan.label}</span>
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.target_plan && (
                                    <p className="mt-1 text-sm text-red-500">{errors.target_plan}</p>
                                )}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="price_monthly">{t('Price Monthly')} ($)</Label>
                                    <Input
                                        id="price_monthly"
                                        type="number"
                                        step="0.01"
                                        value={data.price_monthly}
                                        onChange={(e) => setData('price_monthly', e.target.value)}
                                        placeholder="49.00"
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {t('Leave empty for free')}
                                    </p>
                                </div>

                                <div>
                                    <Label htmlFor="discount_percent">{t('Discount %')}</Label>
                                    <Input
                                        id="discount_percent"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={data.discount_percent}
                                        onChange={(e) => setData('discount_percent', e.target.value)}
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="trial_duration_days">{t('Trial Duration (days)')}</Label>
                                <Input
                                    id="trial_duration_days"
                                    type="number"
                                    min="1"
                                    max="365"
                                    value={data.trial_duration_days}
                                    onChange={(e) => setData('trial_duration_days', e.target.value)}
                                    placeholder="30"
                                />
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {t('Number of days for the trial period')}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Usage Limits')}</CardTitle>
                            <CardDescription>
                                {t('Set limits and expiration for this invitation')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="usage_limit">{t('Usage Limit')}</Label>
                                    <Input
                                        id="usage_limit"
                                        type="number"
                                        min="1"
                                        value={data.usage_limit}
                                        onChange={(e) => setData('usage_limit', e.target.value)}
                                        placeholder={t('Unlimited')}
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {t('Leave empty for unlimited uses')}
                                    </p>
                                </div>

                                <div>
                                    <Label htmlFor="expires_at">{t('Expires At')}</Label>
                                    <Input
                                        id="expires_at"
                                        type="datetime-local"
                                        value={data.expires_at}
                                        onChange={(e) => setData('expires_at', e.target.value)}
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {t('Leave empty for no expiration')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="referred_by">{t('Referred By')}</Label>
                                <Input
                                    id="referred_by"
                                    value={data.referred_by}
                                    onChange={(e) => setData('referred_by', e.target.value)}
                                    placeholder={t('Partner name or source')}
                                />
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {t('Optional field for tracking purposes')}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" asChild>
                            <Link href={`/${locale}/admin/invitations`}>{t('Cancel')}</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? t('Creating...') : t('Create Invitation')}
                        </Button>
                    </div>
                </form>
            </div>
        </AppSidebarLayout>
    );
}

