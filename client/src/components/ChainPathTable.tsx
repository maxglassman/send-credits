import React from 'react';
import { ChainPathTableProps } from '../interfaces/ChainPathData';

export const ChainPathTable: React.FC<ChainPathTableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Source Pool</th>
          <th>Destination Pool</th>
          <th>Balance</th>
          <th>Ideal Balance</th>
          <th>Balance Percent</th>
          <th>Dst Pool Credits</th>
          <th>Dest Pool Delta Credits</th>
          <th>Send Credits</th>
          <th>Call Delta and Send Credits</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.sourcePool}</td>
            <td>{item.destinationPool}</td>
            <td>{item.balance}</td>
            <td>{item.idealBalance}</td>
            <td>{item.balancePercent}</td>
            <td>{item.dstPoolCredits}</td>
            <td>{item.destPoolDeltaCredits}</td>
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
