import '../css/app.css';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { setUrlDefaults } from './wayfinder';

type SharedPageProps = {
    locale?: string;
    csrfToken?: string;
};

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const readMetaToken = () =>
            document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';

        const updateMetaToken = (token: string) => {
            if (!token) {
                return;
            }

            const meta = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]');
            if (meta) {
                meta.content = token;
            }
        };

        let csrfToken =
            (props.initialPage.props as SharedPageProps).csrfToken ?? readMetaToken();

        const resolveCsrfToken = () => {
            if (csrfToken && csrfToken.length > 0) {
                return csrfToken;
            }

            csrfToken = readMetaToken();

            return csrfToken;
        };

        updateMetaToken(csrfToken);

        const initialLocale =
            (props.initialPage.props as SharedPageProps).locale ?? 'es';
        setUrlDefaults({ locale: initialLocale });

        router.on('before', (event) => {
            const token = resolveCsrfToken();

            if (token.length === 0) {
                return;
            }

            const { visit } = event.detail;

            if (!visit.headers['X-CSRF-TOKEN']) {
                visit.headers['X-CSRF-TOKEN'] = token;
            }

            const payload = visit.data;

            if (payload instanceof FormData) {
                if (!payload.has('_token')) {
                    payload.append('_token', token);
                }

                return;
            }

            if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
                const data = payload as Record<string, unknown>;
                const currentToken = data['_token'];

                if (
                    currentToken === undefined ||
                    currentToken === null ||
                    (typeof currentToken === 'string' && currentToken.length === 0)
                ) {
                    data['_token'] = token;
                }
            }
        });

        router.on('navigate', (event) => {
            const nextLocale = event?.detail?.page?.props?.locale;
            if (typeof nextLocale === 'string' && nextLocale.length > 0) {
                setUrlDefaults({ locale: nextLocale });
            }

            const nextToken = (event.detail?.page?.props as SharedPageProps)?.csrfToken;
            if (typeof nextToken === 'string' && nextToken.length > 0) {
                csrfToken = nextToken;
                updateMetaToken(nextToken);
            }
        });

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
