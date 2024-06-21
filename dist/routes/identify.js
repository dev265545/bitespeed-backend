"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
// Create a new Router instance
const router = (0, express_1.Router)();
// Define a POST route for the /identify endpoint and attach the identifyContact controller function
router.post("/identify", contactController_1.identifyContact);
exports.default = router;
