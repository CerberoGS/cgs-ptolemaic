import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTrans } from '@/hooks/useTrans';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, ExternalLink, Save } from 'lucide-react';

type Feedback = {
    id: number;
    type: string;
    typeLabel: string;
    typeIcon: string;
    status: string;
    statusLabel: string;
    priority: string;
    priorityLabel: string;
    subject: string;
    message: string;
    url: string | null;
    user_agent: string | null;
    screenshot: string | null;
    admin_notes: string | null;
    user: {
        id: number;
        name: string;
        email: string;
    } | { name: string };
    created_at: string;
    updated_at: string;
};

type Props = {
    feedback: Feedback;
    statuses: Array<{ value: string; label: string }>;
    priorities: Array<{ value: string; label: string }>;
};

export default function FeedbackShow({ feedback, statuses, priorities }: Props) {
    const t = useTrans();
    const { props } = usePage();
    const locale = (props as { locale?: string }).locale || 'en';

    const { data, setData, put, processing } = useForm({
        status: feedback.status,
        priority: feedback.priority,
        admin_notes: feedback.admin_notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/${locale}/admin/feedback/${feedback.id}`);
    };

    const breadcrumbs = [
        { label: t('Admin'), href: '#' },
        { label: t('Feedback'), href: `/${locale}/admin/feedback` },
        { label: `#${feedback.id}`, href: `/${locale}/admin/feedback/${feedback.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${t('Feedback')} #${feedback.id}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <a href={`/${locale}/admin/feedback`}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t('Back')}
                        </a>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">
                            {t('Feedback')} #{feedback.id}
                        </h1>
                        <p className="text-sm text-muted-foreground">{feedback.created_at}</p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle>{feedback.subject}</CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Badge>{feedback.typeIcon} {feedback.typeLabel}</Badge>
                                            <Badge variant="outline">{feedback.statusLabel}</Badge>
                                            <Badge variant="outline">{feedback.priorityLabel}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>{t('Message')}</Label>
                                    <p className="mt-2 whitespace-pre-wrap rounded-md border bg-muted p-4 text-sm">
                                        {feedback.message}
                                    </p>
                                </div>

                                {feedback.screenshot && (
                                    <div>
                                        <Label>{t('Screenshot')}</Label>
                                        <a
                                            href={feedback.screenshot}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 block"
                                        >
                                            <img
                                                src={feedback.screenshot}
                                                alt="Screenshot"
                                                className="max-h-96 rounded-md border"
                                            />
                                        </a>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Admin Notes */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('Admin Notes')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="status">{t('Status')}</Label>
                                        <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statuses.map((status) => (
                                                    <SelectItem key={status.value} value={status.value}>
                                                        {status.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="priority">{t('Priority')}</Label>
                                        <Select value={data.priority} onValueChange={(value) => setData('priority', value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {priorities.map((priority) => (
                                                    <SelectItem key={priority.value} value={priority.value}>
                                                        {priority.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="admin_notes">{t('Notes')}</Label>
                                        <Textarea
                                            id="admin_notes"
                                            value={data.admin_notes}
                                            onChange={(e) => setData('admin_notes', e.target.value)}
                                            rows={6}
                                            placeholder={t('Add internal notes about this feedback...')}
                                        />
                                    </div>

                                    <Button type="submit" disabled={processing}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {t('Save Changes')}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* User Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('User Information')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div>
                                    <Label>{t('Name')}</Label>
                                    <p className="text-sm">{feedback.user.name}</p>
                                </div>
                                {'email' in feedback.user && (
                                    <div>
                                        <Label>{t('Email')}</Label>
                                        <p className="text-sm">{feedback.user.email}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Technical Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('Technical Information')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {feedback.url && (
                                    <div>
                                        <Label>{t('Page URL')}</Label>
                                        <a
                                            href={feedback.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            {t('Open page')}
                                        </a>
                                    </div>
                                )}
                                {feedback.user_agent && (
                                    <div>
                                        <Label>{t('User Agent')}</Label>
                                        <p className="text-xs text-muted-foreground">{feedback.user_agent}</p>
                                    </div>
                                )}
                                <div>
                                    <Label>{t('Created')}</Label>
                                    <p className="text-sm">{feedback.created_at}</p>
                                </div>
                                <div>
                                    <Label>{t('Updated')}</Label>
                                    <p className="text-sm">{feedback.updated_at}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

