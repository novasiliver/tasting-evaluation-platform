# 🎯 Site Completion Plan - Tasting Evaluation Platform

## 📊 Current State Assessment

### ✅ What's Working (Connected to Database)
1. **Authentication System** - Fully functional with NextAuth + Prisma
2. **Product Submission** (`/submit`) - Connected to DB
3. **Winners Gallery** (`/winners`) - Connected to DB via API
4. **Admin Users Page** (`/admin/users`) - Connected to DB
5. **Admin Categories Page** - API exists, but page uses demo data
6. **Admin Submissions Evaluation** - Connected to DB
7. **API Routes** - Most core APIs are functional:
   - `/api/products` - GET, POST
   - `/api/products/[id]` - GET, DELETE
   - `/api/products/winners` - GET
   - `/api/categories` - GET, POST
   - `/api/categories/[id]` - PATCH, DELETE
   - `/api/evaluations` - POST
   - `/api/certificates` - GET, POST

### ❌ What's Broken (Using Demo Data)
1. **Admin Dashboard** (`/admin/page.tsx`) - All stats are hardcoded
2. **Admin Submissions Page** (`/admin/submissions/page.tsx`) - Uses hardcoded sample data
3. **Admin Producers Page** (`/admin/producers/page.tsx`) - Uses hardcoded sample data
4. **Admin Categories Page** (`/admin/categories/page.tsx`) - Uses hardcoded data (API exists)
5. **Admin Winners Page** (`/admin/winners/page.tsx`) - Uses hardcoded data
6. **Admin Certificates Page** (`/admin/certificates/page.tsx`) - Uses hardcoded templates

### 🚫 What's Missing (Not Implemented)
1. **Producer Dashboard** - Completely missing (`/dashboard`)
2. **Producer Products List** - Missing (`/dashboard/products`)
3. **Producer Certificates** - Missing (`/dashboard/certificates`)
4. **Certificate PDF Generation** - Not implemented
5. **File Upload System** - Product images not implemented
6. **Email Notifications** - Not implemented
7. **Real-time Statistics** - Admin dashboard stats are fake
8. **Search Functionality** - Limited implementation

---

## 🎯 Implementation Plan

### **Phase 1: Fix Database Integration (Priority: CRITICAL)**
**Goal**: Replace all demo data with real database queries

#### 1.1 Admin Dashboard (`/admin/page.tsx`)
- [ ] Replace hardcoded stats with real database queries
  - Total Producers: `prisma.user.count({ where: { role: 'PRODUCER' } })`
  - Pending Submissions: `prisma.product.count({ where: { status: 'PENDING' } })`
  - Awarded Products: `prisma.product.count({ where: { status: 'CERTIFIED' } })`
  - Certificate Downloads: Track in database (new field or table)
- [ ] Replace hardcoded charts with real data
  - Monthly Submissions: Group by month from `products` table
  - Monthly Awards: Group certificates by month and award level
- [ ] Replace hardcoded activity feed with real recent activities
  - Recent submissions, evaluations, certificates
- [ ] Add loading states and error handling

**Estimated Time**: 4-6 hours

#### 1.2 Admin Submissions Page (`/admin/submissions/page.tsx`)
- [ ] Replace hardcoded `submissions` array with API call to `/api/products`
- [ ] Implement real-time filtering and sorting
- [ ] Add pagination for large datasets
- [ ] Connect "Evaluate" button to actual product IDs
- [ ] Show real status from database

**Estimated Time**: 3-4 hours

#### 1.3 Admin Producers Page (`/admin/producers/page.tsx`)
- [ ] Create API endpoint `/api/admin/producers` (or use existing user endpoint)
- [ ] Replace hardcoded producers with database query
- [ ] Show real product counts per producer
- [ ] Implement real search and filtering
- [ ] Connect producer detail page to real data

**Estimated Time**: 3-4 hours

#### 1.4 Admin Categories Page (`/admin/categories/page.tsx`)
- [ ] Replace hardcoded categories with API call to `/api/categories`
- [ ] Implement real-time CRUD operations
- [ ] Show actual product counts from database
- [ ] Add loading states

**Estimated Time**: 2-3 hours

#### 1.5 Admin Winners Page (`/admin/winners/page.tsx`)
- [ ] Replace hardcoded winners with API call to `/api/products/winners`
- [ ] Connect to real certificate data
- [ ] Implement real filtering and search
- [ ] Add publish/unpublish functionality (update `isPublished` in certificates)

**Estimated Time**: 3-4 hours

#### 1.6 Admin Certificates Page (`/admin/certificates/page.tsx`)
- [ ] Replace hardcoded templates with real certificates from `/api/certificates`
- [ ] Show actual issued certificates
- [ ] Implement certificate management (regenerate, download, delete)
- [ ] Connect to real product and evaluation data

**Estimated Time**: 4-5 hours

**Phase 1 Total**: ~20-26 hours

---

### **Phase 2: Producer Dashboard (Priority: HIGH)**
**Goal**: Create complete producer experience

#### 2.1 Producer Dashboard Overview (`/dashboard/page.tsx`)
- [ ] Create new page with producer stats
  - Total submissions
  - Pending evaluations
  - Certified products
  - Recent activity
- [ ] Show quick actions (submit product, view certificates)
- [ ] Display recent submissions with status

**Estimated Time**: 4-5 hours

#### 2.2 Producer Products List (`/dashboard/products/page.tsx`)
- [ ] List all products submitted by logged-in producer
- [ ] Show status, submission date, evaluation status
- [ ] Filter by status (Pending, Under Review, Evaluated, Certified, Rejected)
- [ ] Link to product detail page
- [ ] Show evaluation scores if available

**Estimated Time**: 4-5 hours

#### 2.3 Producer Product Detail (`/dashboard/products/[id]/page.tsx`)
- [ ] Show full product information
- [ ] Display evaluation results if evaluated
- [ ] Show certificate if certified
- [ ] Download certificate button

**Estimated Time**: 3-4 hours

#### 2.4 Producer Certificates (`/dashboard/certificates/page.tsx`)
- [ ] List all certificates for producer's products
- [ ] Download certificate PDFs
- [ ] Filter by award level
- [ ] Show certificate details

**Estimated Time**: 3-4 hours

#### 2.5 Producer Profile (`/dashboard/profile/page.tsx`)
- [ ] Edit profile information
- [ ] Update company details
- [ ] Change password
- [ ] View account statistics

**Estimated Time**: 2-3 hours

**Phase 2 Total**: ~16-21 hours

---

### **Phase 3: Certificate System (Priority: HIGH)**
**Goal**: Complete certificate generation and management

#### 3.1 Certificate PDF Generation
- [ ] Install PDF library (`@react-pdf/renderer` or `puppeteer`)
- [ ] Create certificate template component
- [ ] Generate unique certificate numbers
- [ ] Create API endpoint `/api/certificates/[id]/generate`
- [ ] Store PDF in file system or cloud storage
- [ ] Update database with PDF URL

**Estimated Time**: 6-8 hours

#### 3.2 Certificate Download
- [ ] Create download endpoint `/api/certificates/[id]/download`
- [ ] Add download buttons to admin and producer pages
- [ ] Handle file serving securely

**Estimated Time**: 2-3 hours

#### 3.3 Certificate Management
- [ ] Regenerate certificates if needed
- [ ] Update certificate details
- [ ] Delete certificates (with proper checks)
- [ ] Certificate preview before generation

**Estimated Time**: 3-4 hours

**Phase 3 Total**: ~11-15 hours

---

### **Phase 4: File Upload System (Priority: MEDIUM)**
**Goal**: Allow product image uploads that persist after build/deploy on VPS

#### 4.1 Image Upload Setup
- [ ] **VPS + Nginx Setup** (For Ubuntu 24.04 with Nginx reverse proxy):
  - Create persistent directory outside project: `/var/www/tastecert-uploads`
  - Configure Nginx to serve uploads directly (faster than API routes)
  - Set proper permissions and ownership
  - Create deployment script that preserves uploads directory
  - See `FILE_UPLOAD_GUIDE.md` for complete VPS setup instructions
- [ ] Install file upload library:
  - For cloud: `@aws-sdk/client-s3` or `cloudinary` or `uploadthing`
  - For local: Next.js built-in or `formidable`
- [ ] Create upload API endpoint `/api/upload`
- [ ] Add file validation (size, type, dimensions)
- [ ] Image optimization/resizing (use `sharp` library)
- [ ] **IMPORTANT**: Ensure uploaded files are accessible without rebuild
  - Store files in `/var/www/tastecert-uploads` (outside project)
  - Serve via Nginx directly (not API routes for better performance)
  - Store full URLs in database: `https://yourdomain.com/uploads/products/filename.jpg`

**Estimated Time**: 6-8 hours (more time for proper production setup)

#### 4.2 Product Image Integration
- [ ] Update product submission form with image upload
- [ ] Update product model to store image URL (full URL, not relative path)
- [ ] Display images in product listings
- [ ] Add image preview in admin and producer views
- [ ] Handle image deletion when product is deleted
- [ ] Add image fallback for missing images

**Estimated Time**: 3-4 hours

#### 4.3 Production Deployment Considerations (VPS + Nginx)
- [ ] **VPS Setup**:
  - Create persistent directory: `/var/www/tastecert-uploads`
  - Set ownership: `sudo chown -R youruser:youruser /var/www/tastecert-uploads`
  - Set permissions: `sudo chmod -R 755 /var/www/tastecert-uploads`
- [ ] **Nginx Configuration**:
  - Configure location block to serve `/uploads` from `/var/www/tastecert-uploads`
  - Add security rules (deny PHP/executable files)
  - Set proper cache headers for images
  - Configure `client_max_body_size` for file uploads
- [ ] **Deployment Script**:
  - Preserve uploads directory during deployment
  - Ensure permissions are maintained
  - Restart PM2 process
  - Reload Nginx
- [ ] **Testing**:
  - Test that images persist after:
    - Application restart (`pm2 restart`)
    - Code deployment/rebuild (`npm run build`)
    - Server reboot
    - Nginx reload

**Estimated Time**: 2-3 hours

**Phase 4 Total**: ~11-15 hours (increased due to production requirements)

---

### **Phase 5: Enhanced Features (Priority: MEDIUM)**
**Goal**: Improve user experience and functionality

#### 5.1 Email Notifications
- [ ] Set up email service (SendGrid, Resend, or SMTP)
- [ ] Send email on:
  - Product submission confirmation
  - Evaluation completion
  - Certificate generation
  - Status changes
- [ ] Create email templates
- [ ] Add email preferences for users

**Estimated Time**: 6-8 hours

#### 5.2 Advanced Search
- [ ] Global search functionality
- [ ] Search products, producers, certificates
- [ ] Search filters and sorting
- [ ] Search results page

**Estimated Time**: 4-5 hours

#### 5.3 Analytics & Reporting
- [ ] Admin analytics dashboard
- [ ] Export data (CSV, Excel)
- [ ] Generate reports
- [ ] Statistics charts and graphs

**Estimated Time**: 5-6 hours

#### 5.4 Bulk Operations
- [ ] Bulk status updates
- [ ] Bulk certificate generation
- [ ] Bulk email sending
- [ ] Bulk delete (with confirmation)

**Estimated Time**: 4-5 hours

**Phase 5 Total**: ~19-24 hours

---

### **Phase 6: Polish & Optimization (Priority: LOW)**
**Goal**: Final touches and performance

#### 6.1 Performance Optimization
- [ ] Add pagination to all list pages
- [ ] Implement caching where appropriate
- [ ] Optimize database queries
- [ ] Add loading skeletons
- [ ] Lazy load images

**Estimated Time**: 4-5 hours

#### 6.2 Error Handling & Validation
- [ ] Comprehensive error handling
- [ ] User-friendly error messages
- [ ] Form validation improvements
- [ ] Input sanitization

**Estimated Time**: 3-4 hours

#### 6.3 Testing
- [ ] Test all user flows
- [ ] Test admin workflows
- [ ] Test edge cases
- [ ] Fix bugs

**Estimated Time**: 6-8 hours

#### 6.4 Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints
- [ ] Create user guide
- [ ] Create admin guide

**Estimated Time**: 3-4 hours

**Phase 6 Total**: ~16-21 hours

---

## 📋 Implementation Priority Summary

### **CRITICAL (Must Do First)**
1. ✅ Phase 1: Fix Database Integration (20-26 hours)
   - Admin Dashboard
   - Admin Submissions
   - Admin Producers
   - Admin Categories
   - Admin Winners
   - Admin Certificates

### **HIGH (Core Functionality)**
2. ✅ Phase 2: Producer Dashboard (16-21 hours)
3. ✅ Phase 3: Certificate System (11-15 hours)

### **MEDIUM (Important Features)**
4. ✅ Phase 4: File Upload System (7-10 hours)
5. ✅ Phase 5: Enhanced Features (19-24 hours)

### **LOW (Nice to Have)**
6. ✅ Phase 6: Polish & Optimization (16-21 hours)

---

## ⏱️ Total Estimated Time

- **Minimum**: ~89 hours (~11 working days)
- **Maximum**: ~117 hours (~15 working days)
- **Realistic**: ~100 hours (~12-13 working days)

---

## 🚀 Recommended Implementation Order

### **Week 1: Database Integration**
1. Day 1-2: Admin Dashboard + Admin Submissions
2. Day 3: Admin Producers + Admin Categories
3. Day 4: Admin Winners + Admin Certificates
4. Day 5: Testing and bug fixes

### **Week 2: Producer Dashboard**
1. Day 1-2: Producer Dashboard Overview + Products List
2. Day 3: Product Detail + Certificates Page
3. Day 4: Profile Page + Testing

### **Week 3: Certificate System**
1. Day 1-3: PDF Generation
2. Day 4: Download System
3. Day 5: Management Features

### **Week 4: Enhancements**
1. Day 1-2: File Upload
2. Day 3-4: Email Notifications
3. Day 5: Advanced Search + Analytics

### **Week 5: Polish**
1. Day 1-2: Performance Optimization
2. Day 3: Error Handling
3. Day 4-5: Testing + Documentation

---

## 🔧 Technical Requirements

### **New Dependencies Needed**
```json
{
  "@react-pdf/renderer": "^3.x", // For PDF generation
  "sharp": "^0.32.x", // For image processing (REQUIRED)
  "nodemailer": "^6.x", // For email (or use SendGrid/Resend)
  "date-fns": "^2.x", // For date formatting
  
  // File uploads for VPS
  "formidable": "^3.x" // For local file handling (or use Next.js built-in FormData)
}
```

### **Database Changes Needed**
- Add `downloadCount` to Certificate model (optional)
- Add `imageUrl` to Product model (if not exists)
- Consider adding Activity/Log table for tracking
- Consider adding EmailQueue table for notifications

### **Environment Variables Needed**
```env
# File Upload - VPS Local Storage
UPLOAD_DIR=/var/www/tastecert-uploads  # Persistent directory outside project
NEXT_PUBLIC_UPLOAD_BASE_URL=https://yourdomain.com/uploads  # Served by Nginx
MAX_FILE_SIZE=5242880 # 5MB
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp

# Email (choose one)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password

# Or use service
SENDGRID_API_KEY=your-key
# OR
RESEND_API_KEY=your-key
```

---

## ✅ Success Criteria

### **Phase 1 Complete When:**
- All admin pages show real data from database
- No hardcoded demo data remains
- All statistics are accurate
- All CRUD operations work

### **Phase 2 Complete When:**
- Producers can view their dashboard
- Producers can see all their submissions
- Producers can view certificates
- All producer pages are functional

### **Phase 3 Complete When:**
- Certificates can be generated as PDFs
- Certificates can be downloaded
- Certificate numbers are unique
- Certificate management works

### **Phase 4 Complete When:**
- Product images can be uploaded
- Images are stored securely (cloud or persistent volume)
- Images display correctly
- Image optimization works
- **IMPORTANT**: Images persist after build/deploy/restart (no rebuild needed)
- Images accessible without application rebuild
- Production deployment tested and working

### **Phase 5 Complete When:**
- Email notifications are sent
- Search works across the platform
- Analytics are available
- Bulk operations work

### **Phase 6 Complete When:**
- Site is performant
- No critical bugs
- Documentation is complete
- Ready for production

---

## 📝 Notes

1. **Start with Phase 1** - This is the most critical as it fixes the "mess" of demo data
2. **Test as you go** - Don't wait until the end to test
3. **Use existing APIs** - Many APIs already exist, just need to connect frontend
4. **Incremental deployment** - Deploy each phase as it's completed
5. **Backup database** - Before making schema changes, backup your database
6. **File Uploads - CRITICAL (VPS + Nginx)**: 
   - **DO NOT** store files in `public/uploads` or any directory inside the project
   - **USE** `/var/www/tastecert-uploads` (persistent directory outside project)
   - **CONFIGURE Nginx** to serve `/uploads` directly (faster than API routes)
   - Files must be accessible without rebuilding the application
   - Test that images work after: restart, rebuild, deployment, server reboot
   - See `FILE_UPLOAD_GUIDE.md` for complete VPS + Nginx setup

---

## 🎯 Quick Start Checklist

Before starting implementation:

- [ ] Review current database schema
- [ ] Set up development environment
- [ ] Create backup of current database
- [ ] Set up environment variables
- [ ] Install new dependencies
- [ ] Review existing API routes
- [ ] Plan database migrations (if needed)
- [ ] Set up file storage (local or cloud)
- [ ] Set up email service (if doing Phase 5)

---

**Last Updated**: [Current Date]
**Status**: Ready for Implementation

