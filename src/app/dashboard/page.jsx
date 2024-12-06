"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_componets/CardInfo";
import { db } from "../../../utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
// import { Budgets, Expenses, Incomes } from "@/utils/schema";
// import BarChartDashboard from "./_components/BarChartDashboard";
// import BudgetItem from "./budgets/_components/BudgetItem";
// import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function Dashboard() {
  const { user } = useUser();

  useEffect(() => {
    console.log("Dashboard loaded");
  }, []);

  return (
    <div className="p-8 ">
      <h2 className="font-bold text-4xl">Hi, {user?.fullName} 👋</h2>
    </div>
  );
}
export default Dashboard;
