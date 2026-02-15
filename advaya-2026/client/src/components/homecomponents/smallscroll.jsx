

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function SmallScroll({
  rodText = "Event",
  mythologyName = "Mythology Name",
  actualName = "Actual Name",
  isOpen = false,
  onToggle,
  onSeeMore,
}) {
  const paperRef = useRef(null);
  const bottomRodRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let tl = gsap.timeline();

    if (isOpen) {
      // Increased height slightly to accommodate the extra top padding
      tl.to(paperRef.current, { height: 210, duration: 0.9, ease: "power3.out" });
      tl.to(bottomRodRef.current, { y: 0, duration: 0.9, ease: "power3.out" }, "<");
      tl.to(contentRef.current, { opacity: 1, duration: 0.6 }, "<+0.2");
    } else {
      tl.to(paperRef.current, { height: 0, duration: 0.9, ease: "power3.in" });
      tl.to(bottomRodRef.current, { y: 0, duration: 0.9, ease: "power3.in" }, "<");
      tl.to(contentRef.current, { opacity: 0, duration: 0.4 }, "<");
    }

    return () => tl?.kill();
  }, [isOpen]);

  return (
    <div style={smallStyles.page}>
      <div style={smallStyles.scrollWrapper}>
        {/* Top Rod */}
        <div style={smallStyles.rodContainer} onClick={onToggle}>
          <img src="/assests/scrolltop1.png" style={smallStyles.rodImage} alt="" loading="lazy" />
          <span style={smallStyles.rodText}>{rodText}</span>
        </div>

        {/* Paper */}
        <div
          ref={paperRef}
          style={{
            ...smallStyles.paperContainer,
            width: `${smallStyles.PAPER_WIDTH}px`,
            marginTop: `${smallStyles.TOP_ROD_OVERLAP}px`,
          }}
        >
          <div style={smallStyles.paperTexture}>
            <div
              ref={contentRef}
              style={{
                opacity: 0,
                // MODIFIED: Changed margin to push content down from the top rod
                marginTop: "20px", 
              }}
            >
              <h2 style={smallStyles.mythName}>{mythologyName}</h2>
              <div style={smallStyles.divider} />
              <p style={smallStyles.actualNameText}>{actualName}</p>

              {isOpen && (
                <button style={smallStyles.moreBtn} onClick={onSeeMore}>
                  See More
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Rod */}
        <div
          ref={bottomRodRef}
          style={{
            ...smallStyles.rodContainer,
            transform: "rotate(180deg)",
            marginTop: `${smallStyles.BOTTOM_ROD_SEAL_OFFSET}px`,
          }}
          onClick={onToggle}
        >
          <img src="/assests/scrolltop1.png" style={smallStyles.rodImage} alt="" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

const smallStyles = {
  PAPER_WIDTH: 170,
  ROD_WIDTH: 480,
  TOP_ROD_OVERLAP: -3,
  BOTTOM_ROD_SEAL_OFFSET: -4,

  page: { display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "8px 0" },
  scrollWrapper: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "16px" },
  rodContainer: { width: "370px", height: "38px", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", zIndex: 10 },
  rodImage: { width: "100%", height: "100%", position: "absolute", filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.7))" },
rodText: {
  position: "relative",
  top: "-2px",   // 👈 move text up (adjust -1px to -4px as needed)
  color: "#000",
  fontFamily: "'Playfair Display', serif",
  fontWeight: 900,
  fontSize: "14px",
  letterSpacing: "2px",
  opacity: 1,
  pointerEvents: "none",
  textAlign: "center",
  width: "50%",
   textTransform: "uppercase",
  textShadow: "0 1px 2px rgba(0,0,0,0.5)",
},

  paperContainer: { height: "0px", overflow: "hidden", position: "relative", zIndex: 5, backgroundColor: "#070707", boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)" },
  
  // MODIFIED: Added more top padding to create spacing
  paperTexture: { width: "100%", minHeight: "400px", backgroundImage: "url('/assests/scrollpaper1.png')", backgroundSize: "100% auto", backgroundRepeat: "repeat-y", padding: "30px 12px 80px 12px", textAlign: "center", color: "#3b2a1a" },
  
  mythName: { fontFamily: "serif", fontSize: "1.1rem", fontWeight: "bold", margin: "0 0 4px 0", textTransform: "uppercase", lineHeight: 1.1 },
  actualNameText: { fontFamily: "serif", fontStyle: "italic", fontSize: "0.75rem", lineHeight: 1.2, opacity: 0.9 },
  
  divider: { height: "1px", width: "60%", background: "linear-gradient(90deg, transparent, #3b2a1a, transparent)", margin: "4px auto 8px auto" },
  moreBtn: { marginTop: "15px", padding: "4px 12px", background: "#3b2a1a", border: "none", color: "#f3cf7a", cursor: "pointer", fontFamily: "serif", fontSize: "0.7rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" },
};