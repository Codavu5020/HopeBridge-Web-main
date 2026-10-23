// All written content for the Foundation (home) page lives here.

export const programs = [
  {
    id: 'bridge-to-school',
    icon: 'GraduationCap',
    title: 'Bridge to School',
    summary:
      'Hardship pushes learning aside first. We keep children in class with the basics that decide whether a school year holds together.',
    covers: [
      'School kits with bag, uniform and supplies',
      'Tuition and exam-fee support for students at risk of dropping out',
      'After-school tutoring in reading and mathematics',
    ],
  },
  {
    id: 'family-anchor',
    icon: 'HeartHandshake',
    title: 'Family Anchor',
    summary:
      'A single bad month can unsettle a whole household. We step in early with practical help so families stay together and stay stable.',
    covers: [
      'Emergency food and hygiene packs',
      'One-to-one help finding clinics, documents and local assistance',
      'Parenting and budgeting workshops run with community partners',
    ],
  },
  {
    id: 'community-crossings',
    icon: 'Users',
    title: 'Community Crossings',
    summary:
      'Children do best when many adults care about them. We train and connect neighbours, churches and local groups to share the load.',
    covers: [
      'Youth mentorship pairing teens with trained volunteers',
      'Volunteer training and a shared calendar of local needs',
      'Partnerships with schools, clinics and local businesses',
    ],
  },
]

export const values = [
  {
    term: 'Dignity first',
    detail:
      'People are partners in their own recovery, not cases to be managed. Families help decide what support looks like.',
  },
  {
    term: 'Early and steady',
    detail:
      'We would rather fund a school uniform in June than a crisis in November. Support continues until a family is steady.',
  },
  {
    term: 'Open books',
    detail:
      'Every gift is tracked to a program. We publish a yearly report listing what was funded and what it cost.',
  },
]

export const howItWorks = [
  {
    title: 'We listen',
    detail:
      'Teachers, clinics and community leaders tell us which children and families need a hand and what exactly is missing.',
  },
  {
    title: 'We fund and deliver',
    detail:
      'Your gift goes into the Bridge Fund. We buy supplies, pay fees and arrange tutors directly, so help arrives as goods and services.',
  },
  {
    title: 'We follow up and report',
    detail:
      'Volunteers check in each term. Results and spending are shared with every supporter in our yearly report.',
  },
]

// The 2026 Bridge Fund goal, split by program. Sums to the goal.
export const fundGoal = 40000
export const fundAllocation = [
  { label: 'Bridge to School', amount: 18000 },
  { label: 'Family Anchor', amount: 14000 },
  { label: 'Community Crossings', amount: 8000 },
]

export const giftGuide = [
  { amount: 10, impact: 'Notebooks, pens and a geometry set for one child for a school term.' },
  { amount: 25, impact: 'A full school kit: bag, uniform and supplies. This lays one plank of the Bridge Fund.' },
  { amount: 50, impact: 'A month of after-school tutoring for one child.' },
  { amount: 100, impact: 'Food and hygiene essentials for a family for one month.' },
  { amount: 250, impact: 'A semester of school fees for one student at risk of leaving school.' },
]

export const ways = [
  {
    title: 'Volunteer',
    detail:
      'Tutor a child, help pack kits, or mentor a teenager. A few hours a month is enough to start.',
  },
  {
    title: 'Partner with us',
    detail:
      'Schools, churches, clinics and businesses can sponsor kits, host drives or offer skills and space.',
  },
  {
    title: 'Start a fundraiser',
    detail:
      'Birthday, race, bake sale. Pick a goal and share your giving link; every $25 lays another plank.',
  },
]

export const volunteerInterests = [
  'Tutoring and mentoring',
  'Packing and delivering kits',
  'Events and fundraising',
  'Skills (design, IT, legal, finance)',
]

export const faqs = [
  {
    q: 'Who does HopeBridge Foundation help?',
    a: 'Children and families facing hardship, such as lost income, interrupted schooling or unstable housing. Referrals come from schools, clinics and community leaders, and families can also reach out directly.',
  },
  {
    q: 'Where does my donation go?',
    a: 'Every gift goes into the Bridge Fund and is assigned to one of our three programs. We buy supplies and pay fees directly instead of handing out cash, and our yearly report lists every item funded.',
  },
  {
    q: 'Is my payment secure?',
    a: 'Yes. Card details are entered into fields hosted by Stripe, a payment processor trusted by millions of businesses. They never touch our servers, and we only see the amount, your name and your email.',
  },
  {
    q: 'Will I get a receipt?',
    a: 'A receipt is emailed to you right after your gift. Tax treatment differs by country, so keep the receipt for your records.',
  },
  {
    q: 'Can I give in someone’s name or choose a program?',
    a: 'Yes. Tell us in your volunteer or partner message and we will direct your gift to a specific program or send a note to the person you are honoring.',
  },
]
