import React from 'react';

// ============================================================
// Circular Timer Component — PhysicsEdge Exam Engine
// ============================================================

interface CircularTimerProps {
  remainingMs: number;
  totalMs: number;
  size?: number;
  strokeWidth?: number;
}

export function CircularTimer({
  remainingMs,
  totalMs,
  size = 72,
  strokeWidth = 5,
}: CircularTimerProps) {
  const fraction = totalMs > 0 ? Math.max(0, Math.min(1, remainingMs / totalMs)) : 1;
  const remainingSeconds = Math.ceil(remainingMs / 1000);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - fraction);

  // Warning thresholds
  const isWarning = remainingSeconds <= 15 && remainingSeconds > 5;
  const isUrgent = remainingSeconds <= 5;

  let ringColor = '#06b6d4'; // cyan - calm focus
  let ringBg = '#0a1428';
  let textColor = 'text-cyan-300';
  let badgeColor = 'text-slate-400';

  if (isUrgent) {
    ringColor = '#f43f5e'; // rose-500
    ringBg = '#270c14';
    textColor = 'text-rose-400';
    badgeColor = 'text-rose-300';
  } else if (isWarning) {
    ringColor = '#f59e0b'; // amber-500
    ringBg = '#221508';
    textColor = 'text-amber-400';
    badgeColor = 'text-amber-300';
  }

  const center = size / 2;
  const fontSize = size < 60 ? 12 : 15;

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-300 ${
        isUrgent ? 'animate-pulse scale-105' : ''
      }`}
      style={{ width: size, height: size }}
      role="timer"
      aria-label={`${remainingSeconds} seconds remaining`}
      aria-live="off"
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill={ringBg}
          stroke="#1e293b"
          strokeWidth={strokeWidth}
        />
        {/* Animated countdown track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transition: 'stroke-dashoffset 0.25s linear, stroke 0.3s ease',
          }}
        />
      </svg>

      {/* Numerical countdown display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
        <span
          className={`font-mono font-bold tabular-nums transition-colors duration-300 leading-none ${textColor}`}
          style={{ fontSize }}
        >
          {remainingSeconds}
        </span>
        <span
          className={`font-mono uppercase text-[9px] tracking-wider mt-0.5 leading-none transition-colors duration-300 ${badgeColor}`}
        >
          sec
        </span>
      </div>
    </div>
  );
}
