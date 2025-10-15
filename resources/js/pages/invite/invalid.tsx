import { Head, Link } from '@inertiajs/react';
import { useTrans } from '@/hooks/useTrans';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Home } from 'lucide-react';

type Props = {
    code: string;
    reason: string;
};

export default function InviteInvalid({ code, reason }: Props) {
    const t = useTrans();

    return (
        <>
            <Head title={t('Invalid Invitation')} />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="mb-4 flex justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                                <AlertCircle className="size-10 text-red-500" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl">{t('Invalid Invitation')}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{reason}</p>

                        <div className="rounded-lg bg-muted p-3">
                            <p className="text-sm text-muted-foreground">{t('Code')}:</p>
                            <code className="font-mono text-lg font-semibold">{code}</code>
                        </div>

                        <Button asChild className="w-full">
                            <Link href="/">
                                <Home className="mr-2 size-4" />
                                {t('Back to Home')}
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

