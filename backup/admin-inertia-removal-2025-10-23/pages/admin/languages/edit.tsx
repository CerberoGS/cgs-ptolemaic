import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { useTrans } from '@/hooks/useTrans';
import { index } from '@/routes/admin/languages';

interface Language {
    id: number;
    code: string;
    name: string;
    native_name: string;
    flag: string;
    is_active: boolean;
    is_default: boolean;
    sort_order: number;
}

interface Props {
    language: Language;
}

export default function EditLanguage({ language }: Props) {
    const t = useTrans();
    const { props } = usePage();
    const locale = (props as any).locale || 'es';
    
    const { data, setData, put, processing, errors } = useForm({
        name: language.name,
        native_name: language.native_name,
        flag: language.flag,
        is_active: language.is_active,
        sort_order: language.sort_order,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/${locale}/admin/languages/${language.id}`);
    };

    return (
        <AppLayout>
            <Head title={t('admin.edit_language')} />
            
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
                            {t('admin.edit_language')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('admin.edit_language_description', { name: language.native_name })}
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
                                        value={language.code}
                                        disabled
                                        className="bg-gray-100 dark:bg-gray-800"
                                    />
                                    <p className="text-xs text-gray-500">
                                        {t('admin.language_code_cannot_change')}
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

                            <div className="grid gap-4 md:grid-cols-2">
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
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="is_active">{t('admin.is_active')}</Label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <Label htmlFor="is_active">
                                            {data.is_active ? t('admin.active') : t('admin.inactive')}
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            {language.is_default && (
                                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                                    <p className="text-sm text-blue-800 dark:text-blue-200">
                                        {t('admin.default_language_note')}
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-end gap-2">
                                <Link href={index().url}>
                                    <Button type="button" variant="outline">
                                        {t('admin.cancel')}
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? t('admin.updating') : t('admin.update_language')}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
