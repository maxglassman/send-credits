export interface PoolDataItem {
  srcPool: string;
  srcPoolId: string;
  balance: string;
  liquidityProvided: string;
  balancePerc: string;
  surplusDeficit: string;
  eqReward: string;
  eqRewardBps: string;
  deltaCredits: string;
}

export interface PoolTableProps {
  data: PoolDataItem[];
}
