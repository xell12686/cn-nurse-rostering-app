import React, { useEffect, useState } from "react";
import MonthlyRoster from "@/components/MonthlyRoster";
import { Nurse } from "@/types";

const HomePage = () => {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div>
      <h1>Nurse Roster Demo</h1>
      <MonthlyRoster nurses={nurses} month={0} year={0} />
    </div>
  );
};

export default HomePage;
