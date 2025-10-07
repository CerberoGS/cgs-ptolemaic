import { Globe } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface Language {
    code: string;
    name: string;
    native: string;
}

const languages: Language[] = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'es', name: 'Spanish', native: 'Español' },
];

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const currentLocale = window.location.pathname.split('/')[1] || 'es';

    const changeLanguage = (localeCode: string) => {
        const currentPath = window.location.pathname;
        const pathWithoutLocale = currentPath.replace(/^\/(en|es)/, '');
        const newPath = `/${localeCode}${pathWithoutLocale || '/'}`;

        window.location.href = newPath;
        setIsOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[1];

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
