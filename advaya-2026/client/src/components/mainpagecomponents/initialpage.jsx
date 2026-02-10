import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SecondVideo = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const finalContentRef = useRef(null);
  
  const [videoFailed, setVideoFailed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const hasPlayed = useRef(false);

  // 1. ASSET LOADING LOGIC
  useEffect(() => {
    let interval;
    if (isFinished && loadProgress < 100) {
      interval = setInterval(() => {
        setLoadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2; 
        });
      }, 30); 
    }
    return () => clearInterval(interval);
  }, [isFinished, loadProgress]);

  // 2. DELAYED REDIRECT
  useEffect(() => {
    if (loadProgress >= 100) {
      const timer = setTimeout(() => {
        gsap.to(finalContentRef.current, {
          opacity: 0,
          duration: 1.2,
          onComplete: () => navigate("/home")
        });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [loadProgress, navigate]);

  // 3. THE INSTANT TURNING LOGIC
  useGSAP(() => {
    // Video Setup
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.playbackRate = 4;
    }

    // This block triggers the INSTANT turn when the video ends
    if (isFinished) {
      // Immediate Fade-in of the content
      gsap.fromTo(finalContentRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1, ease: "power2.out" }
      );

      // START ROTATING IMMEDIATELY
      // Corner Chakras (Clockwise)
      gsap.to(".corner-chakra", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        immediateRender: true // Forces the animation to start the very first frame
      });

      // Middle/Center Chakra (Counter-Clockwise)
      gsap.to(".center-chakra", {
        rotation: -360,
        duration: 35,
        repeat: -1,
        ease: "none",
        immediateRender: true
      });

      // Subtle pulse to the glow
      gsap.to(".gold-glow", {
        scale: 1.1,
        opacity: 0.5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, { dependencies: [isFinished], scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-dvh overflow-hidden bg-black">
      {isFinished ? (
        <div ref={finalContentRef} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
          
          {/* Corner Chakras */}
          <img src="/chakra1.png" className="rotating-chakra corner-chakra absolute -top-20 -left-20 w-64 md:w-96 opacity-15 pointer-events-none" alt="" />
          <img src="/chakra1.png" className="rotating-chakra corner-chakra absolute -top-20 -right-20 w-64 md:w-96 opacity-15 pointer-events-none" alt="" />
          <img src="/chakra1.png" className="rotating-chakra corner-chakra absolute -bottom-20 -left-20 w-64 md:w-96 opacity-15 pointer-events-none" alt="" />
          <img src="/chakra1.png" className="rotating-chakra corner-chakra absolute -bottom-20 -right-20 w-64 md:w-96 opacity-15 pointer-events-none" alt="" />

          {/* Glowing Aura */}
          <div className="gold-glow absolute w-[70%] h-[70%] max-w-[600px] rounded-full opacity-30"
               style={{ background: "radial-gradient(circle, #d4af37 0%, transparent 70%)", filter: "blur(80px)" }} />

          {/* Logo & Loading */}
          <div className="relative z-10 flex flex-col items-center gap-10 w-[90%] max-w-[700px]">
            <img src="/logomain.png" className="w-full h-auto drop-shadow-[0_0_40px_rgba(212,175,55,0.3)]" alt="Logo" />
            
            <div className="flex flex-col items-center w-full min-h-[60px]">
              {loadProgress < 100 ? (
                <>
                  <span className="text-amber-500 font-serif tracking-[0.5em] text-[10px] uppercase mb-4 animate-pulse">
                    Synchronizing Assets {loadProgress}%
                  </span>
                  <div className="w-64 h-[1px] bg-amber-900/30 relative overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-amber-500 shadow-[0_0_15px_#d4af37] transition-all duration-300" 
                      style={{ width: `${loadProgress}%` }} 
                    />
                  </div>
                </>
              ) : (
                <span className="text-[#d4af37] font-serif tracking-[0.6em] text-[11px] uppercase animate-pulse drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
  The Gates are Opening
</span>
              )}
            </div>
          </div>

          {/* Center Background Chakra */}
          <img src="/chakra1.png" className="rotating-chakra center-chakra absolute w-[450px] md:w-[800px] opacity-10 pointer-events-none mix-blend-screen" alt="" />
        </div>
      ) : (
        <video
          ref={videoRef}
          onEnded={() => setIsFinished(true)}
          className="absolute inset-0 w-full h-full object-contain z-10 bg-black"
          src="/videos/clean_warrior1.webm"
          muted
          autoPlay
          playsInline
        />
      )}
    </section>
  );
};

export default SecondVideo;