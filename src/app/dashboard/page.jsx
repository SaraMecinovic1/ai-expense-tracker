"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_componets/CardInfo";
import { db } from "../../../utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "../../../utils/schema";
import { index } from "drizzle-orm/mysql-core";
import BarChartDashboard from "./_componets/BarChartDashboard";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import BudgetItem from "./budgets/_components/BudgetItem";
import Loading from "./loading";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          await Promise.all([
            getBudgetList(),
            getIncomeList(),
            getAllExpenses(),
          ]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        // select-da odaberemo iz koje tabele u bazi zelimo da uzmemo podatke
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number), // FARISA PITATI!
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };

  const getIncomeList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes),
          totalAmount: sql`SUM(CAST(${Incomes.amount} AS NUMERIC))`.mapWith(
            Number
          ),
        })
        .from(Incomes)
        .groupBy(Incomes.id);

      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  return (
    <div className="p-8">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h2 className="font-bold text-4xl mb-2">Hi, {user?.fullName} 👋</h2>
          <p className="text-gray-500 mb-7">
            Here's what happenning with your money, Lets Manage your expense
          </p>

          <CardInfo budgetList={budgetList} incomeList={incomeList} />

          <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
            <div className="lg:col-span-2 mt-5">
              <BarChartDashboard budgetList={budgetList} />

              <ExpenseListTable
                expensesList={expensesList}
                refreshData={() => getBudgetList()}
              />
            </div>

            <div className="mt-4">
              <h2 className="font-bold text-lg">Latest Budgets</h2>
              <div className="grid gap-5 mt-4">
                {budgetList?.length > 0
                  ? budgetList.map((budget) => (
                      <BudgetItem budget={budget} key={budget.id} />
                    ))
                  : [1, 2, 3, 4].map((items, index) => (
                      <div
                        key={index}
                        className="h-[180px] w-full bg-slate-200 rounded-lg animate-pulse"
                      ></div>
                    ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Dashboard;
