import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { useTrans } from '@/hooks/useTrans';
import { index } from '@/routes/admin/languages';

export default function CreateLanguage() {
    const t = useTrans();
    const { props } = usePage();
    const locale = (props as any).locale || 'es';
    
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        native_name: '',
        flag: '',
        sort_order: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/${locale}/admin/languages`);
    };

    return (
        <AppLayout>
            <Head title={t('admin.add_language')} />
            
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href={index().url}>
                        <Button variant="outline" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            {t('admin.back')}
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('admin.add_language')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('admin.create_new_language_description')}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('admin.language_information')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="code">{t('admin.language_code')}</Label>
                                    <Input
                                        id="code"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                        placeholder="ES, FR, DE, IT..."
                                        maxLength={2}
                                        className="uppercase"
                                    />
                                    {errors.code && (
                                        <p className="text-sm text-red-600">{errors.code}</p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        {t('admin.language_code_help')}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="flag">{t('admin.flag_emoji')}</Label>
                                    <Input
                                        id="flag"
                                        value={data.flag}
                                        onChange={(e) => setData('flag', e.target.value)}
                                        placeholder="🇪🇸, 🇫🇷, 🇩🇪..."
                                        maxLength={10}
                                    />
                                    {errors.flag && (
                                        <p className="text-sm text-red-600">{errors.flag}</p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        {t('admin.flag_emoji_help')}
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t('admin.language_name_english')}</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Spanish, French, German..."
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="native_name">{t('admin.language_native_name')}</Label>
                                    <Input
                                        id="native_name"
                                        value={data.native_name}
                                        onChange={(e) => setData('native_name', e.target.value)}
                                        placeholder="Español, Français, Deutsch..."
                                    />
                                    {errors.native_name && (
                                        <p className="text-sm text-red-600">{errors.native_name}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sort_order">{t('admin.sort_order')}</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                    min="0"
                                />
                                {errors.sort_order && (
                                    <p className="text-sm text-red-600">{errors.sort_order}</p>
                                )}
                                <p className="text-xs text-gray-500">
                                    {t('admin.sort_order_help')}
                                </p>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link href={index().url}>
                                    <Button type="button" variant="outline">
                                        {t('admin.cancel')}
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? t('admin.creating') : t('admin.create_language')}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
