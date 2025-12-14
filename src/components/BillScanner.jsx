import React, { useState } from "react";
import Tesseract from "tesseract.js";

function BillScanner({ addExpense }) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const extractAmount = (txt) => {
    const nums = txt.match(/\d+(\.\d{1,2})?/g);
    if (!nums) return null;
    return Math.max(...nums.map(Number));
  };

  const scanBill = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const res = await Tesseract.recognize(file, "eng");
    const extractedText = res.data.text;
    setText(extractedText);

    const amount = extractAmount(extractedText);

    if (amount) {
      addExpense({
        title: "Scanned Bill",
        amount,
        category: "other",
        date: new Date().toISOString(),
      });
    }

    setLoading(false);
  };

  return (
    <div className="bill-scanner">
      <h3>🧾 Scan Bill</h3>
      <input type="file" accept="image/*" onChange={scanBill} />
      {loading && <p>Scanning bill...</p>}
      {text && (
        <details>
          <summary>View extracted text</summary>
          <pre>{text}</pre>
        </details>
      )}
    </div>
  );
}

export default BillScanner;
