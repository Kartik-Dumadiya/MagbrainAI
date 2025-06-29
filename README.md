# MagBrainAI 

## Tech Stack
### Backend
- Node.js & Express
- MongoDB with Mongoose

### Frontend
- React
- React Router DOM
- Axios for API calls
- Tailwind CSS for styling

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/MagBrain-AI/MagbrainAI.git
cd MagbrainAI
```

### 2. Install Dependencies

For Backend:
```bash
cd backend
npm install
```

For Frontend:
```bash
cd frontend
npm install
```

### 3. Environment Setup

Create `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
SESSION_SECRET=your_session_secret
JWT_SECRET=your_jwt_secret
```

### 4. Start the Application

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run dev
```

## API Endpoints

### Authentication Routes
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login with email/password
- `GET /auth/google` - Google OAuth login
- `GET /auth/github` - GitHub OAuth login
- `POST /auth/logout` - Logout user

## OAuth Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable OAuth 2.0
4. Add authorized redirect URI: `http://localhost:3000/auth/google/callback`
5. Copy Client ID and Secret to `.env`

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Add callback URL: `http://localhost:3000/auth/github/callback`
4. Copy Client ID and Secret to `.env`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Author
**MagBrain-AI**
