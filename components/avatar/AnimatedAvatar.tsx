'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
  isThinking: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { outer: 44,  ring: 52  },
  md: { outer: 90,  ring: 108 },
  lg: { outer: 160, ring: 196 },
};

export function AnimatedAvatar({ isSpeaking, isThinking, size = 'lg' }: AnimatedAvatarProps) {
  const { outer, ring } = sizeMap[size];

  return (
    <div className="relative flex items-center justify-center" style={{ width: ring, height: ring }}>
      {/* Speaking pulse rings */}
      <AnimatePresence>
        {isSpeaking && [0, 0.45, 0.9].map((delay) => (
          <motion.div
            key={delay}
            className="absolute rounded-full border-2 border-brand-green/25"
            style={{ width: outer, height: outer }}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, delay, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Thinking spinner */}
      {isThinking && !isSpeaking && (
        <motion.div
          className="absolute rounded-full border-2 border-brand-green/15 border-t-brand-green"
          style={{ width: outer + 10, height: outer + 10 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Avatar disc */}
      <motion.div
        className={clsx(
          'relative rounded-full overflow-hidden flex items-center justify-center select-none',
          size !== 'sm' && 'shadow-avatar',
          size === 'sm' && 'shadow-card',
        )}
        style={{
          width: outer,
          height: outer,
          background: 'radial-gradient(circle at 35% 30%, #2C2418 0%, #181208 55%, #0E0A04 100%)',
          border: '2px solid rgba(196,154,60,0.30)',
        }}
        animate={
          isSpeaking
            ? { scale: [1, 1.025, 1, 1.015, 1] }
            : { scale: [1, 1.01, 1] }
        }
        transition={
          isSpeaking
            ? { duration: 0.4, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 4,   repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* Subtle gold sheen */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 25%, rgba(196,154,60,0.10) 0%, transparent 60%)',
          }}
        />

        {/* Monogram + wave */}
        {size !== 'sm' ? (
          <div className="relative z-10 flex flex-col items-center gap-1.5">
            <span
              className="font-bold tracking-widest text-shimmer select-none"
              style={{ fontSize: size === 'lg' ? 44 : 26 }}
            >
              H
            </span>
            {size === 'lg' && <SoundWave isSpeaking={isSpeaking} />}
          </div>
        ) : (
          <span className="text-[#C49A3C] font-bold text-xs" style={{ lineHeight: 1 }}>H</span>
        )}
      </motion.div>
    </div>
  );
}

function SoundWave({ isSpeaking }: { isSpeaking: boolean }) {
  const bars = [3, 5, 8, 5, 3, 7, 4, 6, 3, 5];
  return (
    <div className="flex items-center gap-[2px] h-4">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full bg-[#C49A3C]/60"
          animate={
            isSpeaking
              ? { height: [h, h * 2.8, h], opacity: [0.5, 1, 0.5] }
              : { height: 2, opacity: 0.2 }
          }
          transition={
            isSpeaking
              ? { duration: 0.45 + i * 0.03, delay: i * 0.05, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
          style={{ height: h }}
        />
      ))}
    </div>
  );
}
