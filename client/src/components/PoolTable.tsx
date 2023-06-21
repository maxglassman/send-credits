import React from 'react';
import { PoolTableProps } from '../interfaces/PoolData';

export const PoolTable: React.FC<PoolTableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Pool</th>
          <th>Balance</th>
          <th>Liquidity Provided</th>
          <th>%</th>
          <th>Surplus/Deficit</th>
          <th>Eq Reward</th>
          <th>Eq Reward Bps</th>
          <th>Delta Credits</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
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
