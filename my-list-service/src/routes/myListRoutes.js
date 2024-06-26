"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var myListController_1 = require("../controllers/myListController");
var router = (0, express_1.Router)();
var myListController = new myListController_1.MyListController();
router.post('/', myListController.addToMyList);
router.delete('/:userId/:contentId', myListController.removeFromMyList);
router.get('/:userId', myListController.listMyItems);
exports.default = router;
