'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
  isThinking: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { outer: 48, ring: 56 },
  md: { outer: 100, ring: 120 },
  lg: { outer: 180, ring: 220 },
};

export function AnimatedAvatar({
  isSpeaking,
  isThinking,
  size = 'lg',
}: AnimatedAvatarProps) {
  const { outer, ring } = sizeMap[size];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: ring, height: ring }}
    >
      {/* Ambient glow when speaking */}
      <AnimatePresence>
        {isSpeaking && (
          <>
            {[0, 0.4, 0.8].map((delay) => (
              <motion.div
                key={delay}
                className="absolute rounded-full border border-brand-gold/30"
                style={{ width: outer, height: outer }}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.8,
                  delay,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Thinking ring */}
      {isThinking && !isSpeaking && (
        <motion.div
          className="absolute rounded-full border-2 border-brand-gold/20 border-t-brand-gold"
          style={{ width: outer + 12, height: outer + 12 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Avatar circle */}
      <motion.div
        className={clsx(
          'relative rounded-full overflow-hidden flex items-center justify-center select-none',
          size === 'sm' && 'shadow-md',
          size !== 'sm' && 'shadow-[0_0_60px_rgba(196,154,60,0.15)]',
        )}
        style={{
          width: outer,
          height: outer,
          background:
            'radial-gradient(circle at 35% 35%, #2C2418 0%, #181208 60%, #0E0A04 100%)',
          border: '1px solid rgba(196,154,60,0.25)',
        }}
        animate={
          isSpeaking
            ? { scale: [1, 1.02, 1, 1.015, 1] }
            : { scale: [1, 1.012, 1] }
        }
        transition={
          isSpeaking
            ? { duration: 0.4, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* Gold gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 30% 25%, rgba(196,154,60,0.08) 0%, transparent 65%)',
          }}
        />

        {/* Monogram */}
        {size !== 'sm' ? (
          <div className="relative z-10 flex flex-col items-center gap-1">
            <span
              className="font-bold tracking-widest text-shimmer select-none"
              style={{ fontSize: size === 'lg' ? 48 : 28 }}
            >
              H
            </span>
            {size === 'lg' && (
              <SoundWave isSpeaking={isSpeaking} />
            )}
          </div>
        ) : (
          <span
            className="text-brand-gold font-bold text-sm"
            style={{ lineHeight: 1 }}
          >
            H
          </span>
        )}
      </motion.div>
    </div>
  );
}

function SoundWave({ isSpeaking }: { isSpeaking: boolean }) {
  const bars = [3, 5, 8, 5, 3, 7, 4, 6, 3, 5];

  return (
    <div className="flex items-center gap-[2px] h-5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full bg-brand-gold/60"
          animate={
            isSpeaking
              ? {
                  height: [h, h * 2.5, h],
                  opacity: [0.5, 1, 0.5],
                }
              : { height: 2, opacity: 0.25 }
          }
          transition={
            isSpeaking
              ? {
                  duration: 0.5 + Math.random() * 0.3,
                  delay: i * 0.05,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : { duration: 0.3 }
          }
          style={{ height: h }}
        />
      ))}
    </div>
  );
}
