export type PersonalityType = 'bold-adventurer' | 'sweet-enthusiast' | 'social-butterfly';

export interface Personality {
  id: PersonalityType;
  name: string;
  tagline: string;
  description: string;
  signatureDrink: string;
  image: string;
  color: string;
}

export interface QuizOption {
  text: string;
  icon: string;
  personality: PersonalityType;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export const personalities: Record<PersonalityType, Personality> = {
  'bold-adventurer': {
    id: 'bold-adventurer',
    name: 'Bold Adventurer',
    tagline: 'Odważny Odkrywca Smaków',
    description: 'Uwielbiasz mocne, intensywne smaki i nie boisz się eksperymentować. Czarne espresso to Twoja baza wypadowa do świata kawy.',
    signatureDrink: 'Podwójne Espresso',
    image: '/bold-adventurer.jpg',
    color: '#5c4033'
  },
  'sweet-enthusiast': {
    id: 'sweet-enthusiast',
    name: 'Sweet Enthusiast',
    tagline: 'Miłośnik Słodkich Przyjemności',
    description: 'Kawa to dla Ciebie moment przyjemności. Kochasz kremowe, słodkie połączenia i zawsze masz ochotę na coś ekstra.',
    signatureDrink: 'Karmelowe Latte',
    image: '/sweet-enthusiast.jpg',
    color: '#c9a86c'
  },
  'social-butterfly': {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    tagline: 'Dusza Towarzystwa',
    description: 'Dla Ciebie kawa to przede wszystkim pretekst do spotkań. Lubisz klasyczne smaki, które możesz zamówić dla całej grupy.',
    signatureDrink: 'Klasyczne Cappuccino',
    image: '/social-butterfly.jpg',
    color: '#8b6d47'
  }
};

export const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Jak zaczynasz swój poranek?',
    options: [
      { text: 'Mocna kawa i od razu do akcji!', icon: '⚡', personality: 'bold-adventurer' },
      { text: 'Słodkie śniadanie i latte w łóżku', icon: '🥐', personality: 'sweet-enthusiast' },
      { text: 'Kawa z przyjacielem lub rodziną', icon: '👋', personality: 'social-butterfly' }
    ]
  },
  {
    id: 2,
    question: 'Jaki jest Twój ulubiony moment na kawę?',
    options: [
      { text: 'Szybkie espresso między zadaniami', icon: '🚀', personality: 'bold-adventurer' },
      { text: 'Długa przerwa z deserem', icon: '🍰', personality: 'sweet-enthusiast' },
      { text: 'Spotkanie ze znajomymi w kawiarni', icon: '💬', personality: 'social-butterfly' }
    ]
  },
  {
    id: 3,
    question: 'Jak podchodzisz do nowych smaków?',
    options: [
      { text: 'Zawsze próbuję czegoś nowego!', icon: '🌟', personality: 'bold-adventurer' },
      { text: 'Lubię słodkie nowości', icon: '🍫', personality: 'sweet-enthusiast' },
      { text: 'Wybieram sprawdzone klasyki', icon: '☕', personality: 'social-butterfly' }
    ]
  },
  {
    id: 4,
    question: 'Jak pijesz swoją kawę?',
    options: [
      { text: 'Czarna, bez dodatków', icon: '🖤', personality: 'bold-adventurer' },
      { text: 'Z mlekiem, syropem i bitą śmietaną', icon: '🍦', personality: 'sweet-enthusiast' },
      { text: 'Klasycznie - odrobina mleka', icon: '🥛', personality: 'social-butterfly' }
    ]
  },
  {
    id: 5,
    question: 'Co jest dla Ciebie najważniejsze w kawiarni?',
    options: [
      { text: 'Jakość kawy i ziaren', icon: '🫘', personality: 'bold-adventurer' },
      { text: 'Pyszne desery i ciasta', icon: '🧁', personality: 'sweet-enthusiast' },
      { text: 'Atmosfera i miejsce do rozmów', icon: '🛋️', personality: 'social-butterfly' }
    ]
  }
];
