import { Nurse, ShiftType, ShiftAssignment } from "@/types";
import { selectNurseForShift, updateNurseSchedule } from "./nurseUtils";

export function generateRoster(
  nurses: Nurse[],
  month: number,
  year: number,
): ShiftAssignment[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const roster: ShiftAssignment[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dailyAssignment: ShiftAssignment = {
      date,
      shifts: {
        Morning: [],
        Evening: [],
        Night: [],
      },
    };

    ["Morning", "Evening", "Night"].forEach((shift) => {
      while (dailyAssignment.shifts[shift].length < 5) {
        const nurse = selectNurseForShift(nurses, shift as ShiftType, day);
        if (!nurse) break; // Break if no available nurses
        dailyAssignment.shifts[shift].push(nurse);
        updateNurseSchedule(nurse, shift as ShiftType, day);
      }
    });

    roster.push(dailyAssignment);
  }

  return roster;
}
