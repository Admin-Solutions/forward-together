import React, { useState, useEffect, useRef } from 'react';

export default function ForwardTogetherWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3">
            <Logo size={44} />
            <div className="flex flex-col leading-tight">
              <span className="font-serif font-semibold text-lg text-slate-800">Forward</span>
              <span className="font-serif text-sm text-teal-600">Together</span>
            </div>
          </button>
          
          <div className="hidden md:flex items-center gap-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'for-survivors', label: 'For Survivors' },
              { id: 'for-caregivers', label: 'For Caregivers' },
              { id: 'stories', label: 'Stories' },
            ].map(item => (
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
            <button 
              onClick={() => setCurrentPage('get-started')}
              className="ml-2 px-5 py-2.5 bg-teal-600 text-white rounded-full text-sm font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/25"
            >
              Begin Your Journey
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
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Logo size={48} />
                <div>
                  <div className="font-serif font-semibold">Forward Together</div>
                  <div className="text-sm text-stone-400">You're not alone in this.</div>
                </div>
              </div>
            </div>
            
            {[
              { title: 'For You', links: ['For Survivors', 'For Caregivers', 'Get Started', 'Stories'] },
              { title: 'About', links: ['How It Works', 'Our Story', 'Contact Us'] },
              { title: 'Resources', links: ['Help Center', 'Privacy Policy', 'Terms of Service'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-stone-400">{col.title}</h4>
                <div className="space-y-2">
                  {col.links.map((link, j) => (
                    <button key={j} className="block text-stone-300 hover:text-amber-400 transition-colors text-sm">
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-stone-700 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
            <p>© 2025 Forward Together Project. All rights reserved.</p>
            <p className="italic">Built by survivors, for survivors. Because no one should face cancer alone.</p>
          </div>
        </div>
      </footer>
    </div>
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
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full text-teal-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              A New Kind of Support
            </div>
            
            <h1 className="font-serif text-5xl lg:text-6xl font-medium text-slate-800 leading-tight mb-6">
              You don't have to
              <span className="block bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">
                face this alone
              </span>
            </h1>
            
            <p className="text-xl text-stone-600 leading-relaxed mb-8 max-w-lg">
              Whether you're navigating a cancer diagnosis or caring for someone who is, 
              Forward Together connects you with people who truly understand — 
              because they've walked the same path.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <button 
                onClick={() => setCurrentPage('get-started')}
                className="px-8 py-4 bg-teal-600 text-white rounded-full text-lg font-semibold hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/30"
              >
                Start Your Journey →
              </button>
              <button 
                onClick={() => setCurrentPage('how-it-works')}
                className="px-8 py-4 bg-white text-slate-700 rounded-full text-lg font-semibold border-2 border-stone-200 hover:border-teal-300 transition-all"
              >
                See How It Works
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
                Joining <strong className="text-slate-800">2,400+</strong> survivors and caregivers
              </p>
            </div>
          </div>
          
          {/* Chat Preview */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto lg:ml-auto">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full" />
              <div>
                <p className="font-serif font-semibold text-white text-lg">Bob</p>
                <p className="text-teal-100 text-sm">Your Survivor Guide</p>
              </div>
            </div>
            <div className="p-5 space-y-4 max-h-80 overflow-y-auto">
              {[
                { type: 'bot', text: "Hey. I'm Bob. I'm a survivor too. I remember what it felt like in the beginning." },
                { type: 'bot', text: "Someone helped me back then. That's what I'm here to do for you." },
                { type: 'user', text: "I just found out yesterday. I don't even know where to start..." },
                { type: 'bot', text: "That's okay. You don't have to have it figured out. Can you tell me a little about what's going on?" },
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
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="font-serif text-4xl font-medium text-slate-800 mt-3 mb-4">
              From overwhelmed to <span className="bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">supported</span>
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              No clinical questionnaires. No waiting rooms. Just meaningful connection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Share Your Story', desc: "No forms. Just conversation.", color: 'bg-amber-500' },
              { num: '02', title: 'Get Understood', desc: 'AI guides respond with genuine empathy.', color: 'bg-teal-500' },
              { num: '03', title: 'Find Your People', desc: "Connect with those who've walked your path.", color: 'bg-rose-500' },
              { num: '04', title: 'Move Forward Together', desc: "Build connections. Help others.", color: 'bg-violet-500' },
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
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Meet Your Guides</span>
            <h2 className="font-serif text-4xl font-medium text-slate-800 mt-3">Always here. Always understanding.</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-lg border-t-4 border-teal-500">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full mb-6" />
              <h3 className="font-serif text-3xl font-medium text-teal-700 mb-2">Bob</h3>
              <p className="text-stone-500 mb-4">Survivor Guide</p>
              <p className="text-stone-600 leading-relaxed mb-6">
                A survivor himself, Bob understands the weight of those first days. He's here to listen 
                and share wisdom from thousands of survivors.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Warm & steady', 'Been there', 'No judgment'].map((trait, i) => (
                  <span key={i} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">{trait}</span>
                ))}
              </div>
              <button onClick={() => setCurrentPage('get-started')} className="w-full py-3 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700">
                Talk to Bob
              </button>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg border-t-4 border-rose-500">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full mb-6" />
              <h3 className="font-serif text-3xl font-medium text-rose-600 mb-2">Miri</h3>
              <p className="text-stone-500 mb-4">Caregiver Guide</p>
              <p className="text-stone-600 leading-relaxed mb-6">
                Miri sees you — not just as a caregiver, but as someone carrying an invisible weight. 
                Your needs matter too.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Compassionate', 'Practical', 'Sees your struggle'].map((trait, i) => (
                  <span key={i} className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-sm">{trait}</span>
                ))}
              </div>
              <button onClick={() => setCurrentPage('get-started')} className="w-full py-3 bg-rose-500 text-white rounded-full font-semibold hover:bg-rose-600">
                Talk to Miri
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Our Impact</span>
            <h2 className="font-serif text-4xl font-medium mt-3">Real people. Real support. <span className="text-amber-400">Real difference.</span></h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '2,400+', label: 'Survivors & Caregivers' },
              { num: '15,000+', label: 'Peer Connections' },
              { num: '98%', label: 'Feel Less Alone' },
              { num: '24/7', label: 'Always Available' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-5xl font-bold text-amber-400 mb-2">{stat.num}</div>
                <div className="font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Why Forward Together</span>
            <h2 className="font-serif text-4xl font-medium text-slate-800 mt-3">Built different. For a reason.</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '💬', title: 'No Forms, Just Conversation', desc: 'Our AI understands context, not checkboxes.' },
              { icon: '🤝', title: 'Real Peer Matching', desc: 'Same cancer, same stage, same life situation.' },
              { icon: '🔒', title: 'Your Story, Your Control', desc: 'Choose what to share. Privacy is sacred.' },
              { icon: '🌙', title: 'Available 24/7', desc: "Cancer doesn't keep office hours. Neither do we." },
              { icon: '💡', title: 'Collective Wisdom', desc: 'Learn from thousands of journeys.' },
              { icon: '❤️', title: 'Give Back When Ready', desc: "Turn your experience into someone else's hope." },
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
  return (
    <section className="py-24 px-6 bg-stone-50">
      <div className="max-w-3xl mx-auto text-center">
        <Logo size={80} />
        <h2 className="font-serif text-4xl font-medium text-slate-800 mt-6 mb-4">Ready to take the first step?</h2>
        <p className="text-xl text-stone-600 mb-8">You don't have to figure this out alone.</p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button onClick={() => setCurrentPage('get-started')} className="px-8 py-4 bg-teal-600 text-white rounded-full text-lg font-semibold hover:bg-teal-700 shadow-lg">
            I'm a Survivor
          </button>
          <button onClick={() => setCurrentPage('get-started')} className="px-8 py-4 bg-rose-500 text-white rounded-full text-lg font-semibold hover:bg-rose-600 shadow-lg">
            I'm a Caregiver
          </button>
        </div>
        <p className="text-stone-500">Free. Private. No account required.</p>
      </div>
    </section>
  );
}

function HowItWorksPage({ setCurrentPage }) {
  return (
    <>
      <PageHero label="How It Works" title="From overwhelmed" highlight="to supported" subtitle="We've reimagined what cancer support can be." />
      <HomePage setCurrentPage={setCurrentPage} />
    </>
  );
}

function ForSurvivorsPage({ setCurrentPage }) {
  return (
    <>
      <PageHero label="For Survivors" title="You've already shown incredible strength." highlight="Let us walk with you." subtitle="Connect with people who get it — because they've lived it." ctaText="Talk to Bob →" ctaAction={() => setCurrentPage('get-started')} ctaColor="bg-teal-600 hover:bg-teal-700" />
      
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-medium text-slate-800 text-center mb-12">We understand where you are</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🌅', title: 'Just Diagnosed', desc: "The world shifted. You need someone who knows it gets better." },
              { icon: '💪', title: 'In Treatment', desc: "Connect with others who know exactly what you're going through." },
              { icon: '🌟', title: 'Post-Treatment', desc: '"Scanxiety" is real. Others understand.' },
              { icon: '🌈', title: 'Long-term Survivorship', desc: "Share your wisdom. Help someone beginning their journey." },
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
  return (
    <>
      <PageHero label="For Caregivers" title="You're showing up every day." highlight="Who's showing up for you?" subtitle="Forward Together sees you as someone who needs support too." ctaText="Talk to Miri →" ctaAction={() => setCurrentPage('get-started')} ctaColor="bg-rose-500 hover:bg-rose-600" />
      
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-medium text-slate-800 text-center mb-12">We see what you carry</h2>
          <div className="space-y-6">
            {[
              { quote: '"I feel guilty taking time for myself."', response: "Your needs matter too." },
              { quote: '"Nobody asks how I\'m doing."', response: "We ask. Your feelings are welcome here." },
              { quote: '"Sometimes I feel resentful, then awful."', response: "That's normal. You're exhausted." },
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
  const stories = [
    { name: 'Sarah', color: 'bg-amber-500', role: 'Breast Cancer Survivor', headline: '"Bob was there at 3 AM"', story: "I felt completely alone. Bob responded with such gentleness. He connected me with Maria, who had the same cancer. That connection carried me through.", outcome: 'Now 2 years cancer-free.' },
    { name: 'Michael', color: 'bg-teal-500', role: 'Caregiver', headline: '"Miri asked how I was doing"', story: 'Everyone asked about my wife. Miri asked about ME. It was the first time someone acknowledged what I was carrying.', outcome: 'Now mentors other caregivers.' },
  ];

  return (
    <>
      <PageHero label="Stories" title="Real people. Real journeys." highlight="Real connection." subtitle="Here are some of their stories." />
      
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
                <strong className="text-teal-600">Today:</strong> {s.outcome}
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

  if (step === 'chat') return <ChatInterface journeyType={journeyType} onBack={() => setStep('choice')} />;

  return (
    <section className="min-h-screen py-24 px-6 bg-stone-50 flex items-center">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-serif text-4xl font-medium text-slate-800 mb-4">Welcome to Forward Together</h1>
        <p className="text-xl text-stone-600 mb-12">We're here for you.</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <button onClick={() => { setJourneyType('survivor'); setStep('chat'); }} className="bg-white rounded-3xl p-10 text-center border-2 border-transparent hover:border-teal-500 hover:shadow-xl transition-all">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full mx-auto mb-6" />
            <h2 className="font-serif text-2xl font-semibold text-slate-800 mb-3">I'm facing a diagnosis</h2>
            <p className="text-stone-600 mb-6">Talk to Bob, a survivor guide.</p>
            <span className="text-teal-600 font-semibold">Meet Bob →</span>
          </button>
          
          <button onClick={() => { setJourneyType('caregiver'); setStep('chat'); }} className="bg-white rounded-3xl p-10 text-center border-2 border-transparent hover:border-rose-500 hover:shadow-xl transition-all">
            <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full mx-auto mb-6" />
            <h2 className="font-serif text-2xl font-semibold text-slate-800 mb-3">I'm caring for someone</h2>
            <p className="text-stone-600 mb-6">Talk to Miri, a caregiver guide.</p>
            <span className="text-rose-600 font-semibold">Meet Miri →</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// Scripted conversation for Bob (Survivor Guide)
const bobConversation = [
  { sender: 'bot', text: "Hey. I'm Bob." },
  { sender: 'bot', text: "I'm a survivor too." },
  { sender: 'bot', text: "Can you tell me what's going on?" },
  { sender: 'user', text: "I just got diagnosed yesterday. Breast cancer. I don't even know where to start." },
  { sender: 'bot', text: "I'm really glad you reached out. Yesterday... that's so fresh. How are you feeling right now?" },
  { sender: 'user', text: "Honestly? Terrified. I couldn't sleep at all last night." },
  { sender: 'bot', text: "That makes complete sense. I remember that feeling. The world looks different after those words, doesn't it?" },
  { sender: 'user', text: "Yes. Everything feels surreal. Like I'm watching someone else's life." },
  { sender: 'bot', text: "That disconnected feeling is so common in the first days. Your mind is trying to process something huge." },
  { sender: 'bot', text: "Can I ask - do you have someone with you right now?" },
  { sender: 'user', text: "My sister is here. She's been amazing but I can tell she's scared too." },
  { sender: 'bot', text: "It's good you're not alone. And it's okay that she's scared. You can be scared together." },
  { sender: 'user', text: "I have so many questions but I don't even know what to ask." },
  { sender: 'bot', text: "That's completely normal. You don't need to have it all figured out right now." },
  { sender: 'bot', text: "In my experience, the questions come when they're ready. And we'll be here for each one." },
  { sender: 'user', text: "When you were diagnosed, what helped you the most in those first days?" },
  { sender: 'bot', text: "Honestly? Talking to someone who'd been through it. Someone who could tell me that this chaotic feeling wouldn't last forever." },
  { sender: 'bot', text: "The medical stuff was important, but having someone who just got it... that's what carried me through." },
  { sender: 'user', text: "That's why I came here. My doctor gave me pamphlets but I needed something more human." },
  { sender: 'bot', text: "Pamphlets don't hold your hand at 3am. I understand." },
  { sender: 'user', text: "Exactly. Do you think... will I be okay?" },
  { sender: 'bot', text: "I can't promise what your journey will look like. But I can tell you that you're stronger than you know right now." },
  { sender: 'bot', text: "And you won't walk this path alone. That I can promise." },
  { sender: 'user', text: "That actually helps. Just knowing someone understands." },
  { sender: 'bot', text: "I do understand. And there are thousands of survivors in our community who understand too." },
  { sender: 'user', text: "I think I'd like to connect with someone who had a similar diagnosis. Is that possible?" },
  { sender: 'bot', text: "Absolutely. That's exactly what we do here. I can help match you with someone who's been where you are." },
  { sender: 'bot', text: "Someone who knows the specific fears, the specific questions, the specific victories." },
  { sender: 'user', text: "That would mean so much. I feel less alone already just talking to you." },
  { sender: 'bot', text: "You ARE less alone. You found us, and that took courage." },
  { sender: 'user', text: "I don't feel very courageous right now." },
  { sender: 'bot', text: "Courage isn't the absence of fear. It's reaching out when you're terrified. You did that today." },
  { sender: 'user', text: "I never thought of it that way." },
  { sender: 'bot', text: "One day at a time. Sometimes one hour at a time. That's how we do this." },
  { sender: 'user', text: "Thank you, Bob. Really." },
  { sender: 'bot', text: "I'm here whenever you need me. Day or night. That's what Forward Together is about." },
  { sender: 'bot', text: "You're not alone in this. Not anymore." },
];

// Scripted conversation for Miri (Caregiver Guide)
const miriConversation = [
  { sender: 'bot', text: "Hi. I'm Miri." },
  { sender: 'bot', text: "I see you too." },
  { sender: 'bot', text: "How are you holding up?" },
  { sender: 'user', text: "Honestly, I don't even know. My husband was diagnosed with lymphoma three weeks ago." },
  { sender: 'bot', text: "Three weeks. You're still in the thick of it. I'm glad you reached out." },
  { sender: 'bot', text: "Can I ask - how are YOU doing? Not him. You." },
  { sender: 'user', text: "Nobody asks me that. Everyone asks about Tom." },
  { sender: 'bot', text: "I know. That's why I'm asking. Your feelings matter too." },
  { sender: 'user', text: "I feel guilty even talking about myself. He's the one who's sick." },
  { sender: 'bot', text: "There's no guilt needed here. Caring for someone takes everything you have. Your struggles are real." },
  { sender: 'user', text: "I'm exhausted. I haven't slept properly in weeks. I'm trying to be strong for him and the kids." },
  { sender: 'bot', text: "That's such a heavy weight to carry. Being strong for everyone while processing your own fear." },
  { sender: 'user', text: "Sometimes I feel so angry. And then I feel awful for being angry." },
  { sender: 'bot', text: "Anger is a normal part of this. It doesn't make you a bad person or a bad caregiver." },
  { sender: 'bot', text: "You're allowed to feel angry at the situation. At cancer. At the unfairness of it all." },
  { sender: 'user', text: "I just want our normal life back." },
  { sender: 'bot', text: "Of course you do. Grieving the life you had is part of this journey too." },
  { sender: 'user', text: "I feel like I'm failing at everything. The house is a mess, I forgot my daughter's permission slip..." },
  { sender: 'bot', text: "You're not failing. You're surviving an impossible situation. Something has to give." },
  { sender: 'bot', text: "A messy house doesn't mean you're failing. It means you're prioritizing what matters most." },
  { sender: 'user', text: "I keep thinking I should be handling this better." },
  { sender: 'bot', text: "There's no 'right way' to handle this. You're doing it, and that's what counts." },
  { sender: 'user', text: "My mom keeps offering to help but I feel like I should be able to do this myself." },
  { sender: 'bot', text: "Accepting help isn't weakness. It's wisdom. You can't pour from an empty cup." },
  { sender: 'bot', text: "What if letting your mom help is actually a gift to her too? A way she can feel useful?" },
  { sender: 'user', text: "I never thought of it that way." },
  { sender: 'bot', text: "Caregivers often forget they deserve care too. When's the last time you did something just for you?" },
  { sender: 'user', text: "I can't even remember. There's no time." },
  { sender: 'bot', text: "Even ten minutes matters. A cup of tea alone. A short walk. Small things add up." },
  { sender: 'user', text: "I feel selfish even thinking about myself." },
  { sender: 'bot', text: "Taking care of yourself isn't selfish. It's necessary. You can't support Tom if you collapse." },
  { sender: 'user', text: "That's what my sister says too." },
  { sender: 'bot', text: "She's right. Would you like to connect with other caregivers who understand this?" },
  { sender: 'user', text: "There are others going through this?" },
  { sender: 'bot', text: "Many others. Caregivers who know exactly what 3am anxiety feels like. Who understand the isolation." },
  { sender: 'bot', text: "Sometimes talking to someone who's been there makes all the difference." },
  { sender: 'user', text: "Yes, I think I'd like that. It would help to not feel so alone in this." },
  { sender: 'bot', text: "You're not alone. There's a whole community here who sees what you're carrying." },
  { sender: 'user', text: "Thank you for asking about me, Miri. It means more than you know." },
  { sender: 'bot', text: "That's what I'm here for. You matter, not just as a caregiver, but as a person." },
  { sender: 'bot', text: "We're here whenever you need us. You don't have to carry this alone." },
];

function ChatInterface({ journeyType, onBack }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const guide = journeyType === 'survivor'
    ? { name: 'Bob', role: 'Survivor Guide', color: 'bg-teal-600' }
    : { name: 'Miri', role: 'Caregiver Guide', color: 'bg-rose-500' };

  const conversation = journeyType === 'survivor' ? bobConversation : miriConversation;

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
          await new Promise(r => { timeout = setTimeout(r, 1000 + Math.random() * 500); });
          if (cancelled) break;
          setIsTyping(false);
        } else {
          setIsUserTyping(true);
          await new Promise(r => { timeout = setTimeout(r, 1500 + Math.random() * 1000); });
          if (cancelled) break;
          setIsUserTyping(false);
        }

        setMessages(prev => [...prev, msg]);

        // Shorter pause between consecutive bot messages, longer pause after user messages
        const pauseDuration = isBot && isBotFollowUp ? 600 : 1200;
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
  }, [journeyType]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isUserTyping]);

  return (
    <section className="min-h-[calc(100vh-5rem)] min-h-[calc(100dvh-5rem)] py-8 px-6 bg-stone-100 flex items-start justify-center">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-7rem)] max-h-[calc(100dvh-7rem)]">
        <div className={`${guide.color} p-5 flex items-center justify-between text-white flex-shrink-0`}>
          <button onClick={onBack} className="opacity-80 hover:opacity-100">← Back</button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full" />
            <div>
              <p className="font-semibold">{guide.name}</p>
              <p className="text-sm opacity-90">{guide.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm opacity-80">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Online
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0">
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
          <p className="text-center text-sm text-stone-500 italic">Watching a sample conversation...</p>
        </div>

        <p className="text-center text-xs text-stone-400 pb-4 flex-shrink-0">Demo only. Full app connects you with real people.</p>
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
