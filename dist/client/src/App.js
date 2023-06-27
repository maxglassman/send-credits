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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./App.css");
const react_1 = require("react");
const PoolTable_1 = require("./components/PoolTable");
const ChainPathTable_1 = require("./components/ChainPathTable");
const formatting_1 = require("./utils/formatting");
const dotenv_1 = __importDefault(require("dotenv"));
const ethers_1 = require("ethers");
const ConnectWalletButton_1 = __importDefault(require("./components/ConnectWalletButton"));
dotenv_1.default.config();
const App = () => {
    const [activeTab, setActiveTab] = (0, react_1.useState)('Pool');
    const [poolData, setPoolData] = (0, react_1.useState)([]);
    const [chainPathData, setChainPathData] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true); // New state for loading
    const [walletAddress, setWalletAddress] = (0, react_1.useState)('');
    const [provider, setProvider] = (0, react_1.useState)();
    const [signer, setSigner] = (0, react_1.useState)();
    const connectWallet = () => __awaiter(void 0, void 0, void 0, function* () {
        // Connect to the Ethereum provider
        // @ts-ignore
        if (window.ethereum) {
            try {
                //@ts-ignore
                yield window.ethereum.request({ method: 'eth_requestAccounts' });
                //@ts-ignore
                const provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                // Update state variables
                setProvider(provider);
                setSigner(signer);
                // Set the wallet address
                setWalletAddress(yield signer.getAddress());
            }
            catch (error) {
                console.error('Error connecting wallet:', error);
            }
        }
        else {
            alert("Please install MetaMask to use this site's full features.");
        }
    });
    const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(process.env.REACT_APP_SERVER_API || '');
            const data = yield response.json();
            const formattedPoolData = (0, formatting_1.formatPoolData)(data.Pools);
            const formattedChainPathData = (0, formatting_1.formatChainPathData)(data.ChainPaths);
            setPoolData(formattedPoolData);
            setChainPathData(formattedChainPathData);
            setLoading(false); // Update loading state after successful fetch
        }
        catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); // Update loading state in case of error
        }
    });
    (0, react_1.useEffect)(() => {
        fetchData();
    }, []);
    // Render loading screen if data is still loading
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "loading-screen", children: (0, jsx_runtime_1.jsx)("h1", { className: "loading-text", children: "Steady lads, loading Stargate data..." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("nav", { className: "navbar", children: (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "#Pool", onClick: () => setActiveTab('Pool'), className: activeTab === 'Pool' ? 'active' : '', children: "Pools" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "#ChainPaths", onClick: () => setActiveTab('ChainPaths'), className: activeTab === 'ChainPaths' ? 'active' : '', children: "Chain Paths" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(ConnectWalletButton_1.default, { connectWallet: connectWallet }) })] }) }), (0, jsx_runtime_1.jsxs)("h3", { className: "walletAddress", children: ["Wallet Address: ", walletAddress] }), (0, jsx_runtime_1.jsxs)("header", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Send Credits" }), (0, jsx_runtime_1.jsx)("h2", { children: "A tool for monitoring & correcting Stargate Pathways." })] }), activeTab === 'Pool' && (0, jsx_runtime_1.jsx)(PoolTable_1.PoolTable, { data: poolData }), activeTab === 'ChainPaths' && ((0, jsx_runtime_1.jsx)(ChainPathTable_1.ChainPathTable, { data: chainPathData, provider: provider, signer: signer }))] }));
};
exports.default = App;
