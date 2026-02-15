
import React from "react";

const ImageBackground = ({ blurAmount = "blur-xl" }) => {
  return (
    <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden pointer-events-none">
      <img
        src="background.jpg"
        alt="Background"
        className={`w-full h-full object-cover ${blurAmount} opacity-60`}
      />
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
};

export default ImageBackground;
