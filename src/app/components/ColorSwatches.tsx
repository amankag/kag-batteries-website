import type { Product } from "@/data/products";

function Dot({ hex, name }: { hex: string; name: string }) {
  return (
    <span
      title={name}
      aria-label={name}
      style={{ backgroundColor: hex }}
      className="h-3.5 w-3.5 rounded-full border-2 border-slate-300"
    />
  );
}

export default function ColorSwatches({ colors }: { colors?: Product["colors"] }) {
  if (!colors || colors.length === 0) return null;

  const body = colors.filter((c) => c.type !== "trim");
  const trim = colors.filter((c) => c.type === "trim");

  return (
    <div className="flex flex-col gap-1">
      {body.length > 0 && (
        <div className="flex items-center gap-1.5">
          {body.map((c) => (
            <Dot key={c.name} hex={c.hex} name={c.name} />
          ))}
        </div>
      )}
      {trim.length > 0 && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-400">Ring/bezel:</span>
          {trim.map((c) => (
            <Dot key={c.name} hex={c.hex} name={c.name} />
          ))}
        </div>
      )}
    </div>
  );
}
