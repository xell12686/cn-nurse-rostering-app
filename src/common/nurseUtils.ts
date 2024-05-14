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
    if (nurse.lastWorkDay === day) {
      return false;
    }
    return true;
  });

  // suitableNurses.sort((a, b) => {
  //   const shiftsA = a.shifts
  //     ? Object.keys(a.shifts).reduce(
  //         (acc, cur) => acc + a.shifts[cur].length,
  //         0,
  //       )
  //     : 0;
  //   const shiftsB = b.shifts
  //     ? Object.keys(b.shifts).reduce(
  //         (acc, cur) => acc + b.shifts[cur].length,
  //         0,
  //       )
  //     : 0;

  //   return shiftsA - shiftsB;
  // });

  console.log("suitableNurses: ", suitableNurses);

  return suitableNurses.length > 0 ? suitableNurses[0] : null;
}

export function updateNurseSchedule(
  nurse: Nurse,
  shift: ShiftType,
  day: number,
): void {
  const newShifts = { ...nurse.shifts };

  if (!newShifts[day]) {
    newShifts[day] = [];
  }
  newShifts[day].push(shift);

  nurse.shifts = newShifts;
  if (nurse.lastWorkDay === day - 1) {
    nurse.consecutiveWorkDays += 1;
  } else {
    nurse.consecutiveWorkDays = 1;
  }
  nurse.lastWorkDay = day;

  if (shift === "Night") {
    nurse.totalNightShifts = (nurse.totalNightShifts || 0) + 1;
  }

  nurse.hasShifts = true;
}
