const AboutBlock = ({ title, children }) => (
  <div className="group">
    <h2 className="text-6xl md:text-8xl font-serif italic mb-10 text-white group-hover:text-[#f3cf7a] transition-all duration-700 uppercase tracking-tighter leading-none">
      {title}
    </h2>
    <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-[#f3cf7a] to-transparent mx-auto mb-10" />
    <p className="text-lg md:text-xl leading-relaxed text-gray-300 font-light text-justify md:text-center">
      <span className="text-[#f3cf7a]">{children}</span>
    </p>
  </div>
);

export default function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto text-center space-y-48 mb-60">
      <AboutBlock title="ABOUT - RVITM">
        At RV, we understand that there exists a vast gap between what universities teach and what industries demand. And that's why we started RVITM, a premier, Bangalore based engineering college with a singular vision - to prepare students for the world beyond classrooms. To this effect, we offer four undergraduate programs that promote experiential learning through an ICT-enabled curriculum and state-of-the-art infrastructure. We back this up with our holistic approach to education that enables our students to be more than engineers - it encourages them to be bold thinkers challenging the status quo in everything they strive to do.
      </AboutBlock>

      <AboutBlock title="ABOUT - MCA">
        The Department of Master of Computer Applications was established in 2023 and offers a postgraduate program in Master of Computer Applications (MCA), affiliated with Visvesvaraya Technological University, Belagavi. With a current intake of 120 students, the department is led by Dr. M: Mrunalini, whose vast experience, along with a team of highly qualified and experienced faculty, drives the department toward excellence. The faculty, with an average experience of over 16 years, is supported by state-of-the-art laboratories to meet the academic and research needs of students. The department actively fosters student engagement through its dedicated club and organizes various technical events to promote holistic development. Notable initiatives include hands-on workshops, expert lectures, and student-centric activities designed to prepare students for the industry. These efforts provide a strong foundation and equip students with essential skills to excel in their careers.
      </AboutBlock>
    </section>
  );
}