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
exports.identifyContact = void 0;
const contact_1 = __importDefault(require("../models/contact"));
const sequelize_1 = require("sequelize");
const identifyContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phoneNumber } = req.body;
    // Validate that at least one of email or phoneNumber is provided
    if (!email && !phoneNumber) {
        return res
            .status(400)
            .json({ error: "At least one of email or phoneNumber must be provided" });
    }
    // Prepare the WHERE clause based on provided inputs
    const whereClause = [];
    if (email !== undefined) {
        whereClause.push({ email });
    }
    if (phoneNumber !== undefined) {
        whereClause.push({ phoneNumber });
    }
    try {
        // Find contacts matching any of the provided email or phoneNumber
        const contacts = yield contact_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: whereClause,
            },
        });
        // Log the found contacts for debugging
        // console.log("contacts", contacts);
        // Find contacts matching both email and phoneNumber (logical AND)
        const contactsAnd = yield contact_1.default.findAll({
            where: {
                [sequelize_1.Op.and]: whereClause,
            },
        });
        // Log the contacts found with AND condition for debugging
        // console.log("contactsAnd", contactsAnd);
        // If no contacts are found, create a new primary contact
        if (contacts.length === 0) {
            const newContact = yield contact_1.default.create({
                email,
                phoneNumber,
                linkPrecedence: "primary",
            });
            return res.json({
                contact: {
                    primaryContactId: newContact.id,
                    emails: email ? [email] : [],
                    phoneNumbers: phoneNumber ? [phoneNumber] : [],
                    secondaryContactIds: [],
                },
            });
        }
        // Identify primary and secondary contacts based on linkPrecedence
        let primaryContact = contacts.find((contact) => contact.linkPrecedence === "primary");
        let secondaryContact = contacts.find((contact) => contact.linkPrecedence === "secondary");
        // Log primary and secondary contacts for debugging
        // console.log("primaryContact", primaryContact);
        // console.log("secondaryContact", secondaryContact);
        // If no primary contact but there's a secondary contact, consolidate related contacts
        if (!primaryContact && secondaryContact) {
            const allRelatedContacts = yield contact_1.default.findAll({
                where: {
                    [sequelize_1.Op.or]: [
                        { id: secondaryContact.linkedId },
                        { linkedId: secondaryContact.linkedId },
                    ],
                },
            });
            // Consolidate unique emails and phone numbers from related contacts
            const emails = [
                ...new Set(allRelatedContacts.map((contact) => contact.email).filter(Boolean)),
            ];
            const phoneNumbers = [
                ...new Set(allRelatedContacts
                    .map((contact) => contact.phoneNumber)
                    .filter(Boolean)),
            ];
            // Identify secondary contact IDs
            const secondaryContactIds = allRelatedContacts
                .filter((contact) => contact.linkPrecedence === "secondary")
                .map((contact) => contact.id);
            return res.json({
                contact: {
                    primaryContactId: secondaryContact.linkedId,
                    emails,
                    phoneNumbers,
                    secondaryContactIds,
                },
            });
        }
        // If no primary or secondary contacts found, assign the first contact as primary
        if (!primaryContact && !secondaryContact) {
            primaryContact = contacts[0];
            yield primaryContact.update({ linkPrecedence: "primary" });
        }
        // Check for existing rows with the same email or phoneNumber
        const isRowWithTheSameEmail = contacts.find((contact) => contact.email === email);
        const isRowWithTheSamePhoneNumber = contacts.find((contact) => contact.phoneNumber === phoneNumber);
        // If contactsAnd is empty and both email and phoneNumber are provided and no duplicates, create a secondary contact
        if (contactsAnd.length === 0 &&
            phoneNumber !== null &&
            email !== null &&
            (!isRowWithTheSameEmail || !isRowWithTheSamePhoneNumber)) {
            yield contact_1.default.create({
                email,
                phoneNumber,
                linkPrecedence: "secondary",
                linkedId: primaryContact === null || primaryContact === void 0 ? void 0 : primaryContact.id,
            });
        }
        // Link other primary contacts to the primaryContact found
        if (primaryContact) {
            yield Promise.all(contacts
                .filter((contact) => contact.id !== primaryContact.id &&
                contact.linkPrecedence === "primary")
                .map((contact) => contact.update({
                linkedId: primaryContact.id,
                linkPrecedence: "secondary",
            })));
        }
        // Fetch all related contacts of the primaryContact
        const allRelatedContacts = yield contact_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [{ id: primaryContact === null || primaryContact === void 0 ? void 0 : primaryContact.id }, { linkedId: primaryContact === null || primaryContact === void 0 ? void 0 : primaryContact.id }],
            },
        });
        // Consolidate unique emails and phone numbers from all related contacts
        const emails = [
            ...new Set(allRelatedContacts.map((contact) => contact.email).filter(Boolean)),
        ];
        const phoneNumbers = [
            ...new Set(allRelatedContacts.map((contact) => contact.phoneNumber).filter(Boolean)),
        ];
        // Identify secondary contact IDs
        const secondaryContactIds = allRelatedContacts
            .filter((contact) => contact.linkPrecedence === "secondary")
            .map((contact) => contact.id);
        // Return the response with primaryContactId, emails, phoneNumbers, and secondaryContactIds
        return res.json({
            contact: {
                primaryContactId: primaryContact === null || primaryContact === void 0 ? void 0 : primaryContact.id,
                emails,
                phoneNumbers,
                secondaryContactIds,
            },
        });
    }
    catch (error) {
        // Handle database errors or other exceptions
        console.error("Error in identifyContact:", error);
        return res
            .status(500)
            .json({ error: "An error occurred while processing the request" });
    }
});
exports.identifyContact = identifyContact;
