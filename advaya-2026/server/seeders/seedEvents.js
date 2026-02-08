/**
 * ADVAYA 2026 - Events Database Seeder
 * Populates the MongoDB database with official website event data
 * Source: RVITM MCA Department - ADVAYA 2026
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/Event.js';
import connectDB from '../config/db.js';

dotenv.config();

// Event data matching the frontend EVENTS_DATA structure
const eventsData = [
  // ==================== PG TECHNICAL EVENTS ====================
  {
    eventId: 'code-kurukshetra',
    mythologyName: 'Code Kurukshetra',
    actualName: 'Coding & Debugging',
    category: 'PG',
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
    eventId: 'web-astra',
    mythologyName: 'Web Astra',
    actualName: 'Web Development',
    category: 'PG',
    description: 'Forge the weapons of the web. Design stunning interfaces and bring them to life with code in this two-round web development challenge.',
    rules: [
      'Round 1: UI/UX Design using Figma or similar tools',
      'Round 2: Implementation and Development',
      'Responsive design is mandatory',
      'Any modern web framework allowed',
      'Plagiarism will lead to disqualification',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/web-astra.jpg',
    duration: '4 hours',
  },
  {
    eventId: 'brahma-bits',
    mythologyName: 'Brahma Bits',
    actualName: 'IT Quiz',
    category: 'PG',
    description: 'Test your knowledge across the vast universe of Information Technology. From ancient computing history to cutting-edge technologies.',
    rules: [
      'Team of 2 members required',
      'Multiple rounds with increasing difficulty',
      'Topics include: Programming, Databases, Networks, AI/ML, Cybersecurity',
      'No electronic devices allowed during quiz',
      'Decision of quiz master is final',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/brahma-bits.jpg',
    duration: '2 hours',
  },
  {
    eventId: 'vyasa-data',
    mythologyName: 'Vyasa Data',
    actualName: 'Data Science Sprint',
    category: 'PG',
    description: 'Unravel the mysteries hidden in data. Analyze, visualize, and extract insights from datasets like the sage Vyasa chronicled the epic tales.',
    rules: [
      'Stack: Python with Jupyter Notebook',
      'No AI tools or code generation assistants allowed',
      'Dataset will be provided on-site',
      'Must submit notebook with analysis and visualizations',
      'Creativity in insights will be rewarded',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/vyasa-data.jpg',
    duration: '3 hours',
  },

  // ==================== UG TECHNICAL EVENTS ====================
  {
    eventId: 'gandhari-mode',
    mythologyName: 'Gandhari Mode',
    actualName: 'Blind Coding',
    category: 'UG',
    description: 'Code without sight, like Queen Gandhari who chose to be blindfolded. Trust your knowledge and muscle memory in this unique coding challenge.',
    rules: [
      'Participants must code without looking at the screen',
      'Screen will be turned off or covered',
      'Only keyboard input allowed',
      'Any programming language can be used',
      'Code correctness and creativity will be judged',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/gandhari-mode.jpg',
    duration: '2 hours',
  },
  {
    eventId: 'web-shilpa-chakra',
    mythologyName: 'Web Shilpa Chakra',
    actualName: 'Web Design',
    category: 'UG',
    description: 'The art of web crafting using pure HTML and CSS. Create beautiful, responsive designs without the aid of frameworks or artificial intelligence.',
    rules: [
      'HTML and CSS only - No JavaScript frameworks',
      'No AI tools or code generators allowed',
      'Must be responsive and cross-browser compatible',
      'Design creativity and code quality will be judged',
      'Plagiarism will result in disqualification',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/web-shilpa-chakra.jpg',
    duration: '3 hours',
  },
  {
    eventId: 'bits-vedha',
    mythologyName: 'Bits Vedha',
    actualName: 'IT Quiz',
    category: 'UG',
    description: 'Pierce through layers of technology knowledge. A comprehensive quiz covering fundamentals to advanced IT concepts.',
    rules: [
      'Team of 2 members required',
      'Multiple rounds with elimination',
      'Topics: Programming basics, Web technologies, Algorithms, Current tech trends',
      'No phones or external resources allowed',
      'Fastest correct answer wins in tie-breakers',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/bits-vedha.jpg',
    duration: '2 hours',
  },
  {
    eventId: 'maya-loop',
    mythologyName: 'Maya Loop',
    actualName: 'Tech Illusion',
    category: 'UG',
    description: 'Enter the realm of Maya where logic meets observation. Solve technical puzzles and optical illusions in this mind-bending challenge.',
    rules: [
      'Individual or team of 2 allowed',
      'Focus on logic, problem-solving, and observation',
      'No programming required',
      'Timed challenges with increasing complexity',
      'Fastest team with correct solutions wins',
    ],
    teamSize: { min: 1, max: 2 },
    fee: 250,
    image: '/assets/events/maya-loop.jpg',
    duration: '2 hours',
  },

  // ==================== COMBINED TECHNICAL ====================
  {
    eventId: 'shastrartha-vada',
    mythologyName: 'Shastrartha Vāda',
    actualName: 'IT Debate',
    category: 'Combined',
    description: 'Engage in scholarly debates on contemporary IT topics. Defend your stance with logic, evidence, and eloquence like the ancient philosophical debates.',
    rules: [
      'Team of 2 members required',
      'Topics will be announced before each round',
      'One person argues FOR, one argues AGAINST',
      'Time limits strictly enforced for statements and rebuttals',
      'Judging based on content, delivery, and rebuttal strength',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/shastrartha-vada.jpg',
    duration: '3 hours',
  },

  // ==================== NON-TECHNICAL EVENTS ====================
  {
    eventId: 'ranabhoomi-arena',
    mythologyName: 'Ranabhoomi Arena',
    actualName: 'BGMI Tournament',
    category: 'Non-Tech',
    description: 'The battlefield awaits. Form your squad and compete in the ultimate BGMI tournament for glory and victory.',
    rules: [
      'Team of 4 players required',
      'Bring your own mobile devices and accessories',
      'Stable internet connection required (bring own data)',
      'Fair play policy - cheating leads to instant disqualification',
      'Standard BGMI tournament rules apply',
    ],
    teamSize: { min: 4, max: 4 },
    fee: 400,
    image: '/assets/events/ranabhoomi-arena.jpg',
    duration: '4 hours',
  },
  {
    eventId: 'bids-sabha',
    mythologyName: 'Bids Sabha',
    actualName: 'IPL Auction',
    category: 'Non-Tech',
    description: 'Step into the royal court of cricket auctions. Build your dream IPL team with strategic bidding and budget management.',
    rules: [
      'Team of 4 members required',
      'Virtual budget will be provided',
      'Must build a complete squad following IPL rules',
      'Strategic bidding and team composition will be judged',
      'Most balanced and strategic team wins',
    ],
    teamSize: { min: 4, max: 4 },
    fee: 500,
    image: '/assets/events/bids-sabha.jpg',
    duration: '3 hours',
  },
  {
    eventId: 'nidhi-404',
    mythologyName: 'Nidhi 404',
    actualName: 'Treasure Hunt',
    category: 'Non-Tech',
    description: 'The treasure is lost, but not unfound. Navigate through clues, riddles, and challenges to discover the hidden Nidhi.',
    rules: [
      'Team of 4-5 members required',
      'Follow clues across campus locations',
      'All team members must stay together',
      'No vehicles allowed - on foot only',
      'First team to find the treasure wins',
    ],
    teamSize: { min: 4, max: 5 },
    fee: 500,
    image: '/assets/events/nidhi-404.jpg',
    duration: '2-3 hours',
  },
  {
    eventId: 'drishti-pov',
    mythologyName: 'Drishti POV',
    actualName: 'Photography',
    category: 'Non-Tech',
    description: 'Capture the world through your unique vision. A mobile photography contest celebrating creativity and perspective.',
    rules: [
      'Individual participation only',
      'Mobile phone cameras only - no DSLRs',
      'No photo editing or filters allowed',
      'Theme will be announced on the day',
      'Original photos taken during event only',
    ],
    teamSize: { min: 1, max: 1 },
    fee: 250,
    image: '/assets/events/drishti-pov.jpg',
    duration: '2 hours',
  },
  {
    eventId: 'rahasya-mintz',
    mythologyName: 'Rahasya Mintz',
    actualName: 'Surprise Event',
    category: 'Non-Tech',
    description: 'A mystery wrapped in an enigma. The nature of this event remains a secret until the moment arrives. Expect the unexpected.',
    rules: [
      'Team of 2 members required',
      'Event details will be revealed on the spot',
      'Be prepared for fun and mystery',
      'Flexibility and creativity rewarded',
      'All participants must be present at announcement time',
    ],
    teamSize: { min: 2, max: 2 },
    fee: 250,
    image: '/assets/events/rahasya-mintz.jpg',
    duration: 'Variable',
  },
];

// Seed function
const seedEvents = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    await connectDB();

    // Clear existing events
    console.log('🗑️  Clearing existing events...');
    await Event.deleteMany({});
    console.log('✅ Existing events cleared');

    // Insert new events
    console.log('📝 Inserting new events...');
    const insertedEvents = await Event.insertMany(eventsData);
    console.log(`✅ Successfully inserted ${insertedEvents.length} events`);

    // Display summary
    console.log('\n📊 Seeding Summary:');
    const pgCount = insertedEvents.filter(e => e.category === 'PG').length;
    const ugCount = insertedEvents.filter(e => e.category === 'UG').length;
    const combinedCount = insertedEvents.filter(e => e.category === 'Combined').length;
    const nonTechCount = insertedEvents.filter(e => e.category === 'Non-Tech').length;

    console.log(`   PG Technical: ${pgCount} events`);
    console.log(`   UG Technical: ${ugCount} events`);
    console.log(`   Combined Technical: ${combinedCount} events`);
    console.log(`   Non-Technical: ${nonTechCount} events`);
    console.log(`   Total: ${insertedEvents.length} events\n`);

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedEvents();
