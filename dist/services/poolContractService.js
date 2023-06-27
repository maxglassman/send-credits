"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPool = exports.getAllPools = void 0;
const chainIds_1 = require("../shared/constants/chainIds");
const chainPoolMapping_1 = require("../shared/constants/chainPoolMapping");
const poolIds_1 = require("../shared/constants/poolIds");
const provider_1 = require("../shared/utils/provider");
const PoolContract_1 = require("../models/PoolContract");
const contractCall_1 = require("../shared/utils/contractCall");
const pool_1 = require("../shared/constants/contractABI/pool");
const erc20_1 = require("../shared/constants/contractABI/erc20");
const enumKeyLookup_1 = require("../shared/utils/enumKeyLookup");
function getAllPools() {
    return __awaiter(this, void 0, void 0, function* () {
        const chainPoolMap = chainPoolMapping_1.chainPoolMapping;
        //create variable poolPromiseArray to store promises for each pool
        const poolPromiseArray = [];
        const chainId = chainIds_1.chainIds;
        const poolId = poolIds_1.poolIds;
        //variables for structuring response [{Pools: [{Pool1},{Pool2},{Pool3}],
        //                                    ChainPaths: [{ChainPath1},ChainPath2},ChainPath3}}]
        const resObj = {};
        const poolResArray = [];
        const chainPathResArray = [];
        for (const chain of Object.keys(chainPoolMap)) {
            for (const pool of Object.keys(chainPoolMap[chain])) {
                poolPromiseArray.push(getPool(parseInt(chain), parseInt(pool)));
            }
        }
        const poolArray = yield Promise.all(poolPromiseArray);
        for (const pool of poolArray) {
            const srcPoolKey = (0, enumKeyLookup_1.getKeyByValue)(chainId, pool.getChainId()) +
                '-' +
                (0, enumKeyLookup_1.getKeyByValue)(poolId, pool.getPoolId());
            for (const path of pool.getChainPaths()) {
                const dstPoolKey = (0, enumKeyLookup_1.getKeyByValue)(chainId, path.getDstChainId()) +
                    '-' +
                    (0, enumKeyLookup_1.getKeyByValue)(poolId, path.getDstPoolId());
                const chainPathValues = {
                    srcChainId: path.getSrcChainId(),
                    srcPool: srcPoolKey,
                    srcPoolId: path.getSrcPoolId(),
                    dstChainId: path.getDstChainId(),
                    dstPool: dstPoolKey,
                    dstPoolId: path.getDstPoolId(),
                    balance: path.getBalance(),
                    idealBalance: path.getIdealBalance(),
                    balancePerc: path.getBalance() / path.getIdealBalance(),
                    credits: path.getCredits(),
                };
                chainPathResArray.push(chainPathValues);
            }
            const poolValues = {
                srcPool: srcPoolKey,
                srcPoolId: pool.getPoolId(),
                balance: pool.getTokenBalance(),
                liquidityProvided: pool.getLiquidityProvided(),
                balancePerc: pool.getTokenBalance() / pool.getLiquidityProvided(),
                surplusDeficit: pool.getTokenBalance() - pool.getLiquidityProvided(),
                eqReward: pool.getEqReward(),
                eqRewardBps: pool.getTokenBalance() - pool.getLiquidityProvided() > 0
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
            path.dstCredits = storeCredits(chainPathResArray, path.srcPool, path.dstPool);
            path.dstDeltaCredits = storeDeltaCredits(poolResArray, path.dstPool);
        }
        resObj.Pools = poolResArray;
        resObj.ChainPaths = chainPathResArray;
        return resObj;
    });
}
exports.getAllPools = getAllPools;
//helper function for getAllPools, retrieves credits from resObj of oppositely directed paths and for each path in resObj.ChainPaths and stores in the resObj.ChainPaths array
function storeCredits(chainPathsArray, srcPool, dstPool) {
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
function storeDeltaCredits(poolsArray, dstPool) {
    let deltaCredits = 0;
    for (const pool of poolsArray) {
        if (pool.srcPool === dstPool) {
            deltaCredits = pool.deltaCredits;
            return deltaCredits;
        }
    }
    return deltaCredits;
}
function getPool(chainId, poolId) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const providers = (0, provider_1.getProviders)(chainId);
        const address = ((_a = chainPoolMapping_1.chainPoolMapping[chainId][poolId]) === null || _a === void 0 ? void 0 : _a.address) || '0x';
        const [sharedDecimals, tokenAddress, liquidityProvided, eqReward, deltaCredits, chainPaths,] = yield Promise.all([
            getSharedDecimals(address, pool_1.poolAbi, providers),
            getTokenAddress(address, pool_1.poolAbi, providers),
            getLiquidityProvided(address, pool_1.poolAbi, providers),
            getEqReward(address, pool_1.poolAbi, providers),
            getDeltaCredits(address, pool_1.poolAbi, providers),
            getChainPaths(chainId, poolId, address, pool_1.poolAbi, providers),
        ]);
        const tokenBalance = yield getTokenBalance(address, tokenAddress, erc20_1.erc20Abi, providers);
        //format conversions
        const sharedDecimalsNum = parseInt(sharedDecimals.toString());
        const liquidityProvidedNum = parseInt(liquidityProvided.toString()) / 10 ** sharedDecimalsNum;
        const eqRewardNum = parseInt(eqReward.toString()) / 10 ** sharedDecimalsNum;
        const deltaCreditsNum = parseInt(deltaCredits.toString()) / 10 ** sharedDecimalsNum;
        return new PoolContract_1.Pool(chainId, poolId, address, sharedDecimalsNum, tokenAddress, tokenBalance, liquidityProvidedNum, eqRewardNum, deltaCreditsNum, chainPaths);
    });
}
exports.getPool = getPool;
function getSharedDecimals(address, abi, providers) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, contractCall_1.contractCallBackOff)(address, abi, providers, 'sharedDecimals', []);
    });
}
function getTokenAddress(address, abi, providers) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, contractCall_1.contractCallBackOff)(address, abi, providers, 'token', []);
    });
}
function getTokenBalance(address, tokenAddress, abi, //erc20abi
providers) {
    return __awaiter(this, void 0, void 0, function* () {
        const [tokenBal, decimal] = yield Promise.all([
            (0, contractCall_1.contractCallBackOff)(tokenAddress, abi, providers, 'balanceOf', [address]),
            (0, contractCall_1.contractCallBackOff)(tokenAddress, abi, providers, 'decimals', []),
        ]);
        const tokenBalNumber = tokenBal / 10 ** decimal;
        return tokenBalNumber;
    });
}
function getLiquidityProvided(address, abi, providers) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, contractCall_1.contractCallBackOff)(address, abi, providers, 'totalLiquidity', []);
    });
}
function getEqReward(address, abi, providers) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, contractCall_1.contractCallBackOff)(address, abi, providers, 'eqFeePool', []);
    });
}
function getDeltaCredits(address, abi, providers) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, contractCall_1.contractCallBackOff)(address, abi, providers, 'deltaCredit', []);
    });
}
function getChainPaths(srcChainId, srcPoolId, address, abi, providers) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const poolChainPaths = (_a = chainPoolMapping_1.chainPoolMapping[srcChainId][srcPoolId]) === null || _a === void 0 ? void 0 : _a.chainPaths;
        const chainPathPromises = [];
        for (const chain of Object.keys(poolChainPaths)) {
            for (const pool of poolChainPaths[chain]) {
                const chainPathProm = getChainPath(address, abi, providers, parseInt(chain), pool);
                chainPathPromises.push(chainPathProm);
            }
        }
        const chainPathsData = yield Promise.all(chainPathPromises);
        const sharedDecimals = yield getSharedDecimals(address, abi, providers);
        const sharedDecimalsNum = parseInt(sharedDecimals.toString());
        const chainPathsArray = [];
        for (const cp of chainPathsData) {
            chainPathsArray.push(handleChainPath(srcChainId, srcPoolId, cp, sharedDecimalsNum));
        }
        return chainPathsArray;
    });
}
function getChainPath(address, abi, providers, dstChainId, dstPoolId) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, contractCall_1.contractCallBackOff)(address, abi, providers, 'getChainPath', [
            dstChainId,
            dstPoolId,
        ]);
    });
}
function handleChainPath(srcChainId, srcPoolId, getChainPathResults, sharedDecimals) {
    const dstChainId = getChainPathResults.dstChainId;
    const dstPoolId = parseInt(getChainPathResults.dstPoolId.toString());
    const weight = parseInt(getChainPathResults.weight.toString());
    const balance = getChainPathResults.balance / 10 ** sharedDecimals;
    const lkb = getChainPathResults.lkb / 10 ** sharedDecimals;
    const credits = getChainPathResults.credits / 10 ** sharedDecimals;
    const idealBalance = getChainPathResults.idealBalance / 10 ** sharedDecimals;
    return new PoolContract_1.ChainPath(srcChainId, srcPoolId, dstChainId, dstPoolId, weight, balance, lkb, credits, idealBalance);
}
