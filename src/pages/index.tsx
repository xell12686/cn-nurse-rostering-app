import { Nurse } from "@/types";
import { GetStaticProps, NextPage } from "next";
import fs from "fs";
import path from "path";
import React from "react";
import MonthlyRoster from "@/components/MonthlyRoster";

interface HomePageProps {
  nurses: Nurse[];
}

const HomePage: NextPage<HomePageProps> = ({ nurses }) => {
  console.log("nurses:");
  console.log(nurses);

  return (
    <div>
      <h1>Nurse Roster Demo</h1>
      <MonthlyRoster nurses={nurses} month={0} year={0} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), "public", "nurses.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const names = data.split("\n").filter(Boolean);
  const nurses: Nurse[] = names.map((name, index) => ({
    id: `nurse-${index}`,
    name,
    lastWorkDay: -1,
    consecutiveWorkDays: 0,
    totalNightShifts: 0,
    shifts: {},
  }));

  // Pass the current month and year as props
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  return {
    props: { nurses, month, year },
  };
};

export default HomePage;
