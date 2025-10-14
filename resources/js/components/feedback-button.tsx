import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Bug, Lightbulb, HelpCircle, Star, BarChart3, Loader2 } from 'lucide-react';
import { useTrans } from '@/hooks/useTrans';

type FeedbackType = 'bug' | 'suggestion' | 'question' | 'praise' | 'data_issue';

export function FeedbackButton() {
    const t = useTrans();
    const { props } = usePage();
    const locale = (props as { locale?: string }).locale || 'en';

    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<FeedbackType | null>(null);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const feedbackTypes = [
        { value: 'bug' as FeedbackType, label: t('Report Bug'), icon: Bug, color: 'red' },
        { value: 'suggestion' as FeedbackType, label: t('Suggestion'), icon: Lightbulb, color: 'blue' },
        { value: 'question' as FeedbackType, label: t('Question'), icon: HelpCircle, color: 'yellow' },
        { value: 'praise' as FeedbackType, label: t('Praise'), icon: Star, color: 'green' },
        { value: 'data_issue' as FeedbackType, label: t('Data Issue'), icon: BarChart3, color: 'orange' },
    ];

    const handleSubmit = () => {
        setErrors({});

        if (!selectedType) {
            setErrors({ type: t('Please select a feedback type.') });
            return;
        }

        if (!subject.trim()) {
            setErrors({ subject: t('Please provide a subject.') });
            return;
        }

        if (!message.trim()) {
            setErrors({ message: t('Please provide a message.') });
            return;
        }

        setSubmitting(true);

        router.post(
            `/${locale}/feedback`,
            {
                type: selectedType,
                subject: subject.trim(),
                message: message.trim(),
                url: window.location.href,
            },
            {
                onSuccess: () => {
                    setIsOpen(false);
                    setSelectedType(null);
                    setSubject('');
                    setMessage('');
                    setErrors({});
                },
                onError: (errors) => {
                    setErrors(errors);
                },
                onFinish: () => {
                    setSubmitting(false);
                },
            }
        );
    };

    return (
        <>
            {/* Floating Button */}
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 h-14 gap-2 rounded-full px-6 shadow-lg"
                size="lg"
            >
                <MessageSquare className="h-5 w-5" />
                <span className="hidden sm:inline">{t('Feedback')}</span>
            </Button>

            {/* Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            {t('Send us your feedback')}
                        </DialogTitle>
                        <DialogDescription>
                            {t('Help us improve! Report bugs, suggest features, or share your thoughts.')}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Feedback Type Selection */}
                        <div className="space-y-2">
                            <Label>{t('Feedback Type')}</Label>
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                                {feedbackTypes.map((type) => {
                                    const Icon = type.icon;
                                    const isSelected = selectedType === type.value;

                                    return (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => setSelectedType(type.value)}
                                            className={`flex items-center gap-2 rounded-lg border-2 p-3 text-left transition-all ${
                                                isSelected
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border hover:border-primary/50'
                                            }`}
                                        >
                                            <Icon className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                                            <span className="text-sm font-medium">{type.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.type && <p className="text-sm text-red-600 dark:text-red-400">{errors.type}</p>}
                        </div>

                        {/* Subject */}
                        <div className="space-y-2">
                            <Label htmlFor="feedback_subject">{t('Subject')}</Label>
                            <Input
                                id="feedback_subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder={t('Brief description of your feedback')}
                                maxLength={255}
                            />
                            {errors.subject && <p className="text-sm text-red-600 dark:text-red-400">{errors.subject}</p>}
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <Label htmlFor="feedback_message">{t('Message')}</Label>
                            <Textarea
                                id="feedback_message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={t('Provide details about your feedback...')}
                                rows={6}
                                maxLength={5000}
                            />
                            <p className="text-xs text-muted-foreground">
                                {message.length}/5000 {t('characters')}
                            </p>
                            {errors.message && <p className="text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
                        </div>

                        {/* Info */}
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm dark:border-blue-900 dark:bg-blue-950/20">
                            <p className="text-blue-900 dark:text-blue-100">
                                💡 {t('Current page URL will be automatically included to help us locate the issue.')}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={submitting}>
                                {t('Cancel')}
                            </Button>
                            <Button onClick={handleSubmit} disabled={submitting || !selectedType || !subject || !message}>
                                {submitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {t('Sending...')}
                                    </>
                                ) : (
                                    <>
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        {t('Send Feedback')}
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

