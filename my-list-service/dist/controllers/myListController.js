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
exports.MyListController = void 0;
const myListService_1 = require("../services/myListService");
class MyListController {
    constructor() {
        this.addToMyList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, contentId, contentType } = req.body;
                const result = yield this.myListService.addToMyList(userId, contentId, contentType);
                res.status(200).json(result);
            }
            catch (error) {
                const errorResponse = { error: error instanceof Error ? error.message : 'An unknown error occurred' };
                res.status(400).json(errorResponse);
            }
        });
        this.removeFromMyList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, contentId } = req.params;
                const result = yield this.myListService.removeFromMyList(userId, contentId);
                res.status(200).json(result);
            }
            catch (error) {
                const errorResponse = { error: error instanceof Error ? error.message : 'An unknown error occurred' };
                res.status(400).json(errorResponse);
            }
        });
        this.listMyItems = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const { limit, offset } = req.query;
                const result = yield this.myListService.listMyItems(userId, {});
                res.status(200).json(result);
            }
            catch (error) {
                const errorResponse = { error: error instanceof Error ? error.message : 'An unknown error occurred' };
                res.status(400).json(errorResponse);
            }
        });
        this.myListService = new myListService_1.MyListService();
    }
}
exports.MyListController = MyListController;
