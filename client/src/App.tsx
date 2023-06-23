import './App.css';
import React, { useState, useEffect } from 'react';
import { PoolDataItem } from './interfaces/PoolData';
import { PoolTable } from './components/PoolTable';
import { ChainPathDataItem } from './interfaces/ChainPathData';
import { ChainPathTable } from './components/ChainPathTable';
import { formatPoolData, formatChainPathData } from './utils/formatting';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import ConnectWalletButton from './components/ConnectWalletButton';
dotenv.config();

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Pool');
  const [poolData, setPoolData] = useState<PoolDataItem[]>([]);
  const [chainPathData, setChainPathData] = useState<ChainPathDataItem[]>([]);
  const [loading, setLoading] = useState(true); // New state for loading
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.Signer>();

  const connectWallet = async () => {
    // Connect to the Ethereum provider
    // @ts-ignore
    if (window.ethereum) {
      try {
        //@ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Update state variables
        setProvider(provider);
        setSigner(signer);
        console.log(provider);
        console.log(signer);

        // Set the wallet address
        setWalletAddress(await signer.getAddress());
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert("Please install MetaMask to use this site's full features.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_API || '');
      const data = await response.json();

      const formattedPoolData = formatPoolData(data.Pools);
      const formattedChainPathData = formatChainPathData(data.ChainPaths);

      setPoolData(formattedPoolData);
      setChainPathData(formattedChainPathData);
      setLoading(false); // Update loading state after successful fetch
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Update loading state in case of error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Render loading screen if data is still loading
  if (loading) {
    return (
      <div className="loading-screen">
        <h1 className="loading-text">Steady lads, loading Stargate data...</h1>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <a
              href="#Pool"
              onClick={() => setActiveTab('Pool')}
              className={activeTab === 'Pool' ? 'active' : ''}
            >
              Pools
            </a>
          </li>
          <li>
            <a
              href="#ChainPaths"
              onClick={() => setActiveTab('ChainPaths')}
              className={activeTab === 'ChainPaths' ? 'active' : ''}
            >
              Chain Paths
            </a>
          </li>
          <li>
            <ConnectWalletButton connectWallet={connectWallet} />
          </li>
        </ul>
      </nav>
      <h3 className="walletAddress">Wallet Address: {walletAddress}</h3>

      <header>
        <h1>Send Credits</h1>
        <h2>A tool for monitoring & correcting Stargate Pathways.</h2>
      </header>

      {activeTab === 'Pool' && <PoolTable data={poolData} />}

      {activeTab === 'ChainPaths' && <ChainPathTable data={chainPathData} />}
    </div>
  );
};

export default App;
