import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import DashboardCards from "./components/DashboardCards";
import SummaryChart from "./components/SummaryChart";
import VoiceInput from "./components/VoiceInput";
import SpendingTips from "./components/SpendingTips";
import BillScanner from "./components/BillScanner";
import ViewByDate from "./pages/ViewByDate";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? Number(saved) : 10000;
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (index) => {
    const copy = [...expenses];
    copy.splice(index, 1);
    setExpenses(copy);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="header">
          <h1>Expense Tracker</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/view">View By Date</Link>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="budget-section">
                  <label>Monthly Budget</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>

                <DashboardCards expenses={expenses} budget={budget} />
                <ExpenseForm addExpense={addExpense} />
                <BillScanner addExpense={addExpense} />
                <VoiceInput addExpense={addExpense} />
                <ExpenseList
                  expenses={expenses}
                  deleteExpense={deleteExpense}
                />
                <SummaryChart expenses={expenses} />
                <SpendingTips expenses={expenses} budget={budget} />
              </>
            }
          />

          <Route path="/view" element={<ViewByDate expenses={expenses} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
