import { chainIds } from '../../shared/constants/chainIds';
import { poolIds } from '../../shared/constants/poolIds';

//may want to add functions for calling delta & sending credits
export class Pool {
  private _chainId: number;
  private _poolId: number;
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
  private _srcChainId: number;
  private _srcPoolId: number;
  private _dstChainId: number;
  private _dstPoolId: number;
  private _weight: number;
  private _balance: number;
  private _lkb: number;
  private _credits: number;
  private _idealBalance: number;

  constructor(
    srcChainId: number,
    srcPoolId: number,
    dstChainId: number,
    dstPoolId: number,
    weight: number,
    balance: number,
    lkb: number,
    credits: number,
    idealBalance: number
  ) {
    this._srcChainId = srcChainId;
    this._srcPoolId = srcPoolId;
    this._dstChainId = dstChainId;
    this._dstPoolId = dstPoolId;
    this._weight = weight;
    this._balance = balance;
    this._lkb = lkb;
    this._credits = credits;
    this._idealBalance = idealBalance;
  }
  getSrcChainId(): number {
    return this._srcChainId;
  }
  getSrcPoolId(): number {
    return this._srcPoolId;
  }
  getDstChainId(): number {
    return this._dstChainId;
  }
  getDstPoolId(): number {
    return this._dstPoolId;
  }
  getWeight(): number {
    return this._weight;
  }
  getBalance(): number {
    return this._balance;
  }
  getIdealBalance(): number {
    return this._idealBalance;
  }
  getLkb(): number {
    return this._lkb;
  }
  getCredits(): number {
    return this._credits;
  }
}
