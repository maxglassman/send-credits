export interface ChainPathDataItem {
  srcPool: string;
  dstPool: string;
  balance: number;
  idealBalance: number;
  balancePerc: number;
  dstCredits: number;
  dstDeltaCredits: number;
}

export interface ChainPathTableProps {
  data: ChainPathDataItem[];
}
