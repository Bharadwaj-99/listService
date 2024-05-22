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
exports.MyListService = void 0;
const userList_1 = require("../models/userList");
const movie_1 = require("../models/movie");
const tvShow_1 = require("../models/tvShow");
class MyListService {
    addToMyList(userId, contentId, contentType) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the item already exists in the user's list
            const existingItem = yield userList_1.UserList.findOne({ userId, contentId });
            if (existingItem) {
                throw new Error('Item already exists in the list');
            }
            // Add the item to the user's list
            const newItem = new userList_1.UserList({ userId, contentId, contentType, addedAt: new Date() });
            yield newItem.save();
            return { message: 'Item added to the list' };
        });
    }
    removeFromMyList(userId, contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove the item from the user's list
            const result = yield userList_1.UserList.deleteOne({ userId, contentId });
            if (result.deletedCount === 0) {
                throw new Error('Item not found in the list');
            }
            return { message: 'Item removed from the list' };
        });
    }
    listMyItems(userId_1, _a) {
        return __awaiter(this, arguments, void 0, function* (userId, { limit = 10, offset = 0 }) {
            // Get the user's list items
            const userListItems = yield userList_1.UserList.find({ userId })
                .skip(offset)
                .limit(limit)
                .sort({ addedAt: -1 })
                .lean();
            // Fetch additional details for each item
            const itemDetails = yield Promise.all(userListItems.map((item) => __awaiter(this, void 0, void 0, function* () {
                if (item.contentType === 'Movie') {
                    const movie = yield movie_1.Movie.findById(item.contentId);
                    return movie;
                }
                else {
                    const tvShow = yield tvShow_1.TVShow.findById(item.contentId);
                    return tvShow;
                }
            })));
            return { items: itemDetails };
        });
    }
}
exports.MyListService = MyListService;
