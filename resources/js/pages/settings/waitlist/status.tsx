import { Head } from '@inertiajs/react';

interface WaitlistStatusProps {
    waitlistStatus: {
        is_on_waitlist: boolean;
        current_plan: string | null;
        current_plan_label: string | null;
    };
}

export default function WaitlistStatus({ waitlistStatus }: WaitlistStatusProps) {
    return (
        <Head title="Waitlist Status">
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                        Estado de Lista de Espera
                    </div>
                    <div className="text-gray-600">
                        {waitlistStatus.is_on_waitlist ? (
                            <span>
                                Estás en la lista de espera para: <strong>{waitlistStatus.current_plan_label}</strong>
                            </span>
                        ) : (
                            <span>No estás en ninguna lista de espera</span>
                        )}
                    </div>
                </div>
            </div>
        </Head>
    );
}
