import { chainIds } from '../constants/chainIds';
import { poolIds } from '../constants/poolIds';

type Address = string;

export type ChainPoolMap = {
  [chainId in chainIds]: Partial<Record<poolIds, Address>>;
};
