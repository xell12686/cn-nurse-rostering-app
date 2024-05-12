import { generateRoster } from "@/common/rosterGenerator";
import { Nurse, ShiftAssignment } from "@/types";
import React from "react";

interface MonthlyRosterProps {
  nurses: Nurse[];
}

const MonthlyRoster: React.FC<MonthlyRosterProps> = ({ nurses }) => {
  const roster: ShiftAssignment[] = generateRoster(
    nurses,
    new Date().getMonth(),
    new Date().getFullYear(),
  );

  return (
    <div className="roster-items">
      {roster.map((day, index) => (
        <div key={index} className="roster-item">
          <h3>{day.date.toDateString()}</h3>
          <div>Morning: {day.shifts.Morning.map((n) => n.name).join(", ")}</div>
          <div>Evening: {day.shifts.Evening.map((n) => n.name).join(", ")}</div>
          <div>Night: {day.shifts.Night.map((n) => n.name).join(", ")}</div>
        </div>
      ))}
    </div>
  );
};

export default MonthlyRoster;
