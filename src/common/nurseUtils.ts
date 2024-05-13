import { Nurse, ShiftType } from "@/types";

export function selectNurseForShift(
  nurses: Nurse[],
  shift: ShiftType,
  day: number,
): Nurse | null {
  const suitableNurses = nurses.filter((nurse) => {
    // Check if the nurse has reached the limit of night shifts if the shift is a night shift
    if (shift === "Night" && nurse.totalNightShifts >= 5) {
      return false;
    }
    // Check if the nurse has worked more than 5 consecutive days
    if (nurse.consecutiveWorkDays >= 5) {
      return false;
    }
    // Check if the nurse has already worked today
    if (nurse.lastWorkDay === day) {
      return false;
    }
    return true;
  });

  // Sort by least number of total shifts worked
  suitableNurses.sort((a, b) => {
    // Ensure 'shifts' is initialized and then calculate total shifts
    const shiftsA = a.shifts
      ? Object.keys(a.shifts).reduce(
          (acc, cur) => acc + a.shifts[cur].length,
          0,
        )
      : 0;
    const shiftsB = b.shifts
      ? Object.keys(b.shifts).reduce(
          (acc, cur) => acc + b.shifts[cur].length,
          0,
        )
      : 0;

    return shiftsA - shiftsB;
  });

  // Return the first suitable nurse based on their original list order
  return suitableNurses.length > 0 ? suitableNurses[0] : null;
}

export function updateNurseSchedule(
  nurse: Nurse,
  shift: ShiftType,
  day: number,
): void {
  // Create a deep copy of the nurse's shifts to prevent mutating shared state
  const newShifts = { ...nurse.shifts };

  if (!newShifts[day]) {
    newShifts[day] = [];
  }
  newShifts[day].push(shift);

  // Update the actual nurse object
  nurse.shifts = newShifts;
  nurse.lastWorkDay = day;
  if (nurse.lastWorkDay === day - 1) {
    nurse.consecutiveWorkDays += 1;
  } else {
    nurse.consecutiveWorkDays = 1; // Reset if there's a day gap
  }
  if (shift === "Night") {
    nurse.totalNightShifts += 1;
  }
  nurse.hasShifts = true;
}
