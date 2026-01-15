# Tastecert Authentication Documentation

**Complete guide to authentication, authorization, and session management for API integration.**

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication System](#authentication-system)
3. [User Registration](#user-registration)
4. [User Login](#user-login)
5. [Session Structure](#session-structure)
6. [Making Authenticated Requests](#making-authenticated-requests)
7. [Role-Based Access Control](#role-based-access-control)
8. [Account Status Requirements](#account-status-requirements)
9. [Protected Routes](#protected-routes)
10. [Error Handling](#error-handling)
11. [Session Management](#session-management)
12. [Complete Examples](#complete-examples)

---

## Overview

The Tastecert platform uses **NextAuth.js** for authentication with:
- **JWT-based sessions** (stored in HTTP-only cookies)
- **Credentials provider** (username/email + password)
- **Role-based access control** (ADMIN, PRODUCER)
- **Account status management** (PENDING, APPROVED, REJECTED)

### Key Points
- ✅ Session cookies are automatically managed by NextAuth
- ✅ All authenticated requests must include session cookies
- ✅ Producer accounts require `APPROVED` status to submit products
- ✅ Admin accounts have full system access
- ✅ Sessions persist across page refreshes and browser restarts

---

## Authentication System

### Technology Stack
- **NextAuth.js v4+** - Authentication framework
- **JWT Strategy** - Token-based sessions
- **Prisma Adapter** - Database integration
- **bcrypt** - Password hashing

### Authentication Flow

```
1. User submits credentials (username/email + password)
2. Server validates credentials against database
3. If valid, NextAuth creates JWT token
4. Token stored in HTTP-only cookie (next-auth.session-token)
5. Cookie automatically included in subsequent requests
6. Server validates token on each protected request
```

### Session Cookie
- **Name**: `next-auth.session-token` (or `__Secure-next-auth.session-token` in production)
- **Type**: HTTP-only cookie (not accessible via JavaScript)
- **Security**: SameSite protection, Secure flag in production
- **Expiration**: Default NextAuth session duration

---

## User Registration

### Endpoint
```
POST /api/auth/register
```

### Request Body
```json
{
  "username": "producer123",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "company": "Artisan Foods Inc.",
  "phone": "+1234567890"
}
```

### Required Fields
| Field | Type | Validation |
|-------|------|------------|
| `username` | string | Min 3 chars, alphanumeric + underscores only |
| `name` | string | Min 2 characters |
| `email` | string | Valid email format |
| `password` | string | Min 8 characters |

### Optional Fields
- `company` - Company name
- `phone` - Phone number

### Response (201 Created)
```json
{
  "user": {
    "id": "user-id",
    "username": "producer123",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Artisan Foods Inc.",
    "role": "PRODUCER",
    "createdAt": "2024-01-15T00:00:00.000Z"
  },
  "message": "User created successfully"
}
```

### Error Responses

**400 - Username/Email Already Exists**
```json
{
  "error": "Username already taken"
}
```
or
```json
{
  "error": "Email already registered"
}
```

**400 - Validation Error**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": ["password"],
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

### Important Notes
- ⚠️ **New accounts start with `accountStatus: 'PENDING'`**
- ⚠️ **PENDING accounts cannot submit products** (requires admin approval)
- ⚠️ **Default role is `PRODUCER`** (ADMIN accounts must be created manually)
- ✅ After registration, user must **sign in** to get a session

### Registration Example
```typescript
async function registerUser(userData: {
  username: string;
  name: string;
  email: string;
  password: string;
  company?: string;
  phone?: string;
}) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
}

// Usage
try {
  const result = await registerUser({
    username: 'producer123',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePassword123!',
    company: 'Artisan Foods Inc.',
  });
  console.log('User registered:', result.user);
} catch (error) {
  console.error('Registration failed:', error);
}
```

---

## User Login

### Endpoint
```
POST /api/auth/csrf
GET /api/auth/signin
POST /api/auth/callback/credentials
```

**Note**: NextAuth handles these endpoints automatically. Use the NextAuth client methods.

### Using NextAuth Client (Recommended)

```typescript
import { signIn } from 'next-auth/react';

// Sign in with credentials
const result = await signIn('credentials', {
  username: 'producer123', // Can be username OR email
  password: 'SecurePassword123!',
  redirect: false, // Don't redirect automatically
});

if (result?.error) {
  console.error('Sign in failed:', result.error);
} else {
  console.log('Signed in successfully');
  // Session cookie is now set automatically
}
```

### Manual Login (Alternative)

If you need to handle login manually:

```typescript
async function login(username: string, password: string) {
  // First, get CSRF token
  const csrfResponse = await fetch('/api/auth/csrf');
  const { csrfToken } = await csrfResponse.json();

  // Then sign in
  const response = await fetch('/api/auth/callback/credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include', // Important: include cookies
    body: new URLSearchParams({
      username, // Can be username OR email
      password,
      csrfToken,
      json: 'true',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }

  return await response.json();
}
```

### Login Credentials
- **Username field accepts**: Username OR Email
- **Password**: Plain text (will be hashed and compared server-side)

### Response (200 OK)
```json
{
  "url": "/",
  "ok": true
}
```

### Error Responses

**401 - Invalid Credentials**
```json
{
  "error": "CredentialsSignin",
  "ok": false
}
```

### Important Notes
- ✅ **Username OR Email**: The system accepts either username or email in the username field
- ✅ **Session Cookie**: Automatically set after successful login
- ✅ **Session Persistence**: Session persists until logout or expiration
- ⚠️ **Account Status**: Login succeeds even for PENDING accounts, but API calls may fail

---

## Session Structure

### Session Object

After successful authentication, the session object contains:

```typescript
{
  user: {
    id: string;              // User ID (CUID)
    name: string;            // User's full name
    email: string;           // User's email
    image?: string;          // Profile image URL (if available)
    role: 'ADMIN' | 'PRODUCER';  // User role
    company?: string | null; // Company name
    phone?: string | null;  // Phone number
    country?: string | null; // Country
    address?: string | null; // Address
    website?: string | null; // Website URL
  },
  expires: string;           // ISO date string of expiration
}
```

### Getting Current Session

```typescript
import { useSession } from 'next-auth/react';

// In React component
function MyComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Not signed in</div>;
  }

  // session.user is available
  console.log('User ID:', session?.user?.id);
  console.log('User Role:', session?.user?.role);
  console.log('User Email:', session?.user?.email);
}
```

### Server-Side Session Check

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// In API route or server component
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // session.user is available
  const userId = session.user.id;
  const userRole = session.user.role;
}
```

---

## Making Authenticated Requests

### Critical: Include Cookies

All authenticated API requests **must include cookies**:

```typescript
// ✅ CORRECT - Include credentials
const response = await fetch('/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // ← REQUIRED for authenticated requests
  body: JSON.stringify(data),
});

// ❌ WRONG - Missing credentials
const response = await fetch('/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  // Missing credentials: 'include'
  body: JSON.stringify(data),
});
```

### Fetch with Authentication

```typescript
async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Always include cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (response.status === 401) {
    // Session expired or invalid
    // Redirect to login
    window.location.href = '/auth/signin';
    throw new Error('Unauthorized');
  }

  return response;
}

// Usage
const products = await authenticatedFetch('/api/dashboard/products');
const data = await products.json();
```

### Axios with Authentication

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true, // Include cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

// Usage
const response = await apiClient.post('/products', productData);
```

---

## Role-Based Access Control

### User Roles

| Role | Description | Access Level |
|------|-------------|--------------|
| `ADMIN` | System administrator | Full access to all endpoints and admin features |
| `PRODUCER` | Product producer | Can submit products, view own dashboard, manage own products |

### Role Checks in API

**Server-Side (API Route)**
```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  // Check authentication
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check role
  if (session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Admin-only code here
}
```

**Client-Side (React Component)**
```typescript
import { useSession } from 'next-auth/react';

function AdminComponent() {
  const { data: session } = useSession();

  if (session?.user?.role !== 'ADMIN') {
    return <div>Access Denied</div>;
  }

  return <div>Admin Content</div>;
}
```

### Endpoint Access by Role

| Endpoint | Public | Producer | Admin |
|----------|--------|----------|-------|
| `/api/certificates/verify` | ✅ | ✅ | ✅ |
| `/api/products/winners` | ✅ | ✅ | ✅ |
| `/api/categories` | ✅ | ✅ | ✅ |
| `/api/products` (GET) | ✅ | ✅ | ✅ |
| `/api/products` (POST) | ❌ | ✅* | ✅ |
| `/api/dashboard/products` | ❌ | ✅ | ✅ |
| `/api/dashboard/stats` | ❌ | ✅ | ✅ |
| `/api/certificates` (POST) | ❌ | ❌ | ✅ |
| `/api/evaluations` (POST) | ❌ | ❌ | ✅ |
| `/api/categories` (POST/PATCH/DELETE) | ❌ | ❌ | ✅ |

*Producer requires `accountStatus: 'APPROVED'`

---

## Account Status Requirements

### Account Status Types

| Status | Description | Can Submit Products? |
|--------|-------------|---------------------|
| `PENDING` | Awaiting admin approval | ❌ No |
| `APPROVED` | Approved by admin | ✅ Yes |
| `REJECTED` | Rejected by admin | ❌ No |

### Account Status Check

When a Producer tries to submit a product:

```typescript
// Server-side check (already implemented in API)
if (session.user.role === 'PRODUCER' && userAccountStatus !== 'APPROVED') {
  return NextResponse.json(
    { 
      error: userAccountStatus === 'REJECTED' 
        ? 'Your account has been rejected. You cannot submit products.' 
        : 'Your account is pending approval. Please wait for admin approval before submitting products.',
      accountStatus: userAccountStatus
    },
    { status: 403 }
  );
}
```

### Client-Side Status Check

```typescript
import { useSession } from 'next-auth/react';

function SubmitProductButton() {
  const { data: session } = useSession();
  const [accountStatus, setAccountStatus] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user profile to get account status
    fetch('/api/user/profile', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setAccountStatus(data.accountStatus));
  }, []);

  if (accountStatus === 'PENDING') {
    return <div>Your account is pending approval</div>;
  }

  if (accountStatus === 'REJECTED') {
    return <div>Your account has been rejected</div>;
  }

  return <button>Submit Product</button>;
}
```

### Error Responses

**403 - Account Not Approved**
```json
{
  "error": "Your account is pending approval. Please wait for admin approval before submitting products.",
  "accountStatus": "PENDING"
}
```

**403 - Account Rejected**
```json
{
  "error": "Your account has been rejected. You cannot submit products.",
  "accountStatus": "REJECTED"
}
```

---

## Protected Routes

### Route Protection

The system uses Next.js middleware to protect routes:

**Protected Routes:**
- `/admin/*` - Admin only
- `/dashboard/*` - Authenticated users only

**Middleware Behavior:**
- Unauthenticated users → Redirected to `/auth/signin`
- Non-admin users accessing `/admin/*` → Redirected to `/auth/signin?error=unauthorized`

### Client-Side Route Protection

```typescript
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return <div>Protected Content</div>;
}
```

---

## Error Handling

### Common Authentication Errors

| Status Code | Error | Description | Solution |
|-------------|-------|-------------|----------|
| `401` | Unauthorized | No session or invalid session | Sign in again |
| `403` | Forbidden | Wrong role or account not approved | Check role/status |
| `400` | Bad Request | Invalid credentials or validation error | Check request data |

### Error Response Format

```json
{
  "error": "Error message description"
}
```

### Handling Errors in Code

```typescript
async function submitProduct(productData: any) {
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const error = await response.json();
      
      if (response.status === 401) {
        // Unauthorized - redirect to login
        window.location.href = '/auth/signin';
        throw new Error('Please sign in to continue');
      }
      
      if (response.status === 403) {
        // Forbidden - check account status
        if (error.accountStatus === 'PENDING') {
          throw new Error('Your account is pending approval');
        }
        if (error.accountStatus === 'REJECTED') {
          throw new Error('Your account has been rejected');
        }
        throw new Error('Access denied');
      }
      
      throw new Error(error.error || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Submit product error:', error);
    throw error;
  }
}
```

---

## Session Management

### Sign Out

```typescript
import { signOut } from 'next-auth/react';

// Sign out and redirect
await signOut({ callbackUrl: '/' });

// Sign out without redirect
await signOut({ redirect: false });
```

### Check Session Status

```typescript
import { useSession } from 'next-auth/react';

function MyComponent() {
  const { data: session, status } = useSession();

  // status can be: 'loading' | 'authenticated' | 'unauthenticated'
  
  if (status === 'loading') {
    return <div>Checking authentication...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in</div>;
  }

  return <div>Welcome, {session.user.name}!</div>;
}
```

### Refresh Session

```typescript
import { useSession } from 'next-auth/react';

function MyComponent() {
  const { data: session, update } = useSession();

  const refreshSession = async () => {
    await update(); // Refresh session data
  };

  return (
    <button onClick={refreshSession}>
      Refresh Session
    </button>
  );
}
```

### Session Provider Setup

**Required in your app root:**

```typescript
// app/layout.tsx or pages/_app.tsx
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
```

---

## Complete Examples

### Example 1: Full Authentication Flow

```typescript
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

function AuthExample() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Register
  const handleRegister = async (formData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const result = await response.json();
      console.log('Registered:', result.user);
      
      // Auto sign in after registration
      await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sign In
  const handleSignIn = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error('Invalid credentials');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user.email}</p>
        <p>Role: {session.user.role}</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {/* Sign in form */}
    </div>
  );
}
```

### Example 2: Authenticated API Call

```typescript
async function submitProduct(productData: {
  name: string;
  categoryId: string;
  description?: string;
}) {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Required!
    body: JSON.stringify(productData),
  });

  if (response.status === 401) {
    // Redirect to login
    window.location.href = '/auth/signin';
    throw new Error('Please sign in');
  }

  if (response.status === 403) {
    const error = await response.json();
    throw new Error(error.error);
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
}
```

### Example 3: Role-Based Component

```typescript
import { useSession } from 'next-auth/react';

function RoleBasedComponent() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please sign in</div>;
  }

  if (session.user.role === 'ADMIN') {
    return <AdminDashboard />;
  }

  if (session.user.role === 'PRODUCER') {
    return <ProducerDashboard />;
  }

  return <div>Unknown role</div>;
}
```

### Example 4: Account Status Check

```typescript
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

function ProductSubmission() {
  const { data: session } = useSession();
  const [accountStatus, setAccountStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetch('/api/user/profile', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          setAccountStatus(data.accountStatus);
          setLoading(false);
        });
    }
  }, [session]);

  if (loading) return <div>Loading...</div>;

  if (accountStatus === 'PENDING') {
    return (
      <div>
        <p>Your account is pending approval.</p>
        <p>You cannot submit products until your account is approved by an administrator.</p>
      </div>
    );
  }

  if (accountStatus === 'REJECTED') {
    return (
      <div>
        <p>Your account has been rejected.</p>
        <p>Please contact support for assistance.</p>
      </div>
    );
  }

  return <ProductSubmissionForm />;
}
```

---

## Summary Checklist

### For Frontend Developers

- [ ] Use `credentials: 'include'` in all authenticated fetch requests
- [ ] Wrap app with `<SessionProvider>` from `next-auth/react`
- [ ] Use `useSession()` hook to check authentication status
- [ ] Handle 401 errors by redirecting to `/auth/signin`
- [ ] Check `accountStatus` for Producer accounts before allowing product submission
- [ ] Check `role` for admin-only features
- [ ] Use `signIn()` and `signOut()` from `next-auth/react` for authentication
- [ ] Include session cookies in all API requests to protected endpoints

### Common Mistakes to Avoid

- ❌ Forgetting `credentials: 'include'` in fetch requests
- ❌ Not checking `accountStatus` for Producer accounts
- ❌ Not handling 401/403 errors properly
- ❌ Trying to access session data before checking `status === 'authenticated'`
- ❌ Not wrapping app with `SessionProvider`

---

**Last Updated**: 2024  
**Authentication System**: NextAuth.js v4+  
**Session Strategy**: JWT  
**Cookie Security**: HTTP-only, SameSite, Secure

