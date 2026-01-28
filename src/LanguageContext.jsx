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
      howItWorks: 'Cómo Funciona',
      forSurvivors: 'Para Supervivientes',
      forCaregivers: 'Para Cuidadores',
      stories: 'Historias',
      beginJourney: 'Comienza Tu Camino',
    },

    // Brand
    brand: {
      forward: 'Forward',
      together: 'Together',
      tagline: 'No estás solo en esto.',
    },

    // Footer
    footer: {
      forYou: 'Para Ti',
      about: 'Acerca de',
      resources: 'Recursos',
      forSurvivors: 'Para Supervivientes',
      forCaregivers: 'Para Cuidadores',
      getStarted: 'Comenzar',
      stories: 'Historias',
      howItWorks: 'Cómo Funciona',
      ourStory: 'Nuestra Historia',
      contactUs: 'Contáctanos',
      helpCenter: 'Centro de Ayuda',
      privacyPolicy: 'Política de Privacidad',
      termsOfService: 'Términos de Servicio',
      copyright: '© 2025 Proyecto Forward Together. Todos los derechos reservados.',
      builtBy: 'Creado por supervivientes, para supervivientes. Porque nadie debería enfrentarse al cáncer solo.',
    },

    // Hero Section
    hero: {
      title1: 'No tienes que',
      title2: 'afrontar esto solo',
      description: 'Ya sea que estés enfrentando un diagnóstico de cáncer o cuidando a alguien que lo tiene, Forward Together te conecta con personas que realmente comprenden — porque han recorrido el mismo camino.',
      startJourney: 'Comienza Tu Camino →',
      seeHowItWorks: 'Ver Cómo Funciona',
      joinWith: 'Únete a otros supervivientes y cuidadores',
    },

    // Chat Preview
    chatPreview: {
      bob: 'Bob',
      yourSurvivorGuide: 'Tu Guía de Superviviente',
      msg1: 'Hola. Soy Bob. También soy superviviente. Recuerdo cómo se sentía al principio.',
      msg2: 'Alguien me ayudó en aquel momento. Eso es lo que estoy aquí para hacer por ti.',
      msg3: 'Me acabo de enterar ayer. Ni siquiera sé por dónde empezar...',
      msg4: 'No pasa nada. No tienes que tenerlo todo claro. ¿Puedes contarme un poco qué está pasando?',
    },

    // How It Works Section
    howItWorks: {
      label: 'Cómo Funciona',
      title1: 'De abrumado a',
      title2: 'apoyado',
      subtitle: 'Sin cuestionarios clínicos. Sin salas de espera. Solo conexión significativa.',
      step1Title: 'Comparte Tu Historia',
      step1Desc: 'Sin formularios. Solo conversación.',
      step2Title: 'Sé Comprendido',
      step2Desc: 'Los guías de IA responden con empatía genuina.',
      step3Title: 'Encuentra a Tu Gente',
      step3Desc: 'Conecta con quienes han recorrido tu camino.',
      step4Title: 'Avancemos Juntos',
      step4Desc: 'Construye conexiones. Ayuda a otros.',
    },

    // Guides Section
    guides: {
      label: 'Conoce a Tus Guías',
      title: 'Siempre aquí. Siempre comprendiendo.',
      bob: {
        name: 'Bob',
        role: 'Guía de Superviviente',
        description: 'Como superviviente, Bob comprende el peso de esos primeros días. Está aquí para escuchar y compartir la sabiduría de miles de supervivientes.',
        trait1: 'Cálido y estable',
        trait2: 'Lo ha vivido',
        trait3: 'Sin juicios',
        button: 'Habla con Bob',
      },
      miri: {
        name: 'Miri',
        role: 'Guía de Cuidador',
        description: 'Miri te ve — no solo como cuidador, sino como alguien que lleva un peso invisible. Tus necesidades también importan.',
        trait1: 'Compasiva',
        trait2: 'Práctica',
        trait3: 'Ve tu lucha',
        button: 'Habla con Miri',
      },
    },

    // Features Section
    features: {
      label: 'Por Qué Forward Together',
      title: 'Diferente. Por una razón.',
      feature1Title: 'Sin Formularios, Solo Conversación',
      feature1Desc: 'Nuestra IA entiende el contexto, no las casillas.',
      feature2Title: 'Emparejamiento Real Entre Pares',
      feature2Desc: 'Mismo cáncer, misma etapa, misma situación de vida.',
      feature3Title: 'Tu Historia, Tu Control',
      feature3Desc: 'Elige qué compartir. La privacidad es sagrada.',
      feature4Title: 'Disponible 24/7',
      feature4Desc: 'El cáncer no tiene horario de oficina. Nosotros tampoco.',
      feature5Title: 'Sabiduría Colectiva',
      feature5Desc: 'Aprende de miles de experiencias.',
      feature6Title: 'Devuelve Cuando Estés Listo',
      feature6Desc: 'Convierte tu experiencia en la esperanza de otro.',
    },

    // CTA Section
    cta: {
      title: '¿Listo para dar el primer paso?',
      subtitle: 'No tienes que resolver esto solo.',
      imSurvivor: 'Soy Superviviente',
      imCaregiver: 'Soy Cuidador',
      freePrivate: 'Gratis. Privado.',
    },

    // For Survivors Page
    forSurvivors: {
      label: 'Para Supervivientes',
      title: 'Ya has demostrado una fuerza increíble.',
      highlight: 'Déjanos acompañarte.',
      subtitle: 'Conecta con personas que lo entienden — porque lo han vivido.',
      ctaText: 'Habla con Bob →',
      sectionTitle: 'Entendemos dónde estás',
      stage1Title: 'Recién Diagnosticado',
      stage1Desc: 'El mundo cambió. Necesitas a alguien que sabe que mejora.',
      stage2Title: 'En Tratamiento',
      stage2Desc: 'Conecta con otros que saben exactamente por lo que estás pasando.',
      stage3Title: 'Post-Tratamiento',
      stage3Desc: 'La "ansiedad de las pruebas" es real. Otros lo entienden.',
      stage4Title: 'Supervivencia a Largo Plazo',
      stage4Desc: 'Comparte tu sabiduría. Ayuda a alguien que empieza su camino.',
    },

    // For Caregivers Page
    forCaregivers: {
      label: 'Para Cuidadores',
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
      { sender: 'bot', text: 'Hola. Soy Bob.' },
      { sender: 'bot', text: 'También soy superviviente.' },
      { sender: 'bot', text: '¿Puedes contarme qué está pasando?' },
      { sender: 'user', text: 'Me acaban de diagnosticar ayer. Cáncer de mama. Ni siquiera sé por dónde empezar.' },
      { sender: 'bot', text: 'Me alegro mucho de que hayas contactado. Ayer... es muy reciente. ¿Cómo te sientes ahora mismo?' },
      { sender: 'user', text: '¿Sinceramente? Aterrorizada. No pude dormir en toda la noche.' },
      { sender: 'bot', text: 'Es completamente comprensible. Recuerdo esa sensación. El mundo parece diferente después de esas palabras, ¿verdad?' },
      { sender: 'user', text: 'Sí. Todo parece irreal. Como si estuviera viendo la vida de otra persona.' },
      { sender: 'bot', text: 'Esa sensación de desconexión es muy común en los primeros días. Tu mente está intentando procesar algo enorme.' },
      { sender: 'bot', text: '¿Puedo preguntarte si tienes a alguien contigo ahora mismo?' },
      { sender: 'user', text: 'Mi hermana está aquí. Ha sido increíble, pero noto que también está asustada.' },
      { sender: 'bot', text: 'Es bueno que no estés sola. Y está bien que ella esté asustada. Podéis estar asustadas juntas.' },
      { sender: 'user', text: 'Tengo tantas preguntas pero ni siquiera sé qué preguntar.' },
      { sender: 'bot', text: 'Eso es completamente normal. No necesitas tenerlo todo claro ahora mismo.' },
      { sender: 'bot', text: 'En mi experiencia, las preguntas llegan cuando están listas. Y estaremos aquí para cada una de ellas.' },
      { sender: 'user', text: 'Cuando te diagnosticaron, ¿qué te ayudó más en esos primeros días?' },
      { sender: 'bot', text: '¿Sinceramente? Hablar con alguien que había pasado por ello. Alguien que pudiera decirme que esa sensación de caos no duraría para siempre.' },
      { sender: 'bot', text: 'Lo médico era importante, pero tener a alguien que simplemente lo entendía... eso fue lo que me ayudó a salir adelante.' },
      { sender: 'user', text: 'Por eso vine aquí. Mi médico me dio folletos pero necesitaba algo más humano.' },
      { sender: 'bot', text: 'Los folletos no te cogen de la mano a las 3 de la madrugada. Lo entiendo.' },
      { sender: 'user', text: 'Exacto. ¿Crees que... estaré bien?' },
      { sender: 'bot', text: 'No puedo prometerte cómo será tu camino. Pero puedo decirte que eres más fuerte de lo que crees ahora mismo.' },
      { sender: 'bot', text: 'Y no caminarás sola por este camino. Eso sí puedo prometértelo.' },
      { sender: 'user', text: 'Eso me ayuda. Solo saber que alguien lo entiende.' },
      { sender: 'bot', text: 'Lo entiendo. Y hay miles de supervivientes en nuestra comunidad que también lo entienden.' },
      { sender: 'user', text: 'Creo que me gustaría conectar con alguien que haya tenido un diagnóstico similar. ¿Es posible?' },
      { sender: 'bot', text: 'Por supuesto. Eso es exactamente lo que hacemos aquí. Puedo ayudarte a encontrar a alguien que ha estado donde tú estás.' },
      { sender: 'bot', text: 'Alguien que conoce los miedos específicos, las preguntas específicas, las victorias específicas.' },
      { sender: 'user', text: 'Eso significaría muchísimo. Ya me siento menos sola solo hablando contigo.' },
      { sender: 'bot', text: 'ESTÁS menos sola. Nos encontraste, y eso requirió valentía.' },
      { sender: 'user', text: 'No me siento muy valiente ahora mismo.' },
      { sender: 'bot', text: 'El valor no es la ausencia del miedo. Es tender la mano cuando estás aterrorizada. Eso hiciste hoy.' },
      { sender: 'user', text: 'Nunca lo había pensado así.' },
      { sender: 'bot', text: 'Un día a la vez. A veces una hora a la vez. Así es como lo hacemos.' },
      { sender: 'user', text: 'Gracias, Bob. De verdad.' },
      { sender: 'bot', text: 'Estoy aquí siempre que me necesites. De día o de noche. De eso se trata Forward Together.' },
      { sender: 'bot', text: 'Ya no estás sola en esto.' },
    ],

    // Miri's Conversation (Spanish - Spain)
    miriConversation: [
      { sender: 'bot', text: 'Hola. Soy Miri.' },
      { sender: 'bot', text: 'También te veo a ti.' },
      { sender: 'bot', text: '¿Cómo lo estás llevando?' },
      { sender: 'user', text: 'Sinceramente, ni siquiera lo sé. A mi marido le diagnosticaron linfoma hace tres semanas.' },
      { sender: 'bot', text: 'Tres semanas. Todavía estás en plena tormenta. Me alegro de que hayas contactado.' },
      { sender: 'bot', text: '¿Puedo preguntarte cómo estás TÚ? No él. Tú.' },
      { sender: 'user', text: 'Nadie me pregunta eso. Todos preguntan por Tomás.' },
      { sender: 'bot', text: 'Lo sé. Por eso te lo pregunto. Tus sentimientos también importan.' },
      { sender: 'user', text: 'Me siento culpable incluso hablando de mí misma. Él es el que está enfermo.' },
      { sender: 'bot', text: 'No hay necesidad de sentir culpa aquí. Cuidar de alguien requiere todo lo que tienes. Tus luchas son reales.' },
      { sender: 'user', text: 'Estoy agotada. No he dormido bien en semanas. Intento ser fuerte para él y para los niños.' },
      { sender: 'bot', text: 'Es un peso muy grande. Ser fuerte para todos mientras procesas tu propio miedo.' },
      { sender: 'user', text: 'A veces me siento muy enfadada. Y luego me siento fatal por estar enfadada.' },
      { sender: 'bot', text: 'El enfado es una parte normal de esto. No te hace mala persona ni mala cuidadora.' },
      { sender: 'bot', text: 'Tienes derecho a sentir enfado con la situación. Con el cáncer. Con lo injusto de todo.' },
      { sender: 'user', text: 'Solo quiero que vuelva nuestra vida normal.' },
      { sender: 'bot', text: 'Por supuesto. Llorar la vida que teníais también es parte de este camino.' },
      { sender: 'user', text: 'Siento que estoy fallando en todo. La casa está hecha un desastre, olvidé la autorización del colegio de mi hija...' },
      { sender: 'bot', text: 'No estás fallando. Estás sobreviviendo a una situación imposible. Algo tiene que ceder.' },
      { sender: 'bot', text: 'Una casa desordenada no significa que estés fallando. Significa que estás priorizando lo que más importa.' },
      { sender: 'user', text: 'Sigo pensando que debería estar manejando esto mejor.' },
      { sender: 'bot', text: "No hay una forma 'correcta' de manejar esto. Lo estás haciendo, y eso es lo que cuenta." },
      { sender: 'user', text: 'Mi madre sigue ofreciéndose a ayudar pero siento que debería poder hacer esto sola.' },
      { sender: 'bot', text: 'Aceptar ayuda no es debilidad. Es sabiduría. No puedes dar de un vaso vacío.' },
      { sender: 'bot', text: '¿Y si dejar que tu madre ayude también es un regalo para ella? ¿Una forma de sentirse útil?' },
      { sender: 'user', text: 'Nunca lo había pensado así.' },
      { sender: 'bot', text: 'Los cuidadores a menudo olvidan que también merecen cuidados. ¿Cuándo fue la última vez que hiciste algo solo para ti?' },
      { sender: 'user', text: 'Ni me acuerdo. No hay tiempo.' },
      { sender: 'bot', text: 'Incluso diez minutos importan. Una taza de té a solas. Un paseo corto. Las pequeñas cosas suman.' },
      { sender: 'user', text: 'Me siento egoísta incluso pensando en mí misma.' },
      { sender: 'bot', text: 'Cuidar de ti misma no es egoísmo. Es necesario. No puedes apoyar a Tomás si tú te derrumbas.' },
      { sender: 'user', text: 'Eso dice mi hermana también.' },
      { sender: 'bot', text: 'Tiene razón. ¿Te gustaría conectar con otros cuidadores que entienden esto?' },
      { sender: 'user', text: '¿Hay otros pasando por esto?' },
      { sender: 'bot', text: 'Muchos otros. Cuidadores que saben exactamente cómo es la ansiedad de las 3 de la madrugada. Que entienden el aislamiento.' },
      { sender: 'bot', text: 'A veces hablar con alguien que ha pasado por ello marca toda la diferencia.' },
      { sender: 'user', text: 'Sí, creo que me gustaría. Ayudaría no sentirme tan sola en esto.' },
      { sender: 'bot', text: 'No estás sola. Hay toda una comunidad aquí que ve lo que estás cargando.' },
      { sender: 'user', text: 'Gracias por preguntar por mí, Miri. Significa más de lo que sabes.' },
      { sender: 'bot', text: 'Para eso estoy aquí. Importas, no solo como cuidadora, sino como persona.' },
      { sender: 'bot', text: 'Estamos aquí siempre que nos necesites. No tienes que llevar esto sola.' },
    ],
  },
};

export default translations;
