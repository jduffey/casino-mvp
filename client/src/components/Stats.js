import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stats = () => {
  const [totalFunds, setTotalFunds] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/stats');
        setTotalFunds(response.data.totalFunds);
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
    </div>
  );
};

export default Stats;