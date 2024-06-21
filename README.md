# Bitespeed Backend Task: Identity Reconciliation

This project is a web service designed to identify and reconcile customer identities across multiple purchases. It tracks customer contact information in a relational database and consolidates contact data based on provided email or phone number.

## Project Overview

- **Framework**: Node.js with Express
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Deployment**: [Render.com](https://render.com)

## Features

- Identify and reconcile customer identities based on email and/or phone number.
- Link multiple contacts under a primary contact.
- Consolidate and return contact information, including primary and secondary contacts.

## Deployed API

The API is deployed at: [https://bitespeed-backend-ern2.onrender.com](https://bitespeed-backend-ern2.onrender.com)

### Endpoint

- `POST /api/identify`

#### Request Body

```json
{
  "email": "string",
  "phoneNumber": "string"
}
```

- Either email or phoneNumber must be provided.
  Response Body

```json
{
  "contact": {
    "primaryContactId": number,
    "emails": ["string"],
    "phoneNumbers": ["string"],
    "secondaryContactIds": [number]
  }
}
```

# Running the Project Locally

## Prerequisites

- Node.js installed (version 14 or later)
- PostgreSQL installed and running

## Steps

### Clone the Repository

```sh
git clone https://github.com/yourusername/bitespeed-backend.git
cd bitespeed-backend
```

### Install Dependencies

Copy code

`npm install`

### Configure Environment Variables

Create a `.env` file in the root directory and add your database configuration:

env

```
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_DIALECT=postgres
```

### Run Migrations

Make sure your database is created and then run the migrations:

`npx sequelize-cli db:migrate`

### Start the Server

`npm run dev`

The server will start on <http://localhost:3000>.

## Example Request

To test the API locally, you can use a tool like Postman or curl.

### Using curl

`curl -X POST http://localhost:3000/api/identify -H "Content-Type: application/json" -d '{"email":"mcfly@hillvalley.edu", "phoneNumber":"123456"}'`

### Using Postman

1.  Open Postman.
2.  Create a new POST request.
3.  Set the URL to <http://localhost:3000/api/identify>.
4.  Set the `Content-Type` header to `application/json`.
5.  In the body, use raw JSON format to send the request:

```json
{
  "email": "mcfly@hillvalley.edu",
  "phoneNumber": "123456"
}
```
