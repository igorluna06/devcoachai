import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  TrendingUp,
  Code2,
  BarChart3,
  Lightbulb,
  Award,
  ArrowRight,
  Menu,
  X
} from 'lucide-react'

// Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? 'border-b border-[#1a1a1a] bg-black/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-white font-bold text-lg">&lt;/&gt; DevCoachAI</div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-[#888888] hover:text-white transition">
            Produto
          </a>
          <a href="#" className="text-[#888888] hover:text-white transition">
            Pricing
          </a>
          <a href="#" className="text-[#888888] hover:text-white transition">
            Docs
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-white border border-[#1a1a1a] rounded-lg hover:border-[#333333] transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f52d4] transition"
          >
            Começar grátis
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1a1a1a] bg-black/95 backdrop-blur-md p-4 space-y-3">
          <a href="#" className="block text-[#888888] hover:text-white">
            Produto
          </a>
          <a href="#" className="block text-[#888888] hover:text-white">
            Pricing
          </a>
          <a href="#" className="block text-[#888888] hover:text-white">
            Docs
          </a>
          <div className="flex gap-2 pt-2">
            <Link to="/login" className="flex-1 text-center px-3 py-2 border border-[#1a1a1a] rounded">
              Login
            </Link>
            <Link
              to="/register"
              className="flex-1 text-center px-3 py-2 bg-[#6366f1] text-white rounded"
            >
              Começar grátis
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

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

// Hero Section
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Glow blur background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6366f1] rounded-full blur-3xl opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Badge */}
        <AnimatedElement>
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#6366f1] rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition">
            <span className="text-[#6366f1]">✦</span>
            <span className="text-sm text-white">Powered by AI</span>
          </div>
        </AnimatedElement>

        {/* Title */}
        <AnimatedElement className="space-y-2">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            <span className="text-white">Aprenda a programar</span>
            <br />
            <span className="bg-gradient-to-r from-white to-[#888888] bg-clip-text text-transparent">
              do jeito certo.
            </span>
          </h1>
        </AnimatedElement>

        {/* Subtitle */}
        <AnimatedElement>
          <p className="text-lg sm:text-xl text-[#888888] max-w-2xl mx-auto leading-relaxed">
            Planos de estudo personalizados por IA, com foco em prática real e projetos que importam.
          </p>
        </AnimatedElement>

        {/* CTA Buttons */}
        <AnimatedElement className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-[#6366f1] text-white rounded-lg font-medium hover:bg-[#4f52d4] transition flex items-center justify-center gap-2 group"
          >
            Começar grátis
            <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
          </Link>
          <a
            href="#features"
            className="px-6 py-3 border border-[#1a1a1a] text-white rounded-lg font-medium hover:border-[#333333] bg-black/50 backdrop-blur-sm transition"
          >
            Ver como funciona
          </a>
        </AnimatedElement>
      </div>
    </section>
  )
}

// Social Proof Bar
function SocialProof() {
  const stats = [
    { label: '10.000+', desc: 'Planos gerados' },
    { label: '94%', desc: 'Taxa de conclusão' },
    { label: '4.8★', desc: 'Avaliação média' }
  ]

  return (
    <section className="border-y border-[#1a1a1a] bg-[#0a0a0a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">{stat.label}</div>
              <div className="text-sm text-[#888888] mt-1">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Section
function Features() {
  const features = [
    {
      icon: Sparkles,
      title: 'Plano Gerado por IA',
      desc: 'Responda algumas perguntas e receba um plano de estudos completo criado por IA para o seu perfil.'
    },
    {
      icon: TrendingUp,
      title: 'Progressão Inteligente',
      desc: 'Módulos desbloqueados conforme você avança. Sem pular etapas, sem se perder.'
    },
    {
      icon: Code2,
      title: 'Foco em Prática',
      desc: 'Tasks de teoria, prática e projetos reais. Aprenda fazendo, não só assistindo.'
    },
    {
      icon: BarChart3,
      title: 'Análise de Progresso',
      desc: 'Acompanhe seu desempenho em tempo real com análise inteligente do seu progresso.'
    },
    {
      icon: Lightbulb,
      title: 'Sugestões Personalizadas',
      desc: 'A IA identifica suas dificuldades e sugere o que focar para evoluir mais rápido.'
    },
    {
      icon: Award,
      title: 'Certificados e Conquistas',
      desc: 'Complete planos e ganhe certificados compartilháveis no LinkedIn.'
    }
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <AnimatedElement>
            <p className="text-[#444444] text-sm uppercase tracking-widest font-medium">FUNCIONALIDADES</p>
          </AnimatedElement>
          <AnimatedElement>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Tudo que você precisa para aprender de verdade
            </h2>
          </AnimatedElement>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <AnimatedElement key={i}>
                <div className="group p-6 rounded-xl border border-[#1a1a1a] bg-black/50 backdrop-blur-sm hover:border-[#333333] hover:bg-black/70 transition-all duration-200">
                  <div className="mb-4 inline-flex p-3 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] group-hover:border-[#6366f1] transition">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-[#888888] text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </AnimatedElement>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// How It Works
function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Faça o onboarding',
      desc: 'Conte seu nível, objetivo e preferências. A IA monta o plano ideal para você.'
    },
    {
      num: '02',
      title: 'Estude com direção',
      desc: 'Módulos organizados em ordem lógica, desbloqueados conforme você avança.'
    },
    {
      num: '03',
      title: 'Evolua de verdade',
      desc: 'Complete tarefas práticas, ganhe conquistas e gere certificados do seu progresso.'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <AnimatedElement>
            <p className="text-[#444444] text-sm uppercase tracking-widest font-medium">COMO FUNCIONA</p>
          </AnimatedElement>
          <AnimatedElement>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Do zero ao primeiro projeto em semanas</h2>
          </AnimatedElement>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-3 gap-8 relative">
          {/* Connector line - desktop only */}
          <div className="hidden sm:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent" />

          {steps.map((step, i) => (
            <AnimatedElement key={i}>
              <div className="relative z-10">
                <div className="mb-6 inline-block">
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#6366f1] to-[#4f52d4] bg-clip-text text-transparent">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-[#888888] leading-relaxed">{step.desc}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedElement>
          <div className="relative rounded-2xl border border-[#6366f1] bg-black/50 backdrop-blur-sm p-12 text-center overflow-hidden">
            {/* Glow background */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/0 via-[#6366f1]/20 to-[#6366f1]/0"
                style={{ backgroundSize: '200% 200%' }}
              />
            </div>

            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold text-white">Pronto para começar?</h2>
              <p className="text-lg text-[#888888] max-w-xl mx-auto">
                Crie sua conta grátis e receba seu plano de estudos em minutos.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#6366f1] text-white rounded-lg font-medium hover:bg-[#4f52d4] transition group"
              >
                Começar agora
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#000000] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-white font-bold mb-2">&lt;/&gt; DevCoachAI</div>
            <p className="text-sm text-[#888888]">Aprenda a programar do jeito certo.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-[#888888]">
              <li>
                <a href="#" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-[#888888]">
              <li>
                <a href="#" className="hover:text-white transition">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-[#888888]">
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Termos
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1a1a1a] pt-8 text-center text-sm text-[#888888]">
          © 2026 DevCoachAI. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}

// Main
export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  )
}

