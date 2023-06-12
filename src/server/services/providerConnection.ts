import { ethers } from 'ethers';
import { rpcMapping } from '../../shared/constants/rpcMapping';
import { chainIds } from '../../shared/constants/chainIds';

function createProvider(
  chainId: chainIds,
  index: number
): Promise<ethers.providers.JsonRpcProvider> {
  return new Promise((resolve, reject) => {
    const rpcUrls = rpcMapping[chainId];
    if (!rpcUrls || index >= rpcUrls.length) {
      reject(new Error('Invalid chainId or index'));
      return;
    }
    const url = rpcUrls[index];
    const provider = new ethers.providers.JsonRpcProvider(url);

    provider
      .getBlockNumber()
      .then((blockNumber) => {
        resolve(provider);
      })
      .catch((error) => {
        reject(new Error('Failed to read block number on the provider'));
      });
  });
}

// (async () => {
//   const provider = await createProvider(102, 0);
//   console.log(provider);
// })();
