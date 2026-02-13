export type ScheduleConfig = {
  START_DATE: string;
  SWITCH_HOUR: number;
  SWITCH_MINUTE: number;
  LENGTH: number;
};

function startOfDayLocal(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

function getFirstSwitchAfterStart(startDate: Date, hour: number, minute: number) {
  const base = startOfDayLocal(startDate);
  const first = new Date(base.getFullYear(), base.getMonth(), base.getDate(), hour, minute, 0, 0);
  if (startDate.getTime() > first.getTime()) first.setDate(first.getDate() + 1);
  return first;
}

export function getCurrentIndex(now: Date, cfg: ScheduleConfig) {
  const start = new Date(cfg.START_DATE + "T00:00:00");
  const firstSwitch = getFirstSwitchAfterStart(start, cfg.SWITCH_HOUR, cfg.SWITCH_MINUTE);
  if (now.getTime() < firstSwitch.getTime()) return 0;
  const msPerDay = 86400000;
  const daysPassed = Math.floor((now.getTime() - firstSwitch.getTime()) / msPerDay) + 1;
  return daysPassed % cfg.LENGTH;
}

export function getNextSwitchDate(now: Date, cfg: ScheduleConfig) {
  const start = new Date(cfg.START_DATE + "T00:00:00");
  const firstSwitch = getFirstSwitchAfterStart(start, cfg.SWITCH_HOUR, cfg.SWITCH_MINUTE);
  if (now.getTime() < firstSwitch.getTime()) return firstSwitch;
  const msPerDay = 86400000;
  const daysSinceFirst = Math.floor((now.getTime() - firstSwitch.getTime()) / msPerDay);
  return new Date(firstSwitch.getTime() + (daysSinceFirst + 1) * msPerDay);
}

export function formatLeft(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}