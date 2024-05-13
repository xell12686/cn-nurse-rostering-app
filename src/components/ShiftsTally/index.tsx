import React from "react";
import { ShiftAssignment } from "@/types";
import "./ShiftTally.css";

interface ShiftsTallyProps {
  roster: ShiftAssignment[];
}

const ShiftsTally: React.FC<ShiftsTallyProps> = ({ roster }) => {
  const nurseShiftCounts = roster.reduce(
    (acc, day) => {
      Object.values(day.shifts).forEach((nurses) => {
        nurses.forEach((nurse) => {
          if (!acc[nurse.id]) {
            acc[nurse.id] = { name: nurse.name, count: 0 };
          }
          acc[nurse.id].count++;
        });
      });
      return acc;
    },
    {} as { [key: string]: { name: string; count: number } },
  );

  return (
    <div className="shifts-tally">
      <h3>Nurses Shift Tally:</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Shifts</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(nurseShiftCounts).map(([id, { name, count }]) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftsTally;
