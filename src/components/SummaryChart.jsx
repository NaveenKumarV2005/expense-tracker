import React, { useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale,
  BarElement, PointElement, LineElement
);

const SummaryChart = ({ expenses }) => {
  const [selectedChart, setSelectedChart] = useState("pie");

  if (!expenses.length) return <p style={{ textAlign:"center" }}>No data to display</p>;

  const categories = [...new Set(expenses.map(e => e.category))];
  const categoryTotals = categories.map(cat => expenses.filter(e=>e.category===cat).reduce((a,b)=>a+parseFloat(b.amount),0));

  const dates = [...new Set(expenses.map(e => e.date))].sort();
  const dailyTotals = dates.map(date => expenses.filter(e=>e.date===date).reduce((a,b)=>a+parseFloat(b.amount),0));
  const cumulative = dailyTotals.map((val,i)=>dailyTotals.slice(0,i+1).reduce((a,b)=>a+b,0));

  const pieData = { labels: categories, datasets:[{data: categoryTotals, backgroundColor:["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF"]}]};
  const barData = { labels: dates, datasets:[{label:"Daily Expenses", data: dailyTotals, backgroundColor:"#36A2EB"}]};
  const lineData = { labels: dates, datasets:[{label:"Cumulative Spending", data:cumulative, borderColor:"#FF6384", backgroundColor:"rgba(255,99,132,0.2)", fill:true}]};

  const renderChart = () => {
    switch(selectedChart){
      case "pie": return <Pie data={pieData} />;
      case "bar": return <Bar data={barData} />;
      case "line": return <Line data={lineData} />;
      default: return <Pie data={pieData} />;
    }
  }

  return (
    <div className="summary-container">
      <h2>Expense Summary</h2>
      <div className="chart-selector">
        <label>Select Chart :  </label>
        <select value={selectedChart} onChange={e=>setSelectedChart(e.target.value)}>
          <option value="pie">Pie (By Category)</option>
          <option value="bar">Bar (By Date)</option>
          <option value="line">Line (Trend)</option>
        </select>
      </div>
      <div className="chart-wrapper">{renderChart()}</div>
    </div>
  )
};

export default SummaryChart;
