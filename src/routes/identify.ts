import { Router } from "express";
import { identifyContact } from "../controllers/contactController";

// Create a new Router instance
const router = Router();

// Define a POST route for the /identify endpoint and attach the identifyContact controller function
router.post("/identify", identifyContact);

export default router;
