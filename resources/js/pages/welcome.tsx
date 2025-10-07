import { home, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, TrendingUp, Users, Check, Star, Crown, Building2, User, Target, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';
import LanguageSelector from '@/components/layout/LanguageSelector';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Ptolemaic - Plataforma de Inversión con IA en el Mercado de Valores">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
                <meta name="description" content="Invierte con inteligencia artificial. Nuestra plataforma analiza miles de datos en tiempo real para maximizar tus retornos con estrategias personalizadas." />
            </Head>

            {/* Navegación moderna */}
            <header className="relative z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                <Brain className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">Ptolemaic</span>
                        </div>

                        <nav className="flex items-center space-x-4">
                            <LanguageSelector />
                            {auth.user ? (
                                <Link
                                    href={home()}
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                    >
                                        Crear Cuenta
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
                        🚀 Tecnología IA Avanzada
                      </Badge>
                      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Invierte con 
                        <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                          Inteligencia Artificial
                        </span>
                      </h1>
                      <p className="mt-6 text-lg leading-8 text-gray-300">
                        Descubre oportunidades de inversión que otros pasan por alto. 
                        Nuestra IA analiza miles de datos en tiempo real para maximizar tus retornos.
                      </p>
                      <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                          Comenzar Ahora
                        </Button>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                          Ver Demo
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </section>

                {/* 2. Beneficios Principales */}
                <section className="py-24 bg-white dark:bg-gray-900">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        ¿Por qué elegir nuestra plataforma?
                      </h2>
                      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Tecnología de vanguardia combinada con estrategias probadas
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
                              IA Avanzada
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              Algoritmos de machine learning analizan patrones complejos del mercado 
                              que los humanos no pueden detectar
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
                              Retornos Optimizados
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              Estrategias personalizadas que maximizan ganancias 
                              y minimizan riesgos automáticamente
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
                              Comunidad Elite
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              Únete a una comunidad exclusiva de inversores 
                              que comparten estrategias y conocimientos
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
                        Tu camino hacia el éxito financiero
                      </h2>
                      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Un proceso simple pero poderoso
                      </p>
                    </div>
                    
                    <div className="mx-auto mt-16 max-w-4xl">
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        {[
                          {
                            step: "01",
                            title: "Conecta tus cuentas",
                            description: "Vincula tus brokers y exchanges de forma segura",
                            icon: Link2,
                            color: "from-blue-500 to-blue-600"
                          },
                          {
                            step: "02", 
                            title: "IA analiza tu perfil",
                            description: "Evaluamos tu tolerancia al riesgo y objetivos",
                            icon: Brain,
                            color: "from-purple-500 to-purple-600"
                          },
                          {
                            step: "03",
                            title: "Recibe recomendaciones",
                            description: "Obtén análisis y oportunidades personalizadas",
                            icon: Target,
                            color: "from-emerald-500 to-emerald-600"
                          },
                          {
                            step: "04",
                            title: "Crece tu patrimonio",
                            description: "Ve cómo tu inversión se optimiza automáticamente",
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
                            <div className={`mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color}`}>
                              <item.icon className="h-8 w-8 text-white" />
                            </div>
                            <div className="text-center">
                              <div className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                                {item.step}
                              </div>
                              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {item.description}
                              </p>
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
                        Planes diseñados para cada perfil
                      </h2>
                      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Desde principiante hasta experto, tenemos la solución perfecta
                      </p>
                    </div>
                    
                    <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
                      {[
                        {
                          name: "Principiante",
                          price: "Gratis",
                          features: [
                            "Análisis básico de mercado",
                            "Recomendaciones iniciales",
                            "Soporte educativo",
                            "Hasta $1,000 de inversión"
                          ],
                          gradient: "from-blue-500 to-cyan-500",
                          icon: User
                        },
                        {
                          name: "Profesional", 
                          price: "$29/mes",
                          features: [
                            "Análisis avanzado con IA",
                            "Estrategias personalizadas",
                            "Soporte prioritario",
                            "Sin límites de inversión"
                          ],
                          gradient: "from-purple-500 to-pink-500",
                          icon: Crown,
                          popular: true
                        },
                        {
                          name: "Institucional",
                          price: "Personalizado",
                          features: [
                            "IA cuántica avanzada",
                            "Gestión de portafolios",
                            "API dedicada",
                            "Soporte 24/7"
                          ],
                          gradient: "from-emerald-500 to-teal-500",
                          icon: Building2
                        }
                      ].map((plan, index) => (
                        <Card 
                          key={index}
                          className={`relative overflow-hidden border-2 transition-all hover:shadow-xl ${
                            plan.popular 
                              ? 'border-purple-500 shadow-purple-100 dark:shadow-purple-900' 
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                Más Popular
                              </Badge>
                            </div>
                          )}
                          
                          <CardContent className="p-8">
                            <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${plan.gradient}`}>
                              <plan.icon className="h-6 w-6 text-white" />
                            </div>
                            
                            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                              {plan.name}
                            </h3>
                            <div className="mb-6">
                              <span className={`text-3xl font-bold text-gray-900 dark:text-white`}>
                                {plan.price}
                              </span>
                            </div>
                            
                            <ul className="mb-8 space-y-3">
                              {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                  <Check className="mr-3 h-4 w-4 text-green-500" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            
                            <Button 
                              className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90`}
                              size="lg"
                            >
                              Comenzar Ahora
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
                        Inversores que ya confían en nosotros
                      </h2>
                    </div>
                    
                    <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-3">
                      {[
                        {
                          name: "María González",
                          role: "Inversora Privada",
                          content: "En 6 meses, mi portafolio creció un 47%. La IA realmente identifica oportunidades que yo no veía.",
                          avatar: "MG",
                          rating: 5
                        },
                        {
                          name: "Carlos Mendoza", 
                          role: "Trader Profesional",
                          content: "El análisis predictivo me ahorra horas de investigación. Ahora tomo mejores decisiones más rápido.",
                          avatar: "CM",
                          rating: 5
                        },
                        {
                          name: "Ana Silva",
                          role: "Emprendedora",
                          content: "Como nueva en inversiones, el aprendizaje guiado me dio la confianza para comenzar. ¡Increíble!",
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

                {/* 6. Llamado a la Acción Final - Conversión */}
                <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 py-24">
                  <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10" />
                  <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        ¿Listo para revolucionar tus inversiones?
                      </h2>
                      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                        Únete a miles de inversores que ya están obteniendo mejores retornos 
                        con el poder de la inteligencia artificial
                      </p>
                      
                      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                          Crear Cuenta Gratis
                        </Button>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                          Agendar Demo
                        </Button>
                      </div>
                      
                      <p className="mt-6 text-sm text-gray-400">
                        ✓ Sin tarjetas de crédito • ✓ Cancelar en cualquier momento • ✓ Soporte 24/7
                      </p>
                    </motion.div>
                  </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 px-6 py-12 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                <Brain className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Ptolemaic</span>
                        </div>

                        <div className="flex space-x-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-white">Términos</a>
                            <a href="#" className="hover:text-white">Privacidad</a>
                            <a href="#" className="hover:text-white">Soporte</a>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                        © 2024 Ptolemaic. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </>
    );
}