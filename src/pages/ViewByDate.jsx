function ViewByDate({ expenses }) {
  // Group expenses by date
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(expense);
    return acc;
  }, {});

  return (
    <div className="view-by-date">
      <h2>Expenses by Date</h2>

      {Object.keys(groupedExpenses).length === 0 && (
        <div className="empty">No expenses recorded</div>
      )}

      {Object.entries(groupedExpenses).map(([date, items]) => (
        <div className="date-group" key={date}>
          <div className="date-title">{date}</div>

          {items.map((e, i) => (
            <div className="date-expense" key={i}>
              <span>{e.title}</span>
              <span className="amount">₹{e.amount}</span>
              <span className={`category-badge ${e.category}`}>
                {e.category}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ViewByDate;
