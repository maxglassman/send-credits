"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainPathTable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SendCreditsButton_1 = require("./SendCreditsButton");
const CallDeltaAndSendCreditsButton_1 = require("./CallDeltaAndSendCreditsButton");
const ChainPathTable = (props) => {
    const [sortKey, setSortKey] = (0, react_1.useState)('');
    const [sortDirection, setSortDirection] = (0, react_1.useState)('asc');
    const [sourcePoolFilter, setSourcePoolFilter] = (0, react_1.useState)('');
    const [destinationPoolFilter, setDestinationPoolFilter] = (0, react_1.useState)('');
    const handleSort = (key) => {
        if (key === sortKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };
    const handleSourcePoolFilterChange = (event) => {
        setSourcePoolFilter(event.target.value);
    };
    const handleDestinationPoolFilterChange = (event) => {
        setDestinationPoolFilter(event.target.value);
    };
    const filteredDataItems = props.data.filter((item) => item.srcPool.toLowerCase().includes(sourcePoolFilter.toLowerCase()) &&
        item.dstPool.toLowerCase().includes(destinationPoolFilter.toLowerCase()));
    const sortedDataItems = [...filteredDataItems].sort((a, b) => {
        if (sortKey !== '') {
            let valueA = a[sortKey];
            let valueB = b[sortKey];
            //if sortKey is not equal to srcPool or dstPool, strip $, %, and commas from valueA and valueB, then convert to number.
            if (!(sortKey === 'srcPool' || sortKey === 'dstPool')) {
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: "chainpath-table", children: [(0, jsx_runtime_1.jsxs)("div", { className: "filter-container", children: [(0, jsx_runtime_1.jsx)("div", { className: "filter-column", children: (0, jsx_runtime_1.jsx)("input", { type: "text", className: "filter-input", placeholder: "Filter by Src Pool", value: sourcePoolFilter, onChange: handleSourcePoolFilterChange }) }), (0, jsx_runtime_1.jsx)("div", { className: "filter-column", children: (0, jsx_runtime_1.jsx)("input", { type: "text", className: "filter-input", placeholder: "Filter by Dst Pool", value: destinationPoolFilter, onChange: handleDestinationPoolFilterChange }) })] }), (0, jsx_runtime_1.jsxs)("table", { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('srcPool'), children: "Source Pool" }), (0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('dstPool'), children: "Destination Pool" }), (0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('balance'), children: "Balance" }), (0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('idealBalance'), children: "Ideal Balance" }), (0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('balancePerc'), children: "Percent" }), (0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('dstCredits'), children: "Dst Pool Credits" }), (0, jsx_runtime_1.jsx)("th", { onClick: () => handleSort('dstDeltaCredits'), children: "Dst Pool Delta Credits" }), (0, jsx_runtime_1.jsx)("th", { children: "Send Credits" }), (0, jsx_runtime_1.jsx)("th", { children: "Call Delta and Send Credits" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: sortedDataItems.map((item, index) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: item.srcPool }), (0, jsx_runtime_1.jsx)("td", { children: item.dstPool }), (0, jsx_runtime_1.jsx)("td", { children: item.balance }), (0, jsx_runtime_1.jsx)("td", { children: item.idealBalance }), (0, jsx_runtime_1.jsx)("td", { children: item.balancePerc }), (0, jsx_runtime_1.jsx)("td", { children: item.dstCredits }), (0, jsx_runtime_1.jsx)("td", { children: item.dstDeltaCredits }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)(SendCreditsButton_1.SendCreditsButton, { provider: props.provider, signer: props.signer, chainPath: item }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)(CallDeltaAndSendCreditsButton_1.CallDeltaButton, { provider: props.provider, signer: props.signer, chainPath: item }) })] }, index))) })] })] }));
};
exports.ChainPathTable = ChainPathTable;
