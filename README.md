# Inventory System Backend

REST API for managing inventory, products, categories, orders, and users.

**Base URL:** `http://localhost:3000`

---

## Auth

### POST `/auth/register`

Register a new user.

**Auth Required:** No

#### Body

```json
{
  "name": "User1",
  "email": "user1@example.com",
  "password": "password1"
}
```

#### Success `201`

```json
{
  "status": 201,
  "message": "Register Success"
}
```

#### Errors

* `400` Email already taken
* `400` Invalid email format
* `400` Weak password

---

### POST `/auth/login`

Login user.

**Auth Required:** No

#### Body

```json
{
  "email": "user1@example.com",
  "password": "password1"
}
```

#### Success `200`

```json
{
  "status": 200,
  "message": "Login Success"
}
```

#### Errors

* `401` Incorrect email or password

---

### POST `/auth/logout`

Logout current user.

**Auth Required:** Bearer Token

#### Success `200`

```json
{
  "status": 200,
  "message": "Logout Success"
}
```

---

## Users

> Admin only

### GET `/users`

Get all users.

### GET `/users/:userId`

Get user by ID.

### PUT `/users/:userId`

Update user.

### DELETE `/users/:userId`

Delete user.

### GET `/users/:userId/products`

Get products by user.

### GET `/users/:userId/orders`

Get orders by user.

---

## Categories

### POST `/categories`

Create category.

### GET `/categories`

Get categories with pagination.

### GET `/categories/:categoryId`

Get category by ID.

### PUT `/categories/:categoryId`

Update category.

### DELETE `/categories/:categoryId`

Delete category.

---

## Products

### POST `/products`

Create product.

### GET `/products`

Get products with pagination and category filter.

### GET `/products/:productId`

Get product by ID.

### PUT `/products/:productId`

Update product.

### DELETE `/products/:productId`

Delete product.

---

## Orders

> Admin only

### POST `/orders`

Create order.

### GET `/orders`

Get all orders.

### GET `/orders/:orderId`

Get order by ID.

### PUT `/orders/:orderId`

Update order.

### DELETE `/orders/:orderId`

Delete order.

### GET `/orders/:orderId/order-items`

Get items by order.

---

## Order Items

> Admin only

### POST `/order-items`

Create order item.

### GET `/order-items`

Get all order items.

### GET `/order-items/:orderItemId`

Get order item by ID.

### PUT `/order-items/:orderItemId`

Update order item.

### DELETE `/order-items/:orderItemId`

Delete order item.
