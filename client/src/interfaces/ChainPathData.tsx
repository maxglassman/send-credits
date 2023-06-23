import { ethers } from 'ethers';
export interface ChainPathDataItem {
  srcChainId: string;
  srcPool: string;
  srcPoolId: string;
  dstChainId: string;
  dstPool: string;
  dstPoolId: string;
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
