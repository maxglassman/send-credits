import { ethers } from 'ethers';
import { ChainPathDataItem } from './ChainPathData';

export interface ContractInterButtonProps {
  chainPath: ChainPathDataItem;
  provider: ethers.providers.Web3Provider | undefined;
  signer: ethers.Signer | undefined;
}
