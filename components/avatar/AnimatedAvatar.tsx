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
          background: 'radial-gradient(circle at 38% 32%, #3A2C1A 0%, #1E1508 55%, #0E0A04 100%)',
          border: '2px solid rgba(196,154,60,0.35)',
        }}
        animate={
          isSpeaking
            ? { scale: [1, 1.025, 1, 1.015, 1] }
            : { scale: [1, 1.012, 1] }
        }
        transition={
          isSpeaking
            ? { duration: 0.4, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 4,   repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* Gold sheen */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 25%, rgba(196,154,60,0.12) 0%, transparent 60%)',
          }}
        />

        {/* Face SVG */}
        <div className="relative z-10 flex flex-col items-center gap-1.5">
          <FaceSVG size={size} isSpeaking={isSpeaking} />
          {size === 'lg' && <SoundWave isSpeaking={isSpeaking} />}
        </div>
      </motion.div>
    </div>
  );
}

function FaceSVG({ size, isSpeaking }: { size: 'sm' | 'md' | 'lg'; isSpeaking: boolean }) {
  const dim = size === 'lg' ? 80 : size === 'md' ? 44 : 22;

  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head shape */}
      <ellipse cx="40" cy="38" rx="26" ry="28" fill="#C49A3C" opacity="0.18" />

      {/* Hair */}
      <ellipse cx="40" cy="14" rx="24" ry="10" fill="#C49A3C" opacity="0.55" />
      <rect x="16" y="14" width="8" height="16" rx="4" fill="#C49A3C" opacity="0.55" />
      <rect x="56" y="14" width="8" height="16" rx="4" fill="#C49A3C" opacity="0.55" />

      {/* Face */}
      <ellipse cx="40" cy="40" rx="22" ry="24" fill="#D4A96A" />

      {/* Forehead shadow */}
      <ellipse cx="40" cy="24" rx="18" ry="8" fill="#C49A3C" opacity="0.2" />

      {/* Eyes */}
      <ellipse cx="31" cy="36" rx="4" ry="4.5" fill="#1A1208" />
      <ellipse cx="49" cy="36" rx="4" ry="4.5" fill="#1A1208" />
      {/* Eye shine */}
      <circle cx="33" cy="34.5" r="1.2" fill="white" opacity="0.7" />
      <circle cx="51" cy="34.5" r="1.2" fill="white" opacity="0.7" />

      {/* Eyebrows */}
      <path d="M26 30.5 Q31 28 36 30" stroke="#8B6030" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M44 30 Q49 28 54 30.5" stroke="#8B6030" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Nose */}
      <path d="M40 40 L37 47 Q40 49 43 47 Z" fill="#C49A3C" opacity="0.4" />

      {/* Mouth — open wider when speaking */}
      {isSpeaking ? (
        <>
          {/* Open mouth */}
          <ellipse cx="40" cy="53" rx="7" ry="4" fill="#7A3010" />
          <path d="M33 53 Q40 50 47 53" stroke="#C49A3C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <ellipse cx="40" cy="55" rx="5" ry="2.5" fill="#5A1A08" />
          {/* Teeth */}
          <rect x="35" y="51" width="10" height="3" rx="1.5" fill="white" opacity="0.85" />
        </>
      ) : (
        /* Closed smile */
        <path d="M33 52 Q40 58 47 52" stroke="#8B4020" strokeWidth="2" strokeLinecap="round" fill="none" />
      )}

      {/* Cheek blush */}
      <ellipse cx="26" cy="46" rx="5" ry="3" fill="#E88080" opacity="0.18" />
      <ellipse cx="54" cy="46" rx="5" ry="3" fill="#E88080" opacity="0.18" />

      {/* Collar / shirt hint */}
      <path d="M18 68 Q24 60 40 64 Q56 60 62 68" fill="#2D6A2D" opacity="0.7" />
      <path d="M36 64 L40 70 L44 64" fill="#1B4D1B" opacity="0.7" />
    </svg>
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
