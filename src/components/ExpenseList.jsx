function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div className="expense-list">
      {expenses.map((e, i) => (
        <div className="expense-item" key={i}>
          <span>{e.title}</span>
          <span>₹{e.amount}</span>
          <span className={`category-badge ${e.category}`}>{e.category}</span>
          <button onClick={() => deleteExpense(i)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
export default ExpenseList;
