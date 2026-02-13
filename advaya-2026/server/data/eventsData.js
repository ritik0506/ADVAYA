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
      'In case of any disputes or clarifications, participants should approach the event coordinators politely and peacefully.',
      'Participants are expected to have knowledge of C, C++, Java, or Python.',
      'Teams must adhere strictly to the time limits specified for each round.'
    ],
    teamSize: { min: 2, max: 2 },
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
      'Web Astra is a creative and technical web development challenge where participants showcase their skills in UI/UX design and front-end development. The event is conducted in two rounds, starting with designing intuitive and visually appealing interfaces, followed by implementing functional web solutions based on the given problem statement.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'The event will be conducted in two rounds.',
      'Round 1 focuses on UI/UX design using tools such as Figma or Canva.',
      'Round 2 involves web development based on the problem statement provided by the coordinators.',
      'Participants must not use unauthorized electronic gadgets unless permitted by the event coordinators.',
      'Participants are strictly prohibited from copying designs, templates, or code from external sources or other teams.',
      'Any form of unfair means or malpractice will result in immediate disqualification.',
      'Teams must strictly adhere to the time limits specified for each round.',
      'The decision of the judges and event coordinators shall be final and binding.'
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/webtech.jpg',
    duration: 'TBA',
    registrationOpen: true,
  },

  {
    eventId: 'brahma-bits',
    mythologyName: 'Brahma Bits',
    actualName: 'IT Quiz',
    category: 'PG',
    description:
      'Brahma Bits is a knowledge-driven IT quiz designed to test participants’ understanding of core computer science concepts, emerging technologies, and general IT awareness. The event consists of multiple rounds that challenge the participants’ speed, accuracy, and depth of technical knowledge.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'The event will be conducted in multiple rounds with elimination based on performance.',
      'The quiz may include technical questions, logical reasoning, rapid-fire rounds, and visual or audio-based questions.',
      'Participants must not use any electronic gadgets or reference materials during the event.',
      'Participants are strictly prohibited from using or supporting any unfair means.',
      'Any form of malpractice or misbehavior will lead to immediate disqualification.',
      'Teams must answer within the time limits specified for each round.',
      'In case of disputes, participants should approach the coordinators politely.'
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/itquiz.png',
    duration: 'TBA',
    registrationOpen: true,
  },

  {
    eventId: 'data-vishleshana',
    mythologyName: 'Data Vishleshana',
    actualName: 'Data Sprint',
    category: 'PG',
    description:
      'Data Vishleshana is an analytical challenge where participants work on a raw dataset and transform it into meaningful insights and visual interpretations using Python and basic machine learning techniques. The event evaluates participants’ data understanding, analytical skills, and clarity of conclusions.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'Participants should have a basic understanding of Python programming and Jupyter Notebook.',
      'The dataset and problem statement will be provided at the start of the event.',
      'Participants must perform data cleaning, analysis, and visualization within the given time.',
      'Use of external datasets, pre-trained models, or AI tools is strictly prohibited.',
      'Unauthorized electronic gadgets and unfair means are prohibited.',
      'Any rule violation will lead to immediate disqualification.',
      'Teams must strictly adhere to the time limits.',
      'In case of disputes, approach the coordinators politely.'
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/datasciencesprint.jpg',
    duration: 'TBA',
    registrationOpen: true,
  },

  // ==================== UG TECHNICAL EVENTS ====================
  {
    eventId: 'gandhari-mode',
    mythologyName: 'Gandhari Mode',
    actualName: 'Blind Coding',
    category: 'UG',
    description:
      'Gandhari Mode is a unique coding challenge where participants write code without seeing the screen, relying entirely on logic, syntax knowledge, and memory. Accuracy is given higher priority than speed.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'Multiple rounds with elimination based on performance.',
      'Participants must write code without viewing the screen.',
      'Accuracy is given more importance than speed.',
      'No electronic gadgets or reference materials allowed.',
      'Physical writing of code on paper is prohibited.',
      'Unfair means lead to disqualification.',
      'Strict adherence to time limits is mandatory.'
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/blindcoding.png',
    duration: 'TBA',
    registrationOpen: true,
  },

  {
    eventId: 'web-shilpa-chakra',
    mythologyName: 'Web Shilpa Chakra',
    actualName: 'Web Designing',
    category: 'UG',
    description:
      'Web Shilpa Chakra is a creative web designing battle where participants build visually appealing web pages using basic HTML and CSS. Evaluation is based on creativity, layout, responsiveness, and completeness.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'The event will be conducted in two rounds.',
      'Participants must have knowledge of basic HTML and CSS.',
      'Use of AI tools, pre-written code, and templates is strictly prohibited.',
      'Designs will be evaluated on creativity, layout, styling, and completeness.',
      'Unauthorized gadgets and external resources are prohibited.',
      'Unfair means will lead to disqualification.',
      'Strict adherence to time limits.',
      'Judges’ decision is final and binding.'
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/webdesign.jpg',
    duration: 'TBA',
    registrationOpen: true,
  },

  {
    eventId: 'bits-vedha',
    mythologyName: 'Bits Vedha',
    actualName: 'IT Quiz',
    category: 'UG',
    description:
      'Bits Vedha is a competitive IT quiz designed to evaluate knowledge of computer fundamentals, programming concepts, technology trends, and IT current affairs.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'Multiple rounds with elimination.',
      'No electronic gadgets or reference materials allowed.',
      'Unfair means lead to disqualification.',
      'Teams must answer within specified time limits.',
      'Quiz master’s decision is final and binding.'
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/itquiz.png',
    duration: 'TBA',
    registrationOpen: true,
  },

  {
    eventId: 'maya-loop',
    mythologyName: 'Maya Loop',
    actualName: 'Tech Illusion',
    category: 'UG',
    description:
      'Maya Loop is a fun yet mind-bending technical event that challenges observation skills, logical thinking, and awareness of modern technology.',
    rules: [
      'Each team may consist of 1 or 2 members.',
      'Multiple rounds; details revealed during the event.',
      'Participants must rely on logic and observation.',
      'Mobile phones and electronic gadgets are prohibited unless permitted.',
      'Unfair means lead to disqualification.',
      'Strict adherence to time limits.',
      'Coordinator’s decision is final and binding.'
    ],
    teamSize: { min: 1, max: 2 },
    fee: 250,
    image: '/techillusion.jpg',
    duration: 'TBA',
    registrationOpen: true,
  },

  // ==================== COMBINED ====================
  {
    eventId: 'shastrartha-vada',
    mythologyName: 'Shastrartha Vada',
    actualName: 'IT Debate',
    category: 'Combined',
    description:
      'Shastrartha Vāda is a competitive IT debate event where participants engage in versus-against debates on contemporary IT topics.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'Multiple rounds with versus-against format.',
      'Topics related to IT and emerging technologies.',
      'Evaluation based on communication, clarity, confidence, and logic.',
      'No electronic gadgets allowed during debate.',
      'Professional conduct must be maintained.',
      'Unfair practices lead to disqualification.',
      'Strict adherence to time limits.',
      'Judges’ decision is final and binding.'
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/itdebate.png',
    duration: 'TBA',
    registrationOpen: true,
  },

  // ==================== NON-TECH ====================
  {
    eventId: 'ranabhoomi-arena',
    mythologyName: 'Ranabhoomi Arena',
    actualName: 'Mobile Gaming (BGMI)',
    category: 'Non-Tech',
    description:
      'Ranabhoomi Arena is a competitive BGMI tournament emphasizing teamwork, strategy, coordination, and fair play.',
    rules: [
      'Each team must consist of exactly 4 members.',
      'No cheating, hacks, mod apps, or emulators allowed.',
      'Players must bring their own accessories.',
      'All maps/resources must be downloaded in advance.',
      'Wi-Fi will not be provided.',
      'Maintain discipline and sportsmanship.',
      'Coordinator’s decision is final.'
    ],
    teamSize: { min: 4, max: 4 },
    fee: 400,
    image: '/mobilegaming.png',
    duration: 'TBA',
    registrationOpen: true,
  },

  {
    eventId: 'bids-sabha',
    mythologyName: 'Bids Sabha',
    actualName: 'IPL Auction',
    category: 'Non-Tech',
    description:
      'Bids Sabha is an IPL auction-style strategic event where teams build their dream cricket squad within a fixed budget.',
    rules: [
      'Each team must consist of exactly 4 members.',
      'Auction-based rounds following IPL format.',
      'Fixed virtual budget provided.',
      'Unfair means lead to disqualification.',
      'Strict adherence to bidding rules.',
      'Coordinator’s decision is final.'
    ],
    teamSize: { min: 4, max: 4 },
    fee: 500,
    image: '/iplauction.png',
    duration: 'TBA',
    registrationOpen: true,
  },

  {
    eventId: 'nidhi-404',
    mythologyName: 'Nidhi 404',
    actualName: 'Treasure Hunt',
    category: 'Non-Tech',
    description:
      'Nidhi 404 is an adventurous treasure hunt involving clues, riddles, and location-based challenges.',
    rules: [
      'Each team must consist of 4 to 5 members.',
      'Multiple rounds with elimination.',
      'Clues may include puzzles and riddles.',
      'No unfair means or external assistance.',
      'Mobile phones prohibited unless permitted.',
      'Strict adherence to time limits.',
      'Coordinator’s decision is final.'
    ],
    teamSize: { min: 4, max: 5 },
    fee: 500,
    image: '/tresurehunt.png',
    duration: 'TBA',
    registrationOpen: true,
  },

  {
    eventId: 'drishti-pov',
    mythologyName: 'Drishti POV',
    actualName: 'Mobile Photography',
    category: 'Non-Tech',
    description:
      'Drishti POV is a photography event where participants capture creative photographs using only mobile phones.',
    rules: [
      'Individual participation allowed.',
      'Only mobile phones permitted.',
      'No DSLR or professional cameras.',
      'Photos must be captured during the event.',
      'Editing or filters not allowed unless permitted.',
      'Plagiarism leads to disqualification.',
      'Judges’ decision is final.'
    ],
    teamSize: { min: 1, max: 1 },
    fee: 250,
    image: '/photography.png',
    duration: 'TBA',
    registrationOpen: true,
  },

  {
    eventId: 'rahasya-mintz',
    mythologyName: 'Rahasya Mintz',
    actualName: 'Surprise Event',
    category: 'Non-Tech',
    description:
      'Rahasya Mintz is a fun-filled surprise event. Complete details will be revealed only at the time of the event.',
    rules: [
      'Each team must consist of exactly 2 participants.',
      'No details disclosed prior to the event.',
      'Participants cannot back out once registered.',
      'Follow coordinator instructions strictly.',
      'Unfair means lead to disqualification.',
      'Maintain discipline and sportsmanship.',
      'Coordinator’s decision is final.'
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/surpriseevents.png',
    duration: 'TBA',
    registrationOpen: true,
  },
];

export default eventsData;
