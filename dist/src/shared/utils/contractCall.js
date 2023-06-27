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
exports.contractCallBackOff = void 0;
const ethers_1 = require("ethers");
function contractCallBackOff(address, abi, providers, fn, args) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const p of providers) {
            for (let attempt = 1; attempt <= 5; attempt++) {
                try {
                    const contract = new ethers_1.ethers.Contract(address, abi, p);
                    const result = yield contract.callStatic[fn](...args);
                    return result;
                }
                catch (error) {
                    console.error(`Attempt ${attempt} failed for function: ${fn} on network:${p.network} for address:${address}`);
                    if (attempt < 5) {
                        const backoffTime = Math.pow(2, attempt) * 10;
                        yield new Promise((resolve) => setTimeout(resolve, backoffTime));
                    }
                }
            }
        }
        throw new Error(`All contract calls have failed for address:${address} for function:${fn}`);
    });
}
exports.contractCallBackOff = contractCallBackOff;
