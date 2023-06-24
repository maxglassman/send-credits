//React component that will pe within the ChainPathTable component, and will be used to send credits from destination pool to src pool.
import React from 'react';
import { SendCreditsButtonProps } from '../interfaces/SendCreditsButton';
import { contractCall } from '../services/contractCall';
import { routerAddresses } from '../constants/contracts';
import { routerABI } from '../constants/contractABI/router';
import { checkNework } from '../services/checkNetwork';

export const SendCreditsButton: React.FC<SendCreditsButtonProps> = (props) => {
  const handleSendCredits = async () => {
    if (!props.provider || !props.signer) {
      alert('Please connect your wallet first.');
      return;
    }
    if (!(await checkNework(props.provider, props.chainPath.dstChainId))) {
      console.log('here');
      alert('Please connect to the correct network');
      return;
    }

    const contractAddress = routerAddresses[props.chainPath.dstChainId];
    const contractABI = routerABI;
    const signerAddress = await props.signer.getAddress();
    console.log(signerAddress);
    contractCall(
      props.provider,
      props.signer,
      contractAddress,
      contractABI,
      'sendCredits',
      [
        props.chainPath.srcChainId,
        props.chainPath.dstPoolId,
        props.chainPath.srcPoolId,
        signerAddress,
      ]
    );
  };
  return <button onClick={handleSendCredits}>Send Credits</button>;
};
