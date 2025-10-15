import { Button } from '@/components/ui/button';
import { useTrans } from '@/hooks/useTrans';
import { ArrowRight, CreditCard, ExternalLink, Info } from 'lucide-react';

interface PlanCTAProps {
    // Primary action
    primaryText: string;
    primaryAction: () => void;
    primaryVariant?: 'default' | 'outline' | 'secondary';
    primaryIcon?: 'arrow' | 'card' | 'external';
    primaryDisabled?: boolean;

    // Secondary action (optional)
    secondaryText?: string;
    secondaryAction?: () => void;
    secondaryVariant?: 'outline' | 'ghost' | 'link';

    // Note below buttons
    note?: string;
    noteVariant?: 'info' | 'warning' | 'success';

    // Processing state
    processing?: boolean;
}

export function PlanCTA({
    primaryText,
    primaryAction,
    primaryVariant = 'default',
    primaryIcon = 'arrow',
    primaryDisabled = false,
    secondaryText,
    secondaryAction,
    secondaryVariant = 'outline',
    note,
    noteVariant = 'info',
    processing = false,
}: PlanCTAProps) {
    const t = useTrans();

    const getPrimaryIcon = () => {
        if (processing) {
            return null;
        }

        switch (primaryIcon) {
            case 'card':
                return <CreditCard className="ml-2 size-4" />;
            case 'external':
                return <ExternalLink className="ml-2 size-4" />;
            default:
                return <ArrowRight className="ml-2 size-4" />;
        }
    };

    const getNoteStyles = () => {
        switch (noteVariant) {
            case 'warning':
                return 'text-amber-600 dark:text-amber-400';
            case 'success':
                return 'text-green-600 dark:text-green-400';
            default:
                return 'text-muted-foreground';
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                    onClick={primaryAction}
                    disabled={primaryDisabled || processing}
                    variant={primaryVariant}
                    size="lg"
                    className="w-full sm:w-auto"
                >
                    {processing ? t('Processing...') : primaryText}
                    {getPrimaryIcon()}
                </Button>

                {secondaryText && secondaryAction && (
                    <Button
                        onClick={secondaryAction}
                        variant={secondaryVariant}
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        {secondaryText}
                    </Button>
                )}
            </div>

            {note && (
                <div className={`flex items-start gap-2 text-sm ${getNoteStyles()}`}>
                    <Info className="mt-0.5 size-4 shrink-0" />
                    <p>{note}</p>
                </div>
            )}
        </div>
    );
}

