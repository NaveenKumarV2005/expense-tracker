import React from "react";
import DashboardCards from "../components/DashboardCards";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import SummaryChart from "../components/SummaryChart";
import VoiceInput from "../components/VoiceInput";

function Home({ expenses, setExpenses, budget, setBudget }) {
  const addExpense = (expense) => setExpenses([...expenses, expense]);
  const deleteExpense = (index) => {
    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
  };

  return (
    <div>
      <div className="budget-section">
        <label>Monthly Budget: ₹</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>

      <DashboardCards expenses={expenses} budget={budget} />
      <ExpenseForm addExpense={addExpense} />
      <VoiceInput addExpense={addExpense} />
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
      <SummaryChart expenses={expenses} />
    </div>
  );
}

export default Home;
