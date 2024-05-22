"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserList = void 0;
var mongoose_1 = require("mongoose");
var UserListSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    contentId: { type: String, required: true },
    contentType: { type: String, required: true, enum: ['Movie', 'TVShow'] },
    addedAt: { type: Date, required: true, default: Date.now },
});
exports.UserList = mongoose_1.default.model('UserList', UserListSchema);
