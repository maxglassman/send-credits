"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ConnectWalletButton = ({ connectWallet, }) => {
    return (0, jsx_runtime_1.jsx)("button", { onClick: connectWallet, children: "Connect Wallet" });
};
exports.default = ConnectWalletButton;
