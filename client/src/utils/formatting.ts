import { stablecoinIds } from './constants/stablecoin';

export const formatNumber = (number: number, srcPoolId: number): string => {
  const isStablecoin = stablecoinIds.includes(srcPoolId);
  const formattedNumber = isStablecoin
    ? `$${number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
    : number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formattedNumber;
};

export const formatPercent = (number: number): string => {
  const formattedPercent = `${(number * 100).toFixed(2)}%`;
  return formattedPercent;
};

export const formatBps = (number: number): string => {
  const formattedBps = (number * 10000).toFixed(2);
  return formattedBps;
};

export const formatPoolData = (data: any[]) => {
  return data.map((item) => ({
    ...item,
    balance: formatNumber(item.balance, item.srcPoolId),
    liquidityProvided: formatNumber(item.liquidityProvided, item.srcPoolId),
    balancePerc: formatPercent(item.balancePerc),
    surplusDeficit: formatNumber(item.surplusDeficit, item.srcPoolId),
    eqReward: formatNumber(item.eqReward, item.srcPoolId),
    eqRewardBps: formatBps(item.eqRewardBps),
    deltaCredits: formatNumber(item.deltaCredits, item.srcPoolId),
  }));
};

export const formatChainPathData = (data: any[]) => {
  return data.map((item) => ({
    ...item,
    balance: formatNumber(item.balance, item.srcPoolId),
    idealBalance: formatNumber(item.idealBalance, item.srcPoolId),
    balancePerc: formatPercent(item.balancePerc),
    dstCredits: formatNumber(item.dstCredits, item.srcPoolId),
    dstDeltaCredits: formatNumber(item.dstDeltaCredits, item.srcPoolId),
  }));
};
