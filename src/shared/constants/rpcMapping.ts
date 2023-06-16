import { chainIds } from './chainIds';
import { RPC } from '../interfaces/rpcMap';

//all public, sourced from chainlist.
export const rpcMapping: RPC = {
  [chainIds.ETHEREUM]: [
    'https://eth.llamarpc.com',
    'https://rpc.ankr.com/eth',
    'https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7',
    'https://mainnet.gateway.tenderly.co',
    'https://virginia.rpc.blxrbdn.com',
  ],
  [chainIds.BSC]: [
    'https://bsc.blockpi.network/v1/rpc/public',
    'https://bsc.rpc.blxrbdn.com',
    'https://bsc-dataseed3.defibit.io',
    'https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3',
    'https://bsc-dataseed3.defibit.io',
  ],
  [chainIds.AVALANCHE]: [
    'https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc',
    'https://avalanche.blockpi.network/v1/rpc/public',
    'https://avax.meowrpc.com',
    'https://avalanche-c-chain.publicnode.com',
    'https://rpc.ankr.com/avalanche',
  ],
  [chainIds.POLYGON]: [
    'https://polygon.llamarpc.com',
    'https://polygon.blockpi.network/v1/rpc/public',
    'https://1rpc.io/matic',
    'https://polygon.rpc.blxrbdn.com',
    'https://rpc.ankr.com/polygon',
  ],
  [chainIds.ARBITRUM]: [
    'https://rpc.arb1.arbitrum.gateway.fm',
    'https://endpoints.omniatech.io/v1/arbitrum/one/public',
    'https://rpc.ankr.com/arbitrum',
    'https://rpc.arb1.arbitrum.gateway.fm',
    'https://arbitrum.blockpi.network/v1/rpc/public',
  ],
  [chainIds.OPTIMISM]: [
    'https://opt-mainnet.g.alchemy.com/v2/0Do2F8gsDM34kqjDDh51r1SPEYrxJCsN',
    'https://optimism.meowrpc.com',
    'https://optimism-mainnet.public.blastapi.io',
    'https://optimism.blockpi.network/v1/rpc/public',
    'https://optimism.publicnode.com',
  ],
  [chainIds.FANTOM]: [
    'https://fantom.api.onfinality.io/public',
    'https://endpoints.omniatech.io/v1/fantom/mainnet/public',
    'https://fantom-mainnet.gateway.pokt.network/v1/lb/62759259ea1b320039c9e7ac',
    'https://rpc.fantom.network',
    'https://fantom.publicnode.com',
  ],
  [chainIds.METIS]: ['https://andromeda.metis.io/?owner=1088'],
};
