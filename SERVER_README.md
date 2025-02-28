
# Express Backend for E-commerce Site

This is the Express.js and MongoDB backend for the e-commerce site.

## Setup Instructions

1. Make sure MongoDB is installed and running on your machine or use MongoDB Atlas
2. Add your MongoDB connection string to the .env file
3. Install the required dependencies:
   ```
   npm install express mongoose cors dotenv morgan bcryptjs jsonwebtoken
   ```

## Running the Backend Server

You can run the backend server with:

```
node start-server.js
```

Or directly:

```
node server.js
```

## Environment Variables

Make sure you have a .env file with the following variables:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

## API Routes

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products - Create new product (admin only)
- PUT /api/products/:id - Update product (admin only)
- DELETE /api/products/:id - Delete product (admin only)

### Users
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/me - Get current user profile
- PUT /api/users/profile - Update user profile
- GET /api/users - Get all users (admin only)

### Orders
- POST /api/orders - Create new order
- GET /api/orders/:id - Get order by ID
- GET /api/orders/user/myorders - Get logged in user orders
- GET /api/orders - Get all orders (admin only)
- PUT /api/orders/:id/pay - Update order to paid
- PUT /api/orders/:id/deliver - Update order to delivered (admin only)
