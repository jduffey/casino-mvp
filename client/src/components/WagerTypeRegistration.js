import React, { useState } from 'react';
import axios from 'axios';

const WagerTypeRegistration = () => {
  const [betId, setBetId] = useState('');
  const [numPossibleOutcomes, setNumPossibleOutcomes] = useState('');
  const [winningOutcomes, setWinningOutcomes] = useState('');
  const [payoutMultiple, setPayoutMultiple] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/wagerType/register', {
        betId,
        numPossibleOutcomes: parseInt(numPossibleOutcomes),
        winningOutcomes: winningOutcomes.split(',').map(Number),
        payoutMultiple: parseFloat(payoutMultiple),
      });
      setMessage('Wager type registered successfully!');
    } catch (error) {
      setMessage(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div>
      <h2>Register Wager Type</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bet ID:</label>
          <input
            type="text"
            value={betId}
            onChange={(e) => setBetId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Possible Outcomes:</label>
          <input
            type="number"
            value={numPossibleOutcomes}
            onChange={(e) => setNumPossibleOutcomes(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Winning Outcomes (comma-separated):</label>
          <input
            type="text"
            value={winningOutcomes}
            onChange={(e) => setWinningOutcomes(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Payout Multiple:</label>
          <input
            type="number"
            value={payoutMultiple}
            onChange={(e) => setPayoutMultiple(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register Wager Type</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default WagerTypeRegistration;