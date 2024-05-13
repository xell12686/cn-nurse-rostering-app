import React from "react";
import { generateRoster } from "@/common/rosterGenerator";
import { Nurse, ShiftAssignment } from "@/types";
import "./MonthlyRoster.css";
import ShiftsTally from "../ShiftsTally";
// import ShiftsTally from "../ShiftsTally";
interface MonthlyRosterProps {
  nurses: Nurse[];
  month: number;
  year: number;
}

const MonthlyRoster: React.FC<MonthlyRosterProps> = ({
  nurses,
  month,
  year,
}) => {
  const roster: ShiftAssignment[] = generateRoster(nurses, month, year);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const unassignedNurses = nurses.filter((nurse) => !nurse.hasShifts);
  const assignedNursesCount = nurses.length - unassignedNurses.length;

  const headers = Array.from({ length: daysInMonth }, (_, i) => {
    const day = new Date(year, month, i + 1);
    return (
      <>
        {day.toLocaleDateString("en-US", { weekday: "short" })}
        <small>{day.getDate()}</small>
      </>
    );
  });

  const date = new Date(year, month);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="roster-container">
      <div className="roster-summary">
        <h2>Roster Summary for {formattedDate}</h2>
        <p>Total Nurses: {nurses.length}</p>
        <p>Assigned Nurses: {assignedNursesCount}</p>
        <p>Unassigned Nurses: {unassignedNurses.length}</p>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th></th>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {["Morning", "Evening", "Night"].map((shift) => (
              <tr key={shift} className={shift}>
                <td>{shift}</td>
                {roster.map((day, index) => (
                  <td key={index}>
                    {day.shifts[shift as keyof typeof day.shifts] // Corrected type assertion
                      .map((nurse: Nurse) => nurse.name)
                      .join(", ")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {unassignedNurses.length > 0 && (
        <div className="unassigned-nurses">
          <h3>Unassigned Nurses for {formattedDate}</h3>
          <ol>
            {unassignedNurses.map((nurse, index) => (
              <li key={index}>{nurse.name}</li>
            ))}
          </ol>
        </div>
      )}
      {roster && <ShiftsTally roster={roster} />}
    </div>
  );
};

export default MonthlyRoster;
