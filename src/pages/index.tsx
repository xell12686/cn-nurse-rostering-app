import React, { useState, useEffect } from "react";
import MonthlyRoster from "@/components/MonthlyRoster";
import { Nurse } from "@/types";

const HomePage = () => {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(true);
  const currentDate = new Date();
  const month = currentDate.getMonth(); // Get current month
  const year = currentDate.getFullYear(); // Get current year

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        setLoading(true);
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${apiUrl}/api/nurses`);
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
    <div className="p-5">
      <h1 className="text-2xl font-bold">CodeNation Test: Nurse Rostering</h1>
      <MonthlyRoster nurses={nurses} month={month} year={year} />
    </div>
  );
};

export default HomePage;
