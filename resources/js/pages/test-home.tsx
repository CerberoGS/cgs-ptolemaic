import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LanguageSelector from '@/components/layout/LanguageSelector';
import { useLocale, useTrans } from '@/hooks/useTrans';
import { home } from '@/routes';

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

interface TestHomeProps {
    currentLocale: string;
    configLocale: string;
    routeLocale: string;
    cookieLocale: string | null;
    availableLanguages: Language[];
}

export default function TestHome() {
    const { currentLocale, configLocale, routeLocale, cookieLocale, availableLanguages } =
        usePage<TestHomeProps>().props;
    const locale = useLocale();
    const t = useTrans();

    return (
        <>
            <Head title="Test Home - Diagnóstico de Idioma" />

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12">
                <div className="mx-auto max-w-4xl px-6">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-4xl font-bold text-white">
                            🏠 Página de Prueba - Diagnóstico de Idioma
                        </h1>
                        <LanguageSelector />
                    </div>

                    {/* Información del Idioma Actual */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>📊 Información del Idioma Actual</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Idioma desde Hook (useLocale):
                                    </p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {locale}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Idioma desde Server (currentLocale):
                                    </p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {currentLocale}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Idioma de la Ruta (routeLocale):
                                    </p>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {routeLocale}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Idioma de Config (config/app.php):
                                    </p>
                                    <p className="text-2xl font-bold text-orange-600">
                                        {configLocale}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Idioma de Cookie:
                                    </p>
                                    <p className="text-2xl font-bold text-red-600">
                                        {cookieLocale || 'No establecida'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        URL Actual:
                                    </p>
                                    <p className="text-sm font-mono text-gray-700">
                                        {window.location.pathname}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Idiomas Disponibles desde la Base de Datos */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>🗄️ Idiomas Disponibles (Base de Datos)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {availableLanguages.map((lang) => (
                                    <div
                                        key={lang.id}
                                        className={`flex items-center justify-between rounded-lg border-2 p-4 ${
                                            lang.code === currentLocale
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{lang.flag}</span>
                                            <div>
                                                <p className="font-semibold">
                                                    {lang.native_name} ({lang.code})
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {lang.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {lang.is_default && (
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                    Por Defecto en DB
                                                </span>
                                            )}
                                            {lang.code === currentLocale && (
                                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                                    Activo Ahora
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Texto de Prueba con Traducción */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>🌐 Texto de Prueba con Traducción</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Traducción de "general.dashboard":
                                </p>
                                <p className="text-xl font-bold">
                                    {t('general.dashboard')}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Traducción de "auth.sign_in":
                                </p>
                                <p className="text-xl font-bold">
                                    {t('auth.sign_in')}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Traducción de "general.welcome":
                                </p>
                                <p className="text-xl font-bold">
                                    {t('general.welcome')}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Navegación */}
                    <div className="flex gap-4">
                        <Link
                            href={home({ locale: currentLocale })}
                            className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-medium text-gray-900 shadow-lg transition-colors hover:bg-gray-100"
                        >
                            ← Volver a Bienvenida
                        </Link>

                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-lg transition-colors hover:bg-blue-700"
                        >
                            🔄 Recargar Página
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
