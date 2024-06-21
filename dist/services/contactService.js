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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = __importDefault(require("../models/contact"));
// Build For Testing Purpose insert a new Contact -  Not using currently
function insertContact(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, phoneNumber } = data;
        // Check if both email and phoneNumber are missing
        if (!email && !phoneNumber) {
            throw new Error("At least one of email or phoneNumber must be provided");
        }
        // Create new contact
        const newContact = yield contact_1.default.create({
            email,
            phoneNumber,
            linkPrecedence: "primary",
        });
        console.log("New contact created with ID:", newContact.id);
        return newContact;
    });
}
exports.default = insertContact;
