"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var myListRoutes_1 = require("./routes/myListRoutes");
var db_1 = require("./utils/db");
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/mylist', myListRoutes_1.default);
// Health check route
app.get('/health', function (req, res) {
    res.status(200).send('OK');
});
// Connect to the database and start the server
(0, db_1.connectToDatabase)().then(function () {
    app.listen(port, function () {
        console.log("Server is running on port ".concat(port));
    });
});
