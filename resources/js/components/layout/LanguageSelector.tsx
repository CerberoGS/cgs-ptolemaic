import { Globe } from 'lucide-react';
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { useLocale } from '@/hooks/useTrans';

interface AvailableLocale {
    code: string;
    name: string;
    native: string;
}

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const currentLocale = useLocale();
    const { availableLocales = [] } = usePage().props as {
        availableLocales?: AvailableLocale[];
    };

    const languages =
        availableLocales.length > 0
            ? availableLocales
            : [
                  { code: 'es', name: 'Spanish', native: 'Español' },
                  { code: 'en', name: 'English', native: 'English' },
              ];

    const changeLanguage = (localeCode: string) => {
        const { pathname, search, hash } = window.location;
        const segments = pathname.split('/').filter(Boolean);
        segments[0] = localeCode;

        const nextPath = `/${segments.join('/') || localeCode}`;

        router.visit(`${nextPath}${search}${hash}`, {
            preserveState: true,
            preserveScroll: true,
        });
        setIsOpen(false);
    };

    const currentLanguage =
        languages.find((lang) => lang.code === currentLocale) ?? languages[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                aria-label="Select language"
            >
                <Globe className="h-4 w-4" />
                <span>{currentLanguage.native}</span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <ul className="py-1">
                            {languages.map((lang) => (
                                <li key={lang.code}>
                                    <button
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                            currentLocale === lang.code
                                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                                : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        {lang.native}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}
