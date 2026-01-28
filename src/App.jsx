import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext.jsx';

export default function ForwardTogetherWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'how-it-works', label: t('nav.howItWorks') },
    { id: 'for-survivors', label: t('nav.forSurvivors') },
    { id: 'for-caregivers', label: t('nav.forCaregivers') },
    { id: 'stories', label: t('nav.stories') },
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3">
            <Logo size={44} />
            <div className="flex flex-col leading-tight">
              <span className="font-serif font-semibold text-lg text-slate-800">{t('brand.forward')}</span>
              <span className="font-serif text-sm text-teal-600">{t('brand.together')}</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Language Selector */}
            <div className="flex items-center gap-1 ml-2 bg-stone-100 rounded-full p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  language === 'es'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage('de')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  language === 'de'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                DE
              </button>
            </div>

            <button
              onClick={() => setCurrentPage('get-started')}
              className="ml-2 px-5 py-2.5 bg-teal-600 text-white rounded-full text-sm font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/25"
            >
              {t('nav.beginJourney')}
            </button>
          </div>

          {/* Mobile Language Selector */}
          <div className="flex md:hidden items-center gap-1 bg-stone-100 rounded-full p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                language === 'en'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-stone-500'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                language === 'es'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-stone-500'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('de')}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                language === 'de'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-stone-500'
              }`}
            >
              DE
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'how-it-works' && <HowItWorksPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'for-survivors' && <ForSurvivorsPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'for-caregivers' && <ForCaregiversPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'stories' && <StoriesPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'get-started' && <GetStartedPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'chat-bob' && <ChatInterface journeyType="survivor" onBack={() => setCurrentPage('home')} />}
        {currentPage === 'chat-miri' && <ChatInterface journeyType="caregiver" onBack={() => setCurrentPage('home')} />}
      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

function Footer({ setCurrentPage }) {
  const { t } = useLanguage();

  const footerColumns = [
    {
      title: t('footer.forYou'),
      links: [
        { label: t('footer.forSurvivors'), action: () => setCurrentPage('for-survivors') },
        { label: t('footer.forCaregivers'), action: () => setCurrentPage('for-caregivers') },
        { label: t('footer.getStarted'), action: () => setCurrentPage('get-started') },
        { label: t('footer.stories'), action: () => setCurrentPage('stories') },
      ]
    },
    {
      title: t('footer.about'),
      links: [
        { label: t('footer.howItWorks'), action: () => setCurrentPage('how-it-works') },
        { label: t('footer.ourStory'), action: () => {} },
        { label: t('footer.contactUs'), action: () => {} },
      ]
    },
    {
      title: t('footer.resources'),
      links: [
        { label: t('footer.helpCenter'), action: () => {} },
        { label: t('footer.privacyPolicy'), action: () => {} },
        { label: t('footer.termsOfService'), action: () => {} },
      ]
    },
  ];

  return (
    <footer className="bg-slate-800 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={48} />
              <div>
                <div className="font-serif font-semibold">{t('brand.forward')} {t('brand.together')}</div>
                <div className="text-sm text-stone-400">{t('brand.tagline')}</div>
              </div>
            </div>
          </div>

          {footerColumns.map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-stone-400">{col.title}</h4>
              <div className="space-y-2">
                {col.links.map((link, j) => (
                  <button key={j} onClick={link.action} className="block text-stone-300 hover:text-amber-400 transition-colors text-sm">
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-stone-700 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>{t('footer.copyright')}</p>
          <p className="italic">{t('footer.builtBy')}</p>
        </div>
      </div>
    </footer>
  );
}

// Logo Component
function Logo({ size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" stroke="#1e3a5f" strokeWidth="3" fill="white"/>
      <circle cx="35" cy="32" r="10" fill="#f59e0b"/>
      <path d="M35 45c-12 0-18 10-18 22v8h36v-8c0-12-6-22-18-22z" fill="#f59e0b"/>
      <circle cx="58" cy="34" r="9" fill="#0d9488"/>
      <path d="M58 46c-10 0-16 9-16 20v9h32v-9c0-11-6-20-16-20z" fill="#0d9488"/>
      <ellipse cx="46" cy="58" rx="8" ry="5" fill="#f59e0b" opacity="0.85"/>
    </svg>
  );
}

// Home Page
function HomePage({ setCurrentPage }) {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative">
          <div>
            <h1 className="font-serif text-5xl lg:text-6xl font-medium text-slate-800 leading-tight mb-6">
              {t('hero.title1')}
              <span className="block bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">
                {t('hero.title2')}
              </span>
            </h1>

            <p className="text-xl text-stone-600 leading-relaxed mb-8 max-w-lg">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => setCurrentPage('get-started')}
                className="px-8 py-4 bg-teal-600 text-white rounded-full text-lg font-semibold hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/30"
              >
                {t('hero.startJourney')}
              </button>
              <button
                onClick={() => setCurrentPage('how-it-works')}
                className="px-8 py-4 bg-white text-slate-700 rounded-full text-lg font-semibold border-2 border-stone-200 hover:border-teal-300 transition-all"
              >
                {t('hero.seeHowItWorks')}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {['bg-amber-500', 'bg-teal-500', 'bg-rose-500', 'bg-violet-500', 'bg-blue-500'].map((color, i) => (
                  <div key={i} className={`w-10 h-10 ${color} rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-semibold`}>
                    {['S', 'M', 'J', 'A', 'K'][i]}
                  </div>
                ))}
              </div>
              <p className="text-stone-600">
                {t('hero.joinWith')}
              </p>
            </div>
          </div>

          {/* Chat Preview */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto lg:ml-auto">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full" />
              <div>
                <p className="font-serif font-semibold text-white text-lg">{t('chatPreview.bob')}</p>
                <p className="text-teal-100 text-sm">{t('chatPreview.yourSurvivorGuide')}</p>
              </div>
            </div>
            <div className="p-5 space-y-4 max-h-80 overflow-y-auto">
              {[
                { type: 'bot', text: t('chatPreview.msg1') },
                { type: 'bot', text: t('chatPreview.msg2') },
                { type: 'user', text: t('chatPreview.msg3') },
                { type: 'bot', text: t('chatPreview.msg4') },
              ].map((msg, i) => (
                <div key={i} className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.type === 'user'
                    ? 'bg-teal-600 text-white ml-auto rounded-br-sm'
                    : 'bg-stone-100 text-stone-700 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              ))}
              <div className="flex gap-1.5 p-4 bg-stone-100 rounded-2xl rounded-bl-sm w-20">
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">{t('howItWorks.label')}</span>
            <h2 className="font-serif text-4xl font-medium text-slate-800 mt-3 mb-4">
              {t('howItWorks.title1')} <span className="bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">{t('howItWorks.title2')}</span>
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '01', title: t('howItWorks.step1Title'), desc: t('howItWorks.step1Desc'), color: 'bg-amber-500' },
              { num: '02', title: t('howItWorks.step2Title'), desc: t('howItWorks.step2Desc'), color: 'bg-teal-500' },
              { num: '03', title: t('howItWorks.step3Title'), desc: t('howItWorks.step3Desc'), color: 'bg-rose-500' },
              { num: '04', title: t('howItWorks.step4Title'), desc: t('howItWorks.step4Desc'), color: 'bg-violet-500' },
            ].map((step, i) => (
              <div key={i} className="bg-stone-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <span className={`inline-block ${step.color} text-white text-sm font-bold px-4 py-1 rounded-full mb-6`}>
                  {step.num}
                </span>
                <h3 className="font-serif text-xl font-semibold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-stone-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-24 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">{t('guides.label')}</span>
            <h2 className="font-serif text-4xl font-medium text-slate-800 mt-3">{t('guides.title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-lg border-t-4 border-teal-500">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full mb-6" />
              <h3 className="font-serif text-3xl font-medium text-teal-700 mb-2">{t('guides.bob.name')}</h3>
              <p className="text-stone-500 mb-4">{t('guides.bob.role')}</p>
              <p className="text-stone-600 leading-relaxed mb-6">
                {t('guides.bob.description')}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {[t('guides.bob.trait1'), t('guides.bob.trait2'), t('guides.bob.trait3')].map((trait, i) => (
                  <span key={i} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">{trait}</span>
                ))}
              </div>
              <button onClick={() => setCurrentPage('chat-bob')} className="w-full py-3 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700">
                {t('guides.bob.button')}
              </button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border-t-4 border-rose-500">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full mb-6" />
              <h3 className="font-serif text-3xl font-medium text-rose-600 mb-2">{t('guides.miri.name')}</h3>
              <p className="text-stone-500 mb-4">{t('guides.miri.role')}</p>
              <p className="text-stone-600 leading-relaxed mb-6">
                {t('guides.miri.description')}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {[t('guides.miri.trait1'), t('guides.miri.trait2'), t('guides.miri.trait3')].map((trait, i) => (
                  <span key={i} className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-sm">{trait}</span>
                ))}
              </div>
              <button onClick={() => setCurrentPage('chat-miri')} className="w-full py-3 bg-rose-500 text-white rounded-full font-semibold hover:bg-rose-600">
                {t('guides.miri.button')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">{t('features.label')}</span>
            <h2 className="font-serif text-4xl font-medium text-slate-800 mt-3">{t('features.title')}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '💬', title: t('features.feature1Title'), desc: t('features.feature1Desc') },
              { icon: '🤝', title: t('features.feature2Title'), desc: t('features.feature2Desc') },
              { icon: '🔒', title: t('features.feature3Title'), desc: t('features.feature3Desc') },
              { icon: '🌙', title: t('features.feature4Title'), desc: t('features.feature4Desc') },
              { icon: '💡', title: t('features.feature5Title'), desc: t('features.feature5Desc') },
              { icon: '❤️', title: t('features.feature6Title'), desc: t('features.feature6Desc') },
            ].map((f, i) => (
              <div key={i} className="bg-stone-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <span className="text-4xl mb-4 block">{f.icon}</span>
                <h3 className="font-serif text-xl font-semibold text-slate-800 mb-3">{f.title}</h3>
                <p className="text-stone-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection setCurrentPage={setCurrentPage} />
    </>
  );
}

function CTASection({ setCurrentPage }) {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-stone-50">
      <div className="max-w-3xl mx-auto text-center">
        <Logo size={80} />
        <h2 className="font-serif text-4xl font-medium text-slate-800 mt-6 mb-4">{t('cta.title')}</h2>
        <p className="text-xl text-stone-600 mb-8">{t('cta.subtitle')}</p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button onClick={() => setCurrentPage('chat-bob')} className="px-8 py-4 bg-teal-600 text-white rounded-full text-lg font-semibold hover:bg-teal-700 shadow-lg">
            {t('cta.imSurvivor')}
          </button>
          <button onClick={() => setCurrentPage('chat-miri')} className="px-8 py-4 bg-rose-500 text-white rounded-full text-lg font-semibold hover:bg-rose-600 shadow-lg">
            {t('cta.imCaregiver')}
          </button>
        </div>
        <p className="text-stone-500">{t('cta.freePrivate')}</p>
      </div>
    </section>
  );
}

function HowItWorksPage({ setCurrentPage }) {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        label={t('howItWorksPage.label')}
        title={t('howItWorksPage.title')}
        highlight={t('howItWorksPage.highlight')}
        subtitle={t('howItWorksPage.subtitle')}
      />
      <HomePage setCurrentPage={setCurrentPage} />
    </>
  );
}

function ForSurvivorsPage({ setCurrentPage }) {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        label={t('forSurvivors.label')}
        title={t('forSurvivors.title')}
        highlight={t('forSurvivors.highlight')}
        subtitle={t('forSurvivors.subtitle')}
        ctaText={t('forSurvivors.ctaText')}
        ctaAction={() => setCurrentPage('chat-bob')}
        ctaColor="bg-teal-600 hover:bg-teal-700"
      />

      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-medium text-slate-800 text-center mb-12">{t('forSurvivors.sectionTitle')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🌅', title: t('forSurvivors.stage1Title'), desc: t('forSurvivors.stage1Desc') },
              { icon: '💪', title: t('forSurvivors.stage2Title'), desc: t('forSurvivors.stage2Desc') },
              { icon: '🌟', title: t('forSurvivors.stage3Title'), desc: t('forSurvivors.stage3Desc') },
              { icon: '🌈', title: t('forSurvivors.stage4Title'), desc: t('forSurvivors.stage4Desc') },
            ].map((p, i) => (
              <div key={i} className="bg-stone-50 rounded-2xl p-8">
                <span className="text-4xl mb-4 block">{p.icon}</span>
                <h3 className="font-serif text-xl font-semibold text-slate-800 mb-3">{p.title}</h3>
                <p className="text-stone-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection setCurrentPage={setCurrentPage} />
    </>
  );
}

function ForCaregiversPage({ setCurrentPage }) {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        label={t('forCaregivers.label')}
        title={t('forCaregivers.title')}
        highlight={t('forCaregivers.highlight')}
        subtitle={t('forCaregivers.subtitle')}
        ctaText={t('forCaregivers.ctaText')}
        ctaAction={() => setCurrentPage('chat-miri')}
        ctaColor="bg-rose-500 hover:bg-rose-600"
      />

      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-medium text-slate-800 text-center mb-12">{t('forCaregivers.sectionTitle')}</h2>
          <div className="space-y-6">
            {[
              { quote: t('forCaregivers.quote1'), response: t('forCaregivers.response1') },
              { quote: t('forCaregivers.quote2'), response: t('forCaregivers.response2') },
              { quote: t('forCaregivers.quote3'), response: t('forCaregivers.response3') },
            ].map((item, i) => (
              <div key={i} className="bg-stone-50 rounded-2xl p-8">
                <p className="font-serif text-2xl italic text-rose-600 mb-4">{item.quote}</p>
                <p className="text-stone-600 pl-6 border-l-4 border-stone-200">{item.response}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection setCurrentPage={setCurrentPage} />
    </>
  );
}

function StoriesPage({ setCurrentPage }) {
  const { t } = useLanguage();

  const stories = [
    {
      name: t('stories.sarah.name'),
      color: 'bg-amber-500',
      role: t('stories.sarah.role'),
      headline: t('stories.sarah.headline'),
      story: t('stories.sarah.story'),
      outcome: t('stories.sarah.outcome')
    },
    {
      name: t('stories.michael.name'),
      color: 'bg-teal-500',
      role: t('stories.michael.role'),
      headline: t('stories.michael.headline'),
      story: t('stories.michael.story'),
      outcome: t('stories.michael.outcome')
    },
  ];

  return (
    <>
      <PageHero
        label={t('stories.label')}
        title={t('stories.title')}
        highlight={t('stories.highlight')}
        subtitle={t('stories.subtitle')}
      />

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {stories.map((s, i) => (
            <div key={i} className="bg-stone-50 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 ${s.color} rounded-full flex items-center justify-center text-white font-semibold text-xl`}>{s.name[0]}</div>
                <div>
                  <h3 className="font-serif font-semibold text-slate-800">{s.name}</h3>
                  <p className="text-stone-500 text-sm">{s.role}</p>
                </div>
              </div>
              <p className="font-serif text-xl italic text-teal-700 mb-4">{s.headline}</p>
              <p className="text-stone-600 mb-4">{s.story}</p>
              <div className="bg-white rounded-xl p-4 text-sm">
                <strong className="text-teal-600">{t('stories.today')}</strong> {s.outcome}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTASection setCurrentPage={setCurrentPage} />
    </>
  );
}

function GetStartedPage({ setCurrentPage }) {
  const [step, setStep] = useState('choice');
  const [journeyType, setJourneyType] = useState(null);
  const { t } = useLanguage();

  if (step === 'chat') return <ChatInterface journeyType={journeyType} onBack={() => setCurrentPage('home')} />;

  return (
    <section className="min-h-screen py-24 px-6 bg-stone-50 flex items-center">
      <div className="max-w-4xl mx-auto text-center">
        <button onClick={() => setCurrentPage('home')} className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-stone-600 hover:text-stone-800 hover:bg-stone-200 rounded-full transition-colors">
          <span className="text-lg">←</span> {t('getStarted.backToHome').replace('← ', '')}
        </button>
        <h1 className="font-serif text-4xl font-medium text-slate-800 mb-4">{t('getStarted.welcome')}</h1>
        <p className="text-xl text-stone-600 mb-12">{t('getStarted.weAreHere')}</p>

        <div className="grid md:grid-cols-2 gap-8">
          <button onClick={() => { setJourneyType('survivor'); setStep('chat'); }} className="bg-white rounded-3xl p-10 text-center border-2 border-transparent hover:border-teal-500 hover:shadow-xl transition-all">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full mx-auto mb-6" />
            <h2 className="font-serif text-2xl font-semibold text-slate-800 mb-3">{t('getStarted.facingDiagnosis')}</h2>
            <p className="text-stone-600 mb-6">{t('getStarted.talkToBob')}</p>
            <span className="text-teal-600 font-semibold">{t('getStarted.meetBob')}</span>
          </button>

          <button onClick={() => { setJourneyType('caregiver'); setStep('chat'); }} className="bg-white rounded-3xl p-10 text-center border-2 border-transparent hover:border-rose-500 hover:shadow-xl transition-all">
            <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full mx-auto mb-6" />
            <h2 className="font-serif text-2xl font-semibold text-slate-800 mb-3">{t('getStarted.caringForSomeone')}</h2>
            <p className="text-stone-600 mb-6">{t('getStarted.talkToMiri')}</p>
            <span className="text-rose-600 font-semibold">{t('getStarted.meetMiri')}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function ChatInterface({ journeyType, onBack }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { t, getConversation } = useLanguage();

  const guide = journeyType === 'survivor'
    ? { name: 'Bob', role: t('chat.survivorGuide'), color: 'bg-teal-600' }
    : { name: 'Miri', role: t('chat.caregiverGuide'), color: 'bg-rose-500' };

  const conversation = getConversation(journeyType);

  useEffect(() => {
    let cancelled = false;
    let timeout;

    const runSimulation = async () => {
      setMessages([]);

      for (let i = 0; i < conversation.length; i++) {
        if (cancelled) break;

        const msg = conversation[i];
        const isBot = msg.sender === 'bot';
        const nextMsg = conversation[i + 1];
        const isBotFollowUp = nextMsg && nextMsg.sender === 'bot';

        if (isBot) {
          setIsTyping(true);
          await new Promise(r => { timeout = setTimeout(r, 1500 + Math.random() * 500); });
          if (cancelled) break;
          setIsTyping(false);
        } else {
          setIsUserTyping(true);
          await new Promise(r => { timeout = setTimeout(r, 3500 + Math.random() * 1500); });
          if (cancelled) break;
          setIsUserTyping(false);
        }

        setMessages(prev => [...prev, msg]);

        // Pause to read the message before the next one appears
        const pauseDuration = isBot && isBotFollowUp ? 1500 : 2500;
        await new Promise(r => { timeout = setTimeout(r, pauseDuration); });
      }

      // Pause at end before looping
      await new Promise(r => { timeout = setTimeout(r, 5000); });
      if (!cancelled) {
        runSimulation();
      }
    };

    runSimulation();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [journeyType, conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isUserTyping]);

  // Lock body scroll when chat is open
  useEffect(() => {
    document.body.classList.add('chat-open');
    document.documentElement.classList.add('chat-open');
    return () => {
      document.body.classList.remove('chat-open');
      document.documentElement.classList.remove('chat-open');
    };
  }, []);

  return (
    <section className="chat-overlay bg-stone-100 flex items-center justify-center overflow-hidden z-10" onTouchMove={(e) => e.preventDefault()}>
      <div className="w-full max-w-lg mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col" style={{ height: 'calc(100% - 2rem)', maxHeight: '650px' }} onTouchMove={(e) => e.stopPropagation()}>
        <div className={`${guide.color} p-5 flex items-center justify-between text-white flex-shrink-0`}>
          <button onClick={onBack} className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-full font-medium transition-colors">
            <span className="text-lg">←</span> {t('chat.back')}
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full" />
            <div>
              <p className="font-semibold">{guide.name}</p>
              <p className="text-sm opacity-90">{guide.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm opacity-80">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            {t('chat.online')}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0" style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }} onTouchMove={(e) => e.stopPropagation()}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.sender === 'bot' && <div className={`w-8 h-8 ${guide.color} rounded-full flex-shrink-0`} />}
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.sender === 'user' ? `${guide.color} text-white rounded-br-sm` : 'bg-stone-100 rounded-bl-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2">
              <div className={`w-8 h-8 ${guide.color} rounded-full`} />
              <div className="bg-stone-100 p-4 rounded-2xl flex gap-1">
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          )}
          {isUserTyping && (
            <div className="flex gap-2 flex-row-reverse">
              <div className={`${guide.color} p-4 rounded-2xl rounded-br-sm flex gap-1`}>
                <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t flex-shrink-0">
          <p className="text-center text-sm text-stone-500 italic">{t('chat.watchingSample')}</p>
        </div>

        <p className="text-center text-xs text-stone-400 pb-4 flex-shrink-0">{t('chat.demoOnly')}</p>
      </div>
    </section>
  );
}

function PageHero({ label, title, highlight, subtitle, ctaText, ctaAction, ctaColor = 'bg-teal-600 hover:bg-teal-700' }) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-teal-50 to-amber-50 text-center">
      <div className="max-w-3xl mx-auto">
        <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">{label}</span>
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-slate-800 mt-4 mb-6 leading-tight">
          {title}
          <span className="block bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">{highlight}</span>
        </h1>
        <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto">{subtitle}</p>
        {ctaText && <button onClick={ctaAction} className={`px-8 py-4 ${ctaColor} text-white rounded-full text-lg font-semibold shadow-lg`}>{ctaText}</button>}
      </div>
    </section>
  );
}
