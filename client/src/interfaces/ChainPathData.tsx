export interface ChainPathDataItem {
  srcPool: string;
  srcPoolId: number;
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
}
