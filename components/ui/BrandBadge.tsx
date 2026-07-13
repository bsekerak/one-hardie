const BRANDS = [
  { name: 'Hardie®',         color: '#003B8E' },
  { name: 'AZEK Exteriors®', color: '#2D6A2D' },
  { name: 'TimberTech®',     color: '#8B4513' },
  { name: 'StruXure®',       color: '#5A3A8C' },
];

export function BrandBadges() {
  return (
    <div className="hidden sm:flex items-center gap-2">
      {BRANDS.map((b) => (
        <span
          key={b.name}
          className="text-[10px] font-medium px-2 py-1 rounded-full border"
          style={{
            color: b.color,
            borderColor: `${b.color}40`,
            background: `${b.color}12`,
          }}
        >
          {b.name}
        </span>
      ))}
    </div>
  );
}
