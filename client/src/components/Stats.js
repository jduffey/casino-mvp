import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';

const Stats = () => {
  const [totalFunds, setTotalFunds] = useState(0);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [uniqueDepositors, setUniqueDepositors] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [wagerTypes, setWagerTypes] = useState([]);

  const depositColumns = useMemo(
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

  const wagerTypeColumns = useMemo(
    () => [
      {
        Header: 'Wager Type',
        accessor: 'betId',
      },
      {
        Header: 'Num Possible Outcomes',
        accessor: 'numPossibleOutcomes',
      },
      {
        Header: 'Winning Outcomes',
        accessor: 'winningOutcomes',
        Cell: ({ value }) => Array.isArray(value) ? value.join(', ') : value,
      },
      {
        Header: 'Payout Multiple',
        accessor: 'payoutMultiple',
      },
      {
        Header: 'House Edge',
        accessor: 'houseEdge',
      },
    ],
    []
  );

  const {
    getTableProps: getDepositTableProps,
    getTableBodyProps: getDepositTableBodyProps,
    headerGroups: depositHeaderGroups,
    rows: depositRows,
    prepareRow: prepareDepositRow,
  } = useTable({ columns: depositColumns, data: deposits }, useSortBy);

  const {
    getTableProps: getWagerTypeTableProps,
    getTableBodyProps: getWagerTypeTableBodyProps,
    headerGroups: wagerTypeHeaderGroups,
    rows: wagerTypeRows,
    prepareRow: prepareWagerTypeRow,
  } = useTable({ columns: wagerTypeColumns, data: wagerTypes }, useSortBy);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsResponse, wagerTypesResponse] = await Promise.all([
          axios.get('/stats'),
          axios.get('/wagerType/all')
        ]);

        console.log('Stats response:', statsResponse.data);
        console.log('Wager types response:', wagerTypesResponse.data);

        setTotalFunds(statsResponse.data.totalFunds);
        setTotalDeposits(statsResponse.data.totalDeposits);
        setUniqueDepositors(statsResponse.data.uniqueDepositors);
        setDeposits(statsResponse.data.deposits);

        setWagerTypes(wagerTypesResponse.data || []);

        console.log('Deposits set:', statsResponse.data.deposits);
        console.log('Wager types set:', wagerTypesResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchStats();
  }, []);

  const renderTable = (getTableProps, getTableBodyProps, headerGroups, rows, prepareRow) => {
    return (
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
    );
  };

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Funds Deposited: ${totalFunds}</p>
      <p>Unique Depositors: {uniqueDepositors.length} ({uniqueDepositors.join(', ')})</p>

      <h3>Registered Wager Types</h3>
      {renderTable(getWagerTypeTableProps, getWagerTypeTableBodyProps, wagerTypeHeaderGroups, wagerTypeRows, prepareWagerTypeRow)}

      <h3>Deposits (n= {totalDeposits})</h3>
      {renderTable(getDepositTableProps, getDepositTableBodyProps, depositHeaderGroups, depositRows, prepareDepositRow)}
    </div>
  );
};

export default Stats;
