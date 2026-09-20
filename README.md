# 🤖 AI Blog Platform

An AI-powered full-stack blogging platform built with the **MERN stack**, featuring **Google Gemini AI content generation**, JWT-based admin authentication, rich-text blog editing, image CDN integration, comment moderation, and a responsive user interface.

## 🌐 Live Demo

🔗 **Live Website:** https://writeblog.vercel.app

🔗 **GitHub Repository:** YOUR_GITHUB_REPOSITORY_URL

---

## ✨ Features

### 👤 Visitor Features

* 🏠 Responsive homepage with hero section
* 🔍 Live blog search by title and category
* 📂 Blog category filtering
* 🎨 Animated category tabs using Framer Motion
* 📝 Responsive blog listing grid
* 📖 Individual blog detail pages
* 🖼️ Blog cover images
* 💬 Commenting system
* 🕒 Relative comment timestamps
* 🔗 Social media sharing
* 📧 Newsletter signup
* 📱 Mobile, tablet, and desktop responsive design
* ⏳ Loading states while fetching data

---

### 🔐 Admin Authentication

* JWT-based admin authentication
* Protected admin routes
* Environment-based admin credentials
* Persistent authentication using JWT
* Automatic redirect for unauthorized users
* Secure logout functionality

---

### 📊 Admin Dashboard

* 📈 Total blog statistics
* 💬 Total comment statistics
* 📝 Draft blog statistics
* 🕒 Recent blog overview
* ⚡ Quick blog management actions

---

### 📝 Blog Management

* ✍️ Rich-text blog editor using **Quill**
* 🤖 AI-powered blog content generation using **Google Gemini**
* 🖼️ Image upload with live preview
* 📂 Blog category selection
* 📌 Draft / Published status
* 🔄 Publish / Unpublish blogs
* ✏️ Blog editing
* 🗑️ Blog deletion
* 🔗 Automatic deletion of associated comments

---

### 💬 Comment Moderation

* View approved comments
* View pending comments
* Filter comments by approval status
* ✅ Approve comments
* 🗑️ Delete comments
* Automatic comment cleanup when a blog is deleted

---

## 🤖 AI Blog Generation

The platform integrates **Google Gemini AI** to generate blog content based on the administrator's blog title.

### AI Workflow

Admin enters blog title
        ↓
Click "Generate with AI"
        ↓
Google Gemini API
        ↓
AI-generated blog content
        ↓
Content added to Rich-Text Editor
        ↓
Admin reviews and edits
        ↓
Save as Draft / Publish


## 🏗️ Application Architecture


                         ┌───────────────────┐
                         │       User        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   React Frontend  │
                         │   Tailwind CSS    │
                         └─────────┬─────────┘
                                   │
                              REST API
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  Express Backend  │
                         │     Node.js       │
                         └───────┬───────────┘
                                 │
               ┌─────────────────┼─────────────────┐
               │                 │                 │
               ▼                 ▼                 ▼
       ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
       │   MongoDB    │  │ Google Gemini│  │   ImageKit   │
       │   Database   │  │      AI      │  │     CDN      │
       └──────────────┘  └──────────────┘  └──────────────┘


---

## 🔐 Authentication Flow


Admin Login
     ↓
Validate Credentials
     ↓
Generate JWT
     ↓
Store Token
     ↓
Access Protected Admin Routes
     ↓
Authenticated API Requests


---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **JavaScript**
* **Tailwind CSS**
* **Framer Motion**
* **Quill Rich Text Editor**
* **Axios**
* **Vite**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **REST API**
* **JWT Authentication**
* **CORS**
* **dotenv**

### AI & Cloud Services

* **Google Gemini AI**
* **ImageKit CDN**

### Development Tools

* **Git**
* **GitHub**
* **Postman**
* **VS Code**

---

## 📡 REST API

### Blog APIs

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | `/api/blog`     | Get published blogs |
| GET    | `/api/blog/:id` | Get blog details    |
| POST   | `/api/blog`     | Create a blog       |
| PUT    | `/api/blog/:id` | Update a blog       |
| DELETE | `/api/blog/:id` | Delete a blog       |

### Comment APIs

| Method | Endpoint                 | Description       |
| ------ | ------------------------ | ----------------- |
| POST   | `/api/blog/:id/comments` | Add a comment     |
| GET    | `/api/blog/:id/comments` | Get blog comments |

### Admin APIs

| Method | Endpoint                          | Description            |
| ------ | --------------------------------- | ---------------------- |
| POST   | `/api/admin/login`                | Admin login            |
| GET    | `/api/admin/blogs`                | Get all blogs          |
| PATCH  | `/api/admin/blog/:id/status`      | Publish/unpublish blog |
| GET    | `/api/admin/comments`             | Get comments           |
| PATCH  | `/api/admin/comments/:id/approve` | Approve comment        |
| DELETE | `/api/admin/comments/:id`         | Delete comment         |

> **Note:** Update the endpoints above if your actual backend route names are different.

---



## ⚙️ Installation

### 1. Clone the Repository


git clone YOUR_GITHUB_REPOSITORY_URL
cd AI-Blog


### 2. Install Frontend Dependencies


cd client
npm install


### 3. Install Backend Dependencies

cd ../server
npm install


---

## 🔑 Environment Variables

Create a `.env` file inside the `server` directory.

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

GEMINI_API_KEY=your_gemini_api_key

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

For the frontend, create the required `.env` file:

```env
VITE_API_URL=your_backend_url
```

### ⚠️ Security

Never upload real API keys, passwords, database credentials, or JWT secrets to GitHub.

Add the following to `.gitignore`:

```gitignore
.env
.env.local
node_modules/
```

---

## ▶️ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

The backend will run on your configured server port.

### Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will run using the Vite development server.

---

## 🖼️ Image Management

The project uses **ImageKit** for image storage and CDN delivery.

Image processing includes:

* Cloud-based image storage
* CDN delivery
* Automatic image optimization
* WebP conversion
* Automatic quality optimization
* Image resizing

---

## 📸 Screenshots

### 🏠 Home Page




### 📊 Admin Dashboard



### 🤖 AI Blog Generation



### ✍️ Blog Editor



### 💬 Comment Moderation



---

## 🔒 Security Features

* JWT-based authentication
* Protected admin routes
* Environment variable configuration
* Admin authorization middleware
* CORS configuration
* API credential protection
* Server-side authentication checks

---

## 🚀 Future Improvements

* 👤 User authentication and profiles
* 🔑 Role-based access control
* ❤️ Like and bookmark functionality
* 🔎 Advanced blog search
* 📊 Blog analytics dashboard
* 🤖 AI-powered SEO generation
* 🤖 AI-powered title generation
* 📧 Automated newsletter system
* 📄 Pagination
* 🧪 Automated testing
* 🚦 API rate limiting
* 🔄 CI/CD pipeline
* 🌐 SEO optimization

---

## 📚 What I Learned

Through this project, I worked with:

* Full-stack MERN application development
* RESTful API design
* JWT authentication
* MongoDB and Mongoose
* React component architecture
* Protected routes
* AI API integration
* Cloud image storage and CDN
* Rich-text editing
* CRUD operations
* Comment moderation
* Environment-based configuration
* Git and GitHub
* Frontend-backend integration

---

## 👨‍💻 Author

### Subhajit Ojha

Computer Science Engineering Student | Full Stack Developer

**GitHub:** YOUR_GITHUB_URL

**LinkedIn:** YOUR_LINKEDIN_URL

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.
