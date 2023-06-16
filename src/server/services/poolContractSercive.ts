import { ethers, BigNumber } from 'ethers';
import { chainIds } from '../../shared/constants/chainIds';
import { chainPoolMapping } from '../../shared/constants/chainPoolMapping';
import { poolIds } from '../../shared/constants/poolIds';
import { getProviders } from '../../shared/utils/provider';
import { ChainPath, Pool } from '../models/PoolContract';
import { contractCallBackOff } from '../../shared/utils/contractCall';
import { poolAbi } from '../../shared/constants/contractABI/pool';
import { erc20Abi } from '../../shared/constants/contractABI/erc20';
import { ChainPoolMap } from '../../shared/interfaces/chainPoolMap';

export async function getAllPools(
  chainPoolMapping: ChainPoolMap
): Promise<Pool[]> {
  const chainPoolMap: any = chainPoolMapping;
  const poolPromiseArray = [];

  for (const chain of Object.keys(chainPoolMap)) {
    for (const pool of Object.keys(chainPoolMap[chain])) {
      poolPromiseArray.push(getPool(parseInt(chain), parseInt(pool)));
    }
  }
  const poolArray: Pool[] = await Promise.all(poolPromiseArray);
  return poolArray;
}

export async function getPool(
  chainId: chainIds,
  poolId: poolIds
): Promise<Pool> {
  const providers = getProviders(chainId);
  const address = chainPoolMapping[chainId][poolId]?.address || '0x';

  const [
    sharedDecimals,
    tokenAddress,
    liquidityProvided,
    eqReward,
    deltaCredits,
    chainPaths,
  ] = await Promise.all([
    getSharedDecimals(address, poolAbi, providers),
    getTokenAddress(address, poolAbi, providers),
    getLiquidityProvided(address, poolAbi, providers),
    getEqReward(address, poolAbi, providers),
    getDeltaCredits(address, poolAbi, providers),
    getChainPaths(chainId, poolId, address, poolAbi, providers),
  ]);

  const tokenBalance = await getTokenBalance(
    address,
    tokenAddress,
    erc20Abi,
    providers
  );

  //format conversions
  const sharedDecimalsNum: number = parseInt(sharedDecimals.toString());
  const liquidityProvidedNum: number =
    parseInt(liquidityProvided.toString()) / 10 ** sharedDecimalsNum;
  const eqRewardNum: number =
    parseInt(eqReward.toString()) / 10 ** sharedDecimalsNum;
  const deltaCreditsNum: number =
    parseInt(deltaCredits.toString()) / 10 ** sharedDecimalsNum;

  return new Pool(
    chainId,
    poolId,
    address,
    sharedDecimalsNum,
    tokenAddress,
    tokenBalance,
    liquidityProvidedNum,
    eqRewardNum,
    deltaCreditsNum,
    chainPaths
  );
}

async function getSharedDecimals(
  address: string,
  abi: ethers.ContractInterface,
  providers: ethers.providers.JsonRpcProvider[]
): Promise<BigNumber> {
  return contractCallBackOff(address, abi, providers, 'sharedDecimals', []);
}

async function getTokenAddress(
  address: string,
  abi: ethers.ContractInterface,
  providers: ethers.providers.JsonRpcProvider[]
): Promise<string> {
  return contractCallBackOff(address, abi, providers, 'token', []);
}

async function getTokenBalance(
  address: string,
  tokenAddress: string,
  abi: ethers.ContractInterface, //erc20abi
  providers: ethers.providers.JsonRpcProvider[]
): Promise<number> {
  const [tokenBal, decimal] = await Promise.all([
    contractCallBackOff(tokenAddress, abi, providers, 'balanceOf', [address]),
    contractCallBackOff(tokenAddress, abi, providers, 'decimals', []),
  ]);

  const tokenBalNumber = tokenBal / 10 ** decimal;
  return tokenBalNumber;
}
async function getLiquidityProvided(
  address: string,
  abi: ethers.ContractInterface,
  providers: ethers.providers.JsonRpcProvider[]
): Promise<BigNumber> {
  return contractCallBackOff(address, abi, providers, 'totalLiquidity', []);
}
async function getEqReward(
  address: string,
  abi: ethers.ContractInterface,
  providers: ethers.providers.JsonRpcProvider[]
): Promise<BigNumber> {
  return contractCallBackOff(address, abi, providers, 'eqFeePool', []);
}
async function getDeltaCredits(
  address: string,
  abi: ethers.ContractInterface,
  providers: ethers.providers.JsonRpcProvider[]
): Promise<BigNumber> {
  return contractCallBackOff(address, abi, providers, 'deltaCredit', []);
}

async function getChainPaths(
  srcChainId: chainIds,
  srcPoolId: poolIds,
  address: string,
  abi: ethers.ContractInterface,
  providers: ethers.providers.JsonRpcProvider[]
): Promise<ChainPath[]> {
  const poolChainPaths: any =
    chainPoolMapping[srcChainId][srcPoolId]?.chainPaths;
  const chainPathPromises = [];

  for (const chain of Object.keys(poolChainPaths)) {
    for (const pool of poolChainPaths[chain]) {
      const chainPathProm = getChainPath(
        address,
        abi,
        providers,
        parseInt(chain),
        pool
      );
      chainPathPromises.push(chainPathProm);
    }
  }
  const chainPathsData = await Promise.all(chainPathPromises);
  const sharedDecimals = await getSharedDecimals(address, abi, providers);

  const sharedDecimalsNum = parseInt(sharedDecimals.toString());
  const chainPathsArray: ChainPath[] = [];
  for (const cp of chainPathsData) {
    chainPathsArray.push(
      handleChainPath(srcChainId, srcPoolId, cp, sharedDecimalsNum)
    );
  }
  return chainPathsArray;
}

async function getChainPath(
  address: string,
  abi: ethers.ContractInterface,
  providers: ethers.providers.JsonRpcProvider[],
  dstChainId: chainIds,
  dstPoolId: poolIds
): Promise<any[]> {
  return contractCallBackOff(address, abi, providers, 'getChainPath', [
    dstChainId,
    dstPoolId,
  ]);
}

function handleChainPath(
  srcChainId: chainIds,
  srcPoolId: poolIds,
  getChainPathResults: any,
  sharedDecimals: number
): ChainPath {
  const dstChainId = getChainPathResults.dstChainId;
  const dstPoolId = parseInt(getChainPathResults.dstPoolId.toString());
  const weight = parseInt(getChainPathResults.weight.toString());
  const balance = getChainPathResults.balance / 10 ** sharedDecimals;
  const lkb = getChainPathResults.lkb / 10 ** sharedDecimals;
  const credits = getChainPathResults.credits / 10 ** sharedDecimals;
  const idealBalance = getChainPathResults.idealBalance / 10 ** sharedDecimals;

  return new ChainPath(
    srcChainId,
    srcPoolId,
    dstChainId,
    dstPoolId,
    weight,
    balance,
    lkb,
    credits,
    idealBalance
  );
}

(async () => {
  const p = await getAllPools(chainPoolMapping);
  console.log(p[0].getChainPaths());
})();
