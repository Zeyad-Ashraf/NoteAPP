# 📝 NoteAPP

NoteAPP is a note-taking application that allows users to create and manage personal notes securely. It features complete authentication and integrates with AI to summarize note content intelligently.

---

## 🚀 Features

### 🔐 Authentication
- ✅ **Sign Up**: Create a new account.
- ✅ **Login**: User login with JWT.
- ✅ **Refresh Token**: Automatically refresh expired tokens.
- ✅ **Forget Password**: Send password reset link to user's email.
- ✅ **Reset Password**: Reset the password using a secure token.
- ✅ **Confirm Password**: Re-authenticate the user for sensitive actions.

### 🗒️ Note Management
- ✅ **Add Note**: Create a new note.
- ✅ **Get All Notes**: Retrieve all notes for the authenticated user.
- ✅ **Delete Note**: Remove a specific note from the system.

### 🤖 AI Integration
- ✅ **Summarize Note**: Uses an AI model (via OpenRouter API) to generate a concise summary of the note content.

---

## 🛠️ Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **multer** for file handling (optional)
- **OpenRouter API** for AI-powered summarization

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/NoteAPP.git
cd NoteAPP
```
### 2. Install Dependencies
```
npm install
```

### 3.Run the App
```
npm run start
```