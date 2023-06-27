"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainPath = exports.Pool = void 0;
//may want to add functions for calling delta & sending credits
class Pool {
    constructor(chainId, poolId, address, sharedDecimals, tokenAddress, tokenBalance, liquidityProvided, eqReward, deltaCredits, chainPaths) {
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
    getChainId() {
        return this._chainId;
    }
    getPoolId() {
        return this._poolId;
    }
    getAddress() {
        return this._address;
    }
    getSharedDecimals() {
        return this._sharedDecimals;
    }
    getTokenAddress() {
        return this._tokenAddress;
    }
    getTokenBalance() {
        return this._tokenBalance;
    }
    getLiquidityProvided() {
        return this._liquidityProvided;
    }
    getEqReward() {
        return this._eqReward;
    }
    getDeltaCredits() {
        return this._deltaCredits;
    }
    getChainPaths() {
        return this._chainPaths;
    }
}
exports.Pool = Pool;
class ChainPath {
    constructor(srcChainId, srcPoolId, dstChainId, dstPoolId, weight, balance, lkb, credits, idealBalance) {
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
    getSrcChainId() {
        return this._srcChainId;
    }
    getSrcPoolId() {
        return this._srcPoolId;
    }
    getDstChainId() {
        return this._dstChainId;
    }
    getDstPoolId() {
        return this._dstPoolId;
    }
    getWeight() {
        return this._weight;
    }
    getBalance() {
        return this._balance;
    }
    getIdealBalance() {
        return this._idealBalance;
    }
    getLkb() {
        return this._lkb;
    }
    getCredits() {
        return this._credits;
    }
}
exports.ChainPath = ChainPath;
