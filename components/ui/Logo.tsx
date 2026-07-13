export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #2D6A2D 0%, #3A7A3A 100%)' }}
      >
        1H
      </div>
      <div className="leading-none">
        <span className="text-brand-text font-semibold tracking-tight text-sm">
          One Hardie
        </span>
        <p className="text-brand-faint text-[10px] tracking-widest uppercase mt-0.5">
          Exterior Concierge
        </p>
      </div>
    </div>
  );
}
