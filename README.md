# 🤖 AI Blog Platform

An AI-powered full-stack blogging platform built with the MERN stack.
The application provides AI-generated blog content, rich-text editing,
JWT-based admin authentication, image uploads, comment moderation,
and a responsive user interface.


## ✨ Features

### 👤 Visitor Features

- Responsive homepage
- Live blog search
- Category filtering
- Blog listing
- Blog detail pages
- Commenting system
- Social media sharing
- Newsletter signup
- Responsive design
- Loading states

### 🔐 Admin Panel

- JWT-based admin authentication
- Protected admin routes
- Admin dashboard
- Blog statistics
- Recent blogs overview
- Secure logout

### 📝 Blog Management

- Rich-text editor using Quill
- AI-powered blog generation using Google Gemini
- Image upload with preview
- Blog categories
- Draft / Published status
- Publish / Unpublish blogs
- Blog deletion
- Automatic comment deletion

### 💬 Comment Moderation

- Approved / pending comment filters
- Approve comments
- Delete comments

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- Tailwind CSS
- Framer Motion
- Quill
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- JWT Authentication

### AI & Cloud

- Google Gemini AI
- ImageKit CDN

### Tools

- Git
- GitHub
- Vite
- Postman

## 🏗️ Application Architecture


User
  │
  ▼
React Frontend
  │
  │ REST API
  ▼
Express.js Backend
  │
  ├──────────────► MongoDB
  │
  ├──────────────► Google Gemini AI
  │
  └──────────────► ImageKit CDN









## 🤖 AI Blog Generation

The application uses Google Gemini AI to generate blog content.


Admin enters blog title
        ↓
Click "Generate with AI"
        ↓
Google Gemini API
        ↓
AI-generated content
        ↓
Rich-text editor
        ↓
Admin reviews/edits
        ↓
Save as Draft / Publish



