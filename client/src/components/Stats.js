import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stats = () => {
  const [totalFunds, setTotalFunds] = useState(0);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [uniqueDepositors, setUniqueDepositors] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/stats');
        setTotalFunds(response.data.totalFunds);
        setTotalDeposits(response.data.totalDeposits);
        setUniqueDepositors(response.data.uniqueDepositors);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Funds Deposited: ${totalFunds}</p>
      <p>Total Deposits: {totalDeposits}</p>
      <p>Unique Depositors: {uniqueDepositors.length}</p>
      <h3>List of Unique Depositors:</h3>
      <ul>
        {uniqueDepositors.map((depositor, index) => (
          <li key={index}>{depositor}</li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;