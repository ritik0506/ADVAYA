"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ================= CONFIG ================= */
const DESKTOP = {
  ROD_WIDTH: 510,
  PAPER_WIDTH: 260,
  PREVIEW_HEIGHT: 350,
  FULL_HEIGHT: 600,
};

const MOBILE = {
  ROD_WIDTH: 300,
  PAPER_WIDTH: 190,
  PREVIEW_HEIGHT: 180,
  FULL_HEIGHT: 360,
};

const TOP_ROD_OVERLAP = -3;
const BOTTOM_ROD_SEAL_OFFSET = -4;
/* ========================================= */

export default function Scroll({
  rodText,
  title,
  description,
  extraContentText,
  unrollButtonText = "Unroll Further",
  sealButtonText = "Seal Decree",
}) {
  const [stage, setStage] = useState(0); // 0 closed, 1 preview, 2 full
  const [isMobile, setIsMobile] = useState(false);

  const paperRef = useRef(null);
  const contentRef = useRef(null);
  const bottomRodRef = useRef(null);
  const tlRef = useRef(null);

  /* ---------- DEVICE CHECK ---------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const CFG = isMobile ? MOBILE : DESKTOP;

  /* ---------- ANIMATION ---------- */
  useEffect(() => {
    if (!paperRef.current || !contentRef.current) return;

    tlRef.current?.kill();

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setTimeout(() => ScrollTrigger.refresh(true), 100);
      },
    });

    tlRef.current = tl;

    if (stage === 1) {
      tl.to(paperRef.current, {
        height: CFG.PREVIEW_HEIGHT,
        duration: 0.9,
      }).to(
        contentRef.current,
        { opacity: 1, duration: 0.4 },
        "-=0.3"
      );
    }

    if (stage === 2) {
      tl.to(paperRef.current, {
        height: CFG.FULL_HEIGHT,
        duration: 0.9,
      });
    }

    if (stage === 0) {
      tl.to(contentRef.current, {
        opacity: 0,
        duration: 0.3,
      }).to(paperRef.current, {
        height: 0,
        duration: 0.8,
      });
    }

    return () => tl.kill();
  }, [stage, isMobile]);

  /* ---------- RENDER ---------- */
  return (
    <div className="w-full flex justify-center py-6">
      <div className="flex flex-col items-center relative">

        {/* TOP ROD */}
        <div
          style={{
            ...styles.rodContainer,
            width: CFG.ROD_WIDTH,
          }}
          onClick={() => setStage(stage === 0 ? 1 : 0)}
        >
          <img src="/assests/scrolltop1.png" style={styles.rodImage} alt="" />
          <span style={styles.rodText}>{rodText}</span>
        </div>

        {/* PAPER */}
        <div
          ref={paperRef}
          style={{
            ...styles.paperContainer,
            width: CFG.PAPER_WIDTH,
            marginTop: TOP_ROD_OVERLAP,
            height: 0,
          }}
        >
          <div style={styles.paperTexture}>
            <div ref={contentRef} style={{ opacity: 0 }}>
              <h2 style={styles.title}>{title}</h2>
              <div style={styles.divider} />
              <p style={styles.description}>{description}</p>

              {stage === 1 && (
                <button
                  style={styles.moreBtn}
                  onClick={() => setStage(2)}
                >
                  {unrollButtonText}
                </button>
              )}

              {stage === 2 && (
                <div style={styles.extraContent}>
                  <p>{extraContentText}</p>
                  <button
                    style={styles.moreBtn}
                    onClick={() => setStage(0)}
                  >
                    {sealButtonText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM ROD */}
        <div
          ref={bottomRodRef}
          style={{
            ...styles.rodContainer,
            width: CFG.ROD_WIDTH,
            transform: "rotate(180deg)",
            marginTop: BOTTOM_ROD_SEAL_OFFSET,
          }}
          onClick={() => setStage(stage === 0 ? 1 : 0)}
        >
          <img src="/assests/scrolltop1.png" style={styles.rodImage} alt="" />
        </div>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  rodContainer: {
    height: "42px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  rodImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.7))",
  },
  rodText: {
    position: "relative",
    color: "#000",
    fontFamily: "serif",
    fontWeight: 800,
    fontSize: "11px",
    letterSpacing: "4px",
    pointerEvents: "none",
  },
  paperContainer: {
    overflow: "hidden",
    backgroundColor: "#e2d192",
    boxShadow:
      "0 12px 30px rgba(0,0,0,0.6), inset 0 0 20px rgba(0,0,0,0.4)",
  },
  paperTexture: {
    width: "100%",
    backgroundImage: "url('/assests/scrollpaper1.png')",
    backgroundRepeat: "repeat-y",
    backgroundSize: "100% auto",
    padding: "36px 14px",
    textAlign: "center",
    color: "#3b2a1a",
  },
  title: {
    fontSize: "1.2rem",
    fontFamily: "serif",
    marginBottom: "8px",
    textTransform: "uppercase",
  },
  divider: {
    height: "1px",
    width: "70%",
    background:
      "linear-gradient(90deg, transparent, #3b2a1a, transparent)",
    margin: "0 auto 14px",
  },
  description: {
    fontStyle: "italic",
    fontSize: "0.85rem",
    lineHeight: "1.35",
  },
  moreBtn: {
    marginTop: "14px",
    padding: "6px 14px",
    border: "1px solid #3b2a1a",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "serif",
    fontSize: "0.75rem",
  },
  extraContent: {
    marginTop: "20px",
    borderTop: "1px dashed rgba(59,42,26,0.3)",
    paddingTop: "14px",
    fontSize: "0.8rem",
  },
};
