import { useState } from "react";

function ExpenseForm({ addExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");

  const submit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    addExpense({
      title,
      amount: Number(amount),
      category,
      date: new Date().toISOString(),
    });

    setTitle("");
    setAmount("");
  };

  return (
    <form className="add-expense-form" onSubmit={submit}>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
      <select value={category} onChange={e=>setCategory(e.target.value)}>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="medical">Medical</option>
        <option value="shopping">Shopping</option>
        <option value="other">Other</option>
      </select>
      <button>Add</button>
    </form>
  );
}

export default ExpenseForm;
