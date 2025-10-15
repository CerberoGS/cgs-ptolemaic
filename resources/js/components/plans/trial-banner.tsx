import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Clock, CreditCard, Sparkles } from 'lucide-react';
import { useTrans } from '@/hooks/useTrans';

interface TrialBannerProps {
    daysLeft: number;
    variant?: 'info' | 'warning' | 'success';
    showCardExtension?: boolean;
    onAddCard?: () => void;
    onDismiss?: () => void;
}

export function TrialBanner({
    daysLeft,
    variant = 'info',
    showCardExtension = false,
    onAddCard,
    onDismiss,
}: TrialBannerProps) {
    const t = useTrans();

    const getVariantStyles = () => {
        switch (variant) {
            case 'warning':
                return 'border-amber-500/50 bg-amber-500/10 text-amber-900 dark:text-amber-100';
            case 'success':
                return 'border-green-500/50 bg-green-500/10 text-green-900 dark:text-green-100';
            default:
                return 'border-cyan-500/50 bg-cyan-500/10 text-cyan-900 dark:text-cyan-100';
        }
    };

    const getIcon = () => {
        if (showCardExtension) {
            return <Sparkles className="size-5" />;
        }
        if (daysLeft <= 5) {
            return <Clock className="size-5" />;
        }
        return <Sparkles className="size-5" />;
    };

    return (
        <Alert className={getVariantStyles()}>
            <div className="flex items-start gap-3">
                {getIcon()}
                <div className="flex-1 space-y-2">
                    <AlertDescription className="font-medium">
                        {daysLeft > 0 ? (
                            <>
                                {daysLeft <= 5 ? (
                                    <span>{t('Your trial ends soon')}</span>
                                ) : (
                                    <span>{t(':days days left in your trial', { days: daysLeft })}</span>
                                )}
                            </>
                        ) : (
                            <span>{t('Your trial has ended')}</span>
                        )}
                    </AlertDescription>
                    
                    {showCardExtension && daysLeft > 0 && (
                        <AlertDescription className="text-sm opacity-90">
                            {t('Add your card to extend 30 more days. Cancel anytime.')}
                        </AlertDescription>
                    )}

                    <div className="flex flex-wrap gap-2 pt-1">
                        {showCardExtension && onAddCard && daysLeft > 0 && (
                            <Button
                                size="sm"
                                variant="default"
                                className="h-8"
                                onClick={onAddCard}
                            >
                                <CreditCard className="mr-2 size-3" />
                                {t('Add card & get +30 extra days')}
                            </Button>
                        )}
                        {onDismiss && (
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-8"
                                onClick={onDismiss}
                            >
                                {t('Remind me later')}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Alert>
    );
}

