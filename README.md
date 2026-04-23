# 🛒 QuickBuy – Full Stack E-Commerce Web Application

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

**QuickBuy** is a full-stack e-commerce web application that allows users to browse products, add items to a cart, place orders, and manage their accounts. The platform includes secure authentication, product management, and order processing — built to simulate a real-world online shopping system.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Authentication Flow](#-authentication-flow)
- [Product Flow](#-product-flow)
- [Order Flow](#-order-flow)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 🚀 Features

### 👤 User Features

- User registration and login
- Secure JWT-based authentication
- Browse products by category
- View detailed product pages
- Add / remove products from cart
- Update product quantities in cart
- Checkout and place orders
- View full order history
- Fully responsive design (mobile & desktop)

### 🛠️ Admin Features

- Admin dashboard
- Add, edit, and delete products
- Manage product inventory
- View and manage all orders
- Update order status

---

## 🧰 Tech Stack

| Layer              | Technology                               |
| ------------------ | ---------------------------------------- |
| **Frontend**       | React.js, React Router, Bootstrap, Axios |
| **Backend**        | Node.js, Express.js                      |
| **Database**       | MongoDB, Mongoose ODM                    |
| **Authentication** | JSON Web Tokens (JWT), bcrypt            |
| **Image Uploads**  | Cloudinary / ImageKit                    |
| **Payments**       | Razorpay                                 |
| **API Testing**    | Postman                                  |

---

## 🔐 Authentication Flow

```
1. User registers with email & password
2. Password is hashed using bcrypt
3. JWT token is generated upon login
4. Token is stored in cookies / localStorage
5. Protected routes validate the JWT token on every request
```

---

## 🛍️ Product Flow

```
1. Admin adds a new product
2. Product image is uploaded to Cloudinary / ImageKit
3. Product is saved to MongoDB
4. Product is displayed on the storefront
5. User adds the product to their cart
```

---

## 🛒 Order Flow

```
1. User adds products to cart
2. User proceeds to checkout
3. Order is created in the database
4. Payment is processed (if payment integration is enabled)
5. Order status is updated and saved
6. User can view order in their order history
```

---

## 🧪 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/obaid-ansari/quickbuy.git
cd quickbuy
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server/` directory (see [Environment Variables](#-environment-variables) below).

### 5. Run the Application

**Start Backend:**

```bash
cd server
npm start
```

**Start Frontend:**

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

---

## ⚙️ Environment Variables

Create a `.env` file inside `server/` with the following:

```env
# Server
PORT=5000

# Database
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret

# Image Upload (Cloudinary)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payment (RazorPay)
KEY_ID=your_key
SECRET_KEY=your_key
```

> ⚠️ **Never commit your `.env` file to version control.** Add it to `.gitignore`.

---

## 👨‍💻 Author

**Obaid Ansari**

- GitHub: [https://github.com/obaid-ansari](https://github.com)
- LinkedIn: [https://www.linkedin.com/in/obaid-ansari/](https://linkedin.com)
