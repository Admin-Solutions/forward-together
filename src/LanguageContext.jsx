import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const getConversation = (type) => {
    return type === 'survivor'
      ? translations[language].bobConversation
      : translations[language].miriConversation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getConversation }}>
      {children}
    </LanguageContext.Provider>
  );
}

const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      howItWorks: 'How It Works',
      forSurvivors: 'For Survivors',
      forCaregivers: 'For Caregivers',
      stories: 'Stories',
      beginJourney: 'Begin Your Journey',
    },

    // Brand
    brand: {
      forward: 'Forward',
      together: 'Together',
      tagline: "You're not alone in this.",
    },

    // Footer
    footer: {
      forYou: 'For You',
      about: 'About',
      resources: 'Resources',
      forSurvivors: 'For Survivors',
      forCaregivers: 'For Caregivers',
      getStarted: 'Get Started',
      stories: 'Stories',
      howItWorks: 'How It Works',
      ourStory: 'Our Story',
      contactUs: 'Contact Us',
      helpCenter: 'Help Center',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      copyright: '© 2025 Forward Together Project. All rights reserved.',
      builtBy: "Built by survivors, for survivors. Because no one should face cancer alone.",
    },

    // Hero Section
    hero: {
      title1: "You don't have to",
      title2: "face this alone",
      description: "Whether you're navigating a cancer diagnosis or caring for someone who is, Forward Together connects you with people who truly understand — because they've walked the same path.",
      startJourney: 'Start Your Journey →',
      seeHowItWorks: 'See How It Works',
      joinWith: 'Join with other survivors and caregivers',
    },

    // Chat Preview
    chatPreview: {
      bob: 'Bob',
      yourSurvivorGuide: 'Your Survivor Guide',
      msg1: "Hey. I'm Bob. I'm a survivor too. I remember what it felt like in the beginning.",
      msg2: "Someone helped me back then. That's what I'm here to do for you.",
      msg3: "I just found out yesterday. I don't even know where to start...",
      msg4: "That's okay. You don't have to have it figured out. Can you tell me a little about what's going on?",
    },

    // How It Works Section
    howItWorks: {
      label: 'How It Works',
      title1: 'From overwhelmed to',
      title2: 'supported',
      subtitle: 'No clinical questionnaires. No waiting rooms. Just meaningful connection.',
      step1Title: 'Share Your Story',
      step1Desc: 'No forms. Just conversation.',
      step2Title: 'Get Understood',
      step2Desc: 'AI guides respond with genuine empathy.',
      step3Title: 'Find Your People',
      step3Desc: "Connect with those who've walked your path.",
      step4Title: 'Move Forward Together',
      step4Desc: 'Build connections. Help others.',
    },

    // Guides Section
    guides: {
      label: 'Meet Your Guides',
      title: 'Always here. Always understanding.',
      bob: {
        name: 'Bob',
        role: 'Survivor Guide',
        description: "A survivor himself, Bob understands the weight of those first days. He's here to listen and share wisdom from thousands of survivors.",
        trait1: 'Warm & steady',
        trait2: 'Been there',
        trait3: 'No judgment',
        button: 'Talk to Bob',
      },
      miri: {
        name: 'Miri',
        role: 'Caregiver Guide',
        description: "Miri sees you — not just as a caregiver, but as someone carrying an invisible weight. Your needs matter too.",
        trait1: 'Compassionate',
        trait2: 'Practical',
        trait3: 'Sees your struggle',
        button: 'Talk to Miri',
      },
    },

    // Features Section
    features: {
      label: 'Why Forward Together',
      title: 'Built different. For a reason.',
      feature1Title: 'No Forms, Just Conversation',
      feature1Desc: 'Our AI understands context, not checkboxes.',
      feature2Title: 'Real Peer Matching',
      feature2Desc: 'Same cancer, same stage, same life situation.',
      feature3Title: 'Your Story, Your Control',
      feature3Desc: 'Choose what to share. Privacy is sacred.',
      feature4Title: 'Available 24/7',
      feature4Desc: "Cancer doesn't keep office hours. Neither do we.",
      feature5Title: 'Collective Wisdom',
      feature5Desc: 'Learn from thousands of journeys.',
      feature6Title: 'Give Back When Ready',
      feature6Desc: "Turn your experience into someone else's hope.",
    },

    // CTA Section
    cta: {
      title: 'Ready to take the first step?',
      subtitle: "You don't have to figure this out alone.",
      imSurvivor: "I'm a Survivor",
      imCaregiver: "I'm a Caregiver",
      freePrivate: 'Free. Private.',
    },

    // For Survivors Page
    forSurvivors: {
      label: 'For Survivors',
      title: "You've already shown incredible strength.",
      highlight: 'Let us walk with you.',
      subtitle: "Connect with people who get it — because they've lived it.",
      ctaText: 'Talk to Bob →',
      sectionTitle: 'We understand where you are',
      stage1Title: 'Just Diagnosed',
      stage1Desc: 'The world shifted. You need someone who knows it gets better.',
      stage2Title: 'In Treatment',
      stage2Desc: "Connect with others who know exactly what you're going through.",
      stage3Title: 'Post-Treatment',
      stage3Desc: '"Scanxiety" is real. Others understand.',
      stage4Title: 'Long-term Survivorship',
      stage4Desc: 'Share your wisdom. Help someone beginning their journey.',
    },

    // For Caregivers Page
    forCaregivers: {
      label: 'For Caregivers',
      title: "You're showing up every day.",
      highlight: "Who's showing up for you?",
      subtitle: 'Forward Together sees you as someone who needs support too.',
      ctaText: 'Talk to Miri →',
      sectionTitle: 'We see what you carry',
      quote1: '"I feel guilty taking time for myself."',
      response1: 'Your needs matter too.',
      quote2: '"Nobody asks how I\'m doing."',
      response2: 'We ask. Your feelings are welcome here.',
      quote3: '"Sometimes I feel resentful, then awful."',
      response3: "That's normal. You're exhausted.",
    },

    // Stories Page
    stories: {
      label: 'Stories',
      title: 'Real people. Real journeys.',
      highlight: 'Real connection.',
      subtitle: 'Here are some of their stories.',
      today: 'Today:',
      sarah: {
        name: 'Sarah',
        role: 'Breast Cancer Survivor',
        headline: '"Bob was there at 3 AM"',
        story: 'I felt completely alone. Bob responded with such gentleness. He connected me with Maria, who had the same cancer. That connection carried me through.',
        outcome: 'Now 2 years cancer-free.',
      },
      michael: {
        name: 'Michael',
        role: 'Caregiver',
        headline: '"Miri asked how I was doing"',
        story: 'Everyone asked about my wife. Miri asked about ME. It was the first time someone acknowledged what I was carrying.',
        outcome: 'Now mentors other caregivers.',
      },
    },

    // Get Started Page
    getStarted: {
      backToHome: '← Back to Home',
      welcome: 'Welcome to Forward Together',
      weAreHere: "We're here for you.",
      facingDiagnosis: "I'm facing a diagnosis",
      talkToBob: 'Talk to Bob, a survivor guide.',
      meetBob: 'Meet Bob →',
      caringForSomeone: "I'm caring for someone",
      talkToMiri: 'Talk to Miri, a caregiver guide.',
      meetMiri: 'Meet Miri →',
    },

    // Chat Interface
    chat: {
      back: 'Back',
      online: 'Online',
      survivorGuide: 'Survivor Guide',
      caregiverGuide: 'Caregiver Guide',
      watchingSample: 'Watching a sample conversation...',
      demoOnly: 'Demo only. Full app connects you with real people.',
    },

    // How It Works Page
    howItWorksPage: {
      label: 'How It Works',
      title: 'From overwhelmed',
      highlight: 'to supported',
      subtitle: "We've reimagined what cancer support can be.",
    },

    // Bob's Conversation
    bobConversation: [
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
    ],

    // Miri's Conversation
    miriConversation: [
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
    ],
  },

  // Spanish (Spain) translations
  es: {
    // Navigation
    nav: {
      home: 'Inicio',
      howItWorks: 'Cómo funciona',
      forSurvivors: 'Para supervivientes',
      forCaregivers: 'Para cuidadores',
      stories: 'Historias',
      beginJourney: 'Comienza tu camino',
    },

    // Brand
    brand: {
      forward: 'Forward',
      together: 'Together',
      tagline: 'No estás solo en esto.',
    },

    // Footer
    footer: {
      forYou: 'Para ti',
      about: 'Acerca de',
      resources: 'Recursos',
      forSurvivors: 'Para supervivientes',
      forCaregivers: 'Para cuidadores',
      getStarted: 'Comenzar',
      stories: 'Historias',
      howItWorks: 'Cómo funciona',
      ourStory: 'Nuestra historia',
      contactUs: 'Contáctanos',
      helpCenter: 'Centro de ayuda',
      privacyPolicy: 'Política de privacidad',
      termsOfService: 'Términos de servicio',
      copyright: '© 2025 Proyecto Forward Together. Todos los derechos reservados.',
      builtBy: 'Creado por supervivientes, para supervivientes. Porque nadie debería enfrentarse al cáncer solo.',
    },

    // Hero Section
    hero: {
      title1: 'No tienes que',
      title2: 'afrontar esto solo',
      description: 'Tanto si te enfrentas a un diagnóstico de cáncer como si estás cuidando a alguien que lo tiene, Forward Together te conecta con otras personas que realmente comprenden tu situación porque han recorrido el mismo camino.',
      startJourney: 'Comienza tu camino →',
      seeHowItWorks: 'Ver cómo funciona',
      joinWith: 'Únete a otros supervivientes y cuidadores',
    },

    // Chat Preview
    chatPreview: {
      bob: 'Bob',
      yourSurvivorGuide: 'Tu guía de superviviente',
      msg1: 'Hola, soy Bob. Yo también soy un superviviente. Recuerdo cómo me sentía al principio.',
      msg2: 'Alguien me ayudó en aquel momento. Eso es lo que yo estoy aquí para hacer por ti.',
      msg3: 'Me acabo de enterar ayer. Ni siquiera sé por dónde empezar...',
      msg4: 'No pasa nada. No tienes que tenerlo todo claro. ¿Me puedes contar un poco qué está pasando?',
    },

    // How It Works Section
    howItWorks: {
      label: 'Cómo funciona',
      title1: 'De abrumado a',
      title2: 'apoyado',
      subtitle: 'Sin cuestionarios clínicos. Sin salas de espera. Solo conexión significativa.',
      step1Title: 'Comparte tu historia',
      step1Desc: 'Sin formularios. Solo conversación.',
      step2Title: 'Sé comprendido',
      step2Desc: 'Los guías de IA responden con empatía genuina.',
      step3Title: 'Encuentra a tu gente',
      step3Desc: 'Conecta con quienes han recorrido tu camino.',
      step4Title: 'Avancemos juntos',
      step4Desc: 'Construye conexiones. Ayuda a otros.',
    },

    // Guides Section
    guides: {
      label: 'Conoce a tus guías',
      title: 'Siempre aquí. Siempre comprendiendo.',
      bob: {
        name: 'Bob',
        role: 'Guía de superviviente',
        description: 'Como superviviente, Bob comprende el peso de esos primeros días. Está aquí para escuchar y compartir la sabiduría de miles de supervivientes.',
        trait1: 'Cálido y estable',
        trait2: 'Lo ha vivido',
        trait3: 'Sin juicios',
        button: 'Habla con Bob',
      },
      miri: {
        name: 'Miri',
        role: 'Guía de cuidador',
        description: 'Miri te ve — no solo como cuidador, sino como alguien que lleva un peso invisible. Tus necesidades también importan.',
        trait1: 'Compasiva',
        trait2: 'Práctica',
        trait3: 'Ve tu lucha',
        button: 'Habla con Miri',
      },
    },

    // Features Section
    features: {
      label: 'Por qué Forward Together',
      title: 'Diferente. Por una razón.',
      feature1Title: 'Sin formularios, solo conversación',
      feature1Desc: 'Nuestra IA entiende el contexto, no las casillas.',
      feature2Title: 'Emparejamiento real entre pares',
      feature2Desc: 'Mismo cáncer, misma etapa, misma situación de vida.',
      feature3Title: 'Tu historia, tu control',
      feature3Desc: 'Elige qué compartir. La privacidad es sagrada.',
      feature4Title: 'Disponible 24/7',
      feature4Desc: 'El cáncer no tiene horario de oficina. Nosotros tampoco.',
      feature5Title: 'Sabiduría colectiva',
      feature5Desc: 'Aprende de miles de experiencias.',
      feature6Title: 'Devuelve cuando estés listo',
      feature6Desc: 'Convierte tu experiencia en la esperanza de otro.',
    },

    // CTA Section
    cta: {
      title: '¿Listo para dar el primer paso?',
      subtitle: 'No tienes que resolver esto solo.',
      imSurvivor: 'Soy superviviente',
      imCaregiver: 'Soy cuidador',
      freePrivate: 'Gratis. Privado.',
    },

    // For Survivors Page
    forSurvivors: {
      label: 'Para supervivientes',
      title: 'Ya has demostrado una fuerza increíble.',
      highlight: 'Déjanos acompañarte.',
      subtitle: 'Conecta con personas que lo entienden — porque lo han vivido.',
      ctaText: 'Habla con Bob →',
      sectionTitle: 'Entendemos dónde estás',
      stage1Title: 'Recién diagnosticado',
      stage1Desc: 'El mundo cambió. Necesitas a alguien que sabe que mejora.',
      stage2Title: 'En tratamiento',
      stage2Desc: 'Conecta con otros que saben exactamente por lo que estás pasando.',
      stage3Title: 'Post-tratamiento',
      stage3Desc: 'La "ansiedad de las pruebas" es real. Otros lo entienden.',
      stage4Title: 'Supervivencia a largo plazo',
      stage4Desc: 'Comparte tu sabiduría. Ayuda a alguien que empieza su camino.',
    },

    // For Caregivers Page
    forCaregivers: {
      label: 'Para cuidadores',
      title: 'Estás presente cada día.',
      highlight: '¿Quién está presente para ti?',
      subtitle: 'Forward Together te ve como alguien que también necesita apoyo.',
      ctaText: 'Habla con Miri →',
      sectionTitle: 'Vemos lo que llevas',
      quote1: '"Me siento culpable por tomarme tiempo para mí."',
      response1: 'Tus necesidades también importan.',
      quote2: '"Nadie pregunta cómo estoy yo."',
      response2: 'Nosotros preguntamos. Tus sentimientos son bienvenidos aquí.',
      quote3: '"A veces siento resentimiento, y luego me siento fatal."',
      response3: 'Es normal. Estás agotado.',
    },

    // Stories Page
    stories: {
      label: 'Historias',
      title: 'Personas reales. Caminos reales.',
      highlight: 'Conexión real.',
      subtitle: 'Aquí están algunas de sus historias.',
      today: 'Hoy:',
      sarah: {
        name: 'Sara',
        role: 'Superviviente de Cáncer de Mama',
        headline: '"Bob estuvo ahí a las 3 de la madrugada"',
        story: 'Me sentía completamente sola. Bob respondió con tanta delicadeza. Me conectó con María, que había tenido el mismo cáncer. Esa conexión me ayudó a salir adelante.',
        outcome: 'Ahora lleva 2 años libre de cáncer.',
      },
      michael: {
        name: 'Miguel',
        role: 'Cuidador',
        headline: '"Miri me preguntó cómo estaba yo"',
        story: 'Todo el mundo preguntaba por mi mujer. Miri preguntó por MÍ. Fue la primera vez que alguien reconoció lo que yo estaba cargando.',
        outcome: 'Ahora es mentor de otros cuidadores.',
      },
    },

    // Get Started Page
    getStarted: {
      backToHome: '← Volver al Inicio',
      welcome: 'Bienvenido a Forward Together',
      weAreHere: 'Estamos aquí para ti.',
      facingDiagnosis: 'Tengo un diagnóstico',
      talkToBob: 'Habla con Bob, un guía superviviente.',
      meetBob: 'Conoce a Bob →',
      caringForSomeone: 'Cuido de alguien',
      talkToMiri: 'Habla con Miri, una guía de cuidadores.',
      meetMiri: 'Conoce a Miri →',
    },

    // Chat Interface
    chat: {
      back: 'Volver',
      online: 'En línea',
      survivorGuide: 'Guía de Superviviente',
      caregiverGuide: 'Guía de Cuidador',
      watchingSample: 'Viendo una conversación de ejemplo...',
      demoOnly: 'Solo demo. La app completa te conecta con personas reales.',
    },

    // How It Works Page
    howItWorksPage: {
      label: 'Cómo Funciona',
      title: 'De abrumado',
      highlight: 'a apoyado',
      subtitle: 'Hemos reinventado lo que puede ser el apoyo contra el cáncer.',
    },

    // Bob's Conversation (Spanish - Spain)
    bobConversation: [
      { sender: 'bot', text: 'Hola, soy Bob.' },
      { sender: 'bot', text: 'Yo también soy un superviviente.' },
      { sender: 'bot', text: '¿Me puedes contar qué te está pasando?' },
      { sender: 'user', text: 'Me acaban de diagnosticar ayer. Cáncer de mama. Ni siquiera sé por dónde empezar.' },
      { sender: 'bot', text: 'Me alegro mucho de que me hayas escrito. Ayer... es muy reciente. ¿Cómo te sientes ahora mismo?' },
      { sender: 'user', text: '¿Sinceramente? Aterrorizada. No pude dormir en toda la noche.' },
      { sender: 'bot', text: 'Es completamente comprensible. Yo recuerdo esa sensación. El mundo parece diferente después de escuchar esas palabras, ¿verdad?' },
      { sender: 'user', text: 'Sí. Todo me parece irreal. Como si estuviera viendo la vida de otra persona.' },
      { sender: 'bot', text: 'Esa sensación de desconexión es muy común en los primeros días. Tu mente está intentando procesar algo enorme.' },
      { sender: 'bot', text: '¿Puedo preguntarte si tienes a alguien contigo ahora mismo?' },
      { sender: 'user', text: 'Mi hermana está aquí. Ha sido increíble, pero noto que ella también está asustada.' },
      { sender: 'bot', text: 'Qué bueno que no estés sola. Y está bien que ella esté asustada. Podéis estar asustadas juntas.' },
      { sender: 'user', text: 'Tengo tantas preguntas pero ni siquiera sé qué preguntar.' },
      { sender: 'bot', text: 'Eso es completamente normal. No necesitas tenerlo todo claro ahora mismo.' },
      { sender: 'bot', text: 'En mi experiencia, las preguntas llegan cuando están listas. Y nosotros estaremos aquí para cada una de ellas.' },
      { sender: 'user', text: 'Cuando a ti te diagnosticaron, ¿qué te ayudó más en esos primeros días?' },
      { sender: 'bot', text: '¿Sinceramente? Hablar con alguien que había pasado por lo mismo. Alguien que pudiera decirme que esa sensación de caos no iba a durar para siempre.' },
      { sender: 'bot', text: 'Lo médico era importante, pero tener a alguien que simplemente lo entendía... eso fue lo que me ayudó a salir adelante.' },
      { sender: 'user', text: 'Por eso vine aquí. Mi médico me dio unos folletos pero yo necesitaba algo más humano.' },
      { sender: 'bot', text: 'Los folletos no te cogen de la mano a las 3 de la madrugada. Te entiendo.' },
      { sender: 'user', text: 'Exacto. ¿Tú crees que... voy a estar bien?' },
      { sender: 'bot', text: 'No te puedo prometer cómo será tu camino. Pero sí te puedo decir que eres más fuerte de lo que tú crees ahora mismo.' },
      { sender: 'bot', text: 'Y no vas a caminar sola por este camino. Eso sí te lo puedo prometer.' },
      { sender: 'user', text: 'Eso me ayuda. Solo saber que alguien lo entiende.' },
      { sender: 'bot', text: 'Yo lo entiendo. Y hay miles de supervivientes en nuestra comunidad que también lo entienden.' },
      { sender: 'user', text: 'Creo que me gustaría conectar con alguien que haya tenido un diagnóstico similar. ¿Es posible?' },
      { sender: 'bot', text: 'Por supuesto. Eso es exactamente lo que hacemos aquí. Te puedo ayudar a encontrar a alguien que ha estado donde tú estás ahora.' },
      { sender: 'bot', text: 'Alguien que conoce los miedos específicos, las preguntas específicas, las victorias específicas.' },
      { sender: 'user', text: 'Eso significaría muchísimo para mí. Ya me siento menos sola solo por haber hablado contigo.' },
      { sender: 'bot', text: 'ESTÁS menos sola. Nos encontraste, y eso requirió valentía.' },
      { sender: 'user', text: 'No me siento muy valiente ahora mismo.' },
      { sender: 'bot', text: 'El valor no es la ausencia del miedo. Es tender la mano cuando estás aterrorizada. Eso es lo que tú hiciste hoy.' },
      { sender: 'user', text: 'Nunca lo había pensado así.' },
      { sender: 'bot', text: 'Un día a la vez. A veces una hora a la vez. Así es como lo hacemos.' },
      { sender: 'user', text: 'Gracias, Bob. De verdad.' },
      { sender: 'bot', text: 'Yo estoy aquí siempre que me necesites. De día o de noche. De eso se trata Forward Together.' },
      { sender: 'bot', text: 'Ya no estás sola en esto.' },
    ],

    // Miri's Conversation (Spanish - Spain)
    miriConversation: [
      { sender: 'bot', text: 'Hola, soy Miri.' },
      { sender: 'bot', text: 'Yo también te veo a ti.' },
      { sender: 'bot', text: '¿Cómo lo estás llevando?' },
      { sender: 'user', text: 'Sinceramente, ni siquiera lo sé. A mi marido le diagnosticaron un linfoma hace tres semanas.' },
      { sender: 'bot', text: 'Tres semanas. Todavía estás en plena tormenta. Me alegro de que me hayas escrito.' },
      { sender: 'bot', text: '¿Te puedo preguntar cómo estás TÚ? No él. Tú.' },
      { sender: 'user', text: 'Nadie me pregunta eso a mí. Todos preguntan por Tomás.' },
      { sender: 'bot', text: 'Lo sé. Por eso te lo pregunto yo. Tus sentimientos también importan.' },
      { sender: 'user', text: 'Me siento culpable incluso hablando de mí misma. Él es el que está enfermo.' },
      { sender: 'bot', text: 'Aquí no hay necesidad de sentir culpa. Cuidar de alguien requiere todo lo que tienes. Tus luchas son reales.' },
      { sender: 'user', text: 'Estoy agotada. No he dormido bien en semanas. Intento ser fuerte para él y para los niños.' },
      { sender: 'bot', text: 'Es un peso muy grande el que llevas. Ser fuerte para todos mientras procesas tu propio miedo.' },
      { sender: 'user', text: 'A veces me siento muy enfadada. Y luego me siento fatal por estar enfadada.' },
      { sender: 'bot', text: 'El enfado es una parte normal de todo esto. No te hace mala persona ni mala cuidadora.' },
      { sender: 'bot', text: 'Tienes todo el derecho a sentir enfado con la situación. Con el cáncer. Con lo injusto de todo.' },
      { sender: 'user', text: 'Solo quiero que vuelva nuestra vida normal.' },
      { sender: 'bot', text: 'Claro que sí. Llorar la vida que teníais también es parte de este camino.' },
      { sender: 'user', text: 'Siento que estoy fallando en todo. La casa está hecha un desastre, olvidé la autorización del colegio de mi hija...' },
      { sender: 'bot', text: 'Tú no estás fallando. Estás sobreviviendo a una situación imposible. Algo tiene que ceder.' },
      { sender: 'bot', text: 'Una casa desordenada no significa que estés fallando. Significa que estás priorizando lo que más importa.' },
      { sender: 'user', text: 'Sigo pensando que debería estar manejando esto mejor.' },
      { sender: 'bot', text: "No hay una forma 'correcta' de manejar esto. Lo estás haciendo, y eso es lo que cuenta." },
      { sender: 'user', text: 'Mi madre sigue ofreciéndose a ayudar pero siento que debería poder hacer esto yo sola.' },
      { sender: 'bot', text: 'Aceptar ayuda no es una debilidad. Es sabiduría. No puedes dar de un vaso vacío.' },
      { sender: 'bot', text: '¿Y si dejar que tu madre te ayude también es un regalo para ella? ¿Una forma de que ella se sienta útil?' },
      { sender: 'user', text: 'Nunca lo había pensado así.' },
      { sender: 'bot', text: 'Los cuidadores a menudo olvidan que ellos también merecen cuidados. ¿Cuándo fue la última vez que hiciste algo solo para ti?' },
      { sender: 'user', text: 'Ni me acuerdo. No hay tiempo.' },
      { sender: 'bot', text: 'Incluso diez minutos importan. Una taza de té a solas. Un paseo corto. Las pequeñas cosas suman.' },
      { sender: 'user', text: 'Me siento egoísta incluso pensando en mí misma.' },
      { sender: 'bot', text: 'Cuidar de ti misma no es egoísmo. Es necesario. No puedes apoyar a Tomás si tú te derrumbas.' },
      { sender: 'user', text: 'Eso es lo que dice mi hermana también.' },
      { sender: 'bot', text: 'Ella tiene razón. ¿Te gustaría conectar con otros cuidadores que entienden por lo que estás pasando?' },
      { sender: 'user', text: '¿Hay otras personas pasando por esto?' },
      { sender: 'bot', text: 'Muchas otras. Cuidadores que saben exactamente cómo es la ansiedad de las 3 de la madrugada. Que entienden el aislamiento.' },
      { sender: 'bot', text: 'A veces hablar con alguien que ha pasado por lo mismo marca toda la diferencia.' },
      { sender: 'user', text: 'Sí, creo que me gustaría. Me ayudaría a no sentirme tan sola en esto.' },
      { sender: 'bot', text: 'No estás sola. Hay toda una comunidad aquí que ve lo que tú estás cargando.' },
      { sender: 'user', text: 'Gracias por preguntar por mí, Miri. Significa más de lo que te imaginas.' },
      { sender: 'bot', text: 'Para eso estoy yo aquí. Tú importas, no solo como cuidadora, sino como persona.' },
      { sender: 'bot', text: 'Estamos aquí siempre que nos necesites. No tienes que llevar esto tú sola.' },
    ],
  },

  // German translations (placeholder - needs professional translation)
  de: {
    // Navigation
    nav: {
      home: 'Startseite',
      howItWorks: 'So funktioniert es',
      forSurvivors: 'Für Betroffene',
      forCaregivers: 'Für Angehörige',
      stories: 'Geschichten',
      beginJourney: 'Starte deine Reise',
    },

    // Brand
    brand: {
      forward: 'Forward',
      together: 'Together',
      tagline: 'Du bist damit nicht allein.',
    },

    // Footer
    footer: {
      forYou: 'Für dich',
      about: 'Über uns',
      resources: 'Ressourcen',
      forSurvivors: 'Für Betroffene',
      forCaregivers: 'Für Angehörige',
      getStarted: 'Loslegen',
      stories: 'Geschichten',
      howItWorks: 'So funktioniert es',
      ourStory: 'Unsere Geschichte',
      contactUs: 'Kontakt',
      helpCenter: 'Hilfe-Center',
      privacyPolicy: 'Datenschutz',
      termsOfService: 'Nutzungsbedingungen',
      copyright: '© 2025 Forward Together Projekt. Alle Rechte vorbehalten.',
      builtBy: 'Von Betroffenen für Betroffene. Weil niemand den Krebs alleine bewältigen sollte.',
    },

    // Hero Section
    hero: {
      title1: 'Du musst das nicht',
      title2: 'alleine durchstehen',
      description: 'Ob du selbst eine Krebsdiagnose erhalten hast oder jemanden pflegst – Forward Together verbindet dich mit Menschen, die wirklich verstehen, weil sie denselben Weg gegangen sind.',
      startJourney: 'Starte deine Reise →',
      seeHowItWorks: 'So funktioniert es',
      joinWith: 'Schließe dich anderen Betroffenen und Angehörigen an',
    },

    // Chat Preview
    chatPreview: {
      bob: 'Bob',
      yourSurvivorGuide: 'Dein Begleiter für Betroffene',
      msg1: 'Hallo. Ich bin Bob. Ich bin auch ein Überlebender. Ich erinnere mich, wie es sich am Anfang angefühlt hat.',
      msg2: 'Damals hat mir jemand geholfen. Das ist es, was ich jetzt für dich tun möchte.',
      msg3: 'Ich habe es gestern erfahren. Ich weiß nicht mal, wo ich anfangen soll...',
      msg4: 'Das ist in Ordnung. Du musst nicht alles sofort wissen. Kannst du mir ein bisschen erzählen, was passiert ist?',
    },

    // How It Works Section
    howItWorks: {
      label: 'So funktioniert es',
      title1: 'Von überfordert zu',
      title2: 'unterstützt',
      subtitle: 'Keine klinischen Fragebögen. Keine Wartezimmer. Nur echte Verbindung.',
      step1Title: 'Teile deine Geschichte',
      step1Desc: 'Keine Formulare. Nur Gespräch.',
      step2Title: 'Werde verstanden',
      step2Desc: 'KI-Begleiter antworten mit echtem Mitgefühl.',
      step3Title: 'Finde deine Leute',
      step3Desc: 'Verbinde dich mit denen, die deinen Weg kennen.',
      step4Title: 'Gemeinsam vorwärts',
      step4Desc: 'Baue Verbindungen auf. Hilf anderen.',
    },

    // Guides Section
    guides: {
      label: 'Lerne deine Begleiter kennen',
      title: 'Immer da. Immer verständnisvoll.',
      bob: {
        name: 'Bob',
        role: 'Begleiter für Betroffene',
        description: 'Als Überlebender versteht Bob die Last der ersten Tage. Er ist hier, um zuzuhören und die Weisheit von Tausenden Überlebenden zu teilen.',
        trait1: 'Warm & beständig',
        trait2: 'War selbst betroffen',
        trait3: 'Ohne Vorurteile',
        button: 'Mit Bob sprechen',
      },
      miri: {
        name: 'Miri',
        role: 'Begleiterin für Angehörige',
        description: 'Miri sieht dich – nicht nur als pflegende Person, sondern als jemanden, der eine unsichtbare Last trägt. Auch deine Bedürfnisse zählen.',
        trait1: 'Mitfühlend',
        trait2: 'Praktisch',
        trait3: 'Sieht deinen Kampf',
        button: 'Mit Miri sprechen',
      },
    },

    // Features Section
    features: {
      label: 'Warum Forward Together',
      title: 'Anders gebaut. Aus gutem Grund.',
      feature1Title: 'Keine Formulare, nur Gespräch',
      feature1Desc: 'Unsere KI versteht Zusammenhänge, keine Checkboxen.',
      feature2Title: 'Echtes Peer-Matching',
      feature2Desc: 'Gleicher Krebs, gleiches Stadium, gleiche Lebenssituation.',
      feature3Title: 'Deine Geschichte, deine Kontrolle',
      feature3Desc: 'Wähle, was du teilst. Privatsphäre ist heilig.',
      feature4Title: 'Rund um die Uhr verfügbar',
      feature4Desc: 'Krebs hält keine Bürozeiten ein. Wir auch nicht.',
      feature5Title: 'Kollektive Weisheit',
      feature5Desc: 'Lerne aus Tausenden von Erfahrungen.',
      feature6Title: 'Gib zurück, wenn du bereit bist',
      feature6Desc: 'Verwandle deine Erfahrung in die Hoffnung eines anderen.',
    },

    // CTA Section
    cta: {
      title: 'Bereit für den ersten Schritt?',
      subtitle: 'Du musst das nicht alleine herausfinden.',
      imSurvivor: 'Ich bin Betroffene/r',
      imCaregiver: 'Ich bin Angehörige/r',
      freePrivate: 'Kostenlos. Privat.',
    },

    // For Survivors Page
    forSurvivors: {
      label: 'Für Betroffene',
      title: 'Du hast bereits unglaubliche Stärke gezeigt.',
      highlight: 'Lass uns dich begleiten.',
      subtitle: 'Verbinde dich mit Menschen, die es verstehen – weil sie es erlebt haben.',
      ctaText: 'Mit Bob sprechen →',
      sectionTitle: 'Wir verstehen, wo du stehst',
      stage1Title: 'Gerade diagnostiziert',
      stage1Desc: 'Die Welt hat sich verändert. Du brauchst jemanden, der weiß, dass es besser wird.',
      stage2Title: 'In Behandlung',
      stage2Desc: 'Verbinde dich mit anderen, die genau wissen, was du durchmachst.',
      stage3Title: 'Nach der Behandlung',
      stage3Desc: '"Scanangst" ist real. Andere verstehen das.',
      stage4Title: 'Langzeit-Überlebende',
      stage4Desc: 'Teile deine Weisheit. Hilf jemandem am Anfang seiner Reise.',
    },

    // For Caregivers Page
    forCaregivers: {
      label: 'Für Angehörige',
      title: 'Du bist jeden Tag da.',
      highlight: 'Wer ist für dich da?',
      subtitle: 'Forward Together sieht dich als jemanden, der auch Unterstützung braucht.',
      ctaText: 'Mit Miri sprechen →',
      sectionTitle: 'Wir sehen, was du trägst',
      quote1: '"Ich fühle mich schuldig, mir Zeit für mich zu nehmen."',
      response1: 'Auch deine Bedürfnisse zählen.',
      quote2: '"Niemand fragt, wie es mir geht."',
      response2: 'Wir fragen. Deine Gefühle sind hier willkommen.',
      quote3: '"Manchmal bin ich wütend, und dann fühle ich mich schrecklich."',
      response3: 'Das ist normal. Du bist erschöpft.',
    },

    // Stories Page
    stories: {
      label: 'Geschichten',
      title: 'Echte Menschen. Echte Wege.',
      highlight: 'Echte Verbindung.',
      subtitle: 'Hier sind einige ihrer Geschichten.',
      today: 'Heute:',
      sarah: {
        name: 'Sarah',
        role: 'Brustkrebsüberlebende',
        headline: '"Bob war um 3 Uhr nachts da"',
        story: 'Ich fühlte mich völlig allein. Bob antwortete mit so viel Sanftheit. Er verband mich mit Maria, die denselben Krebs hatte. Diese Verbindung hat mich durchgetragen.',
        outcome: 'Jetzt 2 Jahre krebsfrei.',
      },
      michael: {
        name: 'Michael',
        role: 'Pflegender Angehöriger',
        headline: '"Miri fragte, wie es mir geht"',
        story: 'Alle fragten nach meiner Frau. Miri fragte nach MIR. Es war das erste Mal, dass jemand anerkannte, was ich trage.',
        outcome: 'Jetzt Mentor für andere Angehörige.',
      },
    },

    // Get Started Page
    getStarted: {
      backToHome: '← Zurück zur Startseite',
      welcome: 'Willkommen bei Forward Together',
      weAreHere: 'Wir sind für dich da.',
      facingDiagnosis: 'Ich habe eine Diagnose erhalten',
      talkToBob: 'Sprich mit Bob, einem Begleiter für Betroffene.',
      meetBob: 'Bob kennenlernen →',
      caringForSomeone: 'Ich pflege jemanden',
      talkToMiri: 'Sprich mit Miri, einer Begleiterin für Angehörige.',
      meetMiri: 'Miri kennenlernen →',
    },

    // Chat Interface
    chat: {
      back: 'Zurück',
      online: 'Online',
      survivorGuide: 'Begleiter für Betroffene',
      caregiverGuide: 'Begleiterin für Angehörige',
      watchingSample: 'Du siehst ein Beispielgespräch...',
      demoOnly: 'Nur Demo. Die vollständige App verbindet dich mit echten Menschen.',
    },

    // How It Works Page
    howItWorksPage: {
      label: 'So funktioniert es',
      title: 'Von überfordert',
      highlight: 'zu unterstützt',
      subtitle: 'Wir haben neu gedacht, was Krebsunterstützung sein kann.',
    },

    // Bob's Conversation (German)
    bobConversation: [
      { sender: 'bot', text: 'Hallo. Ich bin Bob.' },
      { sender: 'bot', text: 'Ich bin auch ein Überlebender.' },
      { sender: 'bot', text: 'Kannst du mir erzählen, was bei dir los ist?' },
      { sender: 'user', text: 'Ich habe gestern die Diagnose bekommen. Brustkrebs. Ich weiß nicht mal, wo ich anfangen soll.' },
      { sender: 'bot', text: 'Ich bin wirklich froh, dass du dich gemeldet hast. Gestern... das ist noch so frisch. Wie fühlst du dich gerade?' },
      { sender: 'user', text: 'Ehrlich? Verängstigt. Ich konnte die ganze Nacht nicht schlafen.' },
      { sender: 'bot', text: 'Das ist völlig verständlich. Ich erinnere mich an dieses Gefühl. Die Welt sieht anders aus nach diesen Worten, oder?' },
      { sender: 'user', text: 'Ja. Alles fühlt sich unwirklich an. Als würde ich das Leben eines anderen beobachten.' },
      { sender: 'bot', text: 'Dieses Gefühl der Abgetrenntheit ist in den ersten Tagen sehr häufig. Dein Verstand versucht, etwas Gewaltiges zu verarbeiten.' },
      { sender: 'bot', text: 'Darf ich fragen – hast du gerade jemanden bei dir?' },
      { sender: 'user', text: 'Meine Schwester ist hier. Sie war großartig, aber ich merke, dass sie auch Angst hat.' },
      { sender: 'bot', text: 'Gut, dass du nicht allein bist. Und es ist okay, dass sie Angst hat. Ihr könnt zusammen Angst haben.' },
      { sender: 'user', text: 'Ich habe so viele Fragen, aber ich weiß nicht mal, was ich fragen soll.' },
      { sender: 'bot', text: 'Das ist völlig normal. Du musst jetzt nicht alles geklärt haben.' },
      { sender: 'bot', text: 'Nach meiner Erfahrung kommen die Fragen, wenn sie bereit sind. Und wir werden für jede einzelne da sein.' },
      { sender: 'user', text: 'Als du deine Diagnose bekommen hast, was hat dir in den ersten Tagen am meisten geholfen?' },
      { sender: 'bot', text: 'Ehrlich? Mit jemandem zu sprechen, der es durchgemacht hat. Jemand, der mir sagen konnte, dass dieses chaotische Gefühl nicht ewig dauern würde.' },
      { sender: 'bot', text: 'Das Medizinische war wichtig, aber jemanden zu haben, der es einfach verstand... das hat mich durchgetragen.' },
      { sender: 'user', text: 'Deshalb bin ich hier. Mein Arzt hat mir Broschüren gegeben, aber ich brauchte etwas Menschlicheres.' },
      { sender: 'bot', text: 'Broschüren halten dir um 3 Uhr nachts nicht die Hand. Ich verstehe.' },
      { sender: 'user', text: 'Genau. Glaubst du... werde ich okay sein?' },
      { sender: 'bot', text: 'Ich kann dir nicht versprechen, wie dein Weg aussehen wird. Aber ich kann dir sagen, dass du stärker bist, als du gerade denkst.' },
      { sender: 'bot', text: 'Und du wirst diesen Weg nicht alleine gehen. Das kann ich dir versprechen.' },
      { sender: 'user', text: 'Das hilft tatsächlich. Einfach zu wissen, dass jemand versteht.' },
      { sender: 'bot', text: 'Ich verstehe. Und es gibt Tausende von Überlebenden in unserer Gemeinschaft, die es auch verstehen.' },
      { sender: 'user', text: 'Ich glaube, ich würde mich gerne mit jemandem verbinden, der eine ähnliche Diagnose hatte. Ist das möglich?' },
      { sender: 'bot', text: 'Absolut. Genau das machen wir hier. Ich kann dir helfen, jemanden zu finden, der dort war, wo du jetzt bist.' },
      { sender: 'bot', text: 'Jemand, der die spezifischen Ängste kennt, die spezifischen Fragen, die spezifischen Siege.' },
      { sender: 'user', text: 'Das würde mir so viel bedeuten. Ich fühle mich jetzt schon weniger allein, nur weil ich mit dir gesprochen habe.' },
      { sender: 'bot', text: 'Du BIST weniger allein. Du hast uns gefunden, und das hat Mut gekostet.' },
      { sender: 'user', text: 'Ich fühle mich gerade nicht sehr mutig.' },
      { sender: 'bot', text: 'Mut ist nicht die Abwesenheit von Angst. Es ist, die Hand auszustrecken, wenn man verängstigt ist. Das hast du heute getan.' },
      { sender: 'user', text: 'So habe ich das noch nie gesehen.' },
      { sender: 'bot', text: 'Ein Tag nach dem anderen. Manchmal eine Stunde nach der anderen. So machen wir das.' },
      { sender: 'user', text: 'Danke, Bob. Wirklich.' },
      { sender: 'bot', text: 'Ich bin hier, wann immer du mich brauchst. Tag oder Nacht. Darum geht es bei Forward Together.' },
      { sender: 'bot', text: 'Du bist damit nicht mehr allein.' },
    ],

    // Miri's Conversation (German)
    miriConversation: [
      { sender: 'bot', text: 'Hallo. Ich bin Miri.' },
      { sender: 'bot', text: 'Ich sehe auch dich.' },
      { sender: 'bot', text: 'Wie hältst du dich?' },
      { sender: 'user', text: 'Ehrlich gesagt, ich weiß es nicht mal. Mein Mann hat vor drei Wochen die Diagnose Lymphom bekommen.' },
      { sender: 'bot', text: 'Drei Wochen. Du steckst noch mittendrin. Ich bin froh, dass du dich gemeldet hast.' },
      { sender: 'bot', text: 'Darf ich fragen – wie geht es DIR? Nicht ihm. Dir.' },
      { sender: 'user', text: 'Niemand fragt mich das. Alle fragen nach Thomas.' },
      { sender: 'bot', text: 'Ich weiß. Deshalb frage ich. Auch deine Gefühle zählen.' },
      { sender: 'user', text: 'Ich fühle mich schuldig, überhaupt über mich zu sprechen. Er ist derjenige, der krank ist.' },
      { sender: 'bot', text: 'Hier gibt es keine Schuld. Für jemanden zu sorgen, erfordert alles, was du hast. Deine Kämpfe sind real.' },
      { sender: 'user', text: 'Ich bin erschöpft. Ich habe seit Wochen nicht richtig geschlafen. Ich versuche, stark zu sein für ihn und die Kinder.' },
      { sender: 'bot', text: 'Das ist eine so schwere Last. Stark sein für alle, während du deine eigene Angst verarbeitest.' },
      { sender: 'user', text: 'Manchmal bin ich so wütend. Und dann fühle ich mich schrecklich, weil ich wütend bin.' },
      { sender: 'bot', text: 'Wut ist ein normaler Teil davon. Es macht dich nicht zu einem schlechten Menschen oder einer schlechten Pflegeperson.' },
      { sender: 'bot', text: 'Du darfst wütend sein auf die Situation. Auf den Krebs. Auf die Ungerechtigkeit von allem.' },
      { sender: 'user', text: 'Ich will einfach nur unser normales Leben zurück.' },
      { sender: 'bot', text: 'Natürlich willst du das. Um das Leben zu trauern, das ihr hattet, ist auch Teil dieser Reise.' },
      { sender: 'user', text: 'Ich habe das Gefühl, dass ich bei allem versage. Das Haus ist ein Chaos, ich habe die Erlaubnis für meine Tochter vergessen...' },
      { sender: 'bot', text: 'Du versagst nicht. Du überlebst eine unmögliche Situation. Irgendetwas muss nachgeben.' },
      { sender: 'bot', text: 'Ein unordentliches Haus bedeutet nicht, dass du versagst. Es bedeutet, dass du priorisierst, was am wichtigsten ist.' },
      { sender: 'user', text: 'Ich denke immer, ich sollte das besser hinbekommen.' },
      { sender: 'bot', text: 'Es gibt keinen "richtigen Weg", damit umzugehen. Du machst es, und das ist, was zählt.' },
      { sender: 'user', text: 'Meine Mutter bietet ständig an zu helfen, aber ich habe das Gefühl, ich sollte das alleine schaffen.' },
      { sender: 'bot', text: 'Hilfe anzunehmen ist keine Schwäche. Es ist Weisheit. Du kannst nicht aus einem leeren Becher einschenken.' },
      { sender: 'bot', text: 'Was, wenn es auch ein Geschenk für deine Mutter ist, wenn du sie helfen lässt? Eine Möglichkeit für sie, sich nützlich zu fühlen?' },
      { sender: 'user', text: 'So habe ich das noch nie gesehen.' },
      { sender: 'bot', text: 'Pflegende vergessen oft, dass auch sie Fürsorge verdienen. Wann hast du zuletzt etwas nur für dich getan?' },
      { sender: 'user', text: 'Ich kann mich nicht mal erinnern. Es gibt keine Zeit.' },
      { sender: 'bot', text: 'Selbst zehn Minuten zählen. Eine Tasse Tee allein. Ein kurzer Spaziergang. Kleine Dinge summieren sich.' },
      { sender: 'user', text: 'Ich fühle mich egoistisch, auch nur an mich zu denken.' },
      { sender: 'bot', text: 'Auf dich selbst zu achten ist nicht egoistisch. Es ist notwendig. Du kannst Thomas nicht unterstützen, wenn du zusammenbrichst.' },
      { sender: 'user', text: 'Das sagt meine Schwester auch.' },
      { sender: 'bot', text: 'Sie hat recht. Möchtest du dich mit anderen Pflegenden verbinden, die das verstehen?' },
      { sender: 'user', text: 'Es gibt andere, die das durchmachen?' },
      { sender: 'bot', text: 'Viele andere. Pflegende, die genau wissen, wie sich die Angst um 3 Uhr nachts anfühlt. Die die Isolation verstehen.' },
      { sender: 'bot', text: 'Manchmal macht es den ganzen Unterschied, mit jemandem zu sprechen, der es erlebt hat.' },
      { sender: 'user', text: 'Ja, ich glaube, das würde ich gerne. Es würde helfen, mich dabei nicht so allein zu fühlen.' },
      { sender: 'bot', text: 'Du bist nicht allein. Hier ist eine ganze Gemeinschaft, die sieht, was du trägst.' },
      { sender: 'user', text: 'Danke, dass du nach mir gefragt hast, Miri. Das bedeutet mehr, als du weißt.' },
      { sender: 'bot', text: 'Dafür bin ich hier. Du zählst, nicht nur als Pflegende, sondern als Mensch.' },
      { sender: 'bot', text: 'Wir sind hier, wann immer du uns brauchst. Du musst das nicht alleine tragen.' },
    ],
  },
};

export default translations;
