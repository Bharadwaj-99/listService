"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
var mongoose_1 = require("mongoose");
var MovieSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: { type: [String], required: true },
    releaseDate: { type: Date, required: true },
    director: { type: String, required: true },
    actors: { type: [String], required: true },
});
exports.Movie = mongoose_1.default.model('Movie', MovieSchema);
