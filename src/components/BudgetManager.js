import React, { useState } from "react";

import "../../src/assets/wrappers/BudgetManager.css";
const BudgetManager = () => {
  const [budgetItems, setBudgetItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", amount: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.amount) return;
    setBudgetItems([...budgetItems, newItem]);
    setNewItem({ name: "", amount: "" }); // 重置表单
  };

  return (
    <div className="budget-manager">
      <h2>Budget Manager</h2>
      <form onSubmit={handleSubmit} className="budget-form">
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Expense name"
          required
        />
        <input
          type="number"
          value={newItem.amount}
          onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
          placeholder="Amount"
          required
        />
        <button type="submit" className="btn submit-btn">
          Add
        </button>
      </form>
      <table className="budget-table">
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {budgetItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>${item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetManager;
