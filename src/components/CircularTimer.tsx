
// ============================================================
// Circular Timer Component
// ============================================================

interface CircularTimerProps {
  remainingMs: number;
  totalMs: number;
  size?: number;
  strokeWidth?: number;
}

export function CircularTimer({ remainingMs, totalMs, size = 80, strokeWidth = 6 }: CircularTimerProps) {
  const fraction = totalMs > 0 ? Math.max(0, Math.min(1, remainingMs / totalMs)) : 1;
  const remainingSeconds = Math.ceil(remainingMs / 1000);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - fraction);

  // Color states
  const isWarning = remainingSeconds <= 15 && remainingSeconds > 5;
  const isUrgent = remainingSeconds <= 5;

  let ringColor = '#6366f1'; // indigo - calm
  let textColor = 'text-slate-300';
  let bgColor = '#1e3a6e';

  if (isUrgent) {
    ringColor = '#ef4444'; // red
    textColor = 'text-red-400';
    bgColor = '#3f1919';
  } else if (isWarning) {
    ringColor = '#f59e0b'; // amber
    textColor = 'text-amber-400';
    bgColor = '#2d2010';
  }

  const center = size / 2;
  const fontSize = size < 60 ? 11 : 14;

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-colors duration-500 ${isUrgent ? 'animate-pulse' : ''}`}
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
          fill={bgColor}
          stroke="#1e293b"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
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
          style={{ transition: 'stroke-dashoffset 0.25s linear, stroke 0.5s ease' }}
        />
      </svg>
      {/* Time text */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center`}>
        <span
          className={`font-bold tabular-nums transition-colors duration-500 ${textColor}`}
          style={{ fontSize, lineHeight: 1 }}
        >
          {remainingSeconds}
        </span>
        <span className="text-slate-500 mt-0.5" style={{ fontSize: fontSize * 0.6 }}>sec</span>
      </div>
    </div>
  );
}
