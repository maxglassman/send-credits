export interface PoolDataItem {
  srcPool: string;
  balance: number;
  liquidityProvided: number;
  balancePerc: number;
  surplusDeficit: number;
  eqReward: number;
  eqRewardBps: number;
  deltaCredits: number;
}

export interface PoolTableProps {
  data: PoolDataItem[];
}
