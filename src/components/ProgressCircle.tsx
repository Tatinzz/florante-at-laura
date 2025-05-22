import React from 'react';

interface ProgressCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  circleColor?: string;
  progressColor?: string;
  textColor?: string;
  showPercentage?: boolean;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage,
  size = 80,
  strokeWidth = 6,
  circleColor = '#2D3047',
  progressColor = '#D5A021',
  textColor = '#F7F3E8',
  showPercentage = true,
}) => {
  // Calculate the radius
  const radius = (size - strokeWidth) / 2;
  // Calculate the circumference
  const circumference = radius * 2 * Math.PI;
  // Calculate the dash offset
  const dashOffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={circleColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      
      {showPercentage && (
        <div 
          className="absolute flex items-center justify-center" 
          style={{ color: textColor }}
        >
          <span className="font-medium text-sm">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;