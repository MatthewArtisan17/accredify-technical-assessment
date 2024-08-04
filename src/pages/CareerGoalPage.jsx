import React from "react";
import CareerGoal from "../components/CareerGoal";

const CareerGoalPage = () => {
  return (
    <div className="flex flex-col w-[95%] max-w-[1092px] mx-auto">
      <p className="text-3xl font-bold mb-8">This is the career goal page content.</p>
      <CareerGoal />
    </div>
  );
};

export default CareerGoalPage;