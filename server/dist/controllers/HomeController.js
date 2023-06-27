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
const poolContractService_1 = require("../services/poolContractService");
const HomeController = {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const poolData = yield (0, poolContractService_1.getAllPools)();
                return res.json(poolData);
            }
            catch (error) {
                console.error('Error fetching poolData:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    },
};
exports.default = HomeController;
