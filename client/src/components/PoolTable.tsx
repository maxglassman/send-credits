import React, { useState } from 'react';
import { PoolTableProps, PoolDataItem } from '../interfaces/PoolData';

export const PoolTable: React.FC<PoolTableProps> = ({ data }) => {
  const [sortKey, setSortKey] = useState<keyof PoolDataItem | ''>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: keyof PoolDataItem) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedDataItems = [...data].sort((a, b) => {
    if (sortKey !== '') {
      let valueA: any = a[sortKey];
      let valueB: any = b[sortKey];
      //if sortKey is not equal to srcPool, strip $, %, and commas from valueA and valueB, then convert to number.
      if (sortKey !== 'srcPool') {
        valueA = Number(valueA.replace(/[$,%]/g, ''));
        valueB = Number(valueB.replace(/[$,%]/g, ''));
      }

      if (valueA < valueB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('srcPool')}>Pool</th>
          <th onClick={() => handleSort('balance')}>Balance</th>
          <th onClick={() => handleSort('liquidityProvided')}>
            Liquidity Provided
          </th>
          <th onClick={() => handleSort('balancePerc')}>%</th>
          <th onClick={() => handleSort('surplusDeficit')}>Surplus/Deficit</th>
          <th onClick={() => handleSort('eqReward')}>Eq Reward</th>
          <th onClick={() => handleSort('eqRewardBps')}>Eq Reward Bps</th>
          <th onClick={() => handleSort('deltaCredits')}>Delta Credits</th>
        </tr>
      </thead>
      <tbody>
        {sortedDataItems.map((item, index) => (
          <tr key={index}>
            <td>{item.srcPool}</td>
            <td>{item.balance}</td>
            <td>{item.liquidityProvided}</td>
            <td>{item.balancePerc}</td>
            <td>{item.surplusDeficit}</td>
            <td>{item.eqReward}</td>
            <td>{item.eqRewardBps}</td>
            <td>{item.deltaCredits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
