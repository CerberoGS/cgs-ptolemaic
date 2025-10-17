import { home, login, register, dashboard } from '@/routes';
import { type SharedData } from '@/types';
import logo from '@/assets/logo1.svg?url';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { Brain, TrendingUp, Users, Check, Star, Crown, Building2, User, Target, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';
import LanguageSelector from '@/components/layout/LanguageSelector';
import { PtolemaicPath } from '@/components/cgs/ptolemaic-path';
import { useTrans, useLocale } from '@/hooks/useTrans';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const t = useTrans();
    const currentLocale = useLocale();
    const [waitlistStatus, setWaitlistStatus] = useState<{
        is_on_waitlist: boolean;
        current_plan: string | null;
        current_plan_label: string | null;
    }>({
        is_on_waitlist: false,
        current_plan: null,
        current_plan_label: null,
    });
    const [processing, setProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<{
        planType: string;
        planLabel: string;
        action: 'add' | 'switch' | 'remove';
        currentPlan?: string;
    } | null>(null);

    // Load waitlist status on component mount (only if user is authenticated)
    useEffect(() => {
        if (auth.user) {
            // Get waitlist status from the current page props if available
            if (window.waitlistStatus) {
                setWaitlistStatus(window.waitlistStatus);
            }
            // Skip the AJAX call for now to avoid the JSON error
        }
    }, [currentLocale, auth.user]);

    const handleWaitlistAction = (planType: string, planLabel: string) => {
        const isOnThisPlan = waitlistStatus.is_on_waitlist && waitlistStatus.current_plan === planType;
        const isOnOtherPlan = waitlistStatus.is_on_waitlist && waitlistStatus.current_plan !== planType;

        if (isOnThisPlan) {
            // User is already on this plan's waitlist - offer to remove
            setModalData({
                planType,
                planLabel,
                action: 'remove',
            });
        } else if (isOnOtherPlan) {
            // User is on another plan's waitlist - offer to switch
            setModalData({
                planType,
                planLabel,
                action: 'switch',
                currentPlan: waitlistStatus.current_plan_label || '',
            });
        } else {
            // User is not on any waitlist - offer to add
            setModalData({
                planType,
                planLabel,
                action: 'add',
            });
        }
        setShowModal(true);
    };

    const getPlanCTA = (planType: string, planLabel: string, defaultCTA: string) => {
        const isOnThisPlan = waitlistStatus.is_on_waitlist && waitlistStatus.current_plan === planType;
        const isOnOtherPlan = waitlistStatus.is_on_waitlist && waitlistStatus.current_plan !== planType;
        
        if (isOnThisPlan) {
            return "✓ En Lista";
        } else if (isOnOtherPlan) {
            return "🔄 Cambiar Plan";
        } else {
            return "🔔 Notificarme";
        }
    };

    const confirmWaitlistAction = async () => {
        if (!modalData) {
            console.error('No modal data available');
            return;
        }

        console.log('Starting waitlist action:', modalData);
        setProcessing(true);
        
        try {
            // Make the real request to the server
            const formData = new FormData();
            formData.append('plan_type', modalData.planType);
            formData.append('action', modalData.action);
            
            const response = await fetch(`/${currentLocale}/settings/waitlist`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Waitlist action completed:', data);
            
            // Close modal and update status
            setShowModal(false);
            setModalData(null);
            
            // Update waitlist status optimistically
            setWaitlistStatus({
                is_on_waitlist: true,
                current_plan: modalData.planType,
                current_plan_label: modalData.planLabel,
            });
            
            // Show success message
            alert(data.message || 'Successfully added to waitlist!');
            
        } catch (error) {
            console.error('Error in waitlist action:', error);
            alert('Error: ' + error.message);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            <Head title={t('welcome.meta.title')}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Header */}
                <header className="relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center">
                                <img src={logo} alt="Ptolemaic" className="h-8 w-auto" />
                                <span className="ml-3 text-xl font-bold text-white">Ptolemaic</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <LanguageSelector />
                                {auth.user ? (
                                    <Link
                                        href={dashboard({ locale: currentLocale }).url}
                                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        {t('Dashboard')}
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={login({ locale: currentLocale }).url}
                                            className="text-white hover:text-gray-300 transition-colors"
                                        >
                                            {t('Sign In')}
                                        </Link>
                                        <Link
                                            href={register({ locale: currentLocale }).url}
                                            className="bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            {t('Get Started')}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative py-20 lg:py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                            >
                                {t('welcome.hero.title')}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
                            >
                                {t('welcome.hero.subtitle')}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <Link
                                    href={register({ locale: currentLocale }).url}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    {t('welcome.hero.cta_primary')}
                                </Link>
                                <Link
                                    href={home({ locale: currentLocale }).url}
                                    className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                                >
                                    {t('welcome.hero.cta_secondary')}
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Plans Section */}
                <section className="py-20 lg:py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {t('welcome.plans.title')}
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                {t('welcome.plans.subtitle')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                        {
                          name: t("Observer"),
                          price: t("Free"),
                          description: t("Perfect for beginners"),
                          features: [
                            t("Complete trading journal"),
                            t("Community and Discord access"),
                            t("Basic notifications")
                          ],
                          gradient: "from-slate-500 to-slate-600",
                          icon: User,
                          emoji: "👁️",
                          cta: t("Start Free Trial")
                        },
                        {
                          name: t("Cosmographer"),
                          price: "$49/mes",
                          description: t("AI analysis, ready to explore"),
                          features: [
                            t("Everything in Observer"),
                            t("30 days free trial (no card)"),
                            t("AI-powered analytics and insights"),
                            t("Real-time market data"),
                            t("Managed API keys by CGS"),
                            t("Daily limit: 50 requests"),
                            t("Email support"),
                            t("Cancel anytime")
                          ],
                          gradient: "from-cyan-500 to-blue-500",
                          icon: Target,
                          emoji: "🧭",
                          popular: true,
                          cta: t("Coming Soon - Join Waitlist")
                        },
                        {
                          name: t("Astronomer"),
                          price: "$99/mes",
                          description: t("Total control with advanced AI"),
                          features: [
                            t("Everything in Cosmographer"),
                            t("30 days free + 30 bonus days with card"),
                            t("Bring your own API keys (BYOK)"),
                            t("Predictive AI and advanced models"),
                            t("Advanced automation workflows"),
                            t("No usage limits"),
                            t("Priority support & roadmap input"),
                            t("Cancel anytime")
                          ],
                          gradient: "from-violet-500 to-purple-500",
                          icon: Crown,
                          emoji: "🔭",
                          cta: t("Coming Soon - Join Waitlist")
                        },
                        {
                          name: t("Heliopolis"),
                          price: t("Custom"),
                          description: t("Enterprise solutions"),
                          features: [
                            t("Everything in Astronomer"),
                            t("Custom integrations"),
                            t("Dedicated support"),
                            t("SLA guarantees"),
                            t("Custom AI models"),
                            t("White-label options"),
                            t("Priority feature requests"),
                            t("24/7 support")
                          ],
                          gradient: "from-orange-500 to-red-500",
                          icon: Building2,
                          emoji: "🏛️",
                          cta: t("Coming Soon - Join Waitlist")
                        }
                      ].map((plan, index) => (
                        <Card key={index} className={`relative overflow-hidden border-0 bg-gradient-to-br ${plan.gradient} text-white ${
                          plan.popular ? 'ring-2 ring-white/20 shadow-2xl scale-105' : 'shadow-xl'
                        }`}>
                          {plan.popular && (
                            <div className="absolute top-4 right-4 z-10">
                              <Badge className="bg-white/20 text-white border-white/30">
                                {t('general.recommended')}
                              </Badge>
                            </div>
                          )}
                          <CardContent className="p-6">
                            <div className="text-center mb-6">
                              <div className="text-4xl mb-2">{plan.emoji}</div>
                              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                              <div className="text-3xl font-bold mb-2">{plan.price}</div>
                              <p className="text-white/80">{plan.description}</p>
                            </div>
                            
                            <ul className="space-y-3 mb-6">
                              {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start">
                                  <Check className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <Button
                              className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white`}
                              size="sm"
                              onClick={() => {
                                if (index === 0) {
                                  // Observador - ir al registro
                                  window.location.href = register({ locale: currentLocale }).url;
                                } else {
                                  // Planes de pago - manejar lista de espera
                                  const planTypes = ['managed', 'pro', 'enterprise'];
                                  const planLabels = ['Cosmógrafo', 'Astrónomo', 'Heliópolis'];
                                  handleWaitlistAction(planTypes[index - 1], planLabels[index - 1]);
                                }
                              }}
                            >
                              {index === 0 ? plan.cta : getPlanCTA(
                                ['managed', 'pro', 'enterprise'][index - 1], 
                                ['Cosmógrafo', 'Astrónomo', 'Heliópolis'][index - 1], 
                                plan.cta
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-white/10 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center text-gray-400">
                            <p>&copy; 2024 Ptolemaic. {t('welcome.footer.rights')}</p>
                        </div>
                    </div>
                </footer>

                {/* Modal de confirmación para lista de espera */}
                <Dialog open={showModal} onOpenChange={setShowModal}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {modalData?.action === 'add' && t('Add to :plan waitlist?', { plan: modalData.planLabel })}
                                {modalData?.action === 'switch' && t('You are already on the :currentPlan waitlist. Do you want to switch to :newPlan?', { 
                                    currentPlan: modalData.currentPlan, 
                                    newPlan: modalData.planLabel 
                                })}
                                {modalData?.action === 'remove' && t('You are already on the :plan waitlist. Do you want to remove yourself from the list?', { 
                                    plan: modalData.planLabel 
                                })}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                variant="outline"
                                onClick={() => setShowModal(false)}
                                disabled={processing}
                            >
                                {t('Cancel')}
                            </Button>
                            <Button
                                onClick={confirmWaitlistAction}
                                disabled={processing}
                            >
                                {processing ? t('Processing...') : (
                                    modalData?.action === 'add' ? t('Confirm') :
                                    modalData?.action === 'switch' ? t('Switch to :plan', { plan: modalData.planLabel }) :
                                    t('Remove from list')
                                )}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
