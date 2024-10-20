import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DbStatusIndicator = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastActiveTime, setLastActiveTime] = useState(null);
  const [dbInfo, setDbInfo] = useState({
    dbName: '',
    url: '',
    port: '',
    collections: [],
  });

  useEffect(() => {
    let intervalId;

    const checkConnection = async () => {
      try {
        const response = await axios.get('/dbStatus');
        setIsConnected(response.data.isConnected);
        setDbInfo({
          dbName: response.data.dbName,
          url: response.data.url,
          port: response.data.port,
          collections: response.data.collections,
        });
        setLastActiveTime(new Date());
      } catch (error) {
        setIsConnected(false);
      }
    };

    // Initial check
    checkConnection();

    // Set up interval to check every second
    intervalId = setInterval(checkConnection, 1000);

    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getTimeDifference = () => {
    if (!lastActiveTime) return '';
    const now = new Date();
    const diffInSeconds = Math.floor((now - lastActiveTime) / 1000);
    return `${diffInSeconds} seconds ago`;
  };

  return (
    <div>
      <p>
        {isConnected ? (
          <span style={{ color: 'green' }}>DB connection active.</span>
        ) : (
          <span style={{ color: 'red' }}>
            No DB connection. Connection last active{' '}
            {lastActiveTime?.toLocaleString()} ({getTimeDifference()}).
          </span>
        )}
      </p>
      <p>
        {`${dbInfo.url}: ${dbInfo.port} (${dbInfo.dbName})`}
      </p>
      <p>
        Collections: {dbInfo.collections.join(', ')}
      </p>
    </div>
  );
};

export default DbStatusIndicator;