# be-medicine-v2

Medicine Inventory Backend (Express + MongoDB)

This project is a backend API for a medicine inventory management system, built with Express.js and MongoDB.

---

## Features

- Medicine, Supplier, Purchase, Sale, Stock, User management
- JWT Authentication
- RESTful API structure
- Error handling middleware
- MongoDB integration (Mongoose)

---

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd be-medicine-v2
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file (see example below)
4. **Run the project:**
   - Development: `npm run dev`
   - Production: `npm start`

---

## Environment Variables

See the `.env.example` file.

```
MONGODB_URI=mongodb://127.0.0.1:27017/MedicineV2
JWT_SECRET=medicine_secret
```

---

## Folder Structure

```
be-medicine-v2/
│
├── config/           # Database config
├── controllers/      # Route controllers
├── middlewares/      # Custom middlewares
├── models/           # Mongoose models
├── routes/           # API routes
├── index.js          # Main entry point
├── package.json      # NPM config
└── README.md         # This file
```

---

## Scripts

- `npm run dev` : Run in development mode with nodemon
- `npm start` : Run in production mode

---

## API Endpoints

Each resource has a separate route (see the `routes/` folder).
