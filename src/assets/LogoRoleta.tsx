import React from "react";

const LogoRoleta = ({ width = 512, height = 512, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      height={height}
      className={className}
    >
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1b1f" />
          <stop offset="100%" stopColor="#08080a" />
        </linearGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD676" />
          <stop offset="25%" stopColor="#E4A836" />
          <stop offset="50%" stopColor="#FFF0A8" />
          <stop offset="75%" stopColor="#B37E1C" />
          <stop offset="100%" stopColor="#FCD676" />
        </linearGradient>
        <linearGradient id="gold-wheel" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCD676" />
          <stop offset="50%" stopColor="#B37E1C" />
          <stop offset="100%" stopColor="#FFF0A8" />
        </linearGradient>
        <radialGradient id="gold-radial" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF0A8" />
          <stop offset="40%" stopColor="#E4A836" />
          <stop offset="100%" stopColor="#8A5A19" />
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.8" />
        </filter>
        <mask id="reel-mask">
          <circle cx="240" cy="276" r="140" fill="white" />
          <circle cx="240" cy="276" r="26" fill="black" />
          <circle cx="268" cy="248" r="8" fill="black" />
          <circle cx="311.3" cy="252.8" r="32" fill="black" />
          <circle cx="284.1" cy="336.7" r="32" fill="black" />
          <circle cx="195.9" cy="336.7" r="32" fill="black" />
          <circle cx="168.7" cy="252.8" r="32" fill="black" />
          <circle cx="240.0" cy="201.0" r="32" fill="black" />
        </mask>
      </defs>
      <rect width="512" height="512" rx="100" fill="url(#bg)" />
      <circle cx="256" cy="276" r="170" fill="#111111" />
      <path d="M 256 276 L 403.2 191.0 A 170 170 0 0 1 426.0 276.0 Z" fill="#6b1b24" />
      <path d="M 256 276 L 426.0 276.0 A 170 170 0 0 1 403.2 361.0 Z" fill="#6b1b24" />
      <path d="M 256 276 L 403.2 361.0 A 170 170 0 0 1 341.0 423.2 Z" fill="#6b1b24" />
      <line x1="256" y1="276" x2="426.0" y2="276.0" stroke="url(#gold)" strokeWidth="6" />
      <line x1="256" y1="276" x2="403.2" y2="361.0" stroke="url(#gold)" strokeWidth="6" />
      <line x1="256" y1="276" x2="341.0" y2="423.2" stroke="url(#gold)" strokeWidth="6" />
      <line x1="256" y1="276" x2="256.0" y2="446.0" stroke="url(#gold)" strokeWidth="6" />
      <line x1="256" y1="276" x2="171.0" y2="423.2" stroke="url(#gold)" strokeWidth="6" />
      <line x1="256" y1="276" x2="108.8" y2="361.0" stroke="url(#gold)" strokeWidth="6" />
      <line x1="256" y1="276" x2="86.0" y2="276.0" stroke="url(#gold)" strokeWidth="6" />
      <line x1="256" y1="276" x2="108.8" y2="191.0" stroke="url(#gold)" strokeWidth="6" />
      <line x1="256" y1="276" x2="171.0" y2="128.8" stroke="url(#gold)" strokeWidth="6" />
      <line x1="256" y1="276" x2="256.0" y2="106.0" stroke="url(#gold)" strokeWidth="6" />
      <line x1="256" y1="276" x2="341.0" y2="128.8" stroke="url(#gold)" strokeWidth="6" />
      <line x1="256" y1="276" x2="403.2" y2="191.0" stroke="url(#gold)" strokeWidth="6" />
      <circle cx="256" cy="276" r="170" fill="none" stroke="url(#gold-wheel)" strokeWidth="14" />
      <circle cx="256" cy="276" r="163" fill="none" stroke="#FFF0A8" strokeWidth="2" opacity="0.5" />
      <g filter="url(#shadow)">
        <circle cx="240" cy="276" r="140" fill="#111111" />
        <circle cx="240" cy="276" r="140" fill="url(#gold-radial)" mask="url(#reel-mask)" />
        <circle cx="240" cy="276" r="138" fill="none" stroke="#FFF0A8" strokeWidth="2" opacity="0.6" mask="url(#reel-mask)" />
      </g>
      <g filter="url(#shadow)">
        <path d="M 232 70 A 24 24 0 0 1 280 70 L 262 150 Q 256 158 250 150 Z" fill="url(#gold)" />
        <circle cx="256" cy="70" r="24" fill="url(#gold)" />
        <circle cx="256" cy="70" r="7" fill="#111111" />
        <line x1="256" y1="95" x2="256" y2="135" stroke="#8A5A19" strokeWidth="3" strokeLinecap="round" />
      </g>
      <path d="M 400 94 Q 400 110 416 110 Q 400 110 400 126 Q 400 110 384 110 Q 400 110 400 94 Z" fill="#FFE9A6" />
      <path d="M 455 165 Q 455 175 465 175 Q 455 175 455 185 Q 455 175 445 175 Q 455 175 455 165 Z" fill="#FFE9A6" />
      <path d="M 430 408 Q 430 420 442 420 Q 430 420 430 432 Q 430 420 418 420 Q 430 420 430 408 Z" fill="#FFE9A6" />
    </svg>
  );
};

export default LogoRoleta;