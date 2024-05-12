export type ShiftType = "Morning" | "Evening" | "Night";

export interface Nurse {
  id: string;
  name: string;
  lastWorkDay: number;
  consecutiveWorkDays: number;
  totalNightShifts: number;
  shifts: Record<string, ShiftType[]>;
}

export interface ShiftAssignment {
  date: Date;
  shifts: {
    Morning: Nurse[];
    Evening: Nurse[];
    Night: Nurse[];
  };
}
