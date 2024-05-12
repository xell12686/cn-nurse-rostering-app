import { Nurse, ShiftAssignment } from "@/types";

export function generateRoster(
  nurses: Nurse[],
  month: number,
  year: number,
): ShiftAssignment[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const roster: ShiftAssignment[] = [];

  // TODO: roster logic here...

  return roster;
}
