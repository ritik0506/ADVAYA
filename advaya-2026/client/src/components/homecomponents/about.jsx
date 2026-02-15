

import React from "react";
import {
  YagnaReveal,
  GoldenDivider,
  SplitText,
  HoverText,
  ScrollText,
} from "../animations/MythologyMotion";

/* -------------------------------------------------------------------------- */
/* ABOUT BLOCK COMPONENT — TRUE EDGE LOCKED ELEPHANTS + MOTION               */
/* -------------------------------------------------------------------------- */
const AboutBlock = ({ title, children, side, imgSrc }) => (
  <div className="relative group w-full 
                  min-h-[65vh] md:min-h-[90vh] 
                  flex justify-center items-center 
                  overflow-hidden">

    {/* --- ELEPHANT GUARDIAN --- */}
    <div
      className={`absolute top-1/2 -translate-y-1/2 pointer-events-none z-0
        ${side === "left"
          ? "left-0 -translate-x-[15%] md:-translate-x-[15%]"
          : "right-0 translate-x-[15%] md:translate-x-[15%]"
        }`}
    >
      {/* Glow Effect */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 
          w-[250px] h-[350px] md:w-[600px] md:h-[700px] 
          bg-[#f3cf7a]/15 md:bg-[#f3cf7a]/25 
          blur-[80px] md:blur-[140px] rounded-full
          ${side === "left" ? "-left-16" : "-right-16"}`}
      />

      <img
        src={imgSrc}
        alt="Guardian"
        className="block
          h-[50vh] md:h-[100vh] w-auto object-contain
          opacity-20 md:opacity-50
          brightness-90 md:brightness-125
          saturate-[0.5] md:saturate-[1]
          md:group-hover:opacity-80
          transition-all duration-1000"
      />
    </div>

    {/* --- TEXT CONTENT --- */}
    <div className="relative z-10 flex flex-col items-center 
                    text-center max-w-4xl 
                    px-5 md:px-6">

      {/* TITLE */}
      <ScrollText effect="parallax" speed={0.15}>
        <HoverText
          className="text-2xl md:text-8xl 
                     font-serif mb-5 md:mb-10 
                     text-white group-hover:text-[#f3cf7a] 
                     transition-all duration-700 
                     uppercase tracking-[0.08em] md:tracking-[0.15em] 
                     leading-none"
        >
          <SplitText
            text={title}
            animation="rise"
            staggerDelay={0.04}
            charClassName="group-hover:text-[#f3cf7a] transition-colors duration-500"
          />
        </HoverText>
      </ScrollText>

      {/* PARAGRAPH */}
      <YagnaReveal delay={0.3} y={40}>
        <p
          className="text-sm md:text-2xl 
                     leading-[1.7] md:leading-[2] 
                     text-gray-300 font-serif italic 
                     text-justify md:text-center"
        >
          <span className="group-hover:text-white transition-colors duration-500">
            {children}
          </span>
        </p>
      </YagnaReveal>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* MAIN SECTION                                                               */
/* -------------------------------------------------------------------------- */
export default function About() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen 
                 pt-20 md:pt-40 
                 pb-28 md:pb-60 
                 bg-transparent overflow-hidden"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
        html, body { margin: 0; padding: 0; overflow-x: hidden; }
        #about h2 { font-family: 'Cinzel', serif; font-weight: 700; }
        #about p { font-family: 'Playfair Display', serif; }
      `}</style>

      <div className="relative z-20 space-y-20 md:space-y-72 w-full">

        <AboutBlock
          title="RVITM"
          side="left"
          imgSrc="/elephantleft1.png"
        >
At RV, We understand that there exists a vast gap between what universities teach
and what industries demand. And that's why we started RVITM, a premier,
Bangalore based engineering college with a singular vision - to prepare students
for the world beyond classrooms. To this effect, we offer four undergraduate
programs and MCA that promote experiential learning through an ICT-enabled
curriculum and state-of-the-art infrastructure. We back this up with our holistic
approach to education that enables our students to be more than engineers - it
encourages them to be bold thinkers challenging the status quo in everything they
strive to do.        </AboutBlock>

        <AboutBlock
          title="MCA"
          side="right"
          imgSrc="/elephantright1.png"
        >
The Department of Master of Computer Applications was established in 2023 and
offers a postgraduate program in Master of Computer Applications (MCA),
affiliated with Visvesvaraya Technological University, Belagavi. With a current
intake of 120 students, the department is led by Dr. M Mrunalini, whose vast
experience, along with a team of highly qualified and experienced faculty, drives
the department toward excellence. The faculty, with an average experience of over
16 years, supported by state-of-the-art laboratories to meet the academic and
research needs of students. The department actively fosters student engagement
through its dedicated club and organizes various technical events to promote
holistic development. Notable initiatives include hands-on workshops, expert
lectures, and student-centric activities designed to prepare students for the
industry. These efforts provide a strong foundation and equip students with
essential skills to excel in their careers.        </AboutBlock>

      </div>
    </section>
  );
}
