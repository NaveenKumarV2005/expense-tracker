import React from "react";

export default function BudgetAlert({ total, budget }) {
  if (total > budget)
    return <p style={{ color: "red" }}>🚨 Over budget! Try reducing expenses!</p>;
  if (total > budget * 0.8)
    return <p style={{ color: "orange" }}>⚠️ 80% budget used!</p>;
  return <p style={{ color: "green" }}>✅ Within budget</p>;
}
