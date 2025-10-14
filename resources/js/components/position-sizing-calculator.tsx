import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, TrendingDown, AlertCircle, HelpCircle, Info } from 'lucide-react';
import { useTrans } from '@/hooks/useTrans';

type TradeDirection = 'long' | 'short';

export function PositionSizingCalculator() {
    const t = useTrans();
    const [accountSize, setAccountSize] = useState<string>('10000');
    const [riskPercent, setRiskPercent] = useState<string>('1');
    const [entryPrice, setEntryPrice] = useState<string>('');
    const [stopLoss, setStopLoss] = useState<string>('');
    const [direction, setDirection] = useState<TradeDirection>('long');
    const [errors, setErrors] = useState<string[]>([]);
    const [warnings, setWarnings] = useState<string[]>([]);
    const [result, setResult] = useState<{
        positionSize: number;
        dollarRisk: number;
        shares: number;
        potentialLoss: number;
        riskPerShare: number;
    } | null>(null);

    const calculate = () => {
        const newErrors: string[] = [];
        const newWarnings: string[] = [];

        const account = parseFloat(accountSize);
        const risk = parseFloat(riskPercent);
        const entry = parseFloat(entryPrice);
        const stop = parseFloat(stopLoss);

        // Validaciones
        if (!account || account <= 0) {
            newErrors.push(t('Account size must be greater than zero'));
        }
        if (!risk || risk <= 0) {
            newErrors.push(t('Risk percentage must be greater than zero'));
        }
        if (risk > 10) {
            newWarnings.push(t('Warning: Risking more than 10% per trade is extremely dangerous'));
        }
        if (risk > 5) {
            newWarnings.push(t('Warning: Risking more than 5% per trade is very aggressive'));
        }
        if (!entry || entry <= 0) {
            newErrors.push(t('Entry price must be greater than zero'));
        }
        if (!stop || stop <= 0) {
            newErrors.push(t('Stop loss must be greater than zero'));
        }
        if (entry === stop) {
            newErrors.push(t('Entry price and stop loss cannot be the same'));
        }

        // Validación según dirección
        if (direction === 'long' && stop >= entry) {
            newErrors.push(
                t('For LONG trades, stop loss must be BELOW entry price (stop loss protects if price falls)')
            );
        }
        if (direction === 'short' && stop <= entry) {
            newErrors.push(
                t('For SHORT trades, stop loss must be ABOVE entry price (stop loss protects if price rises)')
            );
        }

        setErrors(newErrors);
        setWarnings(newWarnings);

        if (newErrors.length > 0) {
            setResult(null);
            return;
        }

        const dollarRisk = (account * risk) / 100;
        const riskPerShare = Math.abs(entry - stop);
        const riskPercentOfEntry = (riskPerShare / entry) * 100;

        // Advertencias adicionales
        if (riskPercentOfEntry > 10) {
            newWarnings.push(
                t('Warning: Stop loss is very far (:percent% from entry). Consider a tighter stop loss.', {
                    percent: riskPercentOfEntry.toFixed(1),
                })
            );
        }
        if (riskPercentOfEntry < 0.5) {
            newWarnings.push(
                t('Warning: Stop loss is very tight (:percent% from entry). May trigger easily.', {
                    percent: riskPercentOfEntry.toFixed(1),
                })
            );
        }

        const shares = Math.floor(dollarRisk / riskPerShare);
        const positionSize = shares * entry;
        const potentialLoss = shares * riskPerShare;

        if (shares === 0) {
            newWarnings.push(
                t(
                    'Cannot buy even 1 share with this stop loss. Your stop loss is too far ($:risk per share). Reduce your stop loss distance or increase risk percentage.',
                    { risk: riskPerShare.toFixed(2) }
                )
            );
        }

        if (positionSize > account) {
            newWarnings.push(
                t('Warning: Position size ($:position) exceeds account size ($:account)', {
                    position: positionSize.toFixed(2),
                    account: account.toFixed(2),
                })
            );
        }

        setWarnings(newWarnings);
        setResult({
            positionSize,
            dollarRisk,
            shares,
            potentialLoss,
            riskPerShare,
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <Card className="border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    {t('Position Sizing Calculator')}
                </CardTitle>
                <CardDescription>
                    {t('Calculate the optimal position size based on your risk tolerance')}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Direction Selector */}
                <div className="space-y-2">
                    <Label>{t('Trade Direction')}</Label>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant={direction === 'long' ? 'default' : 'outline'}
                            className="flex-1"
                            onClick={() => setDirection('long')}
                        >
                            <TrendingUp className="mr-2 h-4 w-4" />
                            {t('LONG (Buy)')}
                        </Button>
                        <Button
                            type="button"
                            variant={direction === 'short' ? 'default' : 'outline'}
                            className="flex-1"
                            onClick={() => setDirection('short')}
                        >
                            <TrendingDown className="mr-2 h-4 w-4" />
                            {t('SHORT (Sell)')}
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {direction === 'long'
                            ? t('LONG: You buy expecting price to rise. Stop loss protects if price falls.')
                            : t('SHORT: You sell expecting price to fall. Stop loss protects if price rises.')}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="account_size" className="flex items-center gap-1">
                            {t('Account Size')}
                            <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        </Label>
                        <Input
                            id="account_size"
                            type="number"
                            step="100"
                            value={accountSize}
                            onChange={(e) => setAccountSize(e.target.value)}
                            placeholder="10000"
                        />
                        <p className="text-xs text-muted-foreground">
                            {t('Total capital available for trading. Example: $10,000')}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="risk_percent" className="flex items-center gap-1">
                            {t('Risk Per Trade (%)')}
                            <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        </Label>
                        <Input
                            id="risk_percent"
                            type="number"
                            step="0.1"
                            value={riskPercent}
                            onChange={(e) => setRiskPercent(e.target.value)}
                            placeholder="1.0"
                        />
                        <p className="text-xs text-muted-foreground">
                            {t('Maximum % of your account to risk on this trade. Recommended: 1-2%')}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="entry_price" className="flex items-center gap-1">
                            {t('Entry Price')}
                            <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        </Label>
                        <Input
                            id="entry_price"
                            type="number"
                            step="0.01"
                            value={entryPrice}
                            onChange={(e) => setEntryPrice(e.target.value)}
                            placeholder={direction === 'long' ? '150.00' : '50.00'}
                        />
                        <p className="text-xs text-muted-foreground">
                            {direction === 'long'
                                ? t('Price at which you will BUY. Example: $150.00')
                                : t('Price at which you will SELL SHORT. Example: $50.00')}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="stop_loss_calc" className="flex items-center gap-1">
                            {t('Stop Loss Price')}
                            <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        </Label>
                        <Input
                            id="stop_loss_calc"
                            type="number"
                            step="0.01"
                            value={stopLoss}
                            onChange={(e) => setStopLoss(e.target.value)}
                            placeholder={direction === 'long' ? '145.00' : '52.00'}
                        />
                        <p className="text-xs text-muted-foreground">
                            {direction === 'long'
                                ? t(
                                      'Price to exit if trade goes wrong (must be BELOW entry). Example: $145.00 if entry is $150.00'
                                  )
                                : t(
                                      'Price to exit if trade goes wrong (must be ABOVE entry). Example: $52.00 if entry is $50.00'
                                  )}
                        </p>
                    </div>
                </div>

                {/* Errors */}
                {errors.length > 0 && (
                    <div className="space-y-2 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950/20">
                        {errors.map((error, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Warnings */}
                {warnings.length > 0 && (
                    <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/20">
                        {warnings.map((warning, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                                <p className="text-sm text-amber-600 dark:text-amber-400">{warning}</p>
                            </div>
                        ))}
                    </div>
                )}

                <Button onClick={calculate} className="w-full">
                    <Calculator className="mr-2 h-4 w-4" />
                    {t('Calculate')}
                </Button>

                {result && (
                    <div className="space-y-4 rounded-lg border border-primary bg-primary/5 p-4">
                        <h4 className="flex items-center gap-2 font-semibold">
                            <Calculator className="h-5 w-5" />
                            {t('Results')}:
                        </h4>

                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-1 rounded-md bg-background p-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                        <span className="text-sm font-medium">
                                            {direction === 'long' ? t('Shares to Buy') : t('Shares to Sell Short')}
                                        </span>
                                    </div>
                                    <Badge variant="default" className="text-lg">
                                        {result.shares}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {t('Number of shares/contracts for this trade')}
                                </p>
                            </div>

                            <div className="space-y-1 rounded-md bg-background p-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Calculator className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm font-medium">{t('Position Size')}</span>
                                    </div>
                                    <Badge variant="outline" className="text-lg">
                                        {formatCurrency(result.positionSize)}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {t('Total capital invested (shares × entry price)')}
                                </p>
                            </div>

                            <div className="space-y-1 rounded-md bg-background p-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-amber-500" />
                                        <span className="text-sm font-medium">{t('Risk Per Share')}</span>
                                    </div>
                                    <Badge variant="outline" className="text-lg">
                                        {formatCurrency(result.riskPerShare)}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {t('Distance between entry and stop loss')}
                                </p>
                            </div>

                            <div className="space-y-1 rounded-md bg-background p-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TrendingDown className="h-4 w-4 text-red-500" />
                                        <span className="text-sm font-medium">{t('Maximum Loss')}</span>
                                    </div>
                                    <Badge variant="destructive" className="text-lg">
                                        {formatCurrency(result.potentialLoss)}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {t('Loss if stop loss is triggered')} ({riskPercent}% {t('of account')})
                                </p>
                            </div>
                        </div>

                        {/* Summary/Recommendation */}
                        <div className="space-y-3 rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/20">
                            <div className="flex items-start gap-2">
                                <Info className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                                <div className="space-y-2">
                                    <p className="font-semibold text-green-900 dark:text-green-100">
                                        {t('Trade Summary')}:
                                    </p>
                                    <p className="text-sm text-green-800 dark:text-green-200">
                                        {direction === 'long' ? (
                                            <>
                                                {t('BUY')} <strong>{result.shares}</strong> {t('shares at')}{' '}
                                                <strong>{formatCurrency(parseFloat(entryPrice))}</strong>
                                            </>
                                        ) : (
                                            <>
                                                {t('SELL SHORT')} <strong>{result.shares}</strong> {t('shares at')}{' '}
                                                <strong>{formatCurrency(parseFloat(entryPrice))}</strong>
                                            </>
                                        )}
                                    </p>
                                    <p className="text-sm text-green-800 dark:text-green-200">
                                        {t('Stop Loss')}: <strong>{formatCurrency(parseFloat(stopLoss))}</strong> (
                                        {t('Exit if price')} {direction === 'long' ? t('falls to') : t('rises to')}{' '}
                                        {formatCurrency(parseFloat(stopLoss))})
                                    </p>
                                    <div className="mt-3 border-t border-green-200 pt-3 dark:border-green-800">
                                        <p className="text-xs text-green-700 dark:text-green-300">
                                            ✓ {t('Total investment')}: {formatCurrency(result.positionSize)}
                                        </p>
                                        <p className="text-xs text-green-700 dark:text-green-300">
                                            ✓ {t('Maximum risk')}: {formatCurrency(result.potentialLoss)} (
                                            {riskPercent}% {t('of')} {formatCurrency(parseFloat(accountSize))})
                                        </p>
                                        <p className="text-xs text-green-700 dark:text-green-300">
                                            ✓ {t('Risk per share')}: {formatCurrency(result.riskPerShare)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

