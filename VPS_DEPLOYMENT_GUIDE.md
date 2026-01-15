# 🚀 VPS Deployment Guide - Ubuntu 24.04 + Nginx

Complete deployment guide for hosting the Tasting Evaluation Platform on VPS with Nginx reverse proxy.

---

## 📋 Prerequisites

- Ubuntu 24.04 VPS
- Root or sudo access
- Domain name pointed to VPS IP
- Node.js 18+ installed
- MySQL 8.0+ installed

---

## 🔧 Step 1: Server Setup

### Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install MySQL (if not installed)
sudo apt install -y mysql-server

# Install build tools (for native modules)
sudo apt install -y build-essential python3
```

### Verify Installations

```bash
node --version  # Should be v20.x
npm --version
pm2 --version
nginx -v
mysql --version
```

---

## 📁 Step 2: Project Setup

### Clone/Upload Project

```bash
# Create project directory
sudo mkdir -p /var/www/tastecert
sudo chown -R $USER:$USER /var/www/tastecert
cd /var/www/tastecert

# If using Git:
# git clone your-repo-url .

# Or upload files via SFTP/SCP
```

### Install Dependencies

```bash
cd /var/www/tastecert
npm install --production
```

### Create Environment File

```bash
nano .env
```

Add configuration:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/tastecert"

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32

# File Uploads
UPLOAD_DIR=/var/www/tastecert-uploads
NEXT_PUBLIC_UPLOAD_BASE_URL=https://yourdomain.com/uploads
MAX_FILE_SIZE=5242880
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp

# Base URL (for QR codes and redirects)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Node Environment
NODE_ENV=production
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## 🗄️ Step 3: Database Setup

### Create Database

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE tastecert CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'tastecert_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON tastecert.* TO 'tastecert_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Run Prisma Migrations

```bash
cd /var/www/tastecert
npx prisma generate
npx prisma db push
# Or use migrations:
# npx prisma migrate deploy
```

### Seed Categories (Optional)

```bash
node scripts/seed-categories.js
```

---

## 📤 Step 4: File Upload Directory

```bash
# Create persistent uploads directory
sudo mkdir -p /var/www/tastecert-uploads/products
sudo mkdir -p /var/www/tastecert-uploads/certificates

# Set ownership
sudo chown -R $USER:$USER /var/www/tastecert-uploads

# Set permissions
sudo chmod -R 755 /var/www/tastecert-uploads
```

---

## 🏗️ Step 5: Build Application

```bash
cd /var/www/tastecert
npm run build
```

---

## ⚙️ Step 6: PM2 Configuration

### Create PM2 Config

```bash
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: 'tastecert',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/tastecert',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/tastecert/error.log',
      out_file: '/var/log/tastecert/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      watch: false,
    },
  ],
};
```

### Create Log Directory

```bash
sudo mkdir -p /var/log/tastecert
sudo chown -R $USER:$USER /var/log/tastecert
```

### Start with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
# Run the command it outputs to enable auto-start on boot
```

### PM2 Commands

```bash
pm2 status          # Check status
pm2 logs tastecert  # View logs
pm2 restart tastecert  # Restart app
pm2 stop tastecert  # Stop app
```

---

## 🌐 Step 7: Nginx Configuration

### Create Nginx Config

```bash
sudo nano /etc/nginx/sites-available/tastecert
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Uploads directory - serve directly via Nginx
    location /uploads {
        alias /var/www/tastecert-uploads;
        
        # Security: Only allow image files
        location ~* \.(jpg|jpeg|png|webp)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            access_log off;
        }
        
        # Deny access to other file types
        location ~* \.(php|sh|exe|bat|py)$ {
            deny all;
            return 403;
        }
        
        # Deny access to hidden files
        location ~ /\. {
            deny all;
        }
    }

    # Next.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Increase timeout for large requests
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Increase client body size for file uploads
    client_max_body_size 10M;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json image/svg+xml;
}
```

### Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/tastecert /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔒 Step 8: SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (already set up by certbot)
sudo certbot renew --dry-run
```

After SSL, Nginx will automatically update to use HTTPS.

---

## 📝 Step 9: Create Deployment Script

```bash
nano deploy.sh
```

```bash
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

cd /var/www/tastecert

# Pull latest code (if using git)
# git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build application
echo "🔨 Building application..."
npm run build

# Preserve uploads directory
if [ -d "/var/www/tastecert-uploads" ]; then
    echo "✅ Uploads directory preserved"
    sudo chown -R $USER:$USER /var/www/tastecert-uploads
    sudo chmod -R 755 /var/www/tastecert-uploads
else
    echo "⚠️  Creating uploads directory..."
    sudo mkdir -p /var/www/tastecert-uploads/products
    sudo chown -R $USER:$USER /var/www/tastecert-uploads
    sudo chmod -R 755 /var/www/tastecert-uploads
fi

# Restart application
echo "🔄 Restarting application..."
pm2 restart tastecert

# Reload Nginx
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ Deployment complete!"
```

**Make executable:**
```bash
chmod +x deploy.sh
```

**Usage:**
```bash
./deploy.sh
```

---

## ✅ Step 10: Create Admin User

```bash
cd /var/www/tastecert
node scripts/generate-admin-hash.js
```

Then manually insert admin user in database:

```bash
sudo mysql -u root -p tastecert
```

```sql
INSERT INTO users (id, username, email, name, password, role, createdAt, updatedAt)
VALUES (
  'admin-id-here',
  'admin',
  'admin@yourdomain.com',
  'Admin User',
  'hashed-password-from-script',
  'ADMIN',
  NOW(),
  NOW()
);
```

---

## 🔍 Step 11: Verify Deployment

1. **Check PM2:**
   ```bash
   pm2 status
   pm2 logs tastecert
   ```

2. **Check Nginx:**
   ```bash
   sudo systemctl status nginx
   sudo nginx -t
   ```

3. **Check Application:**
   - Visit `https://yourdomain.com`
   - Test login
   - Test file upload
   - Check uploads directory: `ls -lh /var/www/tastecert-uploads/products`

4. **Check Logs:**
   ```bash
   pm2 logs tastecert
   sudo tail -f /var/log/nginx/error.log
   ```

---

## 🔄 Updating the Application

### Manual Update

```bash
cd /var/www/tastecert
./deploy.sh
```

### Automated Update (Git Hook)

Create `post-receive` hook on server (if using Git):

```bash
# On server
mkdir -p /var/www/tastecert.git
cd /var/www/tastecert.git
git init --bare

# Create hook
nano hooks/post-receive
```

```bash
#!/bin/bash
cd /var/www/tastecert
git --git-dir=/var/www/tastecert.git --work-tree=/var/www/tastecert checkout -f
cd /var/www/tastecert
./deploy.sh
```

```bash
chmod +x hooks/post-receive
```

---

## 🛡️ Security Hardening

### Firewall (UFW)

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### Fail2Ban (Optional)

```bash
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
```

### Regular Updates

```bash
# Add to crontab
0 2 * * * apt update && apt upgrade -y
```

---

## 📊 Monitoring

### PM2 Monitoring

```bash
pm2 monit
```

### Nginx Status

```bash
sudo systemctl status nginx
```

### Disk Space

```bash
df -h
du -sh /var/www/tastecert-uploads
```

### Database Backup

```bash
# Add to crontab (daily backup at 3 AM)
0 3 * * * mysqldump -u tastecert_user -p'password' tastecert > /backups/tastecert-$(date +\%Y\%m\%d).sql
```

---

## 🐛 Troubleshooting

### Application not starting

```bash
pm2 logs tastecert
cd /var/www/tastecert
npm run build  # Rebuild
pm2 restart tastecert
```

### Nginx 502 Bad Gateway

```bash
# Check if app is running
pm2 status

# Check port
netstat -tulpn | grep 3000

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log
```

### Images not loading

```bash
# Check permissions
ls -la /var/www/tastecert-uploads/products

# Fix permissions
sudo chown -R $USER:$USER /var/www/tastecert-uploads
sudo chmod -R 755 /var/www/tastecert-uploads

# Check Nginx config
sudo nginx -t
```

### Database connection errors

```bash
# Test connection
mysql -u tastecert_user -p tastecert

# Check .env file
cat .env | grep DATABASE_URL
```

---

## 📚 Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

**Last Updated**: [Current Date]
**Status**: Production-Ready for Ubuntu 24.04 + Nginx

