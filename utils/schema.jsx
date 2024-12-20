import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

// budget schema
export const Budgets = pgTable("budgets", {
  id: serial("id").primaryKey(), // serial-automatski generiše jedinstvene brojeve
  name: varchar("name").notNull(), // varchar-tekst
  amount: varchar("amount").notNull(),
  icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

// incomes schema
export const Incomes = pgTable("incomes", {
  id: serial("id").primaryKey(), // serial-automatski generiše jedinstvene brojeve
  name: varchar("name").notNull(), // varchar-tekst
  amount: numeric("amount").notNull(),
  icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

// expenses schema
export const Expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull().default(0),
  budgetId: integer("budgetId").references(() => Budgets.id),
  createdAt: varchar("createdAt").notNull(),
});
