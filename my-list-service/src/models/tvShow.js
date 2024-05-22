"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TVShow = void 0;
var mongoose_1 = require("mongoose");
var EpisodeSchema = new mongoose_1.Schema({
    episodeNumber: { type: Number, required: true },
    seasonNumber: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    director: { type: String, required: true },
    actors: { type: [String], required: true },
});
var TVShowSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: { type: [String], required: true },
    episodes: { type: [EpisodeSchema], required: true },
});
exports.TVShow = mongoose_1.default.model('TVShow', TVShowSchema);
