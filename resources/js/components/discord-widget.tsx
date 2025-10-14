import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Sparkles } from 'lucide-react';
import { useTrans } from '@/hooks/useTrans';

export function DiscordWidget() {
    const t = useTrans();
    const discordInviteUrl = 'https://discord.gg/SPjvdq6pBS';

    return (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{t('Join Our Community')}</CardTitle>
                </div>
                <CardDescription>{t('Connect with traders worldwide')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{t('Share strategies & analysis')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                        <span>{t('Get real-time market insights')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{t('Learn from experienced traders')}</span>
                    </div>
                </div>

                <Button className="w-full" asChild>
                    <a href={discordInviteUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {t('Join Discord Server')}
                    </a>
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                    {t('Free for all users')}
                </p>
            </CardContent>
        </Card>
    );
}

