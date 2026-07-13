export function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Mark */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-bg font-bold text-sm flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #C49A3C 0%, #E8C56A 50%, #8B6914 100%)',
        }}
      >
        1H
      </div>
      {/* Wordmark */}
      <div>
        <span className="text-brand-text font-semibold tracking-tight leading-none">
          One Hardie
        </span>
        <p className="text-brand-faint text-[10px] tracking-widest uppercase leading-none mt-0.5">
          Exterior Concierge
        </p>
      </div>
    </div>
  );
}
