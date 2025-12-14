function SpendingTips({ expenses, budget }) {
  if (!expenses || expenses.length === 0) return null;

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const percent = (total / budget) * 100;

  // Category totals
  const categoryTotals = {};
  expenses.forEach(e => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  // Highest category
  const highestCategory = Object.keys(categoryTotals)
    .reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b);

  // Count small expenses
  const smallExpenses = expenses.filter(e => e.amount < 100).length;

  // Repeated expenses (same title)
  const titleCount = {};
  expenses.forEach(e => {
    titleCount[e.title] = (titleCount[e.title] || 0) + 1;
  });
  const repeatedItem = Object.keys(titleCount)
    .find(t => titleCount[t] >= 3);

  // Base category tips
  const categoryTips = {
    food: [
      "Your Swiggy app is working harder than you 😅. Try home food.",
      "Cooking once = eating twice = saving money 🧠",
      "Restaurants are tasty, savings are tastier."
    ],
    travel: [
      "Fuel prices are crying. Try public transport 🚍",
      "Plan trips together to reduce travel cost.",
      "Walk short distances — free gym 😄"
    ],
    medical: [
      "Prevention is cheaper than treatment.",
      "Ask for generic medicines to save money.",
      "Health is wealth — but not hospital bills."
    ],
    shopping: [
      "Impulse buying detected 🚨",
      "Wait 24 hours before buying non-essentials.",
      "Your cupboard is fuller than your savings 😄"
    ],
    other: [
      "Small expenses silently eat your budget 🐜",
      "Track miscellaneous spends carefully.",
      "Unplanned expenses = unplanned stress."
    ]
  };

  // Pick random category tip
  const randomTip =
    categoryTips[highestCategory][
      Math.floor(Math.random() * categoryTips[highestCategory].length)
    ];

  // Extra logic tips
  const extraTips = [];

  if (percent >= 100) {
    extraTips.push("🚨 Wallet in danger! Activate emergency saving mode.");
  }

  if (smallExpenses >= 5) {
    extraTips.push(
      `🐜 You made ${smallExpenses} small purchases. Small leaks sink big ships.`
    );
  }

  if (repeatedItem) {
    extraTips.push(
      `🔁 You bought "${repeatedItem}" many times. Consider bulk buying or cutting it.`
    );
  }

  if (percent >= 80 && percent < 100) {
    extraTips.push(
      "⚠️ You’re close to budget limit. Future-you will thank you for stopping now."
    );
  }

  if (percent < 80) return null;

  return (
    <div className={`tips-box ${percent >= 100 ? "danger" : "warning"}`}>
      <h3>
        {percent >= 100
          ? "🚨 Budget Exceeded!"
          : "⚠️ Budget Warning"}
      </h3>

      <p>
        <b>Highest Spending Category:</b> {highestCategory.toUpperCase()}
      </p>

      <p>
        <b>Main Tip:</b> {randomTip}
      </p>

      {extraTips.map((tip, i) => (
        <p key={i}>• {tip}</p>
      ))}
    </div>
  );
}

export default SpendingTips;
