import './App.css';
import React, { useState, useEffect } from 'react';
import { PoolDataItem } from './interfaces/PoolData';
import { PoolTable } from './components/PoolTable';
import { ChainPathDataItem } from './interfaces/ChainPathData';
import { ChainPathTable } from './components/ChainPathTable';
import dotenv from 'dotenv';
import { formatPoolData, formatChainPathData } from './utils/formatting';

dotenv.config({ path: '../../.env' });

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Pool');
  const [poolData, setPoolData] = useState<PoolDataItem[]>([]);
  const [chainPathData, setChainPathData] = useState<ChainPathDataItem[]>([]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api');
      const data = await response.json();

      const formattedPoolData = formatPoolData(data.Pools);
      const formattedChainPathData = formatChainPathData(data.ChainPaths);

      setPoolData(formattedPoolData);
      setChainPathData(formattedChainPathData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
