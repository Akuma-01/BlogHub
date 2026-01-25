# BlogHub 📝

BlogHub is a full-stack blogging web application built with **React** and **Appwrite**.  
Users can sign up, log in, create posts using a rich text editor, upload featured images, and manage their posts.

## 🌐 Live Demo

🔗 https://blog-hub-ne21.vercel.app/

---

## 🚀 Features

- ✅ User Authentication (Signup / Login / Logout)
- ✅ Create / Edit / Delete blog posts
- ✅ Slug-based post URLs (`/post/:slug`)
- ✅ Rich Text Editor (TipTap)
- ✅ Image upload & display using Appwrite Storage
- ✅ Public post viewing (even when logged out)
- ✅ Protected routes for creating and editing posts
- ✅ Responsive UI with Tailwind CSS

---

## 🛠 Tech Stack

**Frontend**
- React
- React Router DOM
- Redux Toolkit
- Tailwind CSS

**Backend (BaaS)**
- Appwrite (Auth, Database, Storage)

**Editor**
- TipTap

---

## 📌 Project Routes

| Route | Description | Access |
|------|-------------|--------|
| `/` | Home page | Public |
| `/login` | Login page | Public |
| `/signup` | Signup page | Public |
| `/all-posts` | View all posts | Public |
| `/post/:slug` | View single post | Public |
| `/add-post` | Create new post | Protected |
| `/edit-post/:slug` | Edit existing post | Protected |

---

## ⚙️ Appwrite Setup

### 1) Create an Appwrite Project
Create a project from the Appwrite Console.

### 2) Add Web Platform
Add a **Web** platform:
- Hostname: `localhost`

### 3) Create Database & Collection
Create a database and a collection (example: `articles`).

Recommended attributes:
- `title` (string)
- `slug` (string)
- `content` (string)
- `featuredImage` (string)
- `status` (string)
- `userId` (string)

### 4) Collection Permissions (Recommended)
To allow logged-out users to read posts:

- **Read:** Any  
- **Create:** Users  
- **Update:** Users  
- **Delete:** Users  

### 5) Create Storage Bucket
Create a storage bucket for post images.

---

## 📦 Installation

### 1) Clone the repository
```bash
git clone <YOUR_REPO_URL>
cd <YOUR_PROJECT_FOLDER>
```

### 2) Install dependencies
```bash
npm install
```

### 3) Add environment variables
Create a `.env` file in the root directory:

```env
VITE_APPWRITE_URL=<YOUR_APPWRITE_URL>
VITE_APPWRITE_PROJECT_ID=<YOUR_PROJECT_ID>
VITE_APPWRITE_DATABASE_ID=<YOUR_DATABASE_ID>
VITE_APPWRITE_COLLECTION_ID=<YOUR_COLLECTION_ID>
VITE_APPWRITE_BUCKET_ID=<YOUR_BUCKET_ID>
```

### 4) Run the project
```bash
npm run dev
```

Now open:
- http://localhost:5173

---

## 🧾 Slug Routing (How it works)

- Posts are created using a unique document ID  
- The slug is stored as a separate field in the database  
- Posts are fetched using a query:

```js
Query.equal("slug", slug)
```

Example URL:
- `/post/my-first-blog`

---

## 🖼 Image Upload Notes

- Featured images are uploaded to Appwrite Storage  
- Images are displayed using `getFileView()` (more reliable than preview)

---

## 📂 Folder Structure (Basic)

```bash
src/
  appwrite/
    auth.js
    config.js
  components/
    Container.jsx
    PostCard.jsx
    PostForm.jsx
    RTE.jsx
    index.js
  pages/
    Home.jsx
    Post.jsx
    AddPost.jsx
    EditPost.jsx
    AllPosts.jsx
    Login.jsx
    Signup.jsx
  store/
    authSlice.js
    store.js
```

---

## ✨ Future Improvements

- 🔍 Search posts
- 🏷 Categories / tags
- ❤️ Likes & comments
- 📌 Pagination / infinite scroll
- 🧑 Profile page for users

---

## 👤 Author
Anurag Shah

---

## 📄 License
This project is made for learning and personal use.
