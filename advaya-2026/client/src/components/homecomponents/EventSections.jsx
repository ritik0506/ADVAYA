"use client";

import SmallScroll from "./smallscroll";

const GAP_DESKTOP_HORIZONTAL = "4rem";
const GAP_DESKTOP_VERTICAL = "4rem";

export function DesktopEventSection({
  section,
  sIdx,
  videoRef,
  sectionRef,
  openScrollId,
  toggleScroll,
  setSelectedEvent,
}) {
  return (
    <section ref={sectionRef} className="min-h-[180vh] px-24 py-20">
      <div className="flex gap-12 items-start">
        {/* Left: Event Scrolls */}
        <div className="w-1/2">
          <h2 className="text-7xl font-serif italic text-white mb-20 mt-20 uppercase tracking-tighter leading-none">
            {section?.title}
          </h2>

          <div
            className="grid grid-cols-2"
            style={{ gap: `${GAP_DESKTOP_VERTICAL} ${GAP_DESKTOP_HORIZONTAL}` }}
          >
            {/* Added optional chaining ?. to prevent mapping over undefined */}
            {section?.events?.map((event, idx) => {
              const id = `${sIdx}-${idx}`;
              
              // Use mythologyName and actualName instead of name and desc
              return (
                <div key={id} className="transition-transform hover:scale-105 duration-500">
                  <SmallScroll
                    rodText={event?.mythologyName?.toLowerCase() || ""}
                    mythologyName={event?.mythologyName} 
                    actualName={event?.actualName}    
                    isOpen={openScrollId === id}
                    onToggle={() => toggleScroll(id)}
                    onSeeMore={() => setSelectedEvent(event)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Video */}
        <div className="w-1/2 sticky top-24 h-[75vh] flex items-center justify-center pointer-events-none">
          <video
            ref={videoRef}
            src={section?.video}
            muted
            playsInline
            preload="auto"
            className={`w-full object-contain mix-blend-screen transition-all duration-700 
              ${sIdx > 0 ? "h-[50vh] scale-90" : "h-full scale-125"}`}
          />
        </div>
      </div>
    </section>
  );
}

export function MobileEventSection({
  section,
  sIdx,
  videoRef,
  openScrollId,
  toggleScroll,
  setSelectedEvent,
}) {
  return (
    <div className="space-y-10 text-center">
      <div className="relative h-[45vh] flex items-center justify-center">
        <video
          ref={videoRef}
          src={section?.video}
          muted
          playsInline
          preload="auto"
          className={`w-full h-full object-contain mix-blend-screen ${
            sIdx > 0 ? "scale-75" : "scale-100"
          }`}
        />
      </div>
      <h2 className="text-4xl font-serif italic text-white uppercase tracking-tighter">
        {section?.title}
      </h2>
      <div className="flex flex-col items-center space-y-12">
        {section?.events?.map((event, idx) => {
          const id = `${sIdx}-${idx}`;
          return (
            <SmallScroll
              key={id}
              rodText={event?.mythologyName?.toLowerCase() || ""}
              mythologyName={event?.mythologyName} 
              actualName={event?.actualName}    
              isOpen={openScrollId === id}
              onToggle={() => toggleScroll(id)}
              onSeeMore={() => setSelectedEvent(event)}
            />
          );
        })}
      </div>
    </div>
  );
}