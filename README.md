# 📦 HobbyHub Backend

**HobbyHub** is the backend server for a local hobby group organizer platform, built using **Node.js**, **Express.js**, and **MongoDB**.

🔗 **Live API:** [https://hobby-hub-server-one-tau.vercel.app](https://hobby-hub-server-one-tau.vercel.app)  
🌐 **Frontend Live:** [https://hobby-hub-32310.web.app](https://hobby-hub-32310.web.app)

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Dotenv
- CORS

---

## 🚀 Main Features

- 📌 Create, Read, Update, Delete hobby groups
- ⭐ Display top 6 featured groups (by startDate)
- 👥 Filter "My Groups" by user email
- 👤 Add and fetch user profiles
- 🔐 JSON-based RESTful API structure

---

## 📦 Dependencies

```json
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"express": "^4.18.2",
"mongodb": "^6.9.0",
"nodemon": "^3.1.0"
```
---
## 📁 Folder Structure

hobbyhub-server/
├─ index.js
├─ .env
├─ package.json

---
``
## ⚙️ How to Run Locally

git clone https://github.com/your-username/hobbyhub-server.git
cd hobbyhub-server
npm install

---
``
## Create .env file

DB_USER=your_db_user
DB_PASS=your_db_pass

---

## Start the Server
nodemon index.js

Server will run at: http://localhost:3000

---

## 🔗 API Endpoints Overview

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| GET    | `/featured-groups`  | Get 6 upcoming groups    |
| GET    | `/groups`           | Get all groups           |
| GET    | `/group/:id`        | Get a group by ID        |
| POST   | `/groups`           | Add a new group          |
| GET    | `/mygroups?email=`  | Get groups by user email |
| PUT    | `/updategroup`      | Update a group           |
| DELETE | `/deletegroups/:id` | Delete a group           |
| GET    | `/users`            | Get all users            |
| POST   | `/users`            | Add a new user           |

---

👩‍💻 Author
Sumiaya Akther
GitHub: @Sumiaya-Akther
```