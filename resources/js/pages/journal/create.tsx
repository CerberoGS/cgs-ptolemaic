import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import journalRoutes from '@/routes/journal';
import { dashboard as dashboardRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useLocale, useTrans } from '@/hooks/useTrans';
import { FormEventHandler } from 'react';

export default function JournalCreate() {
    const t = useTrans();
    const locale = useLocale();
    const pageTitle = t('New Entry');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Dashboard'),
            href: dashboardRoute({ locale }).url,
        },
        {
            title: t('Trading Journal'),
            href: journalRoutes.index({ locale }).url,
        },
        {
            title: pageTitle,
            href: journalRoutes.create({ locale }).url,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        symbol: '',
        direction: 'long',
        asset_type: 'stock',
        entry_price: '',
        exit_price: '',
        quantity: '',
        setup_type: '',
        notes: '',
        tags: '',
        emotion: '',
        trade_date: new Date().toISOString().split('T')[0],
        entry_time: '',
        exit_time: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(journalRoutes.store({ locale }).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />

            <div className="mx-auto max-w-4xl space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
                    <p className="text-muted-foreground">
                        {t('Add a new trade to your journal')}
                    </p>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Trade Details')}</CardTitle>
                            <CardDescription>
                                {t('Enter the details of your trade')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Basic Info */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="symbol">
                                        {t('Symbol')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="symbol"
                                        value={data.symbol}
                                        onChange={(e) => setData('symbol', e.target.value.toUpperCase())}
                                        placeholder="AAPL, EURUSD, BTC..."
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {t('The ticker or symbol of the asset you traded. Examples: AAPL (Apple stock), EURUSD (Euro/Dollar), BTCUSD (Bitcoin)')}
                                    </p>
                                    <InputError message={errors.symbol} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="asset_type">
                                        {t('Asset Type')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.asset_type}
                                        onValueChange={(value) => setData('asset_type', value)}
                                    >
                                        <SelectTrigger id="asset_type">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="stock">{t('Stock')}</SelectItem>
                                            <SelectItem value="forex">{t('Forex')}</SelectItem>
                                            <SelectItem value="crypto">{t('Crypto')}</SelectItem>
                                            <SelectItem value="option">{t('Option')}</SelectItem>
                                            <SelectItem value="future">{t('Future')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">
                                        {t('Type of financial instrument: Stock (shares), Forex (currencies), Crypto (cryptocurrencies), Options, Futures')}
                                    </p>
                                    <InputError message={errors.asset_type} />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="direction">
                                        {t('Direction')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.direction}
                                        onValueChange={(value) => setData('direction', value)}
                                    >
                                        <SelectTrigger id="direction">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="long">{t('Long')}</SelectItem>
                                            <SelectItem value="short">{t('Short')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">
                                        {t('Long = Buy (expecting price to rise), Short = Sell (expecting price to fall)')}
                                    </p>
                                    <InputError message={errors.direction} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="setup_type">{t('Setup Type')}</Label>
                                    <Input
                                        id="setup_type"
                                        value={data.setup_type}
                                        onChange={(e) => setData('setup_type', e.target.value)}
                                        placeholder="Breakout, Reversal, Pullback..."
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {t('Trading strategy used. Examples: Breakout, Reversal, Pullback, Support/Resistance, Momentum')}
                                    </p>
                                    <InputError message={errors.setup_type} />
                                </div>
                            </div>

                            {/* Price & Quantity */}
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="entry_price">
                                        {t('Entry Price')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="entry_price"
                                        type="number"
                                        step="0.0001"
                                        value={data.entry_price}
                                        onChange={(e) => setData('entry_price', e.target.value)}
                                        placeholder="150.50"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {t('Price at which you opened the position. Example: 150.50 for a stock at $150.50')}
                                    </p>
                                    <InputError message={errors.entry_price} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="exit_price">{t('Exit Price')}</Label>
                                    <Input
                                        id="exit_price"
                                        type="number"
                                        step="0.0001"
                                        value={data.exit_price}
                                        onChange={(e) => setData('exit_price', e.target.value)}
                                        placeholder="155.75"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {t('Price at which you closed the position. Leave empty if still open. P&L will be calculated automatically.')}
                                    </p>
                                    <InputError message={errors.exit_price} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="quantity">
                                        {t('Quantity')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        step="0.0001"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        placeholder="10"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {t('Number of units traded. Examples: 10 (shares), 0.5 (BTC), 1000 (units in Forex)')}
                                    </p>
                                    <InputError message={errors.quantity} />
                                </div>
                            </div>

                            {/* Dates & Times */}
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="trade_date">
                                        {t('Trade Date')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="trade_date"
                                        type="date"
                                        value={data.trade_date}
                                        onChange={(e) => setData('trade_date', e.target.value)}
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {t('Date when you executed this trade')}
                                    </p>
                                    <InputError message={errors.trade_date} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="entry_time">{t('Entry Time')}</Label>
                                    <Input
                                        id="entry_time"
                                        type="time"
                                        value={data.entry_time}
                                        onChange={(e) => setData('entry_time', e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {t('Time you entered the position (optional). Example: 09:30 AM')}
                                    </p>
                                    <InputError message={errors.entry_time} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="exit_time">{t('Exit Time')}</Label>
                                    <Input
                                        id="exit_time"
                                        type="time"
                                        value={data.exit_time}
                                        onChange={(e) => setData('exit_time', e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {t('Time you exited the position (optional). Example: 15:45 PM')}
                                    </p>
                                    <InputError message={errors.exit_time} />
                                </div>
                            </div>

                            {/* Notes & Tags */}
                            <div className="space-y-2">
                                <Label htmlFor="notes">{t('Notes')}</Label>
                                <textarea
                                    id="notes"
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder={t('Analysis, reasons, lessons learned...')}
                                />
                                <p className="text-xs text-muted-foreground">
                                    {t('Detailed notes about this trade: why you entered, your analysis, what worked, mistakes, lessons learned, market conditions, etc.')}
                                </p>
                                <InputError message={errors.notes} />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="tags">{t('Tags')}</Label>
                                    <Input
                                        id="tags"
                                        value={data.tags}
                                        onChange={(e) => setData('tags', e.target.value)}
                                        placeholder="momentum, breakout, swing"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {t('Keywords to categorize this trade. Separate with commas. Examples: momentum, high-confidence, mistake, scalp')}
                                    </p>
                                    <InputError message={errors.tags} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="emotion">{t('Emotion (1-5)')}</Label>
                                    <Input
                                        id="emotion"
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={data.emotion}
                                        onChange={(e) => setData('emotion', e.target.value)}
                                        placeholder="3"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {t('Your emotional state during the trade: 1=Fearful/Anxious, 2=Uncertain, 3=Neutral, 4=Confident, 5=Very Confident')}
                                    </p>
                                    <InputError message={errors.emotion} />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? t('Creating...') : t('Create Entry')}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    {t('Cancel')}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
