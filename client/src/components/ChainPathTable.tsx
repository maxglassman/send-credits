import React, { useState } from 'react';
import {
  ChainPathDataItem,
  ChainPathTableProps,
} from '../interfaces/ChainPathData';
import { SendCreditsButton } from './SendCreditsButton';

export const ChainPathTable: React.FC<ChainPathTableProps> = (props) => {
  const [sortKey, setSortKey] = useState<keyof ChainPathDataItem | ''>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sourcePoolFilter, setSourcePoolFilter] = useState('');
  const [destinationPoolFilter, setDestinationPoolFilter] = useState('');

  const handleSort = (key: keyof ChainPathDataItem) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleSourcePoolFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSourcePoolFilter(event.target.value);
  };

  const handleDestinationPoolFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestinationPoolFilter(event.target.value);
  };

  const filteredDataItems = props.data.filter(
    (item) =>
      item.srcPool.toLowerCase().includes(sourcePoolFilter.toLowerCase()) &&
      item.dstPool.toLowerCase().includes(destinationPoolFilter.toLowerCase())
  );

  const sortedDataItems = [...filteredDataItems].sort((a, b) => {
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
    <div className="chainpath-table">
      <div className="filter-container">
        <div className="filter-column">
          <input
            type="text"
            className="filter-input"
            placeholder="Filter by Src Pool"
            value={sourcePoolFilter}
            onChange={handleSourcePoolFilterChange}
          />
        </div>
        <div className="filter-column">
          <input
            type="text"
            className="filter-input"
            placeholder="Filter by Dst Pool"
            value={destinationPoolFilter}
            onChange={handleDestinationPoolFilterChange}
          />
        </div>
      </div>
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
                <SendCreditsButton
                  provider={props.provider}
                  signer={props.signer}
                  chainPath={item}
                />
              </td>
              <td>
                <button>Call Delta and Send Credits</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
