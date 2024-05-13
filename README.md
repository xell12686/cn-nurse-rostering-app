# Code Nation Test: Nurse Rostering

## Submitted by James Lacandula

## Tips:

- We're looking for a clear and readable solution.
- The quality of your solution should be at a level you would be happy to produce in your
  everyday life as a software developer.
- How you solve the problem is just as important as getting a complete solution.
- We're not looking for you to handle every possible edge case.
- We expect the code for building rosters to be your own.

## Challenge:

- In a hospital environment, nurses work a rotating shift system. There are three work shifts per day:
  a morning shift, an evening shift and a night shift.
- Each day, all three shift needs to be filled.
- You have been tasked with developing a rostering system which can calculate and output the
  nursing roster for any specified month

## Monthly Roster Requirements:

- Nurses must not be expected to work more than one shift per day.
- To maintain a healthy work/life balance, no nurse can be asked to work for more than 5 days in row.
- Similarly, no nurse can be expected to work more than five night shifts per month.
- Days off must occur in groups of two or more consecutive days

## Data source

- A list of rosterable nurses has been provided in the file public/nurses.txt.

##

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
