import { usePage } from '@inertiajs/react';

interface Translations {
    [key: string]: string;
}

interface PageProps {
    translations: Translations;
    locale?: string;
    fallbackLocale?: string;
    availableLocales?: Array<{ code: string; name: string; native: string }>;
}

export function useTrans() {
    const { translations, locale } = usePage<PageProps>().props;

    return (key: string, replace?: Record<string, string | number>): string => {
        let translation = translations?.[key] || key;

        // Si hay reemplazos, procesarlos
        if (replace) {
            Object.keys(replace).forEach((replaceKey) => {
                translation = translation.replace(
                    new RegExp(`:${replaceKey}`, 'g'),
                    String(replace[replaceKey])
                );
            });
        }

        return translation;
    };
}

export function useLocale() {
    const { locale, fallbackLocale } = usePage<PageProps>().props;
    return locale || fallbackLocale || 'es';
}

export function useAvailableLocales() {
    const { availableLocales = [] } = usePage<PageProps>().props;
    return availableLocales;
}
