'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
  isThinking: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Photorealistic professional woman — AI-generated portrait (no real person)
// Swap AVATAR_URL to any publicly hosted square headshot to update the look.
const AVATAR_URL =
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces&auto=format&q=80';

const sizeMap = {
  sm: { px: 44,  ring: 56  },
  md: { px: 96,  ring: 120 },
  lg: { px: 180, ring: 220 },
};

export function AnimatedAvatar({ isSpeaking, isThinking, size = 'lg' }: AnimatedAvatarProps) {
  const { px, ring } = sizeMap[size];

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: ring, height: ring }}
    >
      {/* Gold ambient glow when speaking */}
      <AnimatePresence>
        {isSpeaking && [0, 0.5, 1].map((delay) => (
          <motion.div
            key={delay}
            className="absolute rounded-full"
            style={{
              width: px,
              height: px,
              border: '2px solid rgba(196,154,60,0.4)',
            }}
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 2.1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, delay, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Thinking spinner */}
      {isThinking && !isSpeaking && (
        <motion.div
          className="absolute rounded-full border-2 border-[#C49A3C]/20 border-t-[#C49A3C]"
          style={{ width: px + 12, height: px + 12 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Outer gold ring */}
      <motion.div
        className="relative rounded-full overflow-hidden"
        style={{
          width: px,
          height: px,
          padding: size === 'sm' ? 2 : 3,
          background: 'linear-gradient(135deg, #C49A3C, #E8C56A, #8B6914)',
          boxShadow: size !== 'sm'
            ? '0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(196,154,60,0.3)'
            : undefined,
        }}
        animate={
          isSpeaking
            ? { scale: [1, 1.025, 1, 1.018, 1] }
            : { scale: [1, 1.01, 1] }
        }
        transition={
          isSpeaking
            ? { duration: 0.45, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* Photo circle */}
        <div className="w-full h-full rounded-full overflow-hidden relative">
          <Image
            src={AVATAR_URL}
            alt="Hardie, One Hardie Exterior Concierge"
            fill
            className="object-cover object-top"
            sizes={`${px}px`}
            priority={size === 'lg'}
          />
          {/* Subtle speaking overlay pulse */}
          <AnimatePresence>
            {isSpeaking && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(196,154,60,0.08)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Sound wave bar — below avatar, large size only */}
      {size === 'lg' && (
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
          <SoundWave isSpeaking={isSpeaking} />
        </div>
      )}
    </div>
  );
}

function SoundWave({ isSpeaking }: { isSpeaking: boolean }) {
  const bars = [3, 5, 9, 6, 3, 8, 4, 7, 3, 6];
  return (
    <div className="flex items-center gap-[3px] h-5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[2.5px] rounded-full bg-[#C49A3C]"
          animate={
            isSpeaking
              ? { height: [h, h * 3, h], opacity: [0.5, 1, 0.5] }
              : { height: 2, opacity: 0.2 }
          }
          transition={
            isSpeaking
              ? { duration: 0.4 + i * 0.025, delay: i * 0.04, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.4 }
          }
          style={{ height: h }}
        />
      ))}
    </div>
  );
}
