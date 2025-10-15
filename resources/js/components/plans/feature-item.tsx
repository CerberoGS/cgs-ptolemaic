import { CheckCircle2, Lock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useTrans } from '@/hooks/useTrans';

interface FeatureItemProps {
    feature: string;
    locked?: boolean;
    reason?: string;
    ctaText?: string;
    onCtaClick?: () => void;
}

export function FeatureItem({
    feature,
    locked = false,
    reason,
    ctaText,
    onCtaClick,
}: FeatureItemProps) {
    const t = useTrans();

    if (locked) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-start gap-3 rounded-lg border border-dashed border-muted-foreground/20 bg-muted/30 p-3 opacity-60">
                            <Lock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                            <div className="flex-1 space-y-2">
                                <span className="text-sm text-muted-foreground">{feature}</span>
                                {ctaText && onCtaClick && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 text-xs"
                                        onClick={onCtaClick}
                                    >
                                        {ctaText}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </TooltipTrigger>
                    {reason && (
                        <TooltipContent>
                            <p className="max-w-xs text-sm">{reason}</p>
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>
        );
    }

    return (
        <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
            <span className="text-sm">{feature}</span>
        </div>
    );
}

