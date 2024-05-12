import { Nurse, ShiftType } from "@/types";

// Function to select a nurse for a given shift considering various constraints
export function selectNurseForShift(
  nurses: Nurse[],
  shift: ShiftType,
  day: number,
): Nurse | null {
  const suitableNurses = nurses.filter((nurse) => {

    return true;
  });

  if (suitableNurses.length === 0) return null;

  // Sort nurses by the total number of shifts worked to prioritize those with fewer shifts
  suitableNurses.sort((a, b) => {
    const totalShiftsA: number;
    const totalShiftsB: number;
    return totalShiftsA - totalShiftsB;
  });

  return suitableNurses[0]; // Select the nurse with the fewest total shifts
}

// Function to update the nurse's scheduling details after being assigned to a shift
export function updateNurseSchedule(
  nurse: Nurse,
  shift: ShiftType,
  day: number,
): void {
    // TODO: logic here
}
