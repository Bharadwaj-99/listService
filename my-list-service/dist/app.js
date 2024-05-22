"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const myListRoutes_1 = __importDefault(require("./routes/myListRoutes"));
const db_1 = require("./utils/db");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/mylist', myListRoutes_1.default);
// Health check route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});
// Connect to the database and start the server
(0, db_1.connectToDatabase)().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
