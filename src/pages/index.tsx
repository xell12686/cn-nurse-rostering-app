import { Nurse } from "@/types";
import { GetStaticProps, NextPage } from "next";
import fs from "fs";
import path from "path";
import React from "react";

interface HomePageProps {
  nurses: Nurse[];
}

const HomePage: NextPage<HomePageProps> = ({ nurses }) => {
  return (
    <div>
      <h1>Nurse Roster Demo</h1>
      {/* MonthlyRoster component here */}
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

  return {
    props: { nurses },
  };
};

export default HomePage;
