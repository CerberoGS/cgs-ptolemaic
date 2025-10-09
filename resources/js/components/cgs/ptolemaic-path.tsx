import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrans } from '@/hooks/useTrans';

const STAGE_ICONS = ['🚀', '📘', '📈', '🎯'] as const;

export function PtolemaicPath() {
    const t = useTrans();

    const stages = [
        {
            icon: STAGE_ICONS[0],
            title: t('ptolemaic.stage1.title'),
            description: t('ptolemaic.stage1.description'),
        },
        {
            icon: STAGE_ICONS[1],
            title: t('ptolemaic.stage2.title'),
            description: t('ptolemaic.stage2.description'),
        },
        {
            icon: STAGE_ICONS[2],
            title: t('ptolemaic.stage3.title'),
            description: t('ptolemaic.stage3.description'),
        },
        {
            icon: STAGE_ICONS[3],
            title: t('ptolemaic.stage4.title'),
            description: t('ptolemaic.stage4.description'),
        },
    ];

    return (
        <div className="bg-gray-900 py-12 sm:py-16">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold leading-9 text-white sm:text-4xl sm:leading-10">
                        {t('ptolemaic.title')}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-xl leading-7 text-gray-300">
                        {t('ptolemaic.subtitle')}
                    </p>
                </div>

                <div className="mt-12">
                    <div className="relative">
                        <div
                            aria-hidden="true"
                            className="absolute top-1/2 hidden h-1 w-full -translate-y-1/2 transform bg-gray-700 md:block"
                        />

                        <div className="grid gap-8 md:grid-cols-4 md:gap-12">
                            {stages.map((stage, index) => (
                                <div key={stage.title} className="relative">
                                    {index < stages.length - 1 && (
                                        <div
                                            aria-hidden="true"
                                            className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-gray-700 md:hidden"
                                        />
                                    )}
                                    <Card className="relative border-gray-700 bg-gray-800 text-center">
                                        <CardHeader>
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-900">
                                                <span className="text-3xl">
                                                    {stage.icon}
                                                </span>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <CardTitle className="mb-2 text-lg font-semibold text-white">
                                                {stage.title}
                                            </CardTitle>
                                            <p className="text-gray-400">
                                                {stage.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
