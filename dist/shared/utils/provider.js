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
exports.providerExponentialBackoff = exports.getProviders = void 0;
const ethers_1 = require("ethers");
const rpcMapping_1 = require("../constants/rpcMapping");
function createProvider(chainId, index) {
    return new Promise((resolve, reject) => {
        const rpcUrls = rpcMapping_1.rpcMapping[chainId];
        if (!rpcUrls || index >= rpcUrls.length) {
            reject(new Error('Invalid chainId or index'));
            return;
        }
        const url = rpcUrls[index];
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(url);
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
function getProviders(chainId) {
    const rpcUrls = rpcMapping_1.rpcMapping[chainId];
    const providers = [];
    for (const r of rpcUrls) {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(r);
        providers.push(provider);
    }
    return providers;
}
exports.getProviders = getProviders;
function providerExponentialBackoff(chainId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rpcUrls = rpcMapping_1.rpcMapping[chainId];
        if (!rpcUrls) {
            throw new Error(`No RPC URLs found for chainId: ${chainId}`);
        }
        for (const url of rpcUrls) {
            for (let attempt = 1; attempt <= 5; attempt++) {
                try {
                    const provider = yield createProvider(chainId, rpcUrls.indexOf(url));
                    return provider;
                }
                catch (error) {
                    console.error(`Attempt ${attempt} failed for chainId ${chainId}, URL: ${url}`);
                    if (attempt < 5) {
                        const backoffTime = Math.pow(2, attempt) * 10;
                        yield new Promise((resolve) => setTimeout(resolve, backoffTime));
                    }
                }
            }
        }
        throw new Error(`All RPCs for chainId ${chainId} have failed.`);
    });
}
exports.providerExponentialBackoff = providerExponentialBackoff;
