import React, { useState } from 'react';
import {
  ChainPathDataItem,
  ChainPathTableProps,
} from '../interfaces/ChainPathData';

export const ChainPathTable: React.FC<ChainPathTableProps> = ({ data }) => {
  const [sortKey, setSortKey] = useState<keyof ChainPathDataItem | ''>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: keyof ChainPathDataItem) => {
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
      //if sortKey is not equal to srcPool or dstPool, strip $, %, and commas from valueA and valueB, then convert to number.
      if (!(sortKey === 'srcPool' || sortKey === 'dstPool')) {
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
          <th onClick={() => handleSort('srcPool')}>Source Pool</th>
          <th onClick={() => handleSort('dstPool')}>Destination Pool</th>
          <th onClick={() => handleSort('balance')}>Balance</th>
          <th onClick={() => handleSort('idealBalance')}>Ideal Balance</th>
          <th onClick={() => handleSort('balancePerc')}>Percent</th>
          <th onClick={() => handleSort('dstCredits')}>Dst Pool Credits</th>
          <th onClick={() => handleSort('dstDeltaCredits')}>
            Dst Pool Delta Credits
          </th>
          <th>Send Credits</th>
          <th>Call Delta and Send Credits</th>
        </tr>
      </thead>
      <tbody>
        {sortedDataItems.map((item, index) => (
          <tr key={index}>
            <td>{item.srcPool}</td>
            <td>{item.dstPool}</td>
            <td>{item.balance}</td>
            <td>{item.idealBalance}</td>
            <td>{item.balancePerc}</td>
            <td>{item.dstCredits}</td>
            <td>{item.dstDeltaCredits}</td>
            <td>
              <button>Send Credits</button>
            </td>
            <td>
              <button>Call Delta and Send Credits</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
