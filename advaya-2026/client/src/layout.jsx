

import React from "react";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen">

      {/* ================= FIXED BACKGROUND ================= */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <img
          src="/background1.jpg"
          alt="Background"
          className="w-full h-full object-cover blur-[0px] opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" /> {/* optional overlay */}
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <main className="relative z-10">{children}</main>
    </div>
  );
}
