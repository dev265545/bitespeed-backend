import Contact from "../models/contact";

interface ContactData {
  phoneNumber?: string;
  email?: string;
}

async function insertContact(data: ContactData) {
  const { email, phoneNumber } = data;

  // Check if both email and phoneNumber are missing
  if (!email && !phoneNumber) {
    throw new Error("At least one of email or phoneNumber must be provided");
  }

  // Create new contact
  const newContact = await Contact.create({
    email,
    phoneNumber,
    linkPrecedence: "primary",
  });

  console.log("New contact created with ID:", newContact.id);
  return newContact;
}

export default insertContact;
