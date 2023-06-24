import { ethers } from 'ethers';
import { ETHEREUM_CHAIN_IDS } from '../utils/constants/ethereumChainIds';
export const checkNework = async (
  provider: ethers.providers.Web3Provider,
  dstChainId: number
) => {
  const network = await provider?.getNetwork();
  return ETHEREUM_CHAIN_IDS[network?.chainId] === dstChainId;
};
