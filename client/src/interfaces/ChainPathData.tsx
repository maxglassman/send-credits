import { ethers } from 'ethers';
export interface ChainPathDataItem {
  srcChainId: number;
  srcPool: string;
  srcPoolId: number;
  dstChainId: number;
  dstPool: string;
  dstPoolId: number;
  balance: string;
  idealBalance: string;
  balancePerc: string;
  dstCredits: string;
  dstDeltaCredits: string;
}

export interface ChainPathTableProps {
  data: ChainPathDataItem[];
  provider: ethers.providers.Web3Provider | undefined;
  signer: ethers.Signer | undefined;
}
