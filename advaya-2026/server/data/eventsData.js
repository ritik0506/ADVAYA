const eventsData = [
  /**
   * ADVAYA 2026 - Static Events Data
   * Updated with Event Heads & Prize Money
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
  "Only one team from the institute is allowed.",
  "Each team must consist max of 2 members.",
  "Participants must not use any electronic gadgets such as mobile phones, smartwatches, laptops, or any other smart devices during any round of the event.",
  "Participants are strictly prohibited from using or supporting any unfair means during the event.",
  "Any form of malpractice or rule violation observed at any stage will lead to immediate disqualification of the team.",
  "Participants must maintain discipline and decorum throughout the event.",
  "In case of any disputes or clarifications, participants should approach the event coordinators politely and peacefully.",
  "Participants are expected to have knowledge of any of programming languages from the following: C, C++, Java, JavaScript, Python.",
  "Teams must adhere strictly to the time limits specified for each round to ensure the smooth flow of the event."
],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: './codekurukshetra.jpg',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'PRASHANTH M', phone: '6360849260' },
      { name: 'LEKHASHREE', phone: '9980559994' }
    ],
    prizes: {
      first: 2000,
      second: 1500
    }
  },

  {
    eventId: 'web-astra',
    mythologyName: 'Web Astra',
    actualName: 'Web Development',
    category: 'PG',
    description:
      'Web Astra is a creative and technical web development challenge where participants showcase their skills in UI/UX design and front-end development. The event is conducted in two rounds, starting with designing intuitive and visually appealing interfaces, followed by implementing functional web solutions based on the given problem statement. ',
   rules: [
  'Only one team from the institute is allowed.',
  'Each team must consist max of 2 members.',
  'The event will be conducted in two rounds.',
  'Round 1 focuses on UI/UX design using tools such as Figma or Canva.',
  'Round 2 involves web development based on the problem statement provided by the coordinators.',
  'Participants must carry their own laptops for this particular event no systems will be provided by our end.',
  'Participants are strictly prohibited from copying designs, templates, or code from external sources or any AI tools.',
  'Any form of unfair means or malpractice will result in immediate disqualification.',
  'Teams must strictly adhere to the time limits specified for each round to ensure smooth conduct of the event.',
  'The decision of the judges and event coordinators is final and binding.'
],

    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/webtech.jpg',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'SAKET SAGAR', phone: '8789131743' },
      { name: 'SADANAND KAJI', phone: '7892358529' }
    ],
    prizes: {
      first: 2000,
      second: 1500
    }
  },

  {
    eventId: 'brahma-bits',
    mythologyName: 'Brahma Bits',
    actualName: 'IT Quiz',
    category: 'PG',
    description:
      'Brahma Bits is a knowledge-driven IT quiz designed to test participants understanding of core computer science concepts, emerging technologies, and general IT awareness. The event consists of multiple rounds that challenge the participants speed, accuracy, and depth of technical knowledge.',
   rules: [
  'Only one team from the institute is allowed.',
  'Each team must consist max of 2 members.',
  'The event will be conducted in multiple rounds, with elimination at each stage based on performance.',
  'Teams must answer within the time limits specified for each round.',
  'The quiz may include questions related to computer science, programming concepts, current technology trends, logical reasoning and IT-related current affairs.',
  'Participants must not use any electronic gadgets such as mobile phones, smartwatches, laptops or any reference materials during the event.',
  'Any form of malpractice or misbehaviour will lead to immediate disqualification of the team.',
  'The decision of the quiz master and event Coordinators is final and binding.'
],

    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/itquiz.png',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'LASYA R GOWDA', phone: '9108831174' },
      { name: 'SOWJANYA V', phone: '8892890612' },
      { name: 'BABY G.M', phone: '8197400476' }
    ],
    prizes: {
      first: 2000,
      second: 1000
    }
  },

  {
    eventId: 'data-vishleshana',
    mythologyName: 'Data Vishleshana',
    actualName: 'Data Sprint',
    category: 'PG',
   description: 'Data Vishleshana is an analytical challenge where participants work on a raw dataset and transform it into meaningful insights and visual interpretations using Python and basic machine learning techniques, evaluating their analytical skills and clarity of conclusions.',
rules: [
  'Only one team from the institute is allowed.',
  'Each team must consist max of 2 members.',
  'Participants should have a basic understanding of Python programming and Jupyter Notebook.',
  'The dataset and problem statement will be provided by the event coordinators at the start of the event.',
  'Participants are expected to perform data cleaning, analysis, and visualization within the given time.',
  'Use of external datasets or pre-trained models and AI Tools is strictly prohibited.',
  'Participants must not use unauthorized electronic gadgets or any unfair means during the event.',
  'Any form of malpractice or rule violation will lead to immediate disqualification.',
  'Teams must strictly adhere to the time limits specified for the event.'
],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/datasciencesprint.jpg',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'KABIR AHMED', phone: '9066228810' },
      { name: 'NANDHUPRIYA', phone: '7548822996' }
    ],
    prizes: {
      first: 2000,
      second: 1000
    }
  },

  // ==================== UG TECHNICAL EVENTS ====================

  {
    eventId: 'gandhari-mode',
    mythologyName: 'Gandhari Mode',
    actualName: 'Blind Coding',
    category: 'UG',
description: 'Gandhari Mode is a unique coding challenge where participants code without seeing the screen, relying entirely on logic, syntax knowledge, and memory, with accuracy prioritized over speed through multiple rounds testing coding precision and consistency.',
rules: [
  'Only one team from the institute is allowed.',
  'Each team must consist max of 2 members.',
  'The event will be conducted in multiple rounds, with elimination based on performance in each round.',
  'Participants must write code without viewing the screen during the coding process.',
  'Points will be Granted based on Accuracy of the code.',
  'Coding languages allowed are C, C++, Java, JavaScript and Python.',
  'Participants must not use any electronic gadgets such as mobile phones, smartwatches, or reference materials during the event.',
  'Any form of unfair means or external assistance or Physical writing of code on paper will lead to immediate disqualification.',
  'Participants must strictly adhere to the time limits specified for each round.'
],

    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/blindcoding.png',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'RITIK KUMAR', phone: '8210924812' },
       { name: 'CHAITANYA', phone: '9148177152' }

    ],
    prizes: {
      first: 2000,
      second: 0
    }
  },

  {
    eventId: 'web-shilpa-chakra',
    mythologyName: 'Web Shilpa Chakra',
    actualName: 'Web Designing',
    category: 'UG',
   description: 'Web Shilpa Chakra is a creative web designing battle where participants build visually appealing web pages using basic HTML, CSS, and JavaScript, evaluated in two rounds based on design structure, creativity, responsiveness, and adherence to requirements.',
rules: [
  'Only one team from the institute is allowed.',
  'Each team must consist max of 2 members.',
  'The event will be conducted in two rounds with evaluation after each round.',
  'Participants are required to have knowledge of basic HTML, CSS and JavaScript for designing the web pages.',
  'Use of AI tools, pre-written codes, and templates is strictly prohibited.',
  'Designs will be evaluated by judges based on creativity, layout, styling and completeness.',
  'Participants must carry their own laptops during the event; no systems will be provided by our end.',
  'Any form of unfair means or malpractice will lead to immediate disqualification.',
  'Teams must strictly adhere to the time limits specified for each round.',
  'The decision of the judges and event coordinators is final and binding.'
],

    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/webdesign.jpg',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'SAHANA R', phone: '8431615806' },
      { name: 'SOUMYA M', phone: '7348881039' },
      { name: 'YOGESH T', phone: '8792046432' }
    ],
    prizes: {
      first: 2000,
      second: 1000
    }
  },

  {
    eventId: 'bits-vedha',
    mythologyName: 'Bits Vedha',
    actualName: 'IT Quiz',
    category: 'UG',
  description: "Bits Vedha is a competitive IT quiz testing participants' knowledge of computer concepts, technology trends, and analytical decision-making through multiple rounds.",
rules: [
  'Only one team per institute.',
  'Maximum 2 members per team.',
  'Multiple elimination rounds based on performance.',
  'Quiz covers computer fundamentals, programming, tech trends, and IT current affairs.',
  'No electronic gadgets or reference materials allowed.',
  'No unfair means or malpractice allowed.',
  'Teams must adhere to round time limits.',
  'Decision of quiz master and coordinators is final.'
],

    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/itquiz.png',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'LASYA R GOWDA', phone: '9108831174' },
      { name: 'HARI KRISHNA', phone: '7408285663' }
    ],
    prizes: {
      first: 2000,
      second: 1000
    }
  },

  {
    eventId: 'maya-loop',
    mythologyName: 'Maya Loop',
    actualName: 'Tech Illusion',
    category: 'UG',
   description: 'Maya Loop is a mind-bending technical event testing observation, logic, and awareness of modern technology through illusions.',
rules: [
  'Only one team per institute.',
  'Maximum 2 members per team.',
  'Participants must rely on observation, logic, and quick thinking.',
  'No mobile phones or electronic gadgets unless permitted.',
  'Any unfair means leads to immediate disqualification.',
  'Strict adherence to time limits is required.',
  'Decision of event coordinators is final.'
],
    teamSize: { min: 1, max: 2 },
    fee: 250,
    image: '/techillusion.jpg',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'SPOORTHI CM', phone: '8792294875' },
      { name: 'KRUTHIKA R', phone: '9986709506' }
    ],
    prizes: {
      first: 2000,
      second: 1000
    }
  },

  // ==================== COMBINED ====================

  {
    eventId: 'shastrartha-vada',
    mythologyName: 'Shastrartha Vada',
    actualName: 'IT Debate',
    category: 'Combined',
  description: 'Shastrartha Vāda is a competitive IT debate where participants engage in topic-based debates testing communication skills, technical awareness, and logical argumentation.',
rules: [
  'Only one team per institute.',
  'Maximum 2 members per team.',
  'Multiple rounds with versus-against debates.',
  'Topics on IT, emerging technologies, and digital trends.',
  'Judged on communication, clarity, confidence, and validity.',
  'No mobile phones or electronic gadgets.',
  'Maintain professional conduct and respect.',
  'Unfair practices lead to disqualification.',
  'Strict adherence to round time limits.',
  'Judges and coordinators decision is final.'
],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/itdebate.png',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'PRASANNA HEGADE', phone: '7349159981' },
      { name: 'DHANANJAYA M R', phone: '8197668469' }
    ],
    prizes: {
      first: 2000,
      second: 1000
    }
  },

  // ==================== NON-TECH ====================

  {
    eventId: 'ranabhoomi-arena',
    mythologyName: 'Ranabhoomi Arena',
    actualName: 'Mobile Gaming (BGMI)',
    category: 'Non-Tech',
   description: 'Ranabhoomi Arena is a competitive mobile gaming event (BGMI) where teams battle in a virtual battlefield, emphasizing teamwork, strategy, coordination, and fair play.',

rules: [
  'Only one team per institute.',
  'Each team must consist of exactly 4 members.',
  'No cheating, exploiting bugs, or foul play. Violation leads to disqualification.',
  'Participants should play the game with bare hands.',
  'Use of unfair means, hacks, modded apps, or emulators is strictly prohibited.',
  'Players must bring all necessary accessories (chargers, headphones, power banks, etc.).',
  'All maps and required resource packs must be downloaded in advance.',
  'Wi-Fi will not be provided; participants must use their own mobile data or internet connection.',
  'Participants must maintain discipline and sportsmanship throughout the event.'
],

    teamSize: { min: 4, max: 4 },
    fee: 400,
    image: '/mobilegaming.png',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'PRAJWAL', phone: '9353756447' },
      { name: 'NARESH', phone: '8431163840' },
      { name: 'SHREYAS K C', phone: '7353094781' }
    ],
    prizes: {
      first: 2500,
      second: 1500
    }
  },

  {
    eventId: 'bids-sabha',
    mythologyName: 'Bids Sabha',
    actualName: 'IPL Auction',
    category: 'Non-Tech',
   description: "Bids Sabha is a strategic IPL auction-style event where participants act as team owners and build their dream cricket teams within a fixed budget, testing analytical thinking, planning skills, and understanding of player value and team balance.",

rules: [
  'Only one team per institute.',
  'Maximum 4 participants per team.',
  'Event conducted in auction-based rounds following IPL rules.',
  'Each team gets a fixed virtual budget for bidding.',
  'Teams must plan bids carefully to form balanced teams.',
  'No unfair means, external assistance, or rule manipulation.',
  'Participants must maintain discipline and sportsmanship.',
  'Teams must follow auction rules and time limits strictly.'
],
    teamSize: { min: 4, max: 4 },
    fee: 500,
    image: '/iplauction.png',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'VENKATESH E', phone: '7676660137' },
      { name: 'VINAY', phone: '7619555815' }
    ],
    prizes: {
      first: 4000,
      second: 0
    }
  },

  {
    eventId: 'nidhi-404',
    mythologyName: 'Nidhi 404',
    actualName: 'Treasure Hunt',
    category: 'Non-Tech',
   description: 'Nidhi 404 is a treasure hunt testing logical thinking, teamwork, problem-solving, and quick decision-making under time pressure.',

rules: [
  'Only one team per institute.',
  'Maximum 5 members per team.',
  'Multiple rounds with progressive elimination based on clue-solving.',
  'Clues may include logical puzzles, riddles, technical hints, and location-based challenges.',
  'No unfair means or external assistance allowed.',
  'Use of mobile phones or electronic gadgets is prohibited unless permitted.',
  'Strict adherence to rules and time limits for each round.',
  'Misbehaviour, rule violation, or malpractice leads to immediate disqualification.'
],
    teamSize: { min: 4, max: 5 },
    fee: 500,
    image: '/tresurehunt.png',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'SHRADDHA PANDEY', phone: '9742848958' },
      { name: 'RAHUL', phone: '6204030779' }
    ],
    prizes: {
      first: 3000,
      second: 0
    }
  },

  {
    eventId: 'drishti-pov',
    mythologyName: 'Drishti POV',
    actualName: 'Mobile Photography',
    category: 'Non-Tech',
   description: "Drishti POV is a mobile photography event emphasizing creativity, perspective, composition, and storytelling, evaluated by judges.",

rules: [
  'Only one participant per institute.',
  'Individual participation only.',
  'Use only mobile phones for photography.',
  'No DSLRs, mirrorless cameras, or professional equipment allowed.',
  'Photos must be captured during the event; no pre-saved images.',
  'Editing or filters not allowed unless permitted by coordinators.',
  'Judges will evaluate based on creativity, composition, theme, and clarity.',
  'Plagiarism or unfair means will lead to disqualification.',
  'Judges’ and coordinators’ decision is final.'
],
    teamSize: { min: 1, max: 1 },
    fee: 250,
    image: '/photography.png',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'SANKET S', phone: '8494880084' },
      { name: 'BHAGYASHREE', phone: '8073978788' }
    ],
    prizes: {
      first: 2000,
      second: 1000
    }
  },

  {
    eventId: 'rahasya-mintz',
    mythologyName: 'Rahasya Mintz',
    actualName: 'Surprise Event',
    category: 'Non-Tech',
   description: "Rahasya Mintz is a surprise event where details are revealed only at the event, encouraging participants to stay curious and enjoy unexpected twists.",
rules: [
  'Only one team from the institute is allowed.',
  'Each team must consist max of 2 participants.',
  'No details or clues about the event will be disclosed prior to the event.',
  'Once registered, participants are not allowed to back out of the event.',
  'The event is purely fun-oriented and non-technical.',
  'Participants must follow the instructions given by the event coordinators during the event.',
  'Any form of misbehaviour or unfair means will lead to immediate disqualification.',
  'Participants must maintain discipline and sportsmanship throughout the event.'
],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/surpriseevents.png',
    duration: 'TBA',
    registrationOpen: true,
    eventHeads: [
      { name: 'ASHWINI BALAGANUR', phone: '6363739404' },
      { name: 'YASHAWINI A', phone: '9480674009' }
    ],
    prizes: {
      first: 2000,
      second: 1000
    }
  }
];

export default eventsData;
