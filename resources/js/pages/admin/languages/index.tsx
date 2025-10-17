import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Star, Eye, EyeOff } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { useTrans } from '@/hooks/useTrans';
import { create, edit } from '@/routes/admin/languages';

interface Language {
    id: number;
    code: string;
    name: string;
    native_name: string;
    flag: string;
    is_active: boolean;
    is_default: boolean;
    sort_order: number;
    created_at: string;
}

interface Props {
    languages: Language[];
}

export default function LanguagesIndex({ languages }: Props) {
    const t = useTrans();
    const { props } = usePage();
    const locale = (props as any).locale || 'es';

    const handleToggleActive = (language: Language) => {
        router.post(`/${locale}/admin/languages/${language.id}/toggle-active`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSetDefault = (language: Language) => {
        router.post(`/${locale}/admin/languages/${language.id}/set-default`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (language: Language) => {
        if (confirm(`¿Estás seguro de que quieres eliminar el idioma ${language.native_name}?`)) {
            router.delete(`/${locale}/admin/languages/${language.id}`);
        }
    };

    return (
        <AppLayout>
            <Head title={t('admin.languages')} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('admin.languages')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('admin.manage_languages_description')}
                        </p>
                    </div>
                    <Link href={create().url}>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            {t('admin.add_language')}
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {languages.map((language) => (
                        <Card key={language.id} className="relative">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{language.flag}</span>
                                        <div>
                                            <CardTitle className="text-lg">
                                                {language.native_name}
                                            </CardTitle>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {language.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {language.is_default && (
                                            <Badge variant="default" className="gap-1">
                                                <Star className="h-3 w-3" />
                                                {t('admin.default')}
                                            </Badge>
                                        )}
                                        <button
                                            onClick={() => handleToggleActive(language)}
                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                                                language.is_active
                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
                                            }`}
                                        >
                                            {language.is_active ? (
                                                <Eye className="h-3 w-3" />
                                            ) : (
                                                <EyeOff className="h-3 w-3" />
                                            )}
                                            {language.is_active ? t('admin.active') : t('admin.inactive')}
                                        </button>
                                    </div>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="pt-0">
                                <div className="flex items-center gap-2">
                                    <Link href={edit({ language: language.id }).url}>
                                        <Button variant="outline" size="sm" className="gap-1">
                                            <Edit className="h-3 w-3" />
                                            {t('admin.edit')}
                                        </Button>
                                    </Link>
                                    
                                    {!language.is_default && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-1 text-red-600 hover:text-red-700"
                                            onClick={() => handleDelete(language)}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                            {t('admin.delete')}
                                        </Button>
                                    )}
                                    
                                    {!language.is_default && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-1"
                                            onClick={() => handleSetDefault(language)}
                                        >
                                            <Star className="h-3 w-3" />
                                            {t('admin.set_default')}
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {languages.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    {t('admin.no_languages_found')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {t('admin.start_by_adding_language')}
                                </p>
                                <Link href={create().url}>
                                    <Button className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        {t('admin.add_language')}
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
