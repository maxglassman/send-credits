export interface PoolDataItem {
  pool: string;
  balance: number;
  liquidityProvided: number;
  percentage: number;
  surplusDeficit: number;
  eqReward: number;
  eqRewardBps: number;
  deltaCredits: number;
}

export interface PoolTableProps {
  data: PoolDataItem[];
}
