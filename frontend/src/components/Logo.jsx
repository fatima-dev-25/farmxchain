import React from 'react';

const Logo = ({ className = "", size = "medium", showText = true }) => {

  /* -------- LOGO SIZE CONFIG -------- */
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      
      {/* -------- LOGO IMAGE -------- */}
      <img
        src="/logo.svg"
        alt="FarmXChain – Smart Agriculture Platform"
        className={`${sizeClasses[size]} object-contain`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/100x100?text=🌱";
        }}
      />

      {/* -------- OPTIONAL BRAND TEXT -------- */}
      {showText && (
        <span className="font-bold text-green-700 text-lg tracking-wide">
          FarmXChain
        </span>
      )}
    </div>
  );
};

export default Logo;
