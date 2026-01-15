# Tastecert API Documentation

**Base URL**: `/api` (relative to your domain)  
**Version**: 1.0  
**Last Updated**: 2024

---

## Table of Contents

1. [Authentication](#authentication)
2. [Public Endpoints](#public-endpoints)
3. [Protected Endpoints](#protected-endpoints)
4. [Error Handling](#error-handling)
5. [Data Models](#data-models)
6. [Examples](#examples)

---

## Authentication

Most endpoints require authentication via **NextAuth session cookies**. The session is automatically handled by NextAuth.js.

### Session Requirements
- **Public Endpoints**: No authentication required
- **Producer Endpoints**: Requires authenticated session with `role: 'PRODUCER'` and `accountStatus: 'APPROVED'`
- **Admin Endpoints**: Requires authenticated session with `role: 'ADMIN'`

### Getting a Session
- Sign in via `/auth/signin`
- Session cookie is automatically set
- Include cookies in subsequent requests

### 📚 Complete Authentication Documentation

For detailed authentication documentation including:
- User registration and login flows
- Session structure and management
- Role-based access control
- Account status requirements
- Complete code examples
- Error handling

**See [AUTH_DOCUMENTATION.md](./AUTH_DOCUMENTATION.md) for complete details.**

---

## Public Endpoints

### 1. Verify Certificate

Verify a certificate number and retrieve certificate details.

**Endpoint**: `GET /api/certificates/verify`

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `number` | string | Yes | Certificate number (e.g., "TC-2024-123456") |

**Response** (200 OK):
```json
{
  "valid": true,
  "message": "✓ Certificate TC-2024-123456 is valid and active.",
  "certificate": {
    "number": "TC-2024-123456",
    "productName": "Artisan Olive Oil",
    "producer": "Mediterranean Farms",
    "category": "Oils",
    "awardLevel": "GOLD",
    "score": 87,
    "issueDate": "2024-01-15T00:00:00.000Z"
  }
}
```

**Error Response** (404):
```json
{
  "valid": false,
  "message": "Certificate not found. Please check the number and try again."
}
```

**Error Response** (403):
```json
{
  "valid": false,
  "message": "This certificate is not yet published."
}
```

---

### 2. Get Winners (Certified Products)

Get all certified products that are published.

**Endpoint**: `GET /api/products/winners`

**Response** (200 OK):
```json
[
  {
    "id": "product-id",
    "name": "Product Name",
    "producer": "Producer Company",
    "category": "category-slug",
    "categoryLabel": "Category Name",
    "award": "GOLD",
    "year": "2024",
    "image": "https://...",
    "summary": "Product description summary...",
    "description": "Full product description...",
    "score": 87,
    "origin": "Country",
    "certDate": "January 15, 2024",
    "isPublished": true,
    "certificateId": "cert-id",
    "judges": []
  }
]
```

---

### 3. Get Categories

Get all product categories.

**Endpoint**: `GET /api/categories`

**Response** (200 OK):
```json
[
  {
    "id": "category-id",
    "name": "Category Name",
    "slug": "category-slug",
    "description": "Category description",
    "imageUrl": "https://...",
    "isActive": true,
    "_count": {
      "products": 15
    }
  }
]
```

---

### 4. Get Products

Get products with optional status filter.

**Endpoint**: `GET /api/products`

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Filter by status: `PENDING`, `UNDER_REVIEW`, `EVALUATED`, `CERTIFIED` |

**Response** (200 OK):
```json
[
  {
    "id": "product-id",
    "name": "Product Name",
    "description": "Product description",
    "status": "CERTIFIED",
    "submittedAt": "2024-01-01T00:00:00.000Z",
    "category": {
      "id": "category-id",
      "name": "Category Name"
    },
    "user": {
      "name": "Producer Name",
      "company": "Company Name"
    },
    "evaluation": { ... },
    "certificate": { ... }
  }
]
```

---

### 5. Get Single Product

Get detailed information about a specific product.

**Endpoint**: `GET /api/products/[id]`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Product ID |

**Response** (200 OK):
```json
{
  "id": "product-id",
  "name": "Product Name",
  "description": "Full description",
  "status": "CERTIFIED",
  "productionCountry": "Country",
  "productionRegion": "Region",
  "vintage": "2024",
  "ingredients": "Ingredients list",
  "volume": "750ml",
  "alcoholContent": "12%",
  "packaging": "Bottle",
  "imageUrl": "https://...",
  "user": {
    "name": "Producer Name",
    "company": "Company Name",
    "email": "email@example.com"
  },
  "category": {
    "id": "category-id",
    "name": "Category Name"
  },
  "evaluation": { ... },
  "certificate": { ... }
}
```

**Error Response** (404):
```json
{
  "error": "Product not found"
}
```

---

### 6. Submit Contact Form

Submit a contact form inquiry.

**Endpoint**: `POST /api/contact`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Company Name",
  "phone": "+1234567890",
  "subject": "Inquiry Subject",
  "message": "Message content"
}
```

**Required Fields**: `name`, `email`, `subject`, `message`  
**Optional Fields**: `company`, `phone`

**Response** (201 Created):
```json
{
  "message": "Thank you for contacting us! We will respond within 24 hours.",
  "id": "contact-id"
}
```

**Error Response** (400):
```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": ["email"],
      "message": "Invalid email address"
    }
  ]
}
```

---

## Protected Endpoints

### 7. Create Product Submission

Submit a new product for evaluation. Requires authenticated producer session.

**Endpoint**: `POST /api/products`

**Authentication**: Required (Producer with `accountStatus: 'APPROVED'`)

**Request Body**:
```json
{
  "name": "Product Name",
  "description": "Product description",
  "categoryId": "category-id",
  "productionCountry": "Country",
  "productionRegion": "Region",
  "vintage": "2024",
  "ingredients": "Ingredients list",
  "volume": "750ml",
  "alcoholContent": "12%",
  "packaging": "Bottle",
  "imageUrl": "https://..."
}
```

**Required Fields**: `name`, `categoryId`  
**Optional Fields**: All others

**Response** (201 Created):
```json
{
  "id": "product-id",
  "name": "Product Name",
  "status": "PENDING",
  "submittedAt": "2024-01-15T00:00:00.000Z",
  "category": { ... },
  "user": { ... }
}
```

**Error Response** (401):
```json
{
  "error": "Unauthorized"
}
```

**Error Response** (403):
```json
{
  "error": "Your account is pending approval. Please wait for admin approval before submitting products.",
  "accountStatus": "PENDING"
}
```

---

### 8. Delete Product

Delete a product. Only the product owner or admin can delete.

**Endpoint**: `DELETE /api/products/[id]`

**Authentication**: Required (Product owner or Admin)

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Product ID |

**Response** (200 OK):
```json
{
  "message": "Product deleted successfully"
}
```

---

### 9. Get Certificates

Get all certificates. Requires authentication.

**Endpoint**: `GET /api/certificates`

**Authentication**: Required

**Response** (200 OK):
```json
[
  {
    "id": "certificate-id",
    "certificateNumber": "TC-2024-123456",
    "awardLevel": "GOLD",
    "overallScore": 87,
    "issueDate": "2024-01-15T00:00:00.000Z",
    "isPublished": true,
    "product": {
      "id": "product-id",
      "name": "Product Name",
      "user": {
        "name": "Producer Name",
        "company": "Company Name"
      },
      "category": {
        "name": "Category Name"
      }
    }
  }
]
```

---

### 10. Create Certificate

Create a certificate for an evaluated product. Admin only.

**Endpoint**: `POST /api/certificates`

**Authentication**: Required (Admin only)

**Request Body**:
```json
{
  "productId": "product-id",
  "awardLevel": "GOLD",
  "certificateNumber": "TC-2024-123456"
}
```

**Required Fields**: `productId`, `awardLevel`  
**Optional Fields**: `certificateNumber` (auto-generated if not provided)

**Award Levels**: `GOLD`, `SILVER`, `BRONZE`

**Response** (201 Created):
```json
{
  "id": "certificate-id",
  "certificateNumber": "TC-2024-123456",
  "awardLevel": "GOLD",
  "overallScore": 87,
  "issueDate": "2024-01-15T00:00:00.000Z",
  "isPublished": true,
  "product": { ... }
}
```

**Error Response** (400):
```json
{
  "error": "Certificate number already exists"
}
```

---

### 11. Get Single Certificate

Get detailed information about a specific certificate.

**Endpoint**: `GET /api/certificates/[id]`

**Authentication**: Required

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Certificate ID |

**Response** (200 OK):
```json
{
  "id": "certificate-id",
  "certificateNumber": "TC-2024-123456",
  "awardLevel": "GOLD",
  "overallScore": 87,
  "issueDate": "2024-01-15T00:00:00.000Z",
  "isPublished": true,
  "product": { ... }
}
```

---

### 12. Download Certificate PDF

Download a certificate as PDF.

**Endpoint**: `GET /api/certificates/[id]/download`

**Authentication**: Required

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Certificate ID |

**Response**: PDF file (binary)

---

### 13. Create Category

Create a new product category. Admin only.

**Endpoint**: `POST /api/categories`

**Authentication**: Required (Admin only)

**Request Body**:
```json
{
  "name": "Category Name",
  "slug": "category-slug",
  "description": "Category description",
  "imageUrl": "https://...",
  "isActive": true
}
```

**Required Fields**: `name`  
**Optional Fields**: `slug` (auto-generated from name), `description`, `imageUrl`, `isActive` (default: `true`)

**Response** (201 Created):
```json
{
  "id": "category-id",
  "name": "Category Name",
  "slug": "category-slug",
  "description": "Category description",
  "imageUrl": "https://...",
  "isActive": true,
  "_count": {
    "products": 0
  }
}
```

**Error Response** (400):
```json
{
  "error": "Category slug already exists"
}
```

---

### 14. Update Category

Update an existing category. Admin only.

**Endpoint**: `PATCH /api/categories/[id]`

**Authentication**: Required (Admin only)

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Category ID |

**Request Body**:
```json
{
  "name": "Updated Category Name",
  "description": "Updated description",
  "isActive": false
}
```

**All fields are optional** - only include fields you want to update.

**Response** (200 OK):
```json
{
  "id": "category-id",
  "name": "Updated Category Name",
  "slug": "category-slug",
  "description": "Updated description",
  "isActive": false,
  "_count": {
    "products": 15
  }
}
```

---

### 15. Delete Category

Delete a category. Admin only.

**Endpoint**: `DELETE /api/categories/[id]`

**Authentication**: Required (Admin only)

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Category ID |

**Response** (200 OK):
```json
{
  "message": "Category deleted successfully"
}
```

---

### 16. Create Evaluation

Create or update a product evaluation. Admin only.

**Endpoint**: `POST /api/evaluations`

**Authentication**: Required (Admin only)

**Request Body**:
```json
{
  "productId": "product-id",
  "appearanceScore": 8.5,
  "aromaScore": 9.0,
  "tasteScore": 9.5,
  "aftertasteScore": 8.0,
  "harmonyScore": 9.0,
  "totalScore": 87,
  "tastingNotes": "Excellent balance and complexity",
  "technicalNotes": "Well-structured, good acidity",
  "recommendations": "Consider aging for additional depth",
  "attributes": {
    "complexity": true,
    "balance": true,
    "finish": true
  }
}
```

**Required Fields**: `productId`, `aromaScore`, `tasteScore`  
**Optional Fields**: `appearanceScore`, `aftertasteScore`, `harmonyScore`, `totalScore` (auto-calculated), `tastingNotes`, `technicalNotes`, `recommendations`, `attributes`

**Response** (201 Created):
```json
{
  "id": "evaluation-id",
  "productId": "product-id",
  "appearanceScore": 8.5,
  "aromaScore": 9.0,
  "tasteScore": 9.5,
  "aftertasteScore": 8.0,
  "harmonyScore": 9.0,
  "totalScore": 87,
  "overallScore": 87,
  "tastingNotes": "Excellent balance and complexity",
  "technicalNotes": "Well-structured, good acidity",
  "recommendations": "Consider aging for additional depth",
  "attributes": "{\"complexity\":true,\"balance\":true,\"finish\":true}",
  "evaluationDate": "2024-01-15T00:00:00.000Z"
}
```

**Note**: Product status is automatically updated to `EVALUATED` after successful evaluation.

---

### 17. Update Product Status

Update a product's status.

**Endpoint**: `PATCH /api/products/[id]/status`

**Authentication**: Required (Admin only)

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Product ID |

**Request Body**:
```json
{
  "status": "UNDER_REVIEW"
}
```

**Valid Status Values**: `PENDING`, `UNDER_REVIEW`, `EVALUATED`, `CERTIFIED`

**Response** (200 OK):
```json
{
  "id": "product-id",
  "status": "UNDER_REVIEW",
  "updatedAt": "2024-01-15T00:00:00.000Z"
}
```

---

### 18. Get Producer Dashboard Stats

Get statistics for the authenticated producer's dashboard.

**Endpoint**: `GET /api/dashboard/stats`

**Authentication**: Required (Producer only)

**Response** (200 OK):
```json
{
  "stats": {
    "totalProducts": 15,
    "pendingProducts": 3,
    "evaluatedProducts": 8,
    "certifiedProducts": 4,
    "certificatesCount": 4,
    "goldCount": 2,
    "silverCount": 1,
    "bronzeCount": 1
  },
  "recentProducts": [
    {
      "id": "product-id",
      "name": "Product Name",
      "category": "Category Name",
      "status": "CERTIFIED",
      "submittedAt": "2024-01-15T00:00:00.000Z",
      "score": 87,
      "awardLevel": "GOLD"
    }
  ]
}
```

---

### 19. Get Producer Products

Get all products submitted by the authenticated producer.

**Endpoint**: `GET /api/dashboard/products`

**Authentication**: Required (Producer only)

**Response** (200 OK):
```json
[
  {
    "id": "product-id",
    "name": "Product Name",
    "description": "Description",
    "status": "CERTIFIED",
    "submittedAt": "2024-01-15T00:00:00.000Z",
    "category": {
      "id": "category-id",
      "name": "Category Name"
    },
    "evaluation": {
      "id": "evaluation-id",
      "totalScore": 87,
      "overallScore": 87,
      "evaluatedAt": "2024-01-20T00:00:00.000Z"
    },
    "certificate": {
      "id": "certificate-id",
      "awardLevel": "GOLD",
      "certificateNumber": "TC-2024-123456",
      "issueDate": "2024-01-25T00:00:00.000Z",
      "isPublished": true,
      "pdfUrl": "https://..."
    }
  }
]
```

---

## Error Handling

All endpoints follow a consistent error response format:

### Standard Error Response
```json
{
  "error": "Error message description"
}
```

### Validation Error Response (400)
```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": ["fieldName"],
      "message": "Field-specific error message"
    }
  ]
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions or account not approved)
- `404` - Not Found
- `500` - Internal Server Error

---

## Data Models

### Product Status
```typescript
type ProductStatus = 'PENDING' | 'UNDER_REVIEW' | 'EVALUATED' | 'CERTIFIED';
```

### Award Level
```typescript
type AwardLevel = 'GOLD' | 'SILVER' | 'BRONZE';
```

### User Role
```typescript
type UserRole = 'ADMIN' | 'PRODUCER';
```

### Account Status
```typescript
type AccountStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
```

---

## Examples

### JavaScript/TypeScript Examples

#### Verify Certificate
```typescript
async function verifyCertificate(certNumber: string) {
  const response = await fetch(`/api/certificates/verify?number=${encodeURIComponent(certNumber)}`);
  const data = await response.json();
  
  if (data.valid) {
    console.log('Certificate is valid:', data.certificate);
  } else {
    console.error('Certificate verification failed:', data.message);
  }
  
  return data;
}
```

#### Get Winners
```typescript
async function getWinners() {
  const response = await fetch('/api/products/winners');
  const winners = await response.json();
  return winners;
}
```

#### Get Categories
```typescript
async function getCategories() {
  const response = await fetch('/api/categories');
  const categories = await response.json();
  return categories;
}
```

#### Submit Product (Authenticated)
```typescript
async function submitProduct(productData: {
  name: string;
  description: string;
  categoryId: string;
  // ... other fields
}) {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important: include session cookies
    body: JSON.stringify(productData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  return await response.json();
}
```

#### Submit Contact Form
```typescript
async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
}) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  return await response.json();
}
```

### cURL Examples

#### Verify Certificate
```bash
curl "https://yourdomain.com/api/certificates/verify?number=TC-2024-123456"
```

#### Get Winners
```bash
curl "https://yourdomain.com/api/products/winners"
```

#### Submit Product (with session cookie)
```bash
curl -X POST "https://yourdomain.com/api/products" \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=your-session-token" \
  -d '{
    "name": "Product Name",
    "description": "Description",
    "categoryId": "category-id"
  }'
```

---

## Rate Limiting

Currently, there are no rate limits implemented. However, please use the API responsibly.

## Support

For API support or questions, please contact the development team or submit an issue.

---

**Last Updated**: 2024  
**API Version**: 1.0

