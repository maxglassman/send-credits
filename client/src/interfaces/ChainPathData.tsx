export interface ChainPathDataItem {
  sourcePool: string;
  destinationPool: string;
  balance: number;
  idealBalance: number;
  balancePercent: number;
  dstPoolCredits: number;
  destPoolDeltaCredits: number;
}

export interface ChainPathTableProps {
  data: ChainPathDataItem[];
}
