# Tastecert API Integration Guide

**Complete guide for frontend developers integrating with the Tastecert API.**

---

## 📚 Documentation Index

This project includes comprehensive documentation for API integration:

### 1. **[AUTH_DOCUMENTATION.md](./AUTH_DOCUMENTATION.md)** ⭐ **START HERE**
   **Complete authentication and authorization guide**
   - User registration and login
   - Session management
   - Role-based access control
   - Account status requirements
   - Making authenticated requests
   - Error handling
   - Complete code examples

### 2. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**
   **Full API endpoint reference**
   - All 19+ endpoints documented
   - Request/response examples
   - Query parameters
   - Error responses
   - Data models

### 3. **[API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)**
   **Quick reference for common tasks**
   - Most-used endpoints
   - Code snippets
   - Status codes
   - Authentication notes

---

## 🚀 Quick Start

### Step 1: Understand Authentication
**Read [AUTH_DOCUMENTATION.md](./AUTH_DOCUMENTATION.md) first!**

Key points:
- ✅ Use `credentials: 'include'` in all authenticated requests
- ✅ Wrap app with `<SessionProvider>` from `next-auth/react`
- ✅ Producer accounts need `APPROVED` status to submit products
- ✅ Check session with `useSession()` hook

### Step 2: Set Up Authentication

```typescript
// 1. Install dependencies
npm install next-auth react

// 2. Wrap your app with SessionProvider
import { SessionProvider } from 'next-auth/react';

export default function App({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// 3. Use authentication in components
import { useSession, signIn, signOut } from 'next-auth/react';

function MyComponent() {
  const { data: session } = useSession();
  // Use session.user.id, session.user.role, etc.
}
```

### Step 3: Make Authenticated API Calls

```typescript
// ✅ CORRECT - Include credentials
const response = await fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // ← REQUIRED
  body: JSON.stringify(data),
});

// ❌ WRONG - Missing credentials
const response = await fetch('/api/products', {
  method: 'POST',
  // Missing credentials: 'include'
});
```

### Step 4: Reference API Endpoints
Use [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for:
- Endpoint URLs
- Request/response formats
- Required parameters
- Error handling

---

## 📋 Common Integration Tasks

### Task 1: User Registration
**See**: [AUTH_DOCUMENTATION.md - User Registration](./AUTH_DOCUMENTATION.md#user-registration)

```typescript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'producer123',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePassword123!',
    company: 'Artisan Foods Inc.',
  }),
});
```

### Task 2: User Login
**See**: [AUTH_DOCUMENTATION.md - User Login](./AUTH_DOCUMENTATION.md#user-login)

```typescript
import { signIn } from 'next-auth/react';

await signIn('credentials', {
  username: 'producer123', // Can be username OR email
  password: 'SecurePassword123!',
  redirect: false,
});
```

### Task 3: Verify Certificate (Public)
**See**: [API_DOCUMENTATION.md - Verify Certificate](./API_DOCUMENTATION.md#1-verify-certificate)

```typescript
const response = await fetch(
  `/api/certificates/verify?number=TC-2024-123456`
);
const data = await response.json();
```

### Task 4: Get Certified Products (Public)
**See**: [API_DOCUMENTATION.md - Get Winners](./API_DOCUMENTATION.md#2-get-winners-certified-products)

```typescript
const response = await fetch('/api/products/winners');
const winners = await response.json();
```

### Task 5: Submit Product (Authenticated)
**See**: [API_DOCUMENTATION.md - Create Product](./API_DOCUMENTATION.md#7-create-product-submission)

```typescript
const response = await fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Required!
  body: JSON.stringify({
    name: 'Product Name',
    categoryId: 'category-id',
    description: 'Product description',
  }),
});
```

### Task 6: Get My Products (Authenticated)
**See**: [API_DOCUMENTATION.md - Get Producer Products](./API_DOCUMENTATION.md#19-get-producer-products)

```typescript
const response = await fetch('/api/dashboard/products', {
  credentials: 'include', // Required!
});
const products = await response.json();
```

---

## 🔑 Authentication Requirements Summary

| Endpoint Type | Authentication | Role Required | Account Status |
|---------------|----------------|--------------|----------------|
| Public | ❌ None | - | - |
| Producer (Read) | ✅ Required | `PRODUCER` | Any |
| Producer (Submit) | ✅ Required | `PRODUCER` | `APPROVED` |
| Admin | ✅ Required | `ADMIN` | Any |

---

## ⚠️ Common Mistakes to Avoid

1. **Missing `credentials: 'include'`**
   ```typescript
   // ❌ WRONG
   fetch('/api/products', { method: 'POST' });
   
   // ✅ CORRECT
   fetch('/api/products', { 
     method: 'POST',
     credentials: 'include' 
   });
   ```

2. **Not checking account status**
   ```typescript
   // ❌ WRONG - Will fail for PENDING accounts
   submitProduct(data);
   
   // ✅ CORRECT - Check status first
   if (accountStatus === 'APPROVED') {
     submitProduct(data);
   }
   ```

3. **Not handling 401/403 errors**
   ```typescript
   // ❌ WRONG - No error handling
   const response = await fetch('/api/products');
   
   // ✅ CORRECT - Handle auth errors
   const response = await fetch('/api/products', {
     credentials: 'include'
   });
   if (response.status === 401) {
     window.location.href = '/auth/signin';
   }
   ```

4. **Not wrapping app with SessionProvider**
   ```typescript
   // ❌ WRONG - useSession won't work
   export default function App({ children }) {
     return <>{children}</>;
   }
   
   // ✅ CORRECT
   import { SessionProvider } from 'next-auth/react';
   export default function App({ children }) {
     return <SessionProvider>{children}</SessionProvider>;
   }
   ```

---

## 📞 Support

### Documentation Files
- **Authentication**: [AUTH_DOCUMENTATION.md](./AUTH_DOCUMENTATION.md)
- **API Endpoints**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Quick Reference**: [API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)

### Key Endpoints
- **Base URL**: `/api` (relative to your domain)
- **Auth Endpoints**: `/api/auth/*` (handled by NextAuth)
- **Registration**: `POST /api/auth/register`
- **Sign In**: Use NextAuth `signIn()` function

### Testing
- Use browser DevTools → Network tab to inspect requests
- Check for `credentials: 'include'` in fetch requests
- Verify session cookie is present in requests
- Check response status codes (401 = auth required, 403 = forbidden)

---

## ✅ Integration Checklist

Before starting integration:

- [ ] Read [AUTH_DOCUMENTATION.md](./AUTH_DOCUMENTATION.md) completely
- [ ] Understand session management and cookies
- [ ] Set up `SessionProvider` in your app
- [ ] Test user registration flow
- [ ] Test user login flow
- [ ] Test authenticated API calls
- [ ] Handle 401/403 errors properly
- [ ] Check account status for Producer accounts
- [ ] Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for endpoint details

---

**Happy Integrating! 🚀**

For questions or issues, refer to the detailed documentation files listed above.

