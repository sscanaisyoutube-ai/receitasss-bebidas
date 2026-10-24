/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Clock, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Star, 
  X, 
  Settings, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';

// Checkout links
const DEFAULT_CHECKOUT_COMPLETO = "https://ggcheckout.app/checkout/v5/UFLSBVON7v2UemIqwTTq94";
const DEFAULT_CHECKOUT_DOWNSLL_17 = "https://ggcheckout.app/checkout/v5/IAkInAeh3zoRGkGM3u8mK7";
const DEFAULT_CHECKOUT_BASICO_10 = "https://ggcheckout.app/checkout/v5/3Gu7cGKRVk6IuFp0wDgHSR";

const CAROUSEL_IMAGES = [
  { id: '1391', src: '/assets/img/IMG_1391.PNG', alt: 'Batida na garrafa modelo 1' },
  { id: '1392', src: '/assets/img/IMG_1392.PNG', alt: 'Batida na garrafa modelo 2' },
  { id: '1393', src: '/assets/img/IMG_1393.PNG', alt: 'Batida na garrafa modelo 3' },
  { id: '1394', src: '/assets/img/IMG_1394.PNG', alt: 'Batida na garrafa modelo 4' },
  { id: '1395', src: '/assets/img/IMG_1395.PNG', alt: 'Batida na garrafa modelo 5' },
  { id: '1396', src: '/assets/img/IMG_1396.PNG', alt: 'Batida na garrafa modelo 6' },
  { id: '1397', src: '/assets/img/IMG_1397.PNG', alt: 'Batida na garrafa modelo 7' },
  { id: '1398', src: '/assets/img/IMG_1398.PNG', alt: 'Batida na garrafa modelo 8' },
  { id: '1399', src: '/assets/img/IMG_1399.PNG', alt: 'Batida na garrafa modelo 9' },
  { id: '1400', src: '/assets/img/IMG_1400.PNG', alt: 'Batida na garrafa modelo 10' },
];

export default function App() {
  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState<{ minutes: string; seconds: string }>({ minutes: '15', seconds: '00' });
  // Downsell Popup State
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // FAQ Open State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Editable settings modal (for quick marketing customization)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [checkoutCompleto, setCheckoutCompleto] = useState(DEFAULT_CHECKOUT_COMPLETO);
  const [checkoutDownsell, setCheckoutDownsell] = useState(DEFAULT_CHECKOUT_DOWNSLL_17);
  const [checkoutBasico, setCheckoutBasico] = useState(DEFAULT_CHECKOUT_BASICO_10);
  const [pixName, setPixName] = useState("RUAN MIGUEL MORAIS DA SILVA");
  const [pixSubtitle, setPixSubtitle] = useState("responsável financeiro da Cozinha Anabe.");

  // Countdown timer logic matching original script
  useEffect(() => {
    const KEY = 'countdown_end';
    const DURATION = 15 * 60 * 1000;
    let end: number;

    try {
      const stored = localStorage.getItem(KEY);
      end = stored ? parseInt(stored, 10) : NaN;
    } catch {
      end = NaN;
    }

    if (!end || isNaN(end) || Date.now() >= end) {
      end = Date.now() + DURATION;
      try {
        localStorage.setItem(KEY, end.toString());
      } catch {}
    }

    const interval = setInterval(() => {
      let diff = end - Date.now();
      if (diff <= 0) {
        end = Date.now() + DURATION;
        try {
          localStorage.setItem(KEY, end.toString());
        } catch {}
        diff = DURATION;
      }
      const m = String(Math.floor(diff / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setTimeLeft({ minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Preserve UTM params in URLs
  const getUrlWithUtms = (url: string) => {
    try {
      if (typeof window === 'undefined') return url;
      const currentParams = new URLSearchParams(window.location.search);
      const targetUrl = new URL(url);
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'src'];
      utmKeys.forEach(key => {
        if (currentParams.has(key)) {
          targetUrl.searchParams.set(key, currentParams.get(key)!);
        }
      });
      return targetUrl.toString();
    } catch {
      return url;
    }
  };

  const scrollToOffer = (e: React.MouseEvent) => {
    e.preventDefault();
    const offerSection = document.getElementById('oferta');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-[#2D0011] font-['Poppins',sans-serif]">
      {/* 1. BARRA DE URGÊNCIA */}
      <div 
        id="barra-promocao" 
        className="sticky top-0 z-50 bg-[#FF477E] text-white text-center py-2.5 px-4 font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2"
      >
        <Clock className="w-4 h-4 animate-pulse inline-block" />
        <span id="contador">
          ⏰ PROMOÇÃO ENCERRA EM: {timeLeft.minutes}:{timeLeft.seconds}
        </span>
      </div>

      {/* 2. HERO SECTION */}
      <section className="hero py-10 md:py-14 bg-white relative overflow-hidden">
        <div className="max-w-[900px] mx-auto px-5 text-center">
          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <span className="inline-block bg-[#FF477E] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              🍹 Tendência que está explodindo agora
            </span>
            <div className="inline-block bg-white border-2 border-[#0061FF] text-[#0061FF] text-xs font-bold px-3.5 py-1 rounded-full shadow-sm">
              +150 Receitas Prontas para Vender
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-[#1A0008] mb-6">
            <span className="text-[#D81159]">+150 RECEITAS DE BATIDAS NA GARRAFA</span> PARA FATURAR ATÉ{' '}
            <span className="text-[#1DAE6D]">R$3.000 POR MÊS</span> MESMO COMEÇANDO DO ZERO!
          </h1>

          {/* Hero Mockup */}
          <div className="mockup-wrap mx-auto max-w-[480px] w-full my-5 hover:scale-[1.01] transition-transform duration-300">
            <a href="#oferta" onClick={scrollToOffer} className="block">
              <img
                src="/assets/hero-mockup.png"
                alt="+150 Receitas de Bebidas na Garrafa"
                className="w-full h-auto rounded-2xl shadow-2xl drop-shadow-lg mx-auto"
                loading="eager"
              />
            </a>
          </div>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-[#6B1A34] mb-6 leading-relaxed max-w-[720px] mx-auto">
            Receitas de batidas prontas para vender — ingredientes simples, produção rápida,<br className="hidden md:inline" />
            <strong className="text-[#2D0011] font-bold"> alto valor percebido e margem de lucro que vai te surpreender!</strong>
          </p>

          {/* Checklist */}
          <div className="flex justify-center mb-8">
            <ul className="text-left space-y-2.5 inline-block text-sm md:text-base font-semibold">
              <li className="flex items-center gap-2.5 text-[#2D0011]">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E8F8F0] text-[#1DAE6D] font-bold text-xs">✔</span>
                Qualquer pessoa consegue fazer
              </li>
              <li className="flex items-center gap-2.5 text-[#2D0011]">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E8F8F0] text-[#1DAE6D] font-bold text-xs">✔</span>
                Sem cozinha profissional ou equipamentos caros
              </li>
              <li className="flex items-center gap-2.5 text-[#2D0011]">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E8F8F0] text-[#1DAE6D] font-bold text-xs">✔</span>
                Receitas prontas, testadas e com custo baixo
              </li>
              <li className="flex items-center gap-2.5 text-[#2D0011]">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E8F8F0] text-[#1DAE6D] font-bold text-xs">✔</span>
                Perfeito para vender no WhatsApp, rua ou delivery
              </li>
            </ul>
          </div>

          {/* CTA Button */}
          <div className="mb-6">
            <a
              href="#oferta"
              onClick={scrollToOffer}
              className="cta-btn cta-main inline-block text-lg px-8 py-4 font-black rounded-full"
            >
              🍹 QUERO AS RECEITAS AGORA
            </a>
          </div>

          {/* Entrega Badges */}
          <div className="entrega-icons flex flex-col items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B1A34] bg-[#FFF0F3] px-3 py-1.5 rounded-full border border-[#FFB3C6]">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
                  alt="WhatsApp"
                  className="w-5 h-5 object-contain"
                />
                <span>WhatsApp</span>
              </div>
              <span className="text-[#6B1A34] font-bold">+</span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B1A34] bg-[#FFF0F3] px-3 py-1.5 rounded-full border border-[#FFB3C6]">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
                  alt="E-mail"
                  className="w-5 h-5 object-contain"
                />
                <span>E-mail</span>
              </div>
            </div>
            <p className="text-xs text-[#6B1A34] font-medium">Acesso imediato direto no e-mail e no WhatsApp</p>
          </div>
        </div>
      </section>

      {/* 3. CARROSSEL 1 (Infinite auto-scroll right to left) */}
      <section className="py-12 bg-white overflow-hidden border-t border-[#FFF0F3]">
        <div className="max-w-[900px] mx-auto px-5 mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A0008]">
            Veja o que estão fazendo — <span className="text-[#D81159]">viralizando e vendendo muito:</span>
          </h2>
        </div>

        {/* Carousel Track */}
        <div className="w-full overflow-hidden select-none py-2">
          <div className="animate-scroll-left">
            {[...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES].map((img, idx) => (
              <div
                key={`track1-${idx}`}
                className="flex-shrink-0 w-[170px] sm:w-[210px] aspect-[2/3] rounded-2xl overflow-hidden shadow-lg border border-[#FFB3C6]/40 hover:scale-[1.03] transition-transform duration-200"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="#oferta"
            onClick={scrollToOffer}
            className="cta-btn cta-green text-base px-7 py-3.5 rounded-full"
          >
            🛍️ QUERO AS RECEITAS!
          </a>
        </div>
      </section>

      {/* 4. PASSO A PASSO */}
      <section className="steps-section py-14 bg-[#FFF0F3]">
        <div className="max-w-[900px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#1A0008] mb-10">
            Funciona assim — <span className="text-[#D81159]">simples que até dá medo</span>:
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-3">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-5 text-center w-[160px] md:w-[155px] shadow-sm border border-[#FFB3C6]/60 flex flex-col items-center min-h-[175px]">
              <div className="text-4xl mb-3">📩</div>
              <p className="text-xs md:text-sm text-[#2D0011] leading-snug">
                Você recebe o acesso no <strong>e-mail e WhatsApp</strong>
              </p>
            </div>

            <div className="hidden md:block text-[#D81159] text-2xl font-black">→</div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-5 text-center w-[160px] md:w-[155px] shadow-sm border border-[#FFB3C6]/60 flex flex-col items-center min-h-[175px]">
              <div className="text-4xl mb-3">📖</div>
              <p className="text-xs md:text-sm text-[#2D0011] leading-snug">
                Escolhe a receita que quer fazer <strong>entre +150 opções</strong>
              </p>
            </div>

            <div className="hidden md:block text-[#D81159] text-2xl font-black">→</div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-5 text-center w-[160px] md:w-[155px] shadow-sm border border-[#FFB3C6]/60 flex flex-col items-center min-h-[175px]">
              <div className="text-4xl mb-3">🛒</div>
              <p className="text-xs md:text-sm text-[#2D0011] leading-snug">
                Compra os <strong>ingredientes simples</strong> no mercado perto de casa
              </p>
            </div>

            <div className="hidden md:block text-[#D81159] text-2xl font-black">→</div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-5 text-center w-[160px] md:w-[155px] shadow-sm border border-[#FFB3C6]/60 flex flex-col items-center min-h-[175px]">
              <div className="text-4xl mb-3">🍹</div>
              <p className="text-xs md:text-sm text-[#2D0011] leading-snug">
                <strong>Prepara em casa</strong> e enche as garrafinhas
              </p>
            </div>

            <div className="hidden md:block text-[#D81159] text-2xl font-black">→</div>

            {/* Step 5 */}
            <div className="bg-white rounded-2xl p-5 text-center w-[160px] md:w-[155px] shadow-sm border border-[#FFB3C6]/60 flex flex-col items-center min-h-[175px]">
              <div className="text-4xl mb-3">💰</div>
              <p className="text-xs md:text-sm text-[#2D0011] leading-snug">
                <strong>Vende e lucra</strong> no WhatsApp, delivery ou na porta de casa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENEFÍCIOS */}
      <section className="py-14 bg-white">
        <div className="max-w-[900px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#1A0008] mb-10">
            Muito mais que receitas — é a sua <span className="text-[#D81159]">renda extra</span> começando agora
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[780px] mx-auto">
            {/* Box 1 */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#FFB3C6] shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-extrabold text-[#FF7A00] mb-2">
                Pronto para vender hoje, mesmo sem experiência
              </h3>
              <p className="text-sm text-[#6B1A34] leading-relaxed">
                Você não precisa saber cozinhar bem. Se sabe seguir uma receita, já consegue produzir e vender.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#FFB3C6] shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">💸</div>
              <h3 className="text-lg font-extrabold text-[#1DAE6D] mb-2">
                Margem de lucro alta com ingredientes baratos
              </h3>
              <p className="text-sm text-[#6B1A34] leading-relaxed mb-3">
                Cada garrafa custa pouco para produzir e pode ser vendida por 3x ou 4x o valor. A conta fecha fácil.
              </p>
              <ul className="space-y-1.5 text-xs text-[#6B1A34] font-medium">
                <li className="flex items-center gap-1.5">
                  <span className="text-[#1DAE6D] font-bold">✔</span> Custo baixo de produção
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#1DAE6D] font-bold">✔</span> Alto valor percebido pelo cliente
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#1DAE6D] font-bold">✔</span> Fácil de escalar as vendas
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="#oferta"
              onClick={scrollToOffer}
              className="cta-btn cta-pink text-base px-7 py-3.5 rounded-full"
            >
              🍹 QUERO AS +150 RECEITAS DE BATIDAS
            </a>
          </div>
        </div>
      </section>

      {/* 6. PARA QUEM É */}
      <section className="py-14 bg-[#FFF0F3]">
        <div className="max-w-[900px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#1A0008] mb-10">
            Esse produto foi feito <span className="text-[#D81159]">exatamente para você</span> se...
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[800px] mx-auto">
            <div className="bg-white rounded-2xl p-5 text-center border-2 border-[#FFB3C6] shadow-sm hover:scale-[1.02] transition-transform">
              <div className="text-3xl mb-2">💸</div>
              <p className="text-xs md:text-sm font-semibold text-[#2D0011] leading-snug">
                Precisa de <strong>renda extra</strong> e não sabe por onde começar
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 text-center border-2 border-[#FFB3C6] shadow-sm hover:scale-[1.02] transition-transform">
              <div className="text-3xl mb-2">🏠</div>
              <p className="text-xs md:text-sm font-semibold text-[#2D0011] leading-snug">
                Quer trabalhar de casa com algo que <strong>vende de verdade</strong>
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 text-center border-2 border-[#FFB3C6] shadow-sm hover:scale-[1.02] transition-transform">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-xs md:text-sm font-semibold text-[#2D0011] leading-snug">
                Quer vender pelo WhatsApp ou Reels <strong>sem precisar de loja</strong>
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 text-center border-2 border-[#FFB3C6] shadow-sm hover:scale-[1.02] transition-transform">
              <div className="text-3xl mb-2">⏱️</div>
              <p className="text-xs md:text-sm font-semibold text-[#2D0011] leading-snug">
                Não tem tempo a perder e precisa de algo <strong>pronto para começar</strong>
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 text-center border-2 border-[#FFB3C6] shadow-sm hover:scale-[1.02] transition-transform">
              <div className="text-3xl mb-2">🔰</div>
              <p className="text-xs md:text-sm font-semibold text-[#2D0011] leading-snug">
                Nunca vendeu nada antes mas quer <strong>mudar isso agora</strong>
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 text-center border-2 border-[#FFB3C6] shadow-sm hover:scale-[1.02] transition-transform">
              <div className="text-3xl mb-2">📦</div>
              <p className="text-xs md:text-sm font-semibold text-[#2D0011] leading-snug">
                Já vende alguma coisa e quer <strong>adicionar batidas no cardápio</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CARROSSEL 2 (Reverse scroll left to right) */}
      <section className="py-12 bg-[#FFF0F3] overflow-hidden border-t border-[#FFB3C6]/40">
        <div className="max-w-[900px] mx-auto px-5 mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A0008]">
            Batidas lindas, fáceis de fazer e com <span className="text-[#D81159]">altíssimo valor percebido</span>:
          </h2>
        </div>

        {/* Carousel Reverse Track */}
        <div className="w-full overflow-hidden select-none py-2">
          <div className="animate-scroll-right">
            {[...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES].map((img, idx) => (
              <div
                key={`track2-${idx}`}
                className="flex-shrink-0 w-[170px] sm:w-[210px] aspect-[2/3] rounded-2xl overflow-hidden shadow-lg border border-[#FFB3C6]/40 hover:scale-[1.03] transition-transform duration-200"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="#oferta"
            onClick={scrollToOffer}
            className="cta-btn cta-pink text-base px-7 py-3.5 rounded-full"
          >
            🌟 QUERO TUDO ISSO!
          </a>
        </div>
      </section>

      {/* 8. BÔNUS EXCLUSIVOS */}
      <section className="py-14 bg-white">
        <div className="max-w-[900px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#1A0008] mb-10">
            🎁 E ainda tem <span className="text-[#D81159]">BÔNUS!</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-[860px] mx-auto">
            {/* Bonus 1 */}
            <div className="bg-white border-2 border-[#FFB3C6] rounded-2xl p-4 text-center flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="inline-block bg-[#FF477E] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider mb-2">
                  BÔNUS 1
                </span>
                <h3 className="text-sm font-bold text-[#2D0011] mb-3 leading-snug">
                  50 Receitas Alcoólicas de Batidas na Garrafa
                </h3>
              </div>
              <div className="w-full aspect-[280/200] rounded-xl overflow-hidden shadow-sm mt-auto">
                <img
                  src="/assets/bonus/bonus1.png"
                  alt="Bônus fornecedores"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bonus 2 */}
            <div className="bg-white border-2 border-[#FFB3C6] rounded-2xl p-4 text-center flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="inline-block bg-[#FF477E] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider mb-2">
                  BÔNUS 2
                </span>
                <h3 className="text-sm font-bold text-[#2D0011] mb-3 leading-snug">
                  Tabela de Precificação — Quanto Cobrar em Cada Receita
                </h3>
              </div>
              <div className="w-full aspect-[280/200] rounded-xl overflow-hidden shadow-sm mt-auto">
                <img
                  src="/assets/bonus/bonus2.png"
                  alt="Bônus precificação"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bonus 3 */}
            <div className="bg-white border-2 border-[#FFB3C6] rounded-2xl p-4 text-center flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="inline-block bg-[#FF477E] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider mb-2">
                  BÔNUS 3
                </span>
                <h3 className="text-sm font-bold text-[#2D0011] mb-3 leading-snug">
                  ✅ Roteiro Pronto: Como Anunciar no WhatsApp e Fechar Vendas
                </h3>
              </div>
              <div className="w-full aspect-[280/200] rounded-xl overflow-hidden shadow-sm mt-auto">
                <img
                  src="/assets/bonus/bonus3.png"
                  alt="Bônus roteiro vendas"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bonus 4 */}
            <div className="bg-white border-2 border-[#FFB3C6] rounded-2xl p-4 text-center flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="inline-block bg-[#FF477E] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider mb-2">
                  BÔNUS 4
                </span>
                <h3 className="text-sm font-bold text-[#2D0011] mb-3 leading-snug">
                  Videoaula: Como Embalar e Apresentar para Vender Mais
                </h3>
              </div>
              <div className="w-full aspect-[280/200] rounded-xl overflow-hidden shadow-sm mt-auto">
                <img
                  src="/assets/bonus/bonus4.png"
                  alt="Bônus videoaula"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SEÇÃO DE OFERTAS */}
      <section className="offer-section py-16 bg-[#1A0008] text-white relative" id="oferta">
        {/* Pagamento Seguro Box */}
        <div className="flex justify-center px-4 mb-8">
          <div className="bg-gradient-to-br from-[#1a1010] to-[#2a0d18] border-[1.5px] border-[#FF477E] rounded-2xl p-5 max-w-[420px] w-full text-center shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#1DAE6D]" />
              <span className="text-white font-bold text-sm tracking-wider">PAGAMENTO 100% SEGURO</span>
            </div>
            <div className="h-[1px] bg-[#FF477E]/30 mb-3" />
            <p className="text-white/80 text-xs leading-relaxed">
              O Pix será identificado no nome de<br />
              <strong className="text-white text-sm font-bold tracking-wide">{pixName}</strong><br />
              <span className="text-white/50 text-[11px]">{pixSubtitle}</span>
            </p>
          </div>
        </div>

        <div className="max-w-[900px] mx-auto px-5">
          <h2 className="text-2xl md:text-4xl font-black text-center text-white mb-10">
            Escolha como quer <span className="text-[#1DAE6D]">começar hoje:</span>
          </h2>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-[800px] mx-auto">
            {/* PLANO COMPLETO (FEATURED) */}
            <div className="bg-white rounded-3xl p-7 flex-1 text-center relative border-4 border-[#1DAE6D] shadow-[0_0_0_6px_rgba(29,174,109,0.2),0_20px_60px_rgba(0,0,0,0.5)] md:scale-105 flex flex-col justify-between">
              <div>
                <div className="inline-block bg-[#1DAE6D] text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider mb-4 shadow-sm">
                  ⭐ MAIS VENDIDO
                </div>

                <img
                  src="/assets/hero-mockup.png"
                  alt="Kit Completo Bebidas na Garrafa"
                  className="w-full max-w-[320px] mx-auto rounded-xl mb-4 object-cover"
                  loading="lazy"
                />

                <h3 className="text-xl font-black text-[#1A0008] mb-2">
                  Kit Completo +150 Receitas de Batidas
                </h3>

                <p className="text-xs text-[#6B1A34] leading-relaxed mb-4">
                  +150 receitas de batidas na garrafa prontas para vender + todos os <strong>bônus exclusivos</strong> para você faturar até R$3.000/mês.
                </p>

                {/* Bonus Checklist */}
                <div className="text-left bg-[#FFF0F3] p-4 rounded-xl border border-[#FFB3C6]/60 mb-5">
                  <p className="text-xs font-bold text-[#2D0011] mb-2 flex items-center gap-1">
                    🎁 <strong>Inclui todos os bônus:</strong>
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#2D0011] font-medium">
                    <li className="flex items-center gap-1.5">
                      <span className="text-[#1DAE6D] font-bold">✔</span> Lista de Fornecedores Baratos para Garrafinhas
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-[#1DAE6D] font-bold">✔</span> Tabela de Precificação Pronta
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-[#1DAE6D] font-bold">✔</span> Roteiro de Vendas pelo WhatsApp
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-[#1DAE6D] font-bold">✔</span> Videoaula: Como Embalar e Vender Mais
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                {/* Price */}
                <div className="mb-4">
                  <span className="block text-xs text-[#6B1A34] line-through font-semibold mb-0.5">
                    De R$ 59,90
                  </span>
                  <span className="block text-4xl font-black text-[#1DAE6D] tracking-tight">
                    R$ 24,90
                  </span>
                </div>

                {/* Checkout Link */}
                <a
                  href={getUrlWithUtms(checkoutCompleto)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn cta-green w-full py-4 text-base font-black rounded-full block text-white shadow-xl"
                >
                  🍹 QUERO O KIT COMPLETO
                </a>

                <p className="text-[11px] text-[#6B1A34] mt-2.5 font-medium">
                  ✅ Acesso imediato • E-mail + WhatsApp • Garantia de 7 dias
                </p>
              </div>
            </div>

            {/* PLANO BÁSICO (R$ 10,00) */}
            <div className="bg-white rounded-3xl p-7 flex-1 text-center relative border-2 border-gray-200 opacity-95 flex flex-col justify-between">
              <div>
                <div className="inline-block bg-[#6B1A34] text-white text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider mb-4">
                  BÁSICO
                </div>

                <h3 className="text-xl font-black text-[#1A0008] mb-2 mt-4">
                  50 Receitas de Batidas na Garrafa
                </h3>

                <p className="text-xs text-[#6B1A34] leading-relaxed mb-6">
                  50 receitas prontas para vender, <strong>sem os bônus exclusivos</strong>.
                </p>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-500 text-left mb-6">
                  <p className="line-through">✖ Lista de Fornecedores</p>
                  <p className="line-through">✖ Tabela de Precificação</p>
                  <p className="line-through">✖ Roteiro de WhatsApp</p>
                  <p className="line-through">✖ Videoaula de Embalagem</p>
                </div>
              </div>

              <div>
                {/* Price */}
                <div className="mb-4">
                  <span className="block text-xs text-[#6B1A34] line-through font-semibold mb-0.5">
                    De R$ 24,90
                  </span>
                  <span className="block text-3xl font-black text-[#1DAE6D] tracking-tight">
                    R$ 10,00
                  </span>
                  <span className="text-[11px] text-[#6B1A34] font-medium block">
                    (oferta relâmpago)
                  </span>
                </div>

                {/* Abre o pop-up de downsell */}
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(true)}
                  className="cta-btn cta-orange w-full py-3.5 text-base font-black rounded-full block text-white shadow-lg cursor-pointer text-center"
                >
                  🤑 Quero Apenas o de R$10!
                </button>

                <p className="text-[11px] text-[#6B1A34] mt-2.5 font-medium">
                  Sem bônus • Acesso imediato
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-[720px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#1A0008] mb-8">
            Dúvidas <span className="text-[#D81159]">frequentes</span>:
          </h2>

          <div className="divide-y divide-[#FFB3C6]">
            {[
              {
                q: "Preciso saber cozinhar para comprar?",
                a: "Não! As receitas são passo a passo, feitas para quem nunca fez nada parecido. Se você consegue seguir uma receita simples, já consegue produzir e vender."
              },
              {
                q: "Precisa de equipamentos caros ou cozinha profissional?",
                a: "Não! A grande maioria das receitas usa utensílios comuns que já estão na sua cozinha. Nada de investimento alto para começar."
              },
              {
                q: "Onde vou vender as batidas?",
                a: "Pelo WhatsApp, Reels, delivery, porta de casa, feiras, para vizinhos, amigos e família. O bônus de roteiro de vendas te ensina exatamente como fechar os primeiros pedidos."
              },
              {
                q: "Quanto posso cobrar por cada garrafa?",
                a: "Depende da receita e da sua região, mas a maioria das pessoas cobra entre R$15 e R$40 por garrafa, com custo de produção muito baixo. A margem é bem generosa."
              },
              {
                q: "Como recebo após a compra?",
                a: "Você recebe o link de acesso direto no e-mail cadastrado e também pelo WhatsApp — de forma imediata, assim que o pagamento é confirmado."
              },
              {
                q: "Tenho garantia se não gostar?",
                a: "Sim! Você tem 7 dias de garantia incondicional. Se não ficar satisfeita por qualquer motivo, é só enviar uma mensagem e devolvemos 100% do valor pago."
              }
            ].map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left font-bold text-sm md:text-base text-[#2D0011] flex justify-between items-center gap-4 cursor-pointer hover:text-[#D81159] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#D81159] text-xl font-black shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pt-3 text-xs md:text-sm text-[#6B1A34] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. CTA FINAL */}
      <div className="py-12 bg-white text-center px-5 border-t border-[#FFF0F3]">
        <div className="max-w-[700px] mx-auto">
          <p className="text-base md:text-lg font-bold text-[#FF477E] mb-4">
            ⏰ Não fique esperando — cada dia sem vender é dinheiro perdido!
          </p>
          <a
            href="#oferta"
            onClick={scrollToOffer}
            className="cta-btn cta-pink text-base md:text-lg px-8 py-4 font-black rounded-full inline-block"
          >
            🍹 QUERO ACESSO ÀS 150 RECEITAS AGORA
          </a>
          <p className="text-xs text-[#6B1A34] mt-3 font-medium">
            ✅ Acesso imediato · Garantia de 7 dias · Pagamento seguro
          </p>
        </div>
      </div>

      {/* 12. DOWNSELL POPUP MODAL */}
      {isPopupOpen && (
        <div 
          className="fixed inset-0 bg-[#0A0800]/80 z-[9999] flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setIsPopupOpen(false)}
        >
          <div 
            className="bg-white rounded-[26px] p-6 sm:p-8 max-w-[440px] w-full text-center relative shadow-2xl animate-popup border border-[#FFB3C6]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full cursor-pointer transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 bg-[#FF7A00] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-white text-white" />
              <span>OFERTA ESPECIAL ÚNICA</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#1A0008] leading-tight mb-3">
              Espera! Leva o Kit Completo<br />
              <span className="text-[#E8005A]">por apenas R$ 17,90</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#3D2030] leading-relaxed mb-4 max-w-[360px] mx-auto font-medium">
              Antes de ir com o Kit Básico, aproveite para levar o <strong className="text-[#1A0008] font-bold">Kit Completo + Todos os Bônus</strong> por um valor exclusivo que só aparece aqui!
            </p>

            <div className="flex items-center justify-center gap-1.5 text-xs text-[#1DAE6D] font-bold mb-6">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-[#1DAE6D] text-white font-black text-[10px]">✓</span>
              <span>Acesso imediato · Todos os bônus inclusos · Garantia de 7 dias</span>
            </div>

            {/* Downsell button: R$ 17,90 */}
            <a
              href={getUrlWithUtms(checkoutDownsell)}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-pink w-full py-4 text-sm sm:text-base font-black rounded-full block text-white shadow-xl mb-3 tracking-wide"
            >
              QUERO O KIT COMPLETO POR R$ 17,90
            </a>

            {/* Basic fallback button: R$ 10,00 */}
            <a
              href={getUrlWithUtms(checkoutBasico)}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-orange w-full py-3.5 text-xs sm:text-sm font-black rounded-full block text-white shadow-lg tracking-wide"
            >
              Não, quero apenas o Kit Básico por R$ 10,00
            </a>
          </div>
        </div>
      )}

      {/* 13. FOOTER */}
      <footer className="bg-[#1A0008] text-white/50 text-center py-6 px-4 text-xs border-t border-white/5">
        <p>© 2026 +150 Receitas de Batidas na Garrafa • Todos os direitos reservados</p>
        <p className="mt-1 text-[11px] text-white/40">
          Este produto é um infoproduto digital. Acesso imediato após confirmação do pagamento.
        </p>
      </footer>

      {/* 14. QUICK SETTINGS / MARKETING BAR (DISCREET BOTTOM BUTTON) */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="bg-white/90 hover:bg-white text-[#2D0011] p-2.5 rounded-full shadow-lg border border-[#FFB3C6] flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-transform hover:scale-105"
          title="Editar links de checkout e dados"
        >
          <Settings className="w-4 h-4 text-[#FF477E]" />
          <span className="hidden sm:inline">Configurações de Checkout</span>
        </button>
      </div>

      {/* Editable settings drawer */}
      {isSettingsOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4"
          onClick={() => setIsSettingsOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto text-[#2D0011] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#FF477E]" />
                Personalizar Links & Checkout
              </h3>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Aqui você pode substituir os links de checkout para os seus próprios links da Hotmart, Kiwify, PerfectPay, GGCheckout ou qualquer outra plataforma.
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">
                  Link Checkout Completo (R$ 24,90):
                </label>
                <input
                  type="text"
                  value={checkoutCompleto}
                  onChange={(e) => setCheckoutCompleto(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 font-mono text-xs focus:ring-2 focus:ring-[#FF477E] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">
                  Link Checkout Downsell Pop-up (R$ 17,90):
                </label>
                <input
                  type="text"
                  value={checkoutDownsell}
                  onChange={(e) => setCheckoutDownsell(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 font-mono text-xs focus:ring-2 focus:ring-[#FF477E] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">
                  Link Checkout Básico (R$ 10,00):
                </label>
                <input
                  type="text"
                  value={checkoutBasico}
                  onChange={(e) => setCheckoutBasico(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 font-mono text-xs focus:ring-2 focus:ring-[#FF477E] outline-none"
                />
              </div>

              <div className="border-t border-gray-100 pt-3">
                <label className="block font-bold mb-1">
                  Nome do Titular do PIX:
                </label>
                <input
                  type="text"
                  value={pixName}
                  onChange={(e) => setPixName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-[#FF477E] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">
                  Subtítulo / Empresa do PIX:
                </label>
                <input
                  type="text"
                  value={pixSubtitle}
                  onChange={(e) => setPixSubtitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-[#FF477E] outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setCheckoutCompleto(DEFAULT_CHECKOUT_COMPLETO);
                  setCheckoutDownsell(DEFAULT_CHECKOUT_DOWNSLL_17);
                  setCheckoutBasico(DEFAULT_CHECKOUT_BASICO_10);
                  setPixName("RUAN MIGUEL MORAIS DA SILVA");
                  setPixSubtitle("responsável financeiro da Cozinha Anabe.");
                }}
                className="px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Restaurar Padrão
              </button>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="bg-[#1DAE6D] text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer hover:bg-[#158A55]"
              >
                Salvar e Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
