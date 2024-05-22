"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    preferences: {
        favoriteGenres: { type: [String], required: true },
        dislikedGenres: { type: [String], required: true },
    },
    watchHistory: [
        {
            contentId: { type: String, required: true },
            watchedOn: { type: Date, required: true },
            rating: { type: Number, min: 1, max: 5 },
        },
    ],
});
exports.User = mongoose_1.default.model('User', UserSchema);
