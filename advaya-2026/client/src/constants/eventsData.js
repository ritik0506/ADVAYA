/**
 * ADVAYA 2026 - Events Data
 * Single source of truth for all event information
 */

export const EVENTS_DATA = [
  // ==================== PG TECHNICAL EVENTS ====================
  {
    id: 'code-kurukshetra',
    title: 'Code Kurukshetra',
    subtitle: 'Coding & Debugging',
    category: 'Technical Event – PG',
    description: 'Code Kurukshetra is a high-intensity coding battlefield where participants face logical challenges, debugging rounds, and time-bound problem solving. This event tests algorithmic thinking, coding accuracy, and the ability to perform under pressure just like warriors in a digital Kurukshetra.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'Participants must not use any electronic gadgets such as mobile phones, smartwatches, laptops, or any other smart devices during any round of the event.',
      'Participants are strictly prohibited from using or supporting any unfair means during the event.',
      'Any form of malpractice or rule violation observed at any stage will lead to immediate disqualification of the team.',
      'Participants must maintain discipline and decorum throughout the event.',
      'In case of any disputes or clarifications, participants should approach the event coordinators politely and peacefully.',
      'Participants are expected to have knowledge of one or more programming languages from the following: C, C++, Java, Python.',
      'Teams must adhere strictly to the time limits specified for each round to ensure the smooth flow of the event.',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/code-kurukshetra.jpg',
    duration: 'TBA',
  },
  {
    id: 'web-astra',
    title: 'Web Astra',
    subtitle: 'Web Development',
    category: 'Technical Event – PG',
    description: 'Web Astra is a creative and technical web development challenge where participants showcase their skills in UI/UX design and front-end development. The event is conducted in two rounds, starting with designing intuitive and visually appealing interfaces, followed by implementing functional web solutions based on the given problem statement.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'The event will be conducted in two rounds.',
      'Round 1 focuses on UI/UX design using tools such as Figma or Canva.',
      'Round 2 involves web development based on the problem statement provided by the coordinators.',
      'Participants must not use any unauthorized electronic gadgets such as mobile phones, smartwatches, or personal laptops unless permitted by the event coordinators.',
      'Participants are strictly prohibited from copying designs, templates, or code from external sources or other teams.',
      'Any form of unfair means or malpractice will result in immediate disqualification.',
      'Teams must strictly adhere to the time limits specified for each round to ensure smooth conduct of the event.',
      'The decision of the judges and event coordinators shall be final and binding.',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/web-astra.jpg',
    duration: 'TBA',
  },
  {
    id: 'brahma-bits',
    title: 'Brahma Bits',
    subtitle: 'IT Quiz',
    category: 'Technical Event – PG',
    description: 'Brahma Bits is a knowledge-driven IT quiz designed to test participants\' understanding of core computer science concepts, emerging technologies, and general IT awareness. The event consists of multiple rounds that challenge the participants\' speed, accuracy, and depth of technical knowledge.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'The event will be conducted in multiple rounds, with elimination at each stage based on performance.',
      'The quiz may include technical questions, logical reasoning, rapid-fire rounds, and visual or audio-based questions.',
      'Participants must not use any electronic gadgets such as mobile phones, smartwatches, laptops, or any reference materials during the event.',
      'Participants are strictly prohibited from using or supporting any unfair means at any stage of the quiz.',
      'Any form of malpractice or misbehavior will lead to immediate disqualification of the team.',
      'Teams must answer within the time limits specified for each round.',
      'In case of any disputes or clarifications, participants should approach the event coordinators politely and peacefully.',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/brahma-bits.jpg',
    duration: 'TBA',
  },
  {
    id: 'data-vishleshana',
    title: 'Data Vishleshana',
    subtitle: 'Data Sprint',
    category: 'Technical Event – PG',
    description: 'Data Vishleshana is an analytical challenge where participants work on a raw dataset and transform it into meaningful insights and visual interpretations using Python and basic machine learning techniques. The event evaluates participants\' data understanding, analytical skills, and the clarity of conclusions drawn from the data.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'Participants should have a basic understanding of Python programming and Jupyter Notebook.',
      'The dataset and problem statement will be provided by the event coordinators at the start of the event.',
      'Participants are expected to perform data cleaning, analysis, and visualization within the given time.',
      'Use of external datasets or pre-trained models and AI Tools is strictly prohibited.',
      'Participants must not use unauthorized electronic gadgets or any unfair means during the event.',
      'Any form of malpractice or rule violation will lead to immediate disqualification.',
      'Teams must strictly adhere to the time limits specified for the event.',
      'In case of any disputes or clarifications, participants should approach the event coordinators politely and peacefully.',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/data-vishleshana.jpg',
    duration: 'TBA',
  },

  // ==================== UG TECHNICAL EVENTS ====================
  {
    id: 'gandhari-mode',
    title: 'Gandhari Mode',
    subtitle: 'Blind Coding',
    category: 'Technical Event – UG',
    description: 'Gandhari Mode is a unique coding challenge where participants write code without seeing the screen, relying entirely on logic, syntax knowledge, and memory. Accuracy is given higher priority than speed, and winners are decided based on the least margin of errors. Multiple rounds are conducted to progressively test participants\' coding precision and consistency.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'The event will be conducted in multiple rounds, with elimination based on performance in each round.',
      'Participants must write code without viewing the screen during the coding process.',
      'Accuracy of the code will be given more importance than execution speed.',
      'Participants must not use any electronic gadgets such as mobile phones, smartwatches, or reference materials during the event.',
      'Any form of unfair means or external assistance or Physical writing of code on paper will lead to immediate disqualification.',
      'Participants must strictly adhere to the time limits specified for each round.',
      'In case of any disputes or clarifications, participants should approach the event coordinators politely and peacefully.',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/gandhari-mode.jpg',
    duration: 'TBA',
  },
  {
    id: 'web-shilpa-chakra',
    title: 'Web Shilpa Chakra',
    subtitle: 'Web Design',
    category: 'Technical Event – UG',
    description: 'Web Shilpa Chakra is a creative web designing battle where participants build visually appealing web pages using basic HTML and CSS. The event is conducted in two rounds, and participants are evaluated by judges based on design structure, creativity, responsiveness, and adherence to the given requirements.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'The event will be conducted in two rounds, with evaluation after each round.',
      'Participants are required to have knowledge of basic HTML and CSS for designing the web pages.',
      'Use of AI tools, Pre written codes and Templets are strictly prohibited.',
      'Designs will be evaluated by judges based on creativity, layout, styling, and completeness.',
      'Participants must not use unauthorized electronic gadgets or external resources during the event.',
      'Any form of unfair means or malpractice will lead to immediate disqualification.',
      'Teams must strictly adhere to the time limits specified for each round.',
      'The decision of the judges and event coordinators shall be final and binding.',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/web-shilpa-chakra.jpg',
    duration: 'TBA',
  },
  {
    id: 'bits-vedha',
    title: 'Bits Vedha',
    subtitle: 'IT Quiz',
    category: 'Technical Event – UG',
    description: 'Bits Vedha is a competitive IT quiz designed to evaluate participants\' knowledge of core computer concepts, current technology trends, and recent developments in the IT industry. The event consists of multiple rounds that test participants\' awareness, analytical thinking, and quick decision-making skills.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'The event will be conducted in multiple rounds, with elimination at each stage based on performance.',
      'The quiz may include questions related to computer fundamentals, programming concepts, current technology trends, and IT-related current affairs.',
      'Participants must not use any electronic gadgets such as mobile phones, smartwatches, laptops, or reference materials during the event.',
      'Participants are strictly prohibited from using or supporting any unfair means during the quiz.',
      'Any form of malpractice or misbehaviour will lead to immediate disqualification.',
      'Teams must answer within the time limits specified for each round.',
      'In case of any disputes or clarifications, participants should approach the quiz master or event coordinators politely and peacefully.',
      'The decision of the quiz master and Event Coordinators shall be final and binding.',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/bits-vedha.jpg',
    duration: 'TBA',
  },
  {
    id: 'maya-loop',
    title: 'Maya Loop',
    subtitle: 'Tech Illusion',
    category: 'Technical Event – UG',
    description: 'Maya Loop is a fun yet mind-bending technical event that challenges participants\' observation skills, logical thinking, and awareness of modern technology. The event blends technology with illusion, where things may not be what they seem. Participants must stay alert, think smart, and trust their instincts.',
    rules: [
      'Each team may consist of 1 or 2 members.',
      'The event will be conducted in multiple rounds, details of which will be revealed during the event.',
      'Participants must rely on observation, logic, and quick thinking to progress through the rounds.',
      'Use of mobile phones or any electronic gadgets is strictly prohibited unless permitted by the event coordinators.',
      'Any form of unfair means or malpractice will result in immediate disqualification.',
      'Participants must strictly adhere to the time limits specified for each round.',
      'In case of any disputes or clarifications, participants should approach the event coordinators politely and peacefully.',
      'The decision Event coordinators shall be final and binding.',
    ],
    teamSize: { min: 1, max: 2 },
    fee: 250,
    image: '/assets/events/maya-loop.jpg',
    duration: 'TBA',
  },

  // ==================== COMBINED TECHNICAL ====================
  {
    id: 'shastrartha-vada',
    title: 'Shastrartha Vāda',
    subtitle: 'IT Debate',
    category: 'Combined Technical Event – UG & PG',
    description: 'Shastrartha Vāda is a competitive IT debate event where participants engage in topic-based debates in a versus-against format. The event consists of multiple rounds that test participants\' communication skills, technical awareness, and ability to present valid and logical arguments on contemporary IT topics.',
    rules: [
      'Each team must consist of exactly 2 members.',
      'The event will be conducted in multiple rounds with versus-against debate formats.',
      'Debate topics will be related to information technology, emerging technologies, and digital trends.',
      'Participants will be evaluated by judges based on communication skills, clarity of thought, confidence, and validity of points presented.',
      'Use of mobile phones or any electronic gadgets during the debate is strictly prohibited.',
      'Participants must maintain professional conduct, discipline, and respect towards opponents and judges.',
      'Any form of misbehavior or unfair practice will lead to immediate disqualification.',
      'Participants must strictly adhere to the time limits assigned for each round.',
      'The decision of the judges and event coordinators shall be final and binding.',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/shastrartha-vada.jpg',
    duration: 'TBA',
  },

  // ==================== NON-TECHNICAL EVENTS ====================
  {
    id: 'ranabhoomi-arena',
    title: 'Ranabhoomi Arena',
    subtitle: 'Mobile Gaming (BGMI)',
    category: 'Non-Technical Event – UG & PG',
    description: 'Ranabhoomi Arena is a competitive mobile gaming event where teams face off in an intense virtual battlefield. The event emphasizes teamwork, strategy, coordination, and fair play, delivering a thrilling gaming experience for all participants.',
    rules: [
      'Each team must consist of exactly 4 members.',
      'No cheating, exploiting bugs, or foul play is allowed. Any violation will result in immediate disqualification.',
      'Use of any unfair means, hacks, modded applications, or emulators is strictly prohibited.',
      'Players must bring all necessary accessories such as chargers, headphones, power banks, etc.',
      'Players are required to download all maps and required resource packs in advance to ensure smooth gameplay during the event.',
      'Wi-Fi will not be provided by the college. Participants must use their own mobile data or internet connection for the game.',
      'Participants must maintain discipline and sportsmanship throughout the event.',
      'In case of any disputes or clarifications, participants should approach the event coordinators politely and peacefully.',
    ],
    teamSize: { min: 4, max: 4 },
    fee: 400,
    image: '/assets/events/ranabhoomi-arena.jpg',
    duration: 'TBA',
  },
  {
    id: 'bids-sabha',
    title: 'Bids Sabha',
    subtitle: 'IPL Auction',
    category: 'Non-Technical Event – UG & PG',
    description: 'Bids Sabha is a strategic and thrilling IPL auction-style event where participants act as team owners and build their dream cricket teams within a fixed budget. The event tests participants\' analytical thinking, planning skills, and understanding of player value and team balance.',
    rules: [
      'Each team must consist of the 4 Participants.',
      'The event will be conducted in auction-based rounds, following standard IPL auction rules.',
      'Each team will be provided with a fixed virtual budget to bid for players.',
      'Teams must carefully plan their bids to form a balanced and competitive team.',
      'Any form of unfair means, external assistance, or rule manipulation will result in immediate disqualification.',
      'Participants must maintain discipline and sportsmanship throughout the event.',
      'Teams must strictly adhere to the auction rules and time limits set for bidding.',
      'In case of any disputes or clarifications, participants should approach the event coordinators politely and peacefully.',
      'The decision of the event coordinators shall be final and binding.',
    ],
    teamSize: { min: 4, max: 4 },
    fee: 500,
    image: '/assets/events/bids-sabha.jpg',
    duration: 'TBA',
  },
  {
    id: 'nidhi-404',
    title: 'Nidhi 404',
    subtitle: 'Treasure Hunt',
    category: 'Non-Technical Event – UG & PG',
    description: 'Nidhi 404 is an adventurous treasure hunt where participants solve clues, decode hints, and navigate through multiple checkpoints to uncover the hidden treasure. The event tests participants\' logical thinking, teamwork, problem-solving skills, and presence of mind under time pressure.',
    rules: [
      'Each team must consist of the 4 - 5 members.',
      'The event will be conducted in multiple rounds, with progressive elimination based on clue-solving accuracy and completion time.',
      'Clues may include logical puzzles, riddles, technical hints, and location-based challenges.',
      'Participants must not use any unfair means or external assistance during the event.',
      'Use of mobile phones or electronic gadgets is prohibited unless explicitly permitted by the event coordinators.',
      'Teams must strictly adhere to the rules and time limits specified for each round.',
      'Any form of misbehaviour, rule violation, or malpractice will lead to immediate disqualification.',
      'In case of any disputes or clarifications, participants should approach the event coordinators politely and peacefully.',
    ],
    teamSize: { min: 4, max: 5 },
    fee: 500,
    image: '/assets/events/nidhi-404.jpg',
    duration: 'TBA',
  },
  {
    id: 'drishti-pov',
    title: 'Drishti POV',
    subtitle: 'Photography',
    category: 'Non-Technical Event – UG & PG',
    description: 'Drishti POV is a pure photography event where participants capture creative and impactful photographs using only mobile phones. The event focuses on perspective, creativity, composition, and storytelling through images, with evaluation done by judges.',
    rules: [
      'Participation may be individual.',
      'Participants are allowed to use only mobile phones for capturing photographs.',
      'Use of DSLRs, mirrorless cameras, or any professional photography equipment is strictly prohibited.',
      'Photographs must be captured during the event and not sourced from the gallery or external platforms.',
      'Editing or use of filters is not allowed unless explicitly permitted by the event coordinators.',
      'Photographs will be evaluated by judges based on creativity, composition, theme relevance, and clarity.',
      'Any form of plagiarism or unfair means will lead to immediate disqualification.',
      'Participants must strictly adhere to the time limits and rules specified for the event.',
      'The decision of the judges and event coordinators shall be final and binding.',
    ],
    teamSize: { min: 1, max: 1 },
    fee: 250,
    image: '/assets/events/drishti-pov.jpg',
    duration: 'TBA',
  },
  {
    id: 'rahasya-mintz',
    title: 'Rahasya Mintz',
    subtitle: 'Surprise Event',
    category: 'Non-Technical Event – UG & PG',
    description: 'Rahasya Mintz is a fun-filled surprise event designed to keep participants curious and excited. The complete details of the event will be revealed only after registration and at the time of the event. Participants are expected to participate with an open mind and enjoy the unexpected twists.',
    rules: [
      'Each team must consist of exactly 2 participants.',
      'No details or clues about the event will be disclosed prior to the event.',
      'Once registered, participants are not allowed to back out of the event.',
      'The event is purely fun-oriented and non-technical.',
      'Participants must follow the instructions given by the event coordinators during the event.',
      'Any form of misbehaviour or unfair means will lead to immediate disqualification.',
      'Participants must maintain discipline and sportsmanship throughout the event.',
      'In case of any disputes or clarifications, participants should approach the event coordinators politely and peacefully.',
      'The decision of the event coordinators shall be final and binding.',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/rahasya-mintz.jpg',
    duration: 'Variable',
  },
];

/**
 * Helper function to get events by category
 */
export const getEventsByCategory = (category) => {
  return EVENTS_DATA.filter(event => event.category.includes(category));
};

/**
 * Helper function to get event by id
 */
export const getEventById = (id) => {
  return EVENTS_DATA.find(event => event.id === id);
};

/**
 * Get all unique categories
 */
export const getCategories = () => {
  return [...new Set(EVENTS_DATA.map(event => event.category))];
};

/**
 * Get PG Technical events
 */
export const getPGEvents = () => {
  return EVENTS_DATA.filter(event => event.category.includes('PG'));
};

/**
 * Get UG Technical events (including Combined)
 */
export const getUGEvents = () => {
  return EVENTS_DATA.filter(event => 
    event.category.includes('UG') || event.category.includes('Combined')
  );
};

/**
 * Get Non-Technical events
 */
export const getNonTechEvents = () => {
  return EVENTS_DATA.filter(event => event.category.includes('Non-Technical'));
};

export default EVENTS_DATA;
