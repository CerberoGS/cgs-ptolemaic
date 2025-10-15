import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useTrans, useLocale } from '@/hooks/useTrans';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Copy, ExternalLink } from 'lucide-react';

type Props = {
    invitation: any;
};

export default function InvitationsShow({ invitation }: Props) {
    const t = useTrans();
    const locale = useLocale();

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const inviteUrl = `${window.location.origin}/invite/${invitation.code}`;

    return (
        <AppSidebarLayout>
            <Head title={t('Invitation Details')} />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/${locale}/admin/invitations`}>
                            <ArrowLeft className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{invitation.name}</h1>
                        <p className="mt-2 text-muted-foreground">{invitation.code}</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Invitation Details')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <span className="text-sm text-muted-foreground">{t('Code')}:</span>
                                <div className="mt-1 flex items-center gap-2">
                                    <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                                        {invitation.code}
                                    </code>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => copyToClipboard(invitation.code)}
                                    >
                                        <Copy className="size-3" />
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <span className="text-sm text-muted-foreground">{t('Link')}:</span>
                                <div className="mt-1 flex items-center gap-2">
                                    <code className="truncate rounded bg-muted px-2 py-1 text-sm">
                                        {inviteUrl}
                                    </code>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => copyToClipboard(inviteUrl)}
                                    >
                                        <Copy className="size-3" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        asChild
                                    >
                                        <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="size-3" />
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <span className="text-sm text-muted-foreground">{t('Target Plan')}:</span>
                                <div className="mt-1 flex items-center gap-2">
                                    <span>{invitation.target_plan.emoji}</span>
                                    <span>{invitation.target_plan.label}</span>
                                </div>
                            </div>

                            <div>
                                <span className="text-sm text-muted-foreground">{t('Status')}:</span>
                                <div className="mt-1">
                                    <Badge>{invitation.status.label}</Badge>
                                </div>
                            </div>

                            <div>
                                <span className="text-sm text-muted-foreground">{t('Redemptions')}:</span>
                                <div className="mt-1">
                                    {invitation.usage_count} / {invitation.usage_limit || '∞'}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Recent Redemptions')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {invitation.redemptions.length === 0 ? (
                                <p className="text-sm text-muted-foreground">{t('No redemptions yet')}</p>
                            ) : (
                                <div className="space-y-3">
                                    {invitation.redemptions.map((redemption: any) => (
                                        <div key={redemption.id} className="rounded border p-3">
                                            <div className="font-medium">{redemption.user.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {redemption.user.email}
                                            </div>
                                            <div className="mt-1 text-xs text-muted-foreground">
                                                {new Date(redemption.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => {
                            if (confirm(t('Are you sure you want to disable this invitation?'))) {
                                router.put(`/${locale}/admin/invitations/${invitation.id}`, {
                                    status: 'disabled',
                                });
                            }
                        }}
                    >
                        {t('Disable')}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            if (confirm(t('Are you sure you want to delete this invitation?'))) {
                                router.delete(`/${locale}/admin/invitations/${invitation.id}`);
                            }
                        }}
                    >
                        {t('Delete')}
                    </Button>
                </div>
            </div>
        </AppSidebarLayout>
    );
}

