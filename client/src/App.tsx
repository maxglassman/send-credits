import './App.css';
import React, { useState } from 'react';
import { PoolDataItem } from './interfaces/PoolData';
import { PoolTable } from './components/PoolTable';
import { ChainPathDataItem } from './interfaces/ChainPathData';
import { ChainPathTable } from './components/ChainPathTable';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Pool');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Example data
  const poolData: PoolDataItem[] = [
    {
      pool: 'Pool 1',
      balance: 1000,
      liquidityProvided: 500,
      percentage: 50,
      surplusDeficit: 200,
      eqReward: 50,
      eqRewardBps: 20,
      deltaCredits: 10,
    },
    // Add more pool data objects as needed
  ];

  const chainPathData: ChainPathDataItem[] = [
    {
      sourcePool: 'Source Pool 1',
      destinationPool: 'Destination Pool 1',
      balance: 500,
      idealBalance: 1000,
      balancePercent: 50,
      dstPoolCredits: 200,
      destPoolDeltaCredits: 100,
    },
    // Add more chain path data objects as needed
  ];

  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="#Pool" onClick={() => handleTabClick('Pool')}>
              Pool
            </a>
          </li>
          <li>
            <a href="#ChainPaths" onClick={() => handleTabClick('ChainPaths')}>
              ChainPaths
            </a>
          </li>
        </ul>
      </nav>

      {activeTab === 'Pool' && <PoolTable data={poolData} />}
      {activeTab === 'ChainPaths' && <ChainPathTable data={chainPathData} />}
    </div>
  );
};
export default App;
