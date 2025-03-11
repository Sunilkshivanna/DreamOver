import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <button onClick={() => navigate("/game")}>Start Game</button>
    </div>
  );
};

export default Dashboard;
