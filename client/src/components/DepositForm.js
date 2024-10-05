import React, { useState } from 'react';

import axios from 'axios';

const DepositForm = () => {
  const [amount, setAmount] = useState(10000);
  const [minHouseEdge, setMinHouseEdge] = useState(0.0526);
  const [maxPayoutMultiple, setMaxPayoutMultiple] = useState(35);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/deposit', {
        depositorId: 1,
        amount,
        minHouseEdge,
        maxPayoutMultiple,
      });
      setMessage('Deposit successful!');
    } catch (error) {
      setMessage(`(handleSumbit) Error: ${error.response.data.error}`);
    }
  };

  return (
    <div>
      <h2>Deposit Funds</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Min House Edge:</label>
          <input
            type="number"
            value={minHouseEdge}
            step="0.0001"
            onChange={(e) => setMinHouseEdge(e.target.value)}
          />
        </div>
        <div>
          <label>Max Payout Multiple:</label>
          <input
            type="number"
            value={maxPayoutMultiple}
            onChange={(e) => setMaxPayoutMultiple(e.target.value)}
          />
        </div>
        <button type="submit">Deposit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DepositForm;