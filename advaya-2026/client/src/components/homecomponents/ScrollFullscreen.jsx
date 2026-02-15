

import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function FullEventScrollModalResponsive({
  isOpen,
  onClose,
  eventName,
  eventId,
  category,
  subheading,
  description,
  rules = [],
  registrationFee,
  teamSize,
  duration,
  registrationOpen,
  eventHeads = [],   // <-- add eventHeads prop
  prizes = {},       // <-- add prizes prop
}) {
  const paperRef = useRef(null);
  const contentRef = useRef(null);
  const contentInnerRef = useRef(null);
  const tlRef = useRef(null);
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile (debounced)
  useEffect(() => {
    let resizeTimer;
    const checkMobile = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => setIsMobile(window.innerWidth < 1024), 200);
    };
    // Initial check without debounce
    setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", checkMobile);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Animate open
  useEffect(() => {
    if (!isOpen || !paperRef.current || !contentInnerRef.current) return;

    tlRef.current?.kill();

    const ANIM_CONFIG = isMobile
      ? { extraPadding: 100, duration: 0.8 }
      : { extraPadding: 150, duration: 1.2 };

    const tl = gsap.timeline({ ease: "power3.inOut" });
    tlRef.current = tl;

    const targetHeight = contentInnerRef.current.scrollHeight + ANIM_CONFIG.extraPadding;

    tl.to(paperRef.current, { height: targetHeight, duration: ANIM_CONFIG.duration })
      .to(contentRef.current, { opacity: 1, duration: 0.4 }, "-=0.5");

    return () => tl.kill();
  }, [isOpen, isMobile, description, rules, teamSize, eventHeads, prizes]);

  // Close animation
  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose, ease: "power3.inOut" });
    tl.to(contentRef.current, { opacity: 0, duration: 0.3 })
      .to(paperRef.current, { height: 0, duration: 0.7 });
  };

  // Registration
  const handleRegisterClick = () => {
    if (!registrationOpen) return;
    onClose();
    navigate(`/register/${eventId}`);
  };

  if (!isOpen) return null;

  const CONFIG = isMobile
    ? {
        rodWidth: 500,
        paperWidth: 280,
        rodHeight: 55,
        padding: "30px 20px",
        titleSize: "1.6rem",
        overlap: -10,
      }
    : {
        rodWidth: 800,
        paperWidth: 450,
        rodHeight: 90,
        padding: "25px 60px",
        titleSize: "2.8rem",
        overlap: -25,
      };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md overflow-y-auto scroll-smooth px-4 py-20">

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="fixed top-6 right-6 text-5xl text-[#f3cf7a] hover:scale-110 transition-transform z-[10002] leading-none"
      >
        ×
      </button>

      <div className="relative flex flex-col items-center min-h-full w-full">

        {/* Top Rod */}
        <div
          style={{ width: CONFIG.rodWidth, height: CONFIG.rodHeight }}
          className="relative z-30 flex items-center justify-center"
        >
          <img
            src="/assests/scrolltop1.png"
            className="absolute w-full h-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]"
            alt="Scroll Rod Top"
            loading="lazy"
          />
          <span className="relative z-10 font-serif font-black text-[10px] md:text-[14px] tracking-[0.3em] text-black uppercase text-center">
            {eventName}
          </span>
        </div>

        {/* Scroll Paper */}
        <div
          ref={paperRef}
          style={{
            width: CONFIG.paperWidth,
            marginTop: CONFIG.overlap,
            height: 0,
            overflow: "hidden",
          }}
          className="relative z-10 shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
        >
          <div
            style={{
              backgroundImage: "url('/assests/scrollpaper1.png')",
              backgroundRepeat: "repeat-y",
              backgroundSize: "100% auto",
              padding: CONFIG.padding,
              filter: !registrationOpen ? "grayscale(0.4) contrast(1.1)" : "none",
            }}
            className="w-full min-h-full"
          >
            <div ref={contentRef} style={{ opacity: 0 }}>
              <div ref={contentInnerRef} className="flex flex-col text-[#3b2a1a]">

                {/* Header */}
                <div className="text-center mb-8">
                  <h2 style={{ fontSize: CONFIG.titleSize }} className="font-serif font-bold leading-tight mb-2 uppercase tracking-tighter italic">
                    {eventName}
                  </h2>
                  <p className="text-[11px] md:text-xs font-bold opacity-80 italic tracking-[0.2em] uppercase">{subheading}</p>
                  <div className="h-[2px] w-4/5 bg-gradient-to-r from-transparent via-[#3b2a1a]/40 to-transparent mx-auto mt-8" />
                </div>

                {/* Team & Duration */}
                <div className="grid grid-cols-2 gap-4 py-6 mb-10 border-y border-[#3b2a1a]/15 bg-[#3b2a1a]/5 text-center">
                  <div className="flex flex-col justify-center">
                    <p className="text-[8px] uppercase tracking-widest opacity-60 mb-1 font-black">Warriors</p>
                    <p className="font-bold text-[13px] md:text-[15px] uppercase">
                      {!teamSize ? "TBA" :
                        teamSize.min === teamSize.max
                          ? `${teamSize.max} ${teamSize.max === 1 ? 'Soul' : 'Members'}`
                          : `${teamSize.min} - ${teamSize.max} Members`}
                    </p>
                  </div>
                  <div className="border-l border-[#3b2a1a]/20 flex flex-col justify-center">
                    <p className="text-[8px] uppercase tracking-widest opacity-60 mb-1 font-black">Ritual Time</p>
                    <p className="font-bold text-[13px] md:text-[15px] uppercase">{duration || "TBA"}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-12 px-2">
                  <p className="text-center italic leading-relaxed text-[16px] md:text-[18px] font-medium opacity-90">
                    "{description}"
                  </p>
                </div>

                {/* Event Heads */}
                {eventHeads.length > 0 && (
                  <div className="mb-12">
                    <h4 className="font-black text-[11px] uppercase tracking-[0.5em] mb-4 text-center underline underline-offset-4 decoration-[#3b2a1a]/30">
                      Keepers of the Arena
                    </h4>
                    <ul className="space-y-2 text-center">
                      {eventHeads.map((head, idx) => (
                        <li key={idx} className="italic font-medium text-[14px] md:text-[16px]">
                          {head.name} — <span className="font-bold">{head.phone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Rules */}
                <div className="border-t border-[#3b2a1a]/20 pt-10">
                  <h4 className="font-black text-[11px] uppercase tracking-[0.5em] mb-8 text-center underline underline-offset-8 decoration-[#3b2a1a]/30">
                    Laws of the Battlefield
                  </h4>
                  <ul className="space-y-6">
                    {rules.map((rule, idx) => (
                      <li key={idx} className="flex gap-4 text-[14px] md:text-[16px] italic items-start leading-snug">
                        <span className="font-bold opacity-30 text-xs mt-1">0{idx + 1}</span>
                        <span className="font-medium">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prizes */}
                {prizes && (prizes.first || prizes.second) && (
                  <div className="mt-14 pt-10 border-t-2 border-double border-[#3b2a1a]/20">
                    <h4 className="font-black text-[11px] uppercase tracking-[0.5em] mb-4 text-center underline underline-offset-4 decoration-[#3b2a1a]/30">
                      Spoils of War
                    </h4>
                    <div className="flex justify-around text-center text-[#3b2a1a]/90 font-bold text-[14px] md:text-[16px]">
                      {prizes.first && <div>🥇 ₹{prizes.first}</div>}
                      {prizes.second && <div>🥈 ₹{prizes.second}</div>}
                    </div>
                  </div>
                )}

                {/* Registration */}
                <div className="mt-14 pt-10 border-t-2 border-double border-[#3b2a1a]/20">
                  <div className="flex justify-between items-center mb-8 px-2">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Entry Tribute</span>
                    <span className="text-2xl font-serif font-black">₹{registrationFee}</span>
                  </div>

                  {registrationOpen ? (
                    <button
                      onClick={handleRegisterClick}
                      className="group relative w-full py-5 bg-[#3b2a1a] text-[#f3cf7a] font-black text-[12px] uppercase tracking-[0.5em] overflow-hidden transition-all duration-500 hover:bg-black hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] active:scale-95"
                    >
                      <span className="relative z-10">Enlist for Battle</span>
                    </button>
                  ) : (
                    <div className="w-full py-5 bg-[#3b2a1a]/10 border border-[#3b2a1a]/20 text-[#3b2a1a]/40 font-black text-[12px] uppercase tracking-[0.4em] text-center italic cursor-not-allowed">
                      Battleground Sealed
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rod */}
        <div
          style={{
            width: CONFIG.rodWidth,
            height: CONFIG.rodHeight,
            marginTop: CONFIG.overlap,
            transform: "rotate(180deg)"
          }}
          className="relative z-20 flex items-center justify-center"
        >
          <img
            src="/assests/scrolltop1.png"
            className="absolute w-full h-full object-contain drop-shadow-[-20px_0_20px_rgba(0,0,0,0.8)]"
            alt="Scroll Rod Bottom"
            loading="lazy"
          />
        </div>

      </div>
    </div>
  );
}
