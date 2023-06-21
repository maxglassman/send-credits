import { ethers } from 'ethers';
import { rpcMapping } from '../constants/rpcMapping';
import { chainIds } from '../constants/chainIds';

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

export function getProviders(
  chainId: chainIds
): ethers.providers.JsonRpcProvider[] {
  const rpcUrls = rpcMapping[chainId];
  const providers = [];
  for (const r of rpcUrls) {
    const provider = new ethers.providers.JsonRpcProvider(r);
    providers.push(provider);
  }
  return providers;
}

export async function providerExponentialBackoff(
  chainId: chainIds
): Promise<ethers.providers.JsonRpcProvider> {
  const rpcUrls = rpcMapping[chainId];
  if (!rpcUrls) {
    throw new Error(`No RPC URLs found for chainId: ${chainId}`);
  }

  for (const url of rpcUrls) {
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        const provider = await createProvider(chainId, rpcUrls.indexOf(url));
        return provider;
      } catch (error) {
        console.error(
          `Attempt ${attempt} failed for chainId ${chainId}, URL: ${url}`
        );
        if (attempt < 5) {
          const backoffTime = Math.pow(2, attempt) * 10;
          await new Promise((resolve) => setTimeout(resolve, backoffTime));
        }
      }
    }
  }

  throw new Error(`All RPCs for chainId ${chainId} have failed.`);
}

// (async () => {
//   const providers = getProviders(101);
//   console.log(providers);
// })();
