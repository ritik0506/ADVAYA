const eventsData = [
  /**
 * ADVAYA 2026 - Static Events Data
 * Source: RVITM MCA Department - ADVAYA 2026
 * Used directly by backend API (NO DATABASE)
 */

  // ==================== PG TECHNICAL EVENTS ====================
  {
    eventId: 'code-kurukshetra',
    mythologyName: 'Code Kurukshetra',
    actualName: 'Coding & Debugging',
    category: 'PG',
    description:
      'Code Kurukshetra is a high-intensity coding battlefield where participants face logical challenges, debugging rounds, and time-bound problem solving. This event tests algorithmic thinking, coding accuracy, and the ability to perform under pressure just like warriors in a digital Kurukshetra.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'Participants must not use any electronic gadgets such as mobile phones, smartwatches, laptops, or any other smart devices during any round of the event.',
      'Participants are strictly prohibited from using or supporting any unfair means during the event.',
      'Any form of malpractice or rule violation observed at any stage will lead to immediate disqualification of the team.',
      'Participants must maintain discipline and decorum throughout the event.',
      'Participants are expected to have knowledge of C, C++, Java, or Python.',
      'Teams must adhere strictly to the time limits specified for each round.',
    ],
    teamSize: { min: 2, max: 3 },
    fee: 250,
    image: './codekurukshetra.jpg',
    duration: 'TBA',
    registrationOpen: true,
  },

  {
    eventId: 'web-astra',
    mythologyName: 'Web Astra',
    actualName: 'Web Development',
    category: 'PG',
    description:
      'Forge the weapons of the web. Design stunning interfaces and bring them to life with code in this two-round web development challenge.',
    rules: [
      'Round 1: UI/UX Design',
      'Round 2: Implementation',
      'Responsive design is mandatory',
      'Any modern framework allowed',
      'Plagiarism leads to disqualification',
    ],
    teamSize: { min: 2, max: 3 },
    fee: 250,
    image: '/assets/events/web-astra.jpg',
    duration: '4 hours',
    registrationOpen: true,
  },

  {
    eventId: 'brahma-bits',
    mythologyName: 'Brahma Bits',
    actualName: 'IT Quiz',
    category: 'PG',
    description:
      'Test your knowledge across the vast universe of Information Technology.',
    rules: [
      'Team of 2 members',
      'Multiple rounds',
      'No electronic devices allowed',
      'Quiz master decision is final',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/brahma-bits.jpg',
    duration: '2 hours',
    registrationOpen: true,
  },

  {
    eventId: 'vyasa-data',
    mythologyName: 'Vyasa Data',
    actualName: 'Data Science Sprint',
    category: 'PG',
    description:
      'Analyze, visualize, and extract insights from real-world datasets.',
    rules: [
      'Python + Jupyter Notebook only',
      'No AI tools allowed',
      'Dataset provided on-site',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/vyasa-data.jpg',
    duration: '3 hours',
    registrationOpen: true,
  },

  // ==================== UG TECHNICAL EVENTS ====================
  {
    eventId: 'gandhari-mode',
    mythologyName: 'Gandhari Mode',
    actualName: 'Blind Coding',
    category: 'UG',
    description:
      'Code without looking at the screen. Trust logic and memory.',
    rules: [
      'Screen will be turned off',
      'Keyboard input only',
      'Any programming language allowed',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/gandhari-mode.jpg',
    duration: '2 hours',
    registrationOpen: true,
  },

  {
    eventId: 'web-shilpa-chakra',
    mythologyName: 'Web Shilpa Chakra',
    actualName: 'Web Design',
    category: 'UG',
    description:
      'Design responsive websites using only HTML and CSS.',
    rules: [
      'HTML & CSS only',
      'No AI tools',
      'Responsive design required',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/web-shilpa-chakra.jpg',
    duration: '3 hours',
    registrationOpen: true,
  },

  {
    eventId: 'bits-vedha',
    mythologyName: 'Bits Vedha',
    actualName: 'IT Quiz',
    category: 'UG',
    description:
      'Quiz covering fundamentals to modern IT concepts.',
    rules: [
      'Team of 2',
      'Multiple rounds',
      'No phones allowed',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/bits-vedha.jpg',
    duration: '2 hours',
    registrationOpen: true,
  },

  {
    eventId: 'maya-loop',
    mythologyName: 'Maya Loop',
    actualName: 'Tech Illusion',
    category: 'UG',
    description:
      'Solve puzzles and illusions using logic and observation.',
    rules: [
      'Team of 1 or 2',
      'No programming required',
      'Timed rounds',
    ],
    teamSize: { min: 1, max: 2 },
    fee: 250,
    image: '/assets/events/maya-loop.jpg',
    duration: '2 hours',
    registrationOpen: true,
  },

  // ==================== COMBINED ====================
  {
    eventId: 'shastrartha-vada',
    mythologyName: 'Shastrartha Vāda',
    actualName: 'IT Debate',
    category: 'Combined',
    description:
      'Debate contemporary IT topics with logic and clarity.',
    rules: [
      'Team of 2',
      'One FOR, one AGAINST',
      'Strict time limits',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/shastrartha-vada.jpg',
    duration: '3 hours',
    registrationOpen: true,
  },

  // ==================== NON-TECH ====================
  {
    eventId: 'ranabhoomi-arena',
    mythologyName: 'Ranabhoomi Arena',
    actualName: 'BGMI Tournament',
    category: 'Non-Tech',
    description:
      'BGMI squad battle for ultimate victory.',
    rules: [
      'Team of 4',
      'Bring your own device',
      'Fair play mandatory',
    ],
    teamSize: { min: 4, max: 4 },
    fee: 400,
    image: '/assets/events/ranabhoomi-arena.jpg',
    duration: '4 hours',
    registrationOpen: true,
  },

  {
    eventId: 'bids-sabha',
    mythologyName: 'Bids Sabha',
    actualName: 'IPL Auction',
    category: 'Non-Tech',
    description:
      'Strategic IPL-style auction event.',
    rules: [
      'Team of 4',
      'Virtual budget provided',
    ],
    teamSize: { min: 4, max: 4 },
    fee: 500,
    image: '/assets/events/bids-sabha.jpg',
    duration: '3 hours',
    registrationOpen: true,
  },

  {
    eventId: 'nidhi-404',
    mythologyName: 'Nidhi 404',
    actualName: 'Treasure Hunt',
    category: 'Non-Tech',
    description:
      'Solve clues and find the hidden treasure.',
    rules: [
      'Team of 4–5',
      'On-foot only',
    ],
    teamSize: { min: 4, max: 5 },
    fee: 500,
    image: '/assets/events/nidhi-404.jpg',
    duration: '2–3 hours',
    registrationOpen: true,
  },

  {
    eventId: 'drishti-pov',
    mythologyName: 'Drishti POV',
    actualName: 'Photography',
    category: 'Non-Tech',
    description:
      'Mobile photography contest.',
    rules: [
      'Individual participation',
      'No editing allowed',
    ],
    teamSize: { min: 1, max: 1 },
    fee: 250,
    image: '/assets/events/drishti-pov.jpg',
    duration: '2 hours',
    registrationOpen: true,
  },

  {
    eventId: 'rahasya-mintz',
    mythologyName: 'Rahasya Mintz',
    actualName: 'Surprise Event',
    category: 'Non-Tech',
    description:
      'Expect the unexpected.',
    rules: [
      'Team of 2',
      'Details revealed on spot',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/rahasya-mintz.jpg',
    duration: 'Variable',
    registrationOpen: true,
  },
];



export default eventsData;
