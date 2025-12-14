function DashboardCards({ expenses, budget }) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  return (
    <div className="dashboard-cards">
      <div className="card">Total: ₹{total}</div>
      <div className="card">Remaining: ₹{budget - total}</div>
      <div className="card">Used: {((total/budget)*100).toFixed(1)}%</div>
    </div>
  );
}
export default DashboardCards;
