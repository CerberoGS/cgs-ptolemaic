import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTrans } from '@/hooks/useTrans';

interface UpgradeCTAProps {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    variant?: 'default' | 'gradient';
    emoji?: string;
}

export function UpgradeCTA({
    title,
    description,
    ctaText,
    ctaHref,
    variant = 'default',
    emoji,
}: UpgradeCTAProps) {
    const t = useTrans();

    if (variant === 'gradient') {
        return (
            <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        {emoji && (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/50 text-2xl backdrop-blur-sm">
                                {emoji}
                            </div>
                        )}
                        <div className="flex-1 space-y-3">
                            <div>
                                <h3 className="flex items-center gap-2 font-semibold">
                                    <Sparkles className="size-4 text-violet-500" />
                                    {title}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                            </div>
                            <Button asChild className="w-full sm:w-auto" size="sm">
                                <a href={ctaHref}>
                                    {ctaText}
                                    <ArrowRight className="ml-2 size-4" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <Button asChild>
                    <a href={ctaHref}>
                        {ctaText}
                        <ArrowRight className="ml-2 size-4" />
                    </a>
                </Button>
            </CardContent>
        </Card>
    );
}

