# Image Upload Fix - Immediate Availability

## Problem
Images uploaded when submitting products are saved to `/var/www/tastecert-uploads` but don't appear until the project is rebuilt on VPS.

## Solution
Use the API route (`/api/images`) instead of Nginx direct serving. The API route serves images dynamically from `UPLOAD_DIR`, making them available immediately after upload without rebuild.

## Quick Fix

### Option 1: Use API Route (Recommended - Works Immediately)

Update your `.env` file on VPS:

```env
# Change this line:
# NEXT_PUBLIC_UPLOAD_BASE_URL=https://tastecert.com/uploads

# To this:
NEXT_PUBLIC_UPLOAD_BASE_URL=https://tastecert.com/api/images
```

**Benefits:**
- ✅ Images appear immediately after upload
- ✅ No Nginx configuration needed
- ✅ No server restart required
- ✅ Works with existing `UPLOAD_DIR` setting

**After updating:**
1. Restart the application: `pm2 restart tastecert`
2. Test by uploading a new image

### Option 2: Fix Nginx Configuration (If you prefer Nginx)

If you want to keep using Nginx direct serving, ensure your Nginx config is correct:

```nginx
server {
    listen 80;
    server_name tastecert.com www.tastecert.com;

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
    }
}
```

**After updating Nginx:**
1. Test configuration: `sudo nginx -t`
2. Reload Nginx: `sudo systemctl reload nginx`
3. Restart application: `pm2 restart tastecert`

## How It Works

### API Route Approach (`/api/images`)
- Files are saved to `/var/www/tastecert-uploads` (via `UPLOAD_DIR`)
- API route `/api/images/[...path]` reads files from `UPLOAD_DIR` dynamically
- Images are served immediately after upload
- No rebuild or restart needed

### Nginx Direct Serving (`/uploads`)
- Files are saved to `/var/www/tastecert-uploads`
- Nginx serves files directly from that directory
- Requires proper Nginx configuration
- May require Nginx reload after configuration changes

## Verification

After applying the fix:

1. **Upload a new image** when submitting a product
2. **Check the image URL** in the database or response - should be:
   - `https://tastecert.com/api/images/products/filename.jpg` (API route)
   - OR `https://tastecert.com/uploads/products/filename.jpg` (Nginx)
3. **Verify the image displays** immediately without rebuild
4. **Check file exists** on server: `ls -lh /var/www/tastecert-uploads/products/`

## Current Configuration

Your current `.env`:
```env
UPLOAD_DIR=/var/www/tastecert-uploads
NEXT_PUBLIC_UPLOAD_BASE_URL=https://tastecert.com/uploads
```

**Recommended change:**
```env
UPLOAD_DIR=/var/www/tastecert-uploads
NEXT_PUBLIC_UPLOAD_BASE_URL=https://tastecert.com/api/images
```

## Troubleshooting

### Images still not appearing?

1. **Check file permissions:**
   ```bash
   sudo chown -R $USER:$USER /var/www/tastecert-uploads
   sudo chmod -R 755 /var/www/tastecert-uploads
   ```

2. **Verify files are being saved:**
   ```bash
   ls -lh /var/www/tastecert-uploads/products/
   ```

3. **Check application logs:**
   ```bash
   pm2 logs tastecert
   ```

4. **Test API route directly:**
   ```bash
   curl https://tastecert.com/api/images/products/[filename].jpg
   ```

5. **Verify environment variable:**
   ```bash
   pm2 restart tastecert
   # Check if NEXT_PUBLIC_UPLOAD_BASE_URL is loaded correctly
   ```

## Notes

- The API route uses `UPLOAD_DIR` environment variable
- Files are still saved to `/var/www/tastecert-uploads` (persistent location)
- Both approaches work, but API route is simpler and more reliable
- Existing images with old URLs will continue to work if Nginx is configured

