import { chainIds } from '../constants/chainIds';

type rpcUrl = string;

export type RPC = {
  [chainId in chainIds]: rpcUrl[];
};
