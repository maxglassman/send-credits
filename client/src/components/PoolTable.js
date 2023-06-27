"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolTable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const PoolTable = ({ data }) => {
    const [sortKey, setSortKey] = (0, react_1.useState)('');
    const [sortDirection, setSortDirection] = (0, react_1.useState)('asc');
    const [poolFilter, setPoolFilter] = (0, react_1.useState)('');
    const handleSort = (key) => {
        if (key === sortKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };
    const handlePoolFilterChange = (event) => {
        setPoolFilter(event.target.value);
    };
    const filteredDataItems = data.filter((item) => item.srcPool.toLowerCase().includes(poolFilter.toLowerCase()));
    const sortedDataItems = [...filteredDataItems].sort((a, b) => {
        if (sortKey !== '') {
            let valueA = a[sortKey];
            let valueB = b[sortKey];
            //if sortKey is not equal to srcPool, strip $, %, and commas from valueA and valueB, then convert to number.
            if (sortKey !== 'srcPool') {
                valueA = Number(valueA.replace(/[$,%]/g, ''));
                valueB = Number(valueB.replace(/[$,%]/g, ''));
            }
            if (valueA < valueB) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDirection === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "filter-container", children: (0, jsx_runtime_1.jsx)("input", { type: "text", className: "filter-input", placeholder: "Filter by Pool", value: poolFilter, onChange: handlePoolFilterChange }) }), (0, jsx_runtime_1.jsxs)("table", { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('srcPool'), children: "Pool" }), (0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('balance'), children: "Balance" }), (0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('liquidityProvided'), children: "Liquidity Provided" }), (0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('balancePerc'), children: "%" }), (0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('surplusDeficit'), children: "Surplus/Deficit" }), (0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('eqReward'), children: "Eq Reward" }), (0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('eqRewardBps'), children: "Eq Reward Bps" }), (0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('deltaCredits'), children: "Delta Credits" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: sortedDataItems.map((item, index) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: item.srcPool }), (0, jsx_runtime_1.jsx)("td", { children: item.balance }), (0, jsx_runtime_1.jsx)("td", { children: item.liquidityProvided }), (0, jsx_runtime_1.jsx)("td", { children: item.balancePerc }), (0, jsx_runtime_1.jsx)("td", { children: item.surplusDeficit }), (0, jsx_runtime_1.jsx)("td", { children: item.eqReward }), (0, jsx_runtime_1.jsx)("td", { children: item.eqRewardBps }), (0, jsx_runtime_1.jsx)("td", { children: item.deltaCredits })] }, index))) })] })] }));
};
exports.PoolTable = PoolTable;
