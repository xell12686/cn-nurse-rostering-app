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
  nurse.consecutiveWorkDays =
    nurse.lastWorkDay === day - 1 ? nurse.consecutiveWorkDays + 1 : 1;
  if (shift === "Night") {
    nurse.totalNightShifts += 1;
  }
  nurse.hasShifts = true;
}
