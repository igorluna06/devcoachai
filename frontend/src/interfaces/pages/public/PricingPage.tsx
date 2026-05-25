import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'

// Animated element on scroll
function AnimatedElement({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      currency: 'R$',
      desc: 'Perfeito para começar',
      features: [
        'Plano de estudo gerado por IA',
        'Até 3 planos ativos',
        'Acompanhamento de progresso',
        'Certificados básicos',
        'Comunidade de apoio'
      ],
      cta: 'Começar grátis',
      highlighted: true
    },
    {
      name: 'Pro',
      price: '29',
      currency: 'R$',
      period: '/mês',
      desc: 'Para quem quer acelerar',
      features: [
        'Tudo do plano Free',
        'Planos ilimitados',
        'Análise detalhada de progresso',
        'Sugestões personalizadas da IA',
        'Certificados premium',
        'Prioridade no suporte'
      ],
      cta: 'Em breve',
      highlighted: false,
      badge: 'Em breve'
    },
    {
      name: 'Team',
      price: 'Custom',
      desc: 'Para empresas e equipes',
      features: [
        'Tudo do plano Pro',
        'Gestão de múltiplos usuários',
        'Dashboard de equipe',
        'Relatórios customizados',
        'Suporte dedicado',
        'Integrações personalizadas'
      ],
      cta: 'Contate a gente',
      highlighted: false,
      badge: 'Em breve'
    }
  ]

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <AnimatedElement>
            <p className="text-[#444444] text-sm uppercase tracking-widest font-medium">PREÇOS SIMPLES</p>
          </AnimatedElement>
          <AnimatedElement>
            <h1 className="text-5xl sm:text-6xl font-bold text-white">
              Escolha o plano ideal para você
            </h1>
          </AnimatedElement>
          <AnimatedElement>
            <p className="text-lg text-[#888888] max-w-2xl mx-auto">
              Todos os planos incluem acesso completo às funcionalidades base. Upgrade quando estiver pronto.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <AnimatedElement key={i}>
                <div
                  className={`relative p-8 rounded-2xl border transition-all duration-200 h-full flex flex-col ${
                    plan.highlighted
                      ? 'border-[#6366f1] bg-black/70 backdrop-blur-sm ring-1 ring-[#6366f1]/20 scale-105 sm:scale-100 lg:scale-105'
                      : 'border-[#1a1a1a] bg-black/50 backdrop-blur-sm hover:border-[#333333]'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs font-medium bg-[#6366f1] text-white rounded-full">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-[#888888] text-sm">{plan.desc}</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      {plan.period && <span className="text-[#888888]">{plan.period}</span>}
                    </div>
                  </div>

                  <Link
                    to={plan.name === 'Free' ? '/register' : '#'}
                    className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition mb-8 ${
                      plan.highlighted
                        ? 'bg-[#6366f1] text-white hover:bg-[#4f52d4]'
                        : 'border border-[#1a1a1a] text-[#888888] hover:border-[#333333]'
                    } ${plan.name !== 'Free' && plan.badge ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={(e) => {
                      if (plan.name !== 'Free' && plan.badge) e.preventDefault()
                    }}
                  >
                    {plan.cta}
                    {plan.name === 'Free' && <ArrowRight size={18} />}
                  </Link>

                  <div className="space-y-4">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <Check size={18} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#888888]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto">
          <AnimatedElement className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Perguntas frequentes</h2>
            <p className="text-[#888888]">
              Não encontrou o que procura?{' '}
              <a href="#" className="text-[#6366f1] hover:underline">
                Entre em contato
              </a>
            </p>
          </AnimatedElement>

          <div className="space-y-4">
            {[
              {
                q: 'Posso trocar de plano depois?',
                a: 'Sim, você pode fazer upgrade ou downgrade a qualquer momento. Sem contratos de longo prazo.'
              },
              {
                q: 'Existe período de teste?',
                a: 'Não. O plano Free dá acesso completo a todas as funcionalidades base.'
              },
              {
                q: 'Como funciona o cancelamento?',
                a: 'Você pode cancelar sua assinatura a qualquer momento nas configurações. Sem perguntas.'
              },
              {
                q: 'Vocês oferecem desconto anual?',
                a: 'Sim! Desconto de 2 meses se pagar anualmente. Saiba mais contando com nosso time.'
              }
            ].map((item, i) => (
              <AnimatedElement key={i}>
                <div className="p-6 rounded-xl border border-[#1a1a1a] bg-black/50 backdrop-blur-sm hover:border-[#333333] transition">
                  <h4 className="font-semibold text-white mb-2">{item.q}</h4>
                  <p className="text-[#888888] text-sm">{item.a}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

