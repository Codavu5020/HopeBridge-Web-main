// About page content. Update names, bios and roles here to match your group.

export const team = [
  {
    name: 'Anthea Tuazon',
    color: '#14605C',
    bio: 'A 3rd Year Student passionate about technology and continous learning. Dedicated to explore innovative solutions and adapting to the ever-evolving digital world.',
    focus: ['Information Technology, Problem solving, and emerging technologies.'],

  },
  {
    name: '',
    color: '#0E2A36',
    bio: '',
    focus: [],
  },
  {
    name: '',
    color: '#B5700A',
    bio: '',
    focus: [],

  },
  {
    name: '',
    color: '#7A3E9D',
    bio: '',
    focus: [],
  },
]

export const deliverables = [
  'A Foundation home page that explains the mission, programs, goals and ways to help',
  'An About page introducing our group and how we worked',
  'A donation page with a payment UI built on @stripe/react-stripe-js',
  'Responsive layouts for phones, tablets and desktops',
  'Keyboard-friendly navigation, visible focus states and readable color contrast',
]

export const process = [
  {
    title: 'Research',
    detail:
      'We studied how non-profit sites earn trust: a clear mission, open numbers, and one obvious way to give.',
  },
  {
    title: 'Design',
    detail:
      'We chose a bridge-and-river theme, a calm teal and navy palette with a sun-yellow action color, and sketched each page on paper first.',
  },
  {
    title: 'Build',
    detail:
      'We built the pages in React with shared components, so the foundation and About pages stay consistent.',
  },
  {
    title: 'Add payments',
    detail:
      'We added Stripe’s PaymentElement through @stripe/react-stripe-js, with a small Express server that creates each payment securely.',
  },
  {
    title: 'Test and polish',
    detail:
      'We tested on small screens, with the keyboard only, and with Stripe’s test cards, then fixed what felt confusing.',
  },
]

export const stack = [
  { name: 'React 19 and Vite', use: 'App framework and fast development build' },
  { name: 'React Router', use: 'Foundation, About, Donate and confirmation pages' },
  { name: '@stripe/react-stripe-js', use: 'Elements provider and PaymentElement for the donation form' },
  { name: '@stripe/stripe-js', use: 'Loads Stripe.js and confirms payments' },
  { name: 'Express and Stripe Node SDK', use: 'Creates payment intents on the server' },
  { name: 'Lucide icons', use: 'Consistent, lightweight iconography' },
]
