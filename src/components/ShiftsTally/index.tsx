import React from "react";
import { Nurse, ShiftType } from "@/types";
import "./ShiftTally.css";

interface ShiftsTallyProps {
  nurses: Nurse[];
}

const ShiftsTally: React.FC<ShiftsTallyProps> = ({ nurses }) => {
  // Function to calculate the total shifts for each nurse
  const calculateTotalShifts = (nurse: Nurse): number => {
    return Object.values(nurse.shifts).reduce(
      (total, shiftTypes) => total + shiftTypes.length,
      0,
    );
  };

  return (
    <div className="shifts-tally">
      <h3>Nurse Shift Tally:</h3>
      <table>
        <thead>
          <tr>
            <th>Nurse</th>
            <th>Date</th>
            <th>Shift Type</th>
            <th>Total Shifts</th>
          </tr>
        </thead>
        <tbody>
          {nurses.map((nurse) =>
            Object.entries(nurse.shifts).map(([date, shiftTypes], index) => (
              <tr key={`${nurse.id}-${index}`}>
                {index === 0 && (
                  <td rowSpan={Object.keys(nurse.shifts).length}>
                    {nurse.name}
                  </td>
                )}
                <td>{date}</td>
                <td>{shiftTypes.join(", ")}</td>
                {index === 0 && (
                  <td rowSpan={Object.keys(nurse.shifts).length}>
                    {calculateTotalShifts(nurse)}
                  </td>
                )}
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftsTally;
