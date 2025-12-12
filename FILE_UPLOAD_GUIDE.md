# 📤 File Upload Implementation Guide - VPS + Nginx Setup

## 🎯 Deployment Setup: VPS + Nginx Reverse Proxy (Ubuntu 24.04)

**This guide is optimized for:**
- VPS hosting (Ubuntu 24.04)
- Nginx reverse proxy
- Local file storage (persistent volume)
- PM2 or similar process manager

---

## ⚠️ CRITICAL: Production Requirements

**Problem**: Files uploaded to `public/uploads` are lost after rebuild/deploy.

**Solution**: Store files in persistent directory outside project, serve via Nginx.

---

## 📋 Step-by-Step Implementation

### Step 1: Create Persistent Upload Directory

**On your VPS**, create directory outside the project:

```bash
# Create persistent uploads directory
sudo mkdir -p /var/www/tastecert-uploads/products
sudo mkdir -p /var/www/tastecert-uploads/certificates

# Set ownership (replace 'youruser' with your actual user)
sudo chown -R youruser:youruser /var/www/tastecert-uploads

# Set permissions
sudo chmod -R 755 /var/www/tastecert-uploads
```

**Why `/var/www/tastecert-uploads`?**
- ✅ Outside project directory - survives rebuilds
- ✅ Standard location for web assets
- ✅ Easy to backup separately
- ✅ Can be mounted as separate volume if needed

---

### Step 2: Install Dependencies

```bash
npm install sharp formidable
```

- `sharp`: Image optimization and resizing
- `formidable`: File upload handling (or use Next.js built-in FormData)

---

### Step 3: Environment Variables

Add to your `.env` file:

```env
# File Upload Configuration
UPLOAD_DIR=/var/www/tastecert-uploads
NEXT_PUBLIC_UPLOAD_BASE_URL=https://yourdomain.com/uploads
MAX_FILE_SIZE=5242880  # 5MB in bytes
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp
```

**Important**: Use your actual domain in `NEXT_PUBLIC_UPLOAD_BASE_URL`

---

### Step 4: Create Upload API Route

Create `app/api/upload/route.ts`:

```typescript
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/var/www/tastecert-uploads';
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '5242880');
const ALLOWED_TYPES = (process.env.ALLOWED_IMAGE_TYPES || 'image/jpeg,image/png,image/webp').split(',');

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Convert to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Optimize and resize image
    const optimized = await sharp(buffer)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 85, progressive: true })
      .toBuffer();

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    const filename = `${timestamp}-${random}.jpg`;
    const filepath = join(UPLOAD_DIR, 'products', filename);

    // Ensure directory exists
    await mkdir(join(UPLOAD_DIR, 'products'), { recursive: true });

    // Write file
    await writeFile(filepath, optimized);

    // Return public URL (served by Nginx)
    const url = `${process.env.NEXT_PUBLIC_UPLOAD_BASE_URL}/products/${filename}`;

    return NextResponse.json({
      url,
      filename,
      size: optimized.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
```

---

### Step 5: Configure Nginx to Serve Uploads

**Edit your Nginx configuration** (usually `/etc/nginx/sites-available/your-site`):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Uploads directory - serve directly via Nginx (faster than API route)
    location /uploads {
        alias /var/www/tastecert-uploads;
        
        # Security: Only allow image files
        location ~* \.(jpg|jpeg|png|webp)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            access_log off;
        }
        
        # Deny access to other file types
        location ~* \.(php|sh|exe|bat)$ {
            deny all;
            return 403;
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
    }

    # SSL configuration (if using HTTPS)
    # listen 443 ssl http2;
    # ssl_certificate /path/to/cert.pem;
    # ssl_certificate_key /path/to/key.pem;
}
```

**Test and reload Nginx:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

**Why serve via Nginx?**
- ✅ Much faster than API routes (direct file serving)
- ✅ Better caching control
- ✅ Lower server load
- ✅ Standard practice for static files

---

### Step 6: Update Next.js Config (Optional)

Update `next.config.js` to allow your domain for images:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'yourdomain.com'],
    // Or use remotePatterns for better security
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yourdomain.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

---

### Step 7: Create Deployment Script

Create `deploy.sh` in project root:

```bash
#!/bin/bash
# Deployment script for VPS

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /path/to/tasting-evaluation-platform

# Pull latest code (if using git)
# git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build application
echo "🔨 Building application..."
npm run build

# Preserve uploads directory (important!)
if [ -d "/var/www/tastecert-uploads" ]; then
    echo "✅ Uploads directory preserved"
    # Ensure permissions are correct
    sudo chown -R $USER:$USER /var/www/tastecert-uploads
    sudo chmod -R 755 /var/www/tastecert-uploads
else
    echo "⚠️  Uploads directory not found, creating..."
    sudo mkdir -p /var/www/tastecert-uploads/products
    sudo chown -R $USER:$USER /var/www/tastecert-uploads
    sudo chmod -R 755 /var/www/tastecert-uploads
fi

# Restart application (using PM2)
echo "🔄 Restarting application..."
pm2 restart tastecert || pm2 start npm --name "tastecert" -- start

# Reload Nginx
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ Deployment complete!"
```

**Make it executable:**
```bash
chmod +x deploy.sh
```

---

### Step 8: PM2 Configuration (Optional but Recommended)

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: 'tastecert',
      script: 'npm',
      args: 'start',
      cwd: '/path/to/tasting-evaluation-platform',
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
    },
  ],
};
```

**Start with PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Run the command it outputs to enable auto-start on boot
```

---

### Step 9: Frontend Integration

**Example usage in React component:**

```typescript
'use client';

import { useState } from 'react';

export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await response.json();
      onUpload(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
```

---

## 🔒 Security Considerations

### 1. File Type Validation
- Only allow image files (JPEG, PNG, WebP)
- Validate MIME type, not just extension
- Reject executable files

### 2. File Size Limits
- Set reasonable limits (5MB recommended)
- Validate on both client and server

### 3. Authentication
- Require authentication for uploads
- Consider role-based access (only producers can upload)

### 4. File Naming
- Use unique filenames (timestamp + random)
- Don't allow user-provided filenames
- Prevent path traversal attacks

### 5. Nginx Security
```nginx
# Deny access to hidden files
location ~ /\. {
    deny all;
}

# Deny access to PHP/executable files
location ~* \.(php|sh|exe|bat|py)$ {
    deny all;
    return 403;
}
```

---

## 📝 Database Schema

The `Product` model already has `imageUrl` field. Store the **full URL**:

```prisma
model Product {
  imageUrl String?  // Store: https://yourdomain.com/uploads/products/1234567890-abc123.jpg
  // ...
}
```

**✅ Correct:**
- `https://yourdomain.com/uploads/products/1234567890-abc123.jpg`

**❌ Wrong:**
- `/uploads/products/image.jpg` (relative - breaks)
- `/var/www/tastecert-uploads/products/image.jpg` (file path - not accessible)

---

## ✅ Testing Checklist

After deployment, test:

- [ ] Upload image in production
- [ ] Image displays correctly via Nginx URL
- [ ] **Restart application** (`pm2 restart tastecert`) - image still accessible
- [ ] **Rebuild application** (`npm run build`) - image still accessible
- [ ] **Deploy new code** (run `deploy.sh`) - image still accessible
- [ ] **Server reboot** - image still accessible
- [ ] Image optimization works (file size reduced)
- [ ] Image resizing works (dimensions correct)
- [ ] Invalid files are rejected
- [ ] Large files are rejected
- [ ] Unauthenticated users cannot upload
- [ ] Nginx serves files directly (check response headers)

---

## 🗑️ Image Deletion

When deleting a product, also delete the image:

```typescript
import { unlink } from 'fs/promises';
import { join } from 'path';

async function deleteProductImage(imageUrl: string) {
  try {
    // Extract filename from URL
    const filename = imageUrl.split('/').pop();
    if (filename) {
      const filepath = join(process.env.UPLOAD_DIR!, 'products', filename);
      await unlink(filepath);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw - image deletion failure shouldn't break product deletion
  }
}
```

---

## 🔄 Backup Strategy

**Backup uploads directory regularly:**

```bash
# Add to crontab (crontab -e)
# Backup uploads daily at 2 AM
0 2 * * * tar -czf /backups/tastecert-uploads-$(date +\%Y\%m\%d).tar.gz /var/www/tastecert-uploads
```

---

## 🚨 Troubleshooting

### Images not displaying after rebuild

1. **Check Nginx configuration:**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

2. **Check file permissions:**
   ```bash
   ls -la /var/www/tastecert-uploads/products
   sudo chown -R youruser:youruser /var/www/tastecert-uploads
   sudo chmod -R 755 /var/www/tastecert-uploads
   ```

3. **Check file exists:**
   ```bash
   ls -lh /var/www/tastecert-uploads/products/
   ```

4. **Check Nginx error logs:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

### Permission denied errors

```bash
# Fix ownership
sudo chown -R youruser:youruser /var/www/tastecert-uploads

# Fix permissions
sudo chmod -R 755 /var/www/tastecert-uploads

# Ensure directory is writable
sudo chmod 775 /var/www/tastecert-uploads/products
```

### 413 Request Entity Too Large

If you get this error, increase Nginx client body size:

```nginx
server {
    client_max_body_size 10M;  # Allow up to 10MB uploads
    # ... rest of config
}
```

Then reload: `sudo systemctl reload nginx`

---

## 📊 Performance Tips

1. **Use Nginx to serve files** - Much faster than API routes
2. **Enable gzip compression** in Nginx:
   ```nginx
   gzip on;
   gzip_types image/jpeg image/png image/webp;
   ```
3. **Set proper cache headers** - Images don't change often
4. **Optimize images** - Use `sharp` to resize and compress
5. **Consider CDN** - If traffic grows, use CloudFlare or similar

---

## 🎯 Summary

**Key Points:**
1. ✅ Store files in `/var/www/tastecert-uploads` (outside project)
2. ✅ Serve files directly via Nginx (not API routes)
3. ✅ Store full URLs in database (not relative paths)
4. ✅ Preserve uploads directory during deployment
5. ✅ Set proper permissions and ownership
6. ✅ Test after rebuild, restart, and deployment

**This setup ensures:**
- Files persist across deployments
- No rebuild required to see images
- Fast file serving via Nginx
- Production-ready and scalable

---

**Last Updated**: [Current Date]
**Status**: Production-Ready for VPS + Nginx Deployment
