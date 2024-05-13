import React, { useState, useEffect } from "react";
import { Nurse } from "@/types";
import MonthlyRoster from "@/components/MonthlyRoster";
import MonthYearSelector from "@/components/MonthYearSelector";

const HomePage = () => {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/nurses");
        const data = await res.json();
        setNurses(data.nurses);
      } catch (error) {
        console.error("Failed to fetch nurses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNurses();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-5 flex flex-col gap-10">
      <h1 className="text-2xl font-bold">CodeNation Test: Nurse Rostering</h1>
      <MonthYearSelector
        month={month}
        year={year}
        onMonthChange={setMonth}
        onYearChange={setYear}
      />
      <MonthlyRoster nurses={nurses} month={month} year={year} />
    </div>
  );
};

export default HomePage;
