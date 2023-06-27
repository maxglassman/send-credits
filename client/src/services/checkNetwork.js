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
exports.checkNework = void 0;
const ethereumChainIds_1 = require("../utils/constants/ethereumChainIds");
const checkNework = (provider, dstChainId) => __awaiter(void 0, void 0, void 0, function* () {
    const network = yield (provider === null || provider === void 0 ? void 0 : provider.getNetwork());
    return ethereumChainIds_1.ETHEREUM_CHAIN_IDS[network === null || network === void 0 ? void 0 : network.chainId] === dstChainId;
});
exports.checkNework = checkNework;
