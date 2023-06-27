"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatChainPathData = exports.formatPoolData = exports.formatBps = exports.formatPercent = exports.formatNumber = void 0;
const stablecoin_1 = require("./constants/stablecoin");
const formatNumber = (number, srcPoolId) => {
    const isStablecoin = stablecoin_1.stablecoinIds.includes(srcPoolId);
    const formattedNumber = isStablecoin
        ? `$${number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
        : number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedNumber;
};
exports.formatNumber = formatNumber;
const formatPercent = (number) => {
    const formattedPercent = `${(number * 100).toFixed(2)}%`;
    return formattedPercent;
};
exports.formatPercent = formatPercent;
const formatBps = (number) => {
    const formattedBps = (number * 10000).toFixed(2);
    return formattedBps;
};
exports.formatBps = formatBps;
const formatPoolData = (data) => {
    return data.map((item) => (Object.assign(Object.assign({}, item), { balance: (0, exports.formatNumber)(item.balance, item.srcPoolId), liquidityProvided: (0, exports.formatNumber)(item.liquidityProvided, item.srcPoolId), balancePerc: (0, exports.formatPercent)(item.balancePerc), surplusDeficit: (0, exports.formatNumber)(item.surplusDeficit, item.srcPoolId), eqReward: (0, exports.formatNumber)(item.eqReward, item.srcPoolId), eqRewardBps: (0, exports.formatBps)(item.eqRewardBps), deltaCredits: (0, exports.formatNumber)(item.deltaCredits, item.srcPoolId) })));
};
exports.formatPoolData = formatPoolData;
const formatChainPathData = (data) => {
    return data.map((item) => (Object.assign(Object.assign({}, item), { balance: (0, exports.formatNumber)(item.balance, item.srcPoolId), idealBalance: (0, exports.formatNumber)(item.idealBalance, item.srcPoolId), balancePerc: (0, exports.formatPercent)(item.balancePerc), dstCredits: (0, exports.formatNumber)(item.dstCredits, item.srcPoolId), dstDeltaCredits: (0, exports.formatNumber)(item.dstDeltaCredits, item.srcPoolId) })));
};
exports.formatChainPathData = formatChainPathData;
