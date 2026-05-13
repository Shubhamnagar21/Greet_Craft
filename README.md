# GreetCraft - Custom Greetings & Wishes App

A full-stack web application for creating personalized greeting cards. Users can browse templates, see live previews with their name and photo overlaid, and download or share custom greeting cards.

## Features

- **Authentication**: Email/password, Google login, and Guest mode with JWT
- **Live Preview**: Real-time canvas rendering with profile photo and name overlay
- **Template Categories**: Birthday, Anniversary, Festivals, Shayari, Joke, Updesh, Love, Trending
- **Premium System**: Free and premium templates with subscription modal
- **Download & Share**: Export merged images, share via WhatsApp, Email
- **Profile Management**: Upload profile photo, edit name, manage subscription

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| Upload | Multer |
| Canvas | HTML5 Canvas API |

## Setup

```bash
npm run install-all
cp server/.env.example server/.env
npm run seed
npm run dev
```

## Environment Variables

Create `server/.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/greetings_app
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## Commands

| Command | Description |
|---------|------------|
| `npm run dev` | Start frontend + backend |
| `npm run client` | Start frontend only |
| `npm run server` | Start backend only |
| `npm run seed` | Seed database with templates |

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register |
| POST | /api/auth/login | No | Login |
| POST | /api/auth/google | No | Google login |
| POST | /api/auth/guest | No | Guest login |
| GET | /api/auth/me | Yes | Get current user |
| PUT | /api/users/profile | Yes | Update profile |
| POST | /api/users/upload-photo | Yes | Upload photo |
| GET | /api/templates | No | List templates |
| GET | /api/templates/:id | No | Get template |
| POST | /api/subscription/upgrade | Yes | Upgrade plan |

## Folder Structure

```
Custom_Greeting_App/
├── client/
│   └── src/
│       ├── components/   # Navbar, TemplateCard, PreviewCanvas, etc.
│       ├── context/      # AuthContext
│       ├── pages/        # Home, Login, Register, Profile, TemplatePreview
│       ├── services/     # Axios API client
│       └── utils/        # Helper functions
├── server/
│   ├── config/           # Database connection
│   ├── controllers/      # Auth, User, Template, Subscription
│   ├── middleware/        # JWT auth, file upload, error handler
│   ├── models/           # User, Template, Subscription schemas
│   ├── routes/           # API route definitions
│   ├── seed/             # Template seeder
│   └── uploads/          # Uploaded profile photos
├── README.md
└── Technical_Approach.md
```
