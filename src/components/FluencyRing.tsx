'use client';

import { motion } from 'framer-motion';
import { useSimulationStore, RingState } from '@/hooks/useSimulationStore';

interface FluencyRingProps {
  size?: number;
  strokeWidth?: number;
}

export function FluencyRing({ size = 47, strokeWidth = 2 }: FluencyRingProps) {
  const { ringState, fluencyScore } = useSimulationStore();

  // Calculate progress percentage (assuming max score is 1000 or something)
  const progressPercent = Math.min((fluencyScore / 1000) * 100, 100);
  const circumference = 2 * Math.PI * (size / 2 - strokeWidth / 2);
  const strokeDasharray = `${(progressPercent / 100) * circumference} ${circumference}`;

  const getRingVariants = (state: RingState) => {
    switch (state) {
      case 'inactive':
        return {
          scale: 1,
          opacity: 0.3,
          stroke: '#E7E5E4', // muted color
        };
      case 'staged':
        return {
          scale: 1.1,
          opacity: 1,
          stroke: '#22C55E', // green glow
          filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))',
        };
      case 'update':
        return {
          scale: [1, 1.2, 1],
          opacity: [1, 0.8, 1],
          stroke: '#22C55E',
          filter: [
            'drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))',
            'drop-shadow(0 0 16px rgba(34, 197, 94, 0.8))',
            'drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))'
          ],
          transition: {
            duration: 0.6,
            repeat: 2,
            ease: 'easeInOut',
          },
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative">
      {/* Base ring */}
      <svg
        className="absolute inset-0"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth / 2}
          fill="none"
          stroke="#E7E5E4"
          strokeWidth={strokeWidth}
          opacity={0.2}
        />
      </svg>

      {/* Animated progress ring */}
      <motion.svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        initial="inactive"
        animate={getRingVariants(ringState)}
      >
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth / 2}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          initial={{ stroke: '#E7E5E4' }}
          animate={{
            stroke: ringState === 'inactive' ? '#E7E5E4' : '#22C55E',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.svg>

      {/* Avatar inside */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          width: size - strokeWidth * 2,
          height: size - strokeWidth * 2,
          margin: strokeWidth,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">U</span>
        </div>
      </div>

      {/* Percentage label below */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
        <span className="text-xs font-medium text-[#0C0A09]">
          {Math.round(progressPercent)}%
        </span>
      </div>
    </div>
  );
}