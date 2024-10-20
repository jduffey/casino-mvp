import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';

const Stats = () => {
  const [totalFunds, setTotalFunds] = useState(0);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [uniqueDepositors, setUniqueDepositors] = useState([]);
  const [deposits, setDeposits] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: 'Depositor ID',
        accessor: 'depositorId',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ value }) => `$${value}`,
      },
      {
        Header: 'Min House Edge',
        accessor: 'minHouseEdge',
      },
      {
        Header: 'Max Payout Multiple',
        accessor: 'maxPayoutMultiple',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: deposits }, useSortBy);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/stats');
        setTotalFunds(response.data.totalFunds);
        setTotalDeposits(response.data.totalDeposits);
        setUniqueDepositors(response.data.uniqueDepositors);
        setDeposits(response.data.deposits);
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
      <p>Unique Depositors: {uniqueDepositors.length} ({uniqueDepositors.join(', ')})</p>
      <h3>Deposits (n= {totalDeposits})</h3>
      <table {...getTableProps()} style={{ border: '1px solid black' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: '1px solid black',
                    background: 'lightgray',
                    padding: '8px',
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '8px',
                      border: '1px solid gray',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Stats;
