import { useEffect, useMemo, useState } from "react";
import { CONTENT, PHOTO_PATHS } from "./data/content";
import { formatLeft, getCurrentIndex, getNextSwitchDate } from "./utils/schedule";

const SWITCH = {
  START_DATE: "2026-02-15",
  SWITCH_HOUR: 7,
  SWITCH_MINUTE: 0,
  LENGTH: 33
};

export default function App() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 250);
    return () => clearInterval(t);
  }, []);

  const idx = useMemo(() => getCurrentIndex(now, SWITCH), [now]);
  const next = useMemo(() => getNextSwitchDate(now, SWITCH), [now]);
  const left = useMemo(() => formatLeft(next.getTime() - now.getTime()), [next, now]);

  const day = CONTENT[idx];
  const photo = PHOTO_PATHS[idx];

  return (
    <div
      className="min-h-screen w-full flex justify-center"
      style={{ background: "linear-gradient(180deg, #FFF1DA 0%, #FFEBC2 100%)" }}
    >
      <div className="w-full max-w-[390px] min-h-screen px-6 pt-3 pb-4 flex flex-col">

        <div>
          <div className="flex justify-center">
            <img src="/logo.svg" alt="june24" width={50} height={21} draggable={false} />
          </div>

          <div className="mt-44 flex justify-center">
            <div
              className="rounded-[18px] overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.25)]"
              style={{ width: 222, height: 199, transform: "rotate(12deg)" }}
            >
              <img src={photo} alt={`photo-${idx + 1}`} className="w-full h-full object-cover" draggable={false} />
            </div>
          </div>

          <div className="mx-auto mt-2 flex justify-start max-w-[222px]">
            <div className="w-[222px] text-start flex flex-col gap-[12px]">
              <div className="italic" style={{ fontSize: 15, fontWeight: 600, color: "#BB1E21" }}>
                {day.head}
              </div>

              <div className="whitespace-pre-line" style={{ fontSize: 17, fontWeight: 500, color: "#000" }}>
                {day.p}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto text-center flex flex-col items-center">
          <div className="italic" style={{ fontSize: 15, fontWeight: 300, color: "#000" }}>
            Приходи завтра :)
          </div>

          <div className="italic" style={{ fontSize: 15, fontWeight: 300, color: "rgba(0,0,0,0.34)" }}>
            встретимся через... {left}
          </div>
        </div>
      </div>
    </div>
  );
}