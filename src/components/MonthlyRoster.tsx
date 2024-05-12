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
  console.log(roster);
  
  return (
    <div className="roster-items border m-10">
      {roster.map((day, index) => (
        <div
          key={index}
          className="roster-item border-b grid grid-cols-4 gap-3"
        >
          <div className="border-r p-2 flex items-center">
            <h3>{day.date.toDateString()}</h3>
          </div>
          <div className="border-r p-2">
            <div>Morning:</div>
            <div>{day.shifts.Morning.map((n) => n.name).join(", ")}</div>
          </div>
          <div className="border-r p-2">
            <div>Evening:</div>
            <div>{day.shifts.Evening.map((n) => n.name).join(", ")}</div>
          </div>
          <div className="p-2">
            <div>Night:</div>
            <div>{day.shifts.Night.map((n) => n.name).join(", ")}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthlyRoster;
