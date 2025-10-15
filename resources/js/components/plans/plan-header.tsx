import { Badge } from '@/components/ui/badge';
import { useTrans } from '@/hooks/useTrans';
import { cn } from '@/lib/utils';

interface PlanHeaderProps {
    name: string;
    emoji: string;
    tagline: string;
    status?: 'active' | 'trial' | 'expired';
    trialDaysLeft?: number;
    accentColor?: string;
    isInternal?: boolean;
}

export function PlanHeader({
    name,
    emoji,
    tagline,
    status = 'active',
    trialDaysLeft,
    accentColor = 'zinc',
    isInternal = false,
}: PlanHeaderProps) {
    const t = useTrans();

    const getStatusBadge = () => {
        if (isInternal) {
            return (
                <Badge variant="outline" className="border-primary text-primary">
                    {t('Internal Plan')}
                </Badge>
            );
        }

        if (status === 'trial' && trialDaysLeft !== undefined) {
            return (
                <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    {t(':days days left in your trial', { days: trialDaysLeft })}
                </Badge>
            );
        }

        if (status === 'active') {
            return (
                <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400">
                    {t('Active')}
                </Badge>
            );
        }

        return null;
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        'flex h-16 w-16 items-center justify-center rounded-2xl text-4xl',
                        `bg-${accentColor}-500/10 dark:bg-${accentColor}-500/20`,
                    )}
                    style={{
                        backgroundColor: `hsl(var(--${accentColor}-500) / 0.1)`,
                    }}
                >
                    {emoji}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
                        {getStatusBadge()}
                    </div>
                    <p className="mt-1 text-muted-foreground">{tagline}</p>
                </div>
            </div>
        </div>
    );
}

