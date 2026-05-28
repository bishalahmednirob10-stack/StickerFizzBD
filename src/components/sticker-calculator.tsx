"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { STICKER_PRICE_PER_SQ_INCH, formatTaka } from "@/lib/products";

export function StickerCalculator() {
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(3);

  const total = useMemo(
    () => Math.max(width, 1) * Math.max(height, 1) * STICKER_PRICE_PER_SQ_INCH,
    [width, height],
  );

  return (
    <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-lg bg-[#ffce6b]">
          <Calculator size={18} />
        </span>
        <div>
          <h3 className="font-black">Sticker price calculator</h3>
          <p className="text-sm text-black/60">
            Tk {STICKER_PRICE_PER_SQ_INCH} per square inch
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm font-bold">
          Width
          <input
            min={1}
            max={24}
            type="number"
            value={width}
            onChange={(event) => setWidth(Number(event.target.value))}
            className="mt-2 h-11 w-full rounded-lg border border-black/10 px-3 outline-none focus:border-[#e63b2e]"
          />
        </label>
        <label className="text-sm font-bold">
          Height
          <input
            min={1}
            max={24}
            type="number"
            value={height}
            onChange={(event) => setHeight(Number(event.target.value))}
            className="mt-2 h-11 w-full rounded-lg border border-black/10 px-3 outline-none focus:border-[#e63b2e]"
          />
        </label>
      </div>
      <div className="mt-4 rounded-lg bg-[#161412] p-4 text-white">
        <p className="text-sm text-white/65">
          {width} x {height} x {STICKER_PRICE_PER_SQ_INCH}
        </p>
        <p className="text-3xl font-black">{formatTaka(total)}</p>
      </div>
    </div>
  );
}
