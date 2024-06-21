import { Router } from "express";
import { identifyContact } from "../controllers/contactController";

// Create a new Router instance
const router = Router();

/**
 * @swagger
 * /api/identify:
 *   post:
 *     summary: Identify a contact based on email or phone number
 *     description: >
 *       This endpoint identifies a contact based on provided email or phone number.
 *       It handles creating new contacts if none are found, linking contacts, and returning contact details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *             required:
 *               - email
 *               - phoneNumber
 *     responses:
 *       200:
 *         description: Successfully identified contact(s)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contact:
 *                   type: object
 *                   properties:
 *                     primaryContactId:
 *                       type: integer
 *                     emails:
 *                       type: array
 *                       items:
 *                         type: string
 *                     phoneNumbers:
 *                       type: array
 *                       items:
 *                         type: string
 *                     secondaryContactIds:
 *                       type: array
 *                       items:
 *                         type: integer
 *       400:
 *         description: Bad request - Invalid email or phone number format, or neither provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
// Define a POST route for the /identify endpoint and attach the identifyContact controller function
router.post("/identify", identifyContact);

export default router;
