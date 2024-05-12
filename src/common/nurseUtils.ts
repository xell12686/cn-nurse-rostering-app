import { Nurse, ShiftType } from "@/types";

export function selectNurseForShift(
  nurses: Nurse[],
  shift: ShiftType,
  day: number,
): Nurse | null {
  const suitableNurses = nurses.filter((nurse) => {
    if (shift === "Night" && nurse.totalNightShifts >= 5) {
      return false;
    }

    if (nurse.consecutiveWorkDays >= 5) {
      return false;
    }

    if (nurse.shifts[day]?.includes(shift)) {
      return false;
    }
    return true;
  });

  if (suitableNurses.length === 0) return null;

  suitableNurses.sort((a, b) => {
    const totalShiftsA = Object.values(a.shifts).reduce(
      (acc, shifts) => acc + shifts.length,
      0,
    );
    const totalShiftsB = Object.values(b.shifts).reduce(
      (acc, shifts) => acc + shifts.length,
      0,
    );
    return totalShiftsA - totalShiftsB;
  });

  return suitableNurses[0];
}

export function updateNurseSchedule(
  nurse: Nurse,
  shift: ShiftType,
  day: number,
): void {
  if (!nurse.shifts[day]) {
    nurse.shifts[day] = [];
  }
  nurse.shifts[day].push(shift);

  if (nurse.lastWorkDay === day - 1) {
    nurse.consecutiveWorkDays += 1;
  } else {
    nurse.consecutiveWorkDays = 1;
  }
  nurse.lastWorkDay = day;

  if (shift === "Night") {
    nurse.totalNightShifts += 1;
  }
}
