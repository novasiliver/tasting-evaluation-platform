# Database Setup Guide

## Prerequisites

1. **MySQL Server** - Install MySQL 8.0+ on your system
   - Download: https://dev.mysql.com/downloads/mysql/
   - Or use XAMPP/WAMP which includes MySQL

2. **Create Database**
   ```sql
   CREATE DATABASE tastecert CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

## Environment Setup

1. **Create `.env` file** in the project root:
   ```env
   # Database
   DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/tastecert"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-change-in-production"
   ```

2. **Update DATABASE_URL** with your MySQL credentials:
   - Replace `root` with your MySQL username
   - Replace `YOUR_PASSWORD` with your MySQL password
   - Update `localhost` if MySQL is on a different host
   - Update `3306` if using a different port

## Generate Prisma Client

```bash
npx prisma generate
```

## Run Database Migrations

This will create all the tables in your MySQL database:

```bash
npx prisma db push
```

Or for production-ready migrations:

```bash
npx prisma migrate dev --name init
```

## Seed Initial Data (Optional)

Create an admin user and sample categories:

```bash
npm run seed
```

## Verify Setup

Check that tables were created:

```sql
USE tastecert;
SHOW TABLES;
```

You should see:
- users
- accounts
- sessions
- verification_tokens
- categories
- products
- evaluations
- certificates

## Troubleshooting

### "Can't connect to MySQL server"
- Ensure MySQL is running
- Check connection details in DATABASE_URL
- Verify MySQL port (default: 3306)

### "Access denied for user"
- Verify username and password in DATABASE_URL
- Grant privileges: `GRANT ALL PRIVILEGES ON tastecert.* TO 'your_user'@'localhost';`

### "Unknown database 'tastecert'"
- Create the database first (see step 2 above)

## Next Steps

Once database is set up:
1. Run `npm run dev` to start the development server
2. Create an admin account at `/auth/signup`
3. Manually update the user's role to 'ADMIN' in the database
4. Access admin dashboard at `/admin`

