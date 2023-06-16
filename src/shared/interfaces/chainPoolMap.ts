import { chainIds } from '../constants/chainIds';
import { poolIds } from '../constants/poolIds';

export type Address = string;

export type ExistingKeys<T> = keyof T;

export type ChainPaths = Partial<Record<chainIds, poolIds[]>>;

export type ChainPoolMap = {
  [K in chainIds]: {
    [P in poolIds]?: {
      address: Address;
      chainPaths: ChainPaths;
    };
  };
};
