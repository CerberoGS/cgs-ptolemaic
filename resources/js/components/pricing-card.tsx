import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Clock, Users, Percent } from 'lucide-react';

interface PricingPlan {
    plan_type: string;
    plan_name: string;
    price_monthly: number;
    price_yearly: number;
    offer_active: boolean;
    offer_name: string | null;
    offer_description: string | null;
    offer_price_monthly: number | null;
    offer_price_yearly: number | null;
    offer_starts_at: string | null;
    offer_ends_at: string | null;
    discount_percentage: number;
    time_remaining: string | null;
    scarcity_active: boolean;
    scarcity_message: string | null;
    scarcity_percentage: number;
    remaining_slots: number;
    current_price_monthly: number;
    current_price_yearly: number;
}

interface PricingCardProps {
    plan: PricingPlan;
    showCountdown?: boolean;
    showScarcity?: boolean;
    onSelect?: (plan: PricingPlan) => void;
    className?: string;
}

export function PricingCard({ 
    plan, 
    showCountdown = true, 
    showScarcity = true, 
    onSelect,
    className = '' 
}: PricingCardProps) {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    useEffect(() => {
        if (!plan.offer_active || !plan.offer_ends_at) {
            setTimeLeft(null);
            return;
        }

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const endTime = new Date(plan.offer_ends_at).getTime();
            const difference = endTime - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                return { days, hours, minutes, seconds };
            }

            return null;
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [plan.offer_active, plan.offer_ends_at]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const handleSelect = () => {
        if (onSelect) {
            onSelect(plan);
        }
    };

    return (
        <Card className={`relative overflow-hidden transition-all hover:shadow-lg ${className} ${
            plan.offer_active ? 'border-orange-500 shadow-orange-100 dark:shadow-orange-900' : ''
        }`}>
            {/* Offer Badge */}
            {plan.offer_active && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white gap-1">
                        <Percent className="h-3 w-3" />
                        {plan.discount_percentage}% OFF
                    </Badge>
                </div>
            )}

            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-center">
                    {plan.plan_name}
                </CardTitle>
                {plan.offer_active && plan.offer_name && (
                    <p className="text-sm text-orange-600 dark:text-orange-400 text-center font-medium">
                        {plan.offer_name}
                    </p>
                )}
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Pricing */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        {plan.offer_active ? (
                            <>
                                <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                                    {formatPrice(plan.current_price_monthly)}
                                </span>
                                <span className="text-lg text-gray-500 line-through">
                                    {formatPrice(plan.price_monthly)}
                                </span>
                            </>
                        ) : (
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                {formatPrice(plan.current_price_monthly)}
                            </span>
                        )}
                        <span className="text-gray-600 dark:text-gray-400">/mes</span>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatPrice(plan.current_price_yearly)}/año
                    </div>
                </div>

                {/* Countdown Timer */}
                {showCountdown && plan.offer_active && timeLeft && (
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                        <div className="flex items-center justify-center gap-1 mb-2">
                            <Clock className="h-4 w-4 text-orange-600" />
                            <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                                Oferta termina en:
                            </span>
                        </div>
                        <div className="flex justify-center gap-2">
                            <div className="text-center">
                                <div className="text-lg font-bold text-orange-800 dark:text-orange-200">
                                    {timeLeft.days}
                                </div>
                                <div className="text-xs text-orange-600 dark:text-orange-400">
                                    días
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-orange-800 dark:text-orange-200">
                                    {timeLeft.hours}
                                </div>
                                <div className="text-xs text-orange-600 dark:text-orange-400">
                                    hrs
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-orange-800 dark:text-orange-200">
                                    {timeLeft.minutes}
                                </div>
                                <div className="text-xs text-orange-600 dark:text-orange-400">
                                    min
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-orange-800 dark:text-orange-200">
                                    {timeLeft.seconds}
                                </div>
                                <div className="text-xs text-orange-600 dark:text-orange-400">
                                    seg
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Scarcity Alert */}
                {showScarcity && plan.scarcity_active && (
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-800 dark:text-red-200">
                                {plan.scarcity_message || 'Disponibilidad limitada'}
                            </span>
                        </div>
                        
                        <div className="space-y-2">
                            <Progress 
                                value={plan.scarcity_percentage} 
                                className="h-2"
                            />
                            <div className="flex justify-between text-xs text-red-600 dark:text-red-400">
                                <span>{plan.scarcity_percentage}% vendido</span>
                                <span>{plan.remaining_slots} cupos restantes</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Offer Description */}
                {plan.offer_active && plan.offer_description && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        {plan.offer_description}
                    </div>
                )}

                {/* CTA Button */}
                <Button 
                    onClick={handleSelect}
                    className={`w-full ${
                        plan.offer_active 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' 
                            : ''
                    }`}
                    size="lg"
                >
                    {plan.offer_active ? 'Aprovechar Oferta' : 'Seleccionar Plan'}
                </Button>
            </CardContent>
        </Card>
    );
}
