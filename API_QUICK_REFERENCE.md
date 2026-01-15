# Tastecert API - Quick Reference Guide

A concise reference for common API integration tasks.

---

## 🔓 Public Endpoints (No Auth Required)

### Verify Certificate
```typescript
GET /api/certificates/verify?number=TC-2024-123456
```

### Get Certified Products (Winners)
```typescript
GET /api/products/winners
```

### Get Categories
```typescript
GET /api/categories
```

### Get Products (with optional filter)
```typescript
GET /api/products?status=CERTIFIED
```

### Submit Contact Form
```typescript
POST /api/contact
Body: { name, email, subject, message, company?, phone? }
```

---

## 🔐 Protected Endpoints (Auth Required)

### Producer Endpoints

#### Submit Product
```typescript
POST /api/products
Body: { name, categoryId, description?, ... }
Requires: Producer account with APPROVED status
```

#### Get My Products
```typescript
GET /api/dashboard/products
Requires: Producer session
```

#### Get My Stats
```typescript
GET /api/dashboard/stats
Requires: Producer session
Returns: { stats: {...}, recentProducts: [...] }
```

### Admin Endpoints

#### Create Certificate
```typescript
POST /api/certificates
Body: { productId, awardLevel, certificateNumber? }
Requires: Admin session
```

#### Create Evaluation
```typescript
POST /api/evaluations
Body: { productId, aromaScore, tasteScore, ... }
Requires: Admin session
```

#### Manage Categories
```typescript
POST /api/categories          // Create
PATCH /api/categories/[id]    // Update
DELETE /api/categories/[id]   // Delete
Requires: Admin session
```

---

## 📝 Common Request Examples

### JavaScript/TypeScript

```typescript
// Verify Certificate (Public)
const verifyCert = async (number: string) => {
  const res = await fetch(`/api/certificates/verify?number=${number}`);
  return await res.json();
};

// Get Winners (Public)
const getWinners = async () => {
  const res = await fetch('/api/products/winners');
  return await res.json();
};

// Submit Product (Authenticated)
const submitProduct = async (data: ProductData) => {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Important for cookies
    body: JSON.stringify(data),
  });
  return await res.json();
};

// Get My Products (Authenticated)
const getMyProducts = async () => {
  const res = await fetch('/api/dashboard/products', {
    credentials: 'include',
  });
  return await res.json();
};
```

---

## 🎯 Response Formats

### Success Response
```json
{
  "id": "...",
  "name": "...",
  ...
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

### Validation Error
```json
{
  "error": "Validation failed",
  "details": [
    { "path": ["field"], "message": "..." }
  ]
}
```

---

## 🔑 Authentication

- **Session-based**: Uses NextAuth.js cookies
- **Include cookies**: Set `credentials: 'include'` in fetch requests
- **Sign in**: `/auth/signin` to get session
- **Roles**: `ADMIN` or `PRODUCER`
- **Producer requirement**: Account must be `APPROVED` to submit products

---

## 📊 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (wrong role or account not approved)
- `404` - Not Found
- `500` - Server Error

---

## 📦 Data Types

### Product Status
`PENDING` | `UNDER_REVIEW` | `EVALUATED` | `CERTIFIED`

### Award Level
`GOLD` | `SILVER` | `BRONZE`

### User Role
`ADMIN` | `PRODUCER`

---

## 🚀 Quick Start

1. **Public data**: Use `/api/products/winners` and `/api/categories`
2. **Certificate verification**: Use `/api/certificates/verify?number=...`
3. **Producer actions**: Sign in first, then use `/api/products` and `/api/dashboard/*`
4. **Admin actions**: Sign in as admin, then use `/api/certificates`, `/api/evaluations`, etc.

---

For full documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

