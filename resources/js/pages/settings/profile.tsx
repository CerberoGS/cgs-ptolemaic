import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';
import { useLocale, useTrans } from '@/hooks/useTrans';
import { Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const t = useTrans();
    const locale = useLocale();
    const { auth } = usePage<SharedData>().props;
    const breadcrumbs = [
        {
            title: t('settings.profile'),
            href: edit({ locale }).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('settings.profile')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={t('settings.profile_information')}
                        description={t('settings.profile_information_description')}
                    />

                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">{t('settings.name')}</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder={t('settings.name')}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">
                                        {t('settings.email_address')}
                                    </Label>

                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            className="mt-1 block w-full"
                                            defaultValue={auth.user.email}
                                            name="email"
                                            required
                                            autoComplete="username"
                                            placeholder={t('settings.email_address')}
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {auth.user.email_verified_at ? (
                                                <Badge variant="default" className="gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                    <CheckCircle className="h-3 w-3" />
                                                    {t('settings.verified')}
                                                </Badge>
                                            ) : (
                                                <Badge variant="destructive" className="gap-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {t('settings.unverified')}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone">
                                        {t('settings.phone_number')}
                                    </Label>

                                    <div className="relative">
                                        <Input
                                            id="phone"
                                            type="tel"
                                            className="mt-1 block w-full"
                                            defaultValue={auth.user.phone || ''}
                                            name="phone"
                                            autoComplete="tel"
                                            placeholder={t('settings.phone_number')}
                                        />
                                        {auth.user.phone && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                {auth.user.phone_verified_at ? (
                                                    <Badge variant="default" className="gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                        <CheckCircle className="h-3 w-3" />
                                                        {t('settings.verified')}
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="gap-1">
                                                        <Phone className="h-3 w-3" />
                                                        {t('settings.not_verified')}
                                                    </Badge>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <InputError
                                        className="mt-2"
                                        message={errors.phone}
                                    />
                                </div>

                                {mustVerifyEmail &&
                                    auth.user.email_verified_at === null && (
                                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                                        {t('settings.email_verification_required')}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                                                        {t('settings.email_verification_description')}
                                                    </p>
                                                    <div className="mt-3">
                                                        <Link
                                                            href={send()}
                                                            as="button"
                                                            className="inline-flex items-center gap-2 rounded-md bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                                                        >
                                                            <Mail className="h-4 w-4" />
                                                            {t('settings.send_verification_email')}
                                                        </Link>
                                                    </div>
                                                    {status === 'verification-link-sent' && (
                                                        <div className="mt-3 text-sm font-medium text-green-600 dark:text-green-400">
                                                            {t('settings.verification_link_sent')}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        data-test="update-profile-button"
                                    >
                                        {t('general.save')}
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">
                                            {t('general.saved')}
                                        </p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
