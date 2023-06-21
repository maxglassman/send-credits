import { ethers, BigNumber } from 'ethers';
import { chainIds } from '../../shared/constants/chainIds';
import { chainPoolMapping } from '../../shared/constants/chainPoolMapping';
import { poolIds } from '../../shared/constants/poolIds';
import { getProviders } from '../../shared/utils/provider';
import { ChainPath, Pool } from '../models/PoolContract';
import { contractCallBackOff } from '../../shared/utils/contractCall';
import { poolAbi } from '../../shared/constants/contractABI/pool';
import { erc20Abi } from '../../shared/constants/contractABI/erc20';
import { getKeyByValue } from '../../shared/utils/enumKeyLookup';

export async function getAllPools(): Promise<any> {
  const chainPoolMap: any = chainPoolMapping;
  const poolPromiseArray = [];
  const chainId: any = chainIds;
  const poolId: any = poolIds;

  //variables for structuring response [{Pools: [{Pool1},{Pool2},{Pool3}],
  //                                    ChainPaths: [{ChainPath1},ChainPath2},ChainPath3}}]
  const resObj: any = {};
  const poolResArray: any = [];
  const chainPathResArray: any = [];

  for (const chain of Object.keys(chainPoolMap)) {
    for (const pool of Object.keys(chainPoolMap[chain])) {
      poolPromiseArray.push(getPool(parseInt(chain), parseInt(pool)));
    }
  }
  const poolArray: Pool[] = await Promise.all(poolPromiseArray);

  for (const pool of poolArray) {
    const srcPoolKey: string =
      getKeyByValue(chainId, pool.getChainId()) +
      '-' +
      getKeyByValue(poolId, pool.getPoolId());

    for (const path of pool.getChainPaths()) {
      const dstPoolKey: string =
        getKeyByValue(chainId, path.getDstChainId()) +
        '-' +
        getKeyByValue(poolId, path.getDstPoolId());
      const chainPathValues = {
        srcPool: srcPoolKey,
        dstPool: dstPoolKey,
        balance: path.getBalance(),
        idealBalance: path.getIdealBalance(),
        balancePerc: path.getBalance() / path.getIdealBalance(),
        credits: path.getCredits(),
      };
      chainPathResArray.push(chainPathValues);
    }
    const poolValues = {
      srcPool: srcPoolKey,
      balance: pool.getTokenBalance(),
      liquidityProvided: pool.getLiquidityProvided(),
      balancePerc: pool.getTokenBalance() / pool.getLiquidityProvided(),
      surplusDeficit: pool.getTokenBalance() - pool.getLiquidityProvided(),
      eqReward: pool.getEqReward(),
      eqRewardBps:
        pool.getTokenBalance() - pool.getLiquidityProvided() > 0
          ? 0
          : pool.getEqReward() /
            (pool.getLiquidityProvided() - pool.getTokenBalance()),
      address: pool.getAddress(),
      tokenAddress: pool.getTokenAddress(),
      deltaCredits: pool.getDeltaCredits(),
    };
    poolResArray.push(poolValues);
  }

  //store credits and deltaCredits in resObj.ChainPaths
  for (const path of chainPathResArray) {
    path.credits = storeCredits(chainPathResArray, path.srcPool, path.dstPool);
    path.deltaCredits = storeDeltaCredits(poolResArray, path.dstPool);
  }
  resObj.Pools = poolResArray;
  resObj.ChainPaths = chainPathResArray;
  return resObj;
}
//helper function for getAllPools, retrieves credits from resObj of oppositely directed paths and for each path in resObj.ChainPaths and stores in the resObj.ChainPaths array
function storeCredits(
  chainPathsArray: any,
  srcPool: string,
  dstPool: string
): number {
  let credits = 0;
  for (const path of chainPathsArray) {
    if (path.srcPool === dstPool && path.dstPool === srcPool) {
      credits = path.credits;
      return credits;
    }
  }
  return credits;
}
//helper function for getAllPools, retrieves deltaCredits from resObj of dstPool and stores in the resObj.ChainPaths array
function storeDeltaCredits(poolsArray: any, dstPool: string): number {
  let deltaCredits = 0;
  for (const pool of poolsArray) {
    if (pool.srcPool === dstPool) {
      deltaCredits = pool.deltaCredits;
      return deltaCredits;
    }
  }
  return deltaCredits;
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
