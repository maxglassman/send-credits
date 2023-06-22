export interface ChainPathDataItem {
  srcPool: string;
  srcPoolId: string;
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
}
