import React from 'react';
import { ConnectWalletButtonProps } from '../interfaces/WalletButton';

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  connectWallet,
}) => {
  return <button onClick={connectWallet}>Connect Wallet</button>;
};

export default ConnectWalletButton;
