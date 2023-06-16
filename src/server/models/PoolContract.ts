import { chainIds } from '../../shared/constants/chainIds';
import { poolIds } from '../../shared/constants/poolIds';

//may want to add functions for calling delta & sending credits
export class Pool {
  private _chainId: chainIds;
  private _poolId: poolIds;
  private _address: string;
  private _sharedDecimals: number;
  private _tokenAddress: string;
  private _tokenBalance: number;
  private _liquidityProvided: number;
  private _eqReward: number;
  private _deltaCredits: number;
  private _chainPaths: ChainPath[];

  constructor(
    chainId: number,
    poolId: number,
    address: string,
    sharedDecimals: number,
    tokenAddress: string,
    tokenBalance: number,
    liquidityProvided: number,
    eqReward: number,
    deltaCredits: number,
    chainPaths: ChainPath[]
  ) {
    this._chainId = chainId;
    this._poolId = poolId;
    this._address = address;
    this._sharedDecimals = sharedDecimals;
    this._tokenAddress = tokenAddress;
    this._tokenBalance = tokenBalance;
    this._liquidityProvided = liquidityProvided;
    this._eqReward = eqReward;
    this._deltaCredits = deltaCredits;
    this._chainPaths = chainPaths;
  }
  getChainId(): number {
    return this._chainId;
  }
  getPoolId(): number {
    return this._poolId;
  }
  getAddress(): string {
    return this._address;
  }
  getSharedDecimals(): number {
    return this._sharedDecimals;
  }
  getTokenAddress(): string {
    return this._tokenAddress;
  }
  getTokenBalance(): number {
    return this._tokenBalance;
  }
  getLiquidityProvided(): number {
    return this._liquidityProvided;
  }
  getEqReward(): number {
    return this._eqReward;
  }
  getDeltaCredits(): number {
    return this._deltaCredits;
  }
  getChainPaths(): ChainPath[] {
    return this._chainPaths;
  }
}

export class ChainPath {
  srcChainId: chainIds;
  srcPoolId: poolIds;
  dstChainId: chainIds;
  dstPoolId: poolIds;
  weight: number;
  balance: number;
  lkb: number;
  credits: number;
  idealBalance: number;

  constructor(
    srcChainId: chainIds,
    srcPoolId: poolIds,
    dstChainId: chainIds,
    dstPoolId: poolIds,
    weight: number,
    balance: number,
    lkb: number,
    credits: number,
    idealBalance: number
  ) {
    this.srcChainId = srcChainId;
    this.srcPoolId = srcPoolId;
    this.dstChainId = dstChainId;
    this.dstPoolId = dstPoolId;
    this.weight = weight;
    this.balance = balance;
    this.lkb = lkb;
    this.credits = credits;
    this.idealBalance = idealBalance;
  }
}
