import { Head } from '@inertiajs/react';

import { useLocale, useTrans } from '@/hooks/useTrans';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
    const t = useTrans();
    const locale = useLocale();
    const breadcrumbs = [
        {
            title: t('Appearance settings'),
            href: editAppearance({ locale }).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Appearance settings')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={t('Appearance settings')}
                        description={t("Update your account's appearance settings")}
                    />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
