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
            } else {
                // Load waitlist status from server
                const loadWaitlistStatus = async () => {
                    try {
                        const response = await fetch(`/${currentLocale}/settings/waitlist/status`, {
                            method: 'GET',
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest',
                                'Accept': 'application/json',
                            },
                        });

                        if (response.ok) {
                            const data = await response.json();
                            setWaitlistStatus(data.waitlistStatus);
                        }
                    } catch (error) {
                        console.error('Error loading waitlist status:', error);
                    }
                };

                loadWaitlistStatus();
            }
        }
    }, [currentLocale, auth.user]);

    const handleWaitlistAction = (planType: string, planLabel: string) => {
        // Si el usuario no está autenticado, redirigir al login inmediatamente
        if (!auth.user) {
            window.location.href = login({ locale: currentLocale }).url;
            return;
        }

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

        // Si el usuario no está autenticado, redirigir al login
        if (!auth.user) {
            window.location.href = login({ locale: currentLocale }).url;
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
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
                <meta
                    name="description"
                    content={t('welcome.meta.description')}
                />
            </Head>

            {/* Navegacion moderna */}
            <header className="relative z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link
                            href={home({ locale: currentLocale })}
                            prefetch
                            className="inline-flex items-center gap-3 font-semibold text-lg text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-300"
                        >
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-white/95">
                                <img
                                    src={logo}
                                    alt="Ptolemaic"
                                    className="h-7 w-7"
                                />
                            </span>
                            <span>Ptolemaic</span>
                        </Link>

                        <nav className="flex items-center space-x-4">
                            <LanguageSelector />
                            {auth.user ? (
                                <Link
                                    href={dashboard({ locale: currentLocale })}
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    {t('general.dashboard')}
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login({ locale: currentLocale })}
                                        className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        {t('auth.sign_in')}
                                    </Link>
                                    <Link
                                        href={register({ locale: currentLocale })}
                                        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                    >
                                        {t('auth.create_account')}
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            <main>
                {/* 1. Hero Section - Impacto Inmediato */}
                <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                  <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10" />
                  <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="mx-auto max-w-2xl text-center"
                    >
                      <Badge className="mb-8 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        {t('welcome.hero.badge')}
                      </Badge>
                      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        {t('general.invest_with')}{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                          {t('general.artificial_intelligence')}
                        </span>
                      </h1>
                      <p className="mt-6 text-lg leading-8 text-gray-300">
                        {t('Discover investment opportunities that others miss. Our AI analyzes thousands of data points in real-time to maximize your returns.')}
                      </p>
                      <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                          {t('general.get_started_now')}
                        </Button>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                          {t('general.watch_demo')}
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </section>

                <PtolemaicPath />

                {/* 2. Beneficios Principales */}
                <section className="py-24 bg-white dark:bg-gray-900">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        {t('Why choose our platform?')}
                      </h2>
                      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        {t('Cutting-edge technology combined with proven strategies')}
                      </p>
                    </div>
                    
                    <div className="mx-auto mt-16 max-w-7xl">
                      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-20" />
                          <CardContent className="relative p-8">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                              <Brain className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                              {t('general.advanced_ai')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              {t('general.machine_learning_description')}
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950">
                          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-20" />
                          <CardContent className="relative p-8">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600">
                              <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                              {t('general.optimized_returns')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              {t('general.personalized_strategies_description')}
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-20" />
                          <CardContent className="relative p-8">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600">
                              <Users className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                              {t('general.elite_community')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              {t('general.exclusive_community_description')}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Cómo Funciona - Proceso Visual */}
                <section className="py-24 bg-gray-50 dark:bg-gray-800">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        {t('general.your_path_to_financial_success')}
                      </h2>
                      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        {t('general.simple_yet_powerful_process')}
                      </p>
                    </div>
                    
                    <div className="mx-auto mt-16 max-w-4xl">
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        {[
                          {
                            step: "01",
                            title: t("general.connect_your_accounts"),
                            description: t("general.securely_link_brokers"),
                            icon: Link2,
                            color: "from-blue-500 to-blue-600"
                          },
                          {
                            step: "02",
                            title: t("general.ai_analyzes_profile"),
                            description: t("general.evaluate_risk_tolerance"),
                            icon: Brain,
                            color: "from-purple-500 to-purple-600"
                          },
                          {
                            step: "03",
                            title: t("general.receive_recommendations"),
                            description: t("general.personalized_analysis"),
                            icon: Target,
                            color: "from-emerald-500 to-emerald-600"
                          },
                          {
                            step: "04",
                            title: t("general.grow_your_wealth"),
                            description: t("general.investment_optimize"),
                            icon: TrendingUp,
                            color: "from-orange-500 to-orange-600"
                          }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                          >
                            <div className="flex flex-col items-center">
                              {/* Step number and icon container */}
                              <div className="relative mb-4">
                                {/* Step number badge */}
                                <div className="absolute -top-2 -right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-sm">
                                  <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                                    {item.step}
                                  </span>
                                </div>
                                {/* Icon container */}
                                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color}`}>
                                  <item.icon className="h-8 w-8 text-white" />
                                </div>
                              </div>
                              
                              {/* Content */}
                              <div className="text-center">
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            {index < 3 && (
                              <div className="absolute -right-4 top-8 hidden h-0.5 w-8 bg-gradient-to-r from-gray-300 to-gray-300 dark:from-gray-600 dark:to-gray-600 md:block" />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* 4. Tipos de Inversor - Segmentación Inteligente */}
                <section className="py-24 bg-white dark:bg-gray-900">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        {t('general.plans_designed_for_every_profile')}
                      </h2>
                      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        {t('From beginner to expert, we have the perfect solution')}
                      </p>
                    </div>
                    
                    <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-4">
                      {[
                        {
                          name: t("Observer"),
                          price: t("Free"),
                          description: t("Learn and connect with the community"),
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
                          description: t("Exclusive and personalized"),
                          features: [
                            t("Everything in Astronomer"),
                            t("Custom integrations"),
                            t("Dedicated success manager"),
                            t("Custom SLAs & security reviews")
                          ],
                          gradient: "from-amber-500 to-orange-500",
                          icon: Building2,
                          emoji: "☀️",
                          cta: t("Coming Soon - Join Waitlist")
                        }
                      ].map((plan, index) => (
                        <Card 
                          key={index}
                          className={`relative overflow-hidden border-2 transition-all hover:shadow-xl ${
                            plan.popular 
                              ? 'border-cyan-500 shadow-cyan-100 dark:shadow-cyan-900' 
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          {plan.popular && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 text-sm font-semibold shadow-lg border-2 border-white dark:border-gray-800">
                                {t('general.recommended')}
                              </Badge>
                            </div>
                          )}
                          
                          <CardContent className="pt-6 pb-6 px-6">
                            <div className="mb-4 flex items-center gap-3">
                              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${plan.gradient}`}>
                                <span className="text-lg">{plan.emoji}</span>
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                  {plan.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {plan.description}
                                </p>
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                {plan.price}
                              </span>
                            </div>
                            
                            <ul className="mb-6 space-y-2">
                              {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start text-xs text-gray-600 dark:text-gray-300">
                                  <Check className="mr-2 mt-0.5 h-3 w-3 shrink-0 text-green-500" />
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

                {/* 5. Testimonios Sociales - Prueba Social */}
                <section className="py-24 bg-gray-50 dark:bg-gray-800">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        {t('general.investors_who_trust_us')}
                      </h2>
                    </div>
                    
                    <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-3">
                      {[
                        {
                          name: "María González",
                          role: t("Private Investor"),
                          content: t("In 6 months, my portfolio grew 47%. The AI really identifies opportunities I didn't see."),
                          avatar: "MG",
                          rating: 5
                        },
                        {
                          name: "Carlos Mendoza",
                          role: t("Professional Trader"),
                          content: t("The predictive analysis saves me hours of research. Now I make better decisions faster."),
                          avatar: "CM",
                          rating: 5
                        },
                        {
                          name: "Ana Silva",
                          role: t("Entrepreneur"),
                          content: t("As someone new to investing, the guided learning gave me the confidence to start. Amazing!"),
                          avatar: "AS",
                          rating: 5
                        }
                      ].map((testimonial, index) => (
                        <Card key={index} className="border-0 bg-white shadow-lg dark:bg-gray-900">
                          <CardContent className="p-8">
                            <div className="mb-4 flex items-center">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <p className="mb-6 text-gray-600 dark:text-gray-300">
                              "{testimonial.content}"
                            </p>
                            <div className="flex items-center">
                              <div className="mr-4 h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                {testimonial.avatar}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {testimonial.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {testimonial.role}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 6. Llamado a la Accion Final - Conversion */}
                <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 py-24">
                  <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10" />
                  <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t('Ready to revolutionize your investments?')}
                      </h2>
                      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                        {t('general.join_thousands_investors')}
                      </p>

                      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                          {t('general.create_free_account')}
                        </Button>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                          {t('general.schedule_demo')}
                        </Button>
                      </div>

                      <p className="mt-6 text-sm text-gray-400">
                        ✅ {t('No credit cards • Cancel anytime • 24/7 Support')}
                      </p>
                    </motion.div>
                  </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 px-6 py-12 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        <Link
                            href={home({ locale: currentLocale })}
                            prefetch
                            className="inline-flex items-center gap-3 font-semibold text-white"
                        >
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                                <img
                                    src={logo}
                                    alt="Ptolemaic"
                                    className="h-7 w-7"
                                />
                            </span>
                            <span>Ptolemaic</span>
                        </Link>

                        <div className="flex space-x-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-white">{t('general.terms')}</a>
                            <a href="#" className="hover:text-white">{t('general.privacy')}</a>
                            <a href="#" className="hover:text-white">{t('general.support')}</a>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                        {t('welcome.footer.copyright')}
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
        </>
    );
}