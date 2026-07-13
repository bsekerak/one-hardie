const BRANDS = [
  { name: 'Hardie®',         color: '#003B8E', bg: '#EBF0F9' },
  { name: 'AZEK Exteriors®', color: '#2D6A2D', bg: '#EBF5EB' },
  { name: 'TimberTech®',     color: '#7A3B10', bg: '#F7EDE5' },
  { name: 'StruXure®',       color: '#4A2D7A', bg: '#F0EAFA' },
];

export function BrandBadges() {
  return (
    <div className="hidden sm:flex items-center gap-2">
      {BRANDS.map((b) => (
        <span
          key={b.name}
          className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
          style={{ color: b.color, background: b.bg }}
        >
          {b.name}
        </span>
      ))}
    </div>
  );
}
