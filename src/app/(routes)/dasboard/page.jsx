"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { db } from "../../../../utils/dbConfig";

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
