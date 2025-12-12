# Admin Access Guide

## 🎯 How to Access the Admin Dashboard

### Step 1: Create Your Account

1. Visit **`http://localhost:3000/auth/signup`**
2. Fill in the registration form:
   - Name
   - Email
   - Password (minimum 8 characters)
   - Company (optional)
   - Phone (optional)
3. Click "Create account"
4. You'll be automatically signed in

### Step 2: Promote Your Account to Admin

By default, new users are created with the `PRODUCER` role. To access admin features, you need to manually update your role in the database.

#### Option A: Using MySQL Command Line

```bash
# Connect to MySQL
mysql -u root -p

# Switch to the database
USE tastecert;

# Find your user
SELECT id, email, name, role FROM users;

# Update your role to ADMIN
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';

# Verify the change
SELECT id, email, name, role FROM users WHERE email = 'your@email.com';

# Exit
EXIT;
```

#### Option B: Using MySQL Workbench or phpMyAdmin

1. Open your MySQL management tool
2. Navigate to the `tastecert` database
3. Open the `users` table
4. Find your user row
5. Change the `role` column from `PRODUCER` to `ADMIN`
6. Save the changes

### Step 3: Sign Out and Sign In Again

1. Visit **`http://localhost:3000/auth/signin`**
2. Sign out if you're already signed in
3. Sign in again with your credentials
4. Your session will now include the ADMIN role

### Step 4: Access the Admin Dashboard

Visit **`http://localhost:3000/admin`**

You should now see the admin dashboard! 🎉

## 📊 Admin Dashboard Features

### Main Dashboard (`/admin`)
- **Statistics Overview**: Total submissions, pending reviews, evaluated products, certificates issued
- **Recent Submissions**: Quick view of latest product submissions
- **Quick Actions**: Links to all admin sections

### Submissions Management (`/admin/submissions`)
- View all product submissions
- Filter by status (Pending, Under Review, Evaluated, Certified)
- Review product details
- Evaluate products (evaluation form coming soon)

### User Management (`/admin/users`)
- View all registered users
- See user roles (Producer/Admin)
- Track submission counts per user
- Manage user accounts

### Certificates (`/admin/certificates`)
- Certificate generation (coming soon)
- PDF download management (coming soon)

### Settings (`/admin/settings`)
- Category management (coming soon)
- Evaluation criteria configuration (coming soon)

## 🔐 Security Notes

### Protected Routes
The admin dashboard is protected by middleware that checks:
1. ✅ User is authenticated (has valid session)
2. ✅ User has ADMIN role
3. ✅ Redirects unauthorized users to sign-in page

### Session Management
- Sessions use JWT (JSON Web Tokens)
- Sessions include user role
- Middleware validates on every request

## 🚨 Troubleshooting

### "Unauthorized" or Redirected to Sign-In

**Possible causes:**
1. You're not signed in → Sign in at `/auth/signin`
2. Your role is still `PRODUCER` → Update role in database
3. Session doesn't include new role → Sign out and sign in again

**Solution:**
```sql
-- Check your current role
SELECT email, role FROM users WHERE email = 'your@email.com';

-- If it says PRODUCER, update it
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
```

Then **sign out and sign in again** to refresh your session.

### Can't Access Database

**Error:** "Can't connect to MySQL server"

**Solutions:**
1. Ensure MySQL is running
2. Check DATABASE_URL in `.env` file
3. Verify credentials (username/password)
4. Test connection: `mysql -u root -p`

### Database Not Created

**Error:** "Unknown database 'tastecert'"

**Solution:**
```sql
CREATE DATABASE tastecert CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Prisma Client Not Generated

**Error:** "Cannot find module '@prisma/client'"

**Solution:**
```bash
npx prisma generate
npx prisma db push
```

## 🎨 Admin UI Features

- **Modern Design**: Clean, professional interface matching the main site
- **Real-time Stats**: Live counts and status indicators
- **Status Badges**: Color-coded submission statuses
- **Quick Actions**: Fast navigation to key functions
- **Responsive Layout**: Works on desktop and tablet

## 📝 Next Steps

Once you're in the admin dashboard:

1. **Test the Interface**: Navigate through all sections
2. **Wait for Producer Submissions**: Users need to submit products first
3. **Evaluate Products**: Review and score submissions (evaluation form coming soon)
4. **Generate Certificates**: Issue awards to approved products (coming soon)

## 🔄 Creating Additional Admin Users

To give admin access to another user:

```sql
-- Find the user
SELECT id, email, name, role FROM users WHERE email = 'newadmin@example.com';

-- Promote to admin
UPDATE users SET role = 'ADMIN' WHERE email = 'newadmin@example.com';
```

## 📚 Related Documentation

- `DATABASE_SETUP.md` - Initial database configuration
- `IMPLEMENTATION_COMPLETE.md` - Full feature overview
- `BACKEND_IMPLEMENTATION_STATUS.md` - Technical details

---

**Need Help?** Check the troubleshooting section above or review the database setup guide.

