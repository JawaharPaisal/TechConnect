# TechConnect

A web application for managing user registrations, events, and achievements, with admin controls and authentication. Built with Node.js, Express, MongoDB, and EJS.

## Features
- User authentication and registration
- Event creation, listing, and management
- Achievement submission, approval, and display
- Admin panel for managing users, events, and achievements
- File uploads (e.g., for achievements)
- EJS templating for dynamic pages

## Project Structure
```
├── controllers/      # Business logic for routes
├── middlewares/      # Custom Express middleware
├── models/           # Mongoose data models
├── public/           # Static assets (CSS, JS, images)
├── routes/           # Express route handlers
├── uploads/          # Uploaded files
├── util/             # Utility functions
├── views/            # EJS templates
├── index.js          # Main server file
├── package.json      # Project metadata and dependencies
```

## Installation
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd TechConnect-main
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory with the following:
     ```env
     MONGO_URL=<your-mongodb-connection-string>
     PORT=3000
     ```

## Usage
- **Start the server:**
  ```bash
  npm start
  ```
- The server will run on `http://localhost:3000` (or the port you set).
- Access the app in your browser and use the available routes for authentication, events, achievements, and admin features.

## Scripts
- `npm start` — Start the server with nodemon

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
