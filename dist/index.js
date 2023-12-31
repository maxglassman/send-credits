"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./setup-env");
dotenv_1.default.config({ path: '../.env' });
const app = (0, express_1.default)();
const port = process.env.PORT || 8000; // Use dynamic port assigned by Heroku or default to 8000
//CORS
app.use((0, cors_1.default)());
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/', routes_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
