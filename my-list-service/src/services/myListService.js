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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyListService = void 0;
var userList_1 = require("../models/userList");
var movie_1 = require("../models/movie");
var tvShow_1 = require("../models/tvShow");
var MyListService = /** @class */ (function () {
    function MyListService() {
    }
    MyListService.prototype.addToMyList = function (userId, contentId, contentType) {
        return __awaiter(this, void 0, void 0, function () {
            var existingItem, newItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userList_1.UserList.findOne({ userId: userId, contentId: contentId })];
                    case 1:
                        existingItem = _a.sent();
                        if (existingItem) {
                            throw new Error('Item already exists in the list');
                        }
                        newItem = new userList_1.UserList({ userId: userId, contentId: contentId, contentType: contentType, addedAt: new Date() });
                        return [4 /*yield*/, newItem.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: 'Item added to the list' }];
                }
            });
        });
    };
    MyListService.prototype.removeFromMyList = function (userId, contentId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userList_1.UserList.deleteOne({ userId: userId, contentId: contentId })];
                    case 1:
                        result = _a.sent();
                        if (result.deletedCount === 0) {
                            throw new Error('Item not found in the list');
                        }
                        return [2 /*return*/, { message: 'Item removed from the list' }];
                }
            });
        });
    };
    MyListService.prototype.listMyItems = function (userId_1, _a) {
        return __awaiter(this, arguments, void 0, function (userId, _b) {
            var userListItems, itemDetails;
            var _this = this;
            var _c = _b.limit, limit = _c === void 0 ? 10 : _c, _d = _b.offset, offset = _d === void 0 ? 0 : _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, userList_1.UserList.find({ userId: userId })
                            .skip(offset)
                            .limit(limit)
                            .sort({ addedAt: -1 })
                            .lean()];
                    case 1:
                        userListItems = _e.sent();
                        return [4 /*yield*/, Promise.all(userListItems.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var movie, tvShow;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(item.contentType === 'Movie')) return [3 /*break*/, 2];
                                            return [4 /*yield*/, movie_1.Movie.findById(item.contentId)];
                                        case 1:
                                            movie = _a.sent();
                                            return [2 /*return*/, movie];
                                        case 2: return [4 /*yield*/, tvShow_1.TVShow.findById(item.contentId)];
                                        case 3:
                                            tvShow = _a.sent();
                                            return [2 /*return*/, tvShow];
                                    }
                                });
                            }); }))];
                    case 2:
                        itemDetails = _e.sent();
                        return [2 /*return*/, { items: itemDetails }];
                }
            });
        });
    };
    return MyListService;
}());
exports.MyListService = MyListService;
