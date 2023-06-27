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
exports.CallDeltaButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const contractCall_1 = require("../services/contractCall");
const contracts_1 = require("../constants/contracts");
const router_1 = require("../constants/contractABI/router");
const checkNetwork_1 = require("../services/checkNetwork");
const CallDeltaButton = (props) => {
    const handleCallDeltaSendCredits = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!props.provider || !props.signer) {
            alert('Please connect your wallet first.');
            return;
        }
        if (!(yield (0, checkNetwork_1.checkNework)(props.provider, props.chainPath.dstChainId))) {
            alert('Please connect to the correct network');
            return;
        }
        const contractAddress = contracts_1.routerAddresses[props.chainPath.dstChainId];
        const contractABI = router_1.routerABI;
        const signerAddress = yield props.signer.getAddress();
        yield (0, contractCall_1.contractCall)(props.provider, props.signer, contractAddress, contractABI, 'callDelta', [props.chainPath.dstPoolId, 0]);
        (0, contractCall_1.contractCall)(props.provider, props.signer, contractAddress, contractABI, 'sendCredits', [
            props.chainPath.srcChainId,
            props.chainPath.dstPoolId,
            props.chainPath.srcPoolId,
            signerAddress,
        ], '.03');
    });
    return ((0, jsx_runtime_1.jsx)("button", { onClick: handleCallDeltaSendCredits, children: "Call Delta & Send Credits" }));
};
exports.CallDeltaButton = CallDeltaButton;
