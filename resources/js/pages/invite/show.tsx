import { Head, router } from '@inertiajs/react';
import { useTrans } from '@/hooks/useTrans';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Sparkles } from 'lucide-react';

type Props = {
    invitation: {
        code: string;
        name: string;
        description: string | null;
        target_plan: {
            value: string;
            label: string;
            emoji: string;
            tagline: string;
        };
        price_monthly: string | null;
        discount_percent: number;
        trial_duration_days: number | null;
        available_redemptions: string | number;
        expires_at: string | null;
    };
    isAuthenticated: boolean;
};

export default function InviteShow({ invitation, isAuthenticated }: Props) {
    const t = useTrans();

    const handleRedeem = () => {
        if (!isAuthenticated) {
            router.get('/register');
            return;
        }

        router.post(`/invite/${invitation.code}/redeem`);
    };

    return (
        <>
            <Head title={`${t('Invitation')}: ${invitation.name}`} />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
                <Card className="w-full max-w-2xl border-2 shadow-xl">
                    <CardHeader className="text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-5xl">
                                {invitation.target_plan.emoji}
                            </div>
                        </div>
                        <CardTitle className="text-3xl">
                            {t('You\'re invited to')} {invitation.target_plan.label}!
                        </CardTitle>
                        <CardDescription className="text-lg">
                            {invitation.description || invitation.target_plan.tagline}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Features */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                                <CheckCircle2 className="size-5 text-primary" />
                                <div>
                                    <div className="font-medium">{invitation.target_plan.label} {t('Plan')}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {invitation.target_plan.tagline}
                                    </div>
                                </div>
                            </div>

                            {invitation.trial_duration_days && (
                                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                                    <Sparkles className="size-5 text-primary" />
                                    <div>
                                        <div className="font-medium">
                                            {invitation.trial_duration_days} {t('days trial')}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {t('Try all features for free')}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {invitation.discount_percent > 0 && (
                                <div className="flex items-center gap-3 rounded-lg bg-green-500/10 p-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 font-bold text-green-600">
                                        {invitation.discount_percent}%
                                    </div>
                                    <div>
                                        <div className="font-medium text-green-600">
                                            {invitation.discount_percent}% {t('Discount')}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {t('Special offer for invited users')}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="flex justify-around rounded-lg border bg-muted/30 p-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{invitation.available_redemptions}</div>
                                <div className="text-sm text-muted-foreground">{t('Spots left')}</div>
                            </div>
                            {invitation.expires_at && (
                                <div className="text-center">
                                    <div className="text-2xl font-bold">
                                        {Math.ceil(
                                            (new Date(invitation.expires_at).getTime() - Date.now()) /
                                                (1000 * 60 * 60 * 24)
                                        )}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{t('Days remaining')}</div>
                                </div>
                            )}
                        </div>

                        {/* CTA */}
                        <div className="space-y-3">
                            <Button size="lg" className="w-full text-lg" onClick={handleRedeem}>
                                {isAuthenticated ? t('Redeem Invitation') : t('Sign Up to Redeem')}
                            </Button>
                            <p className="text-center text-xs text-muted-foreground">
                                {t('By redeeming, you agree to our terms of service')}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

