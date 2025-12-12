# Unimplemented Features List

This document lists all features that are not yet fully implemented in the codebase.

---

## 🔴 **HIGH PRIORITY - Critical Functionality**

### 1. **Certificate PDF Download Functionality**
**Status**: Partially implemented (backend exists, frontend buttons not connected)

**Locations**:
- `app/dashboard/products/[id]/page.tsx` (line 317-320) - "Download PDF" button has no onClick handler
- `app/admin/certificates/page.tsx` (lines 480, 545) - "Download PDF" buttons not connected
- `app/admin/certificates/generate/page.tsx` (line 102-106) - `handleDownloadPDF()` only shows alert

**What needs to be done**:
- Connect download buttons to `/api/certificates/[id]/download` endpoint
- Handle PDF generation if PDF doesn't exist yet (call generate endpoint first)
- Show loading states during download
- Handle errors gracefully

**Backend Status**: ✅ Implemented (`app/api/certificates/[id]/download/route.ts`)

---

### 2. **Certificate Generator Page - Full Functionality**
**Status**: UI exists, but functionality is mock/placeholder

**Location**: `app/admin/certificates/generate/page.tsx`

**Issues**:
- `handleGenerateCertificate()` (line 73-100) - Only logs to console and shows alert
- `handleDownloadPDF()` (line 102-106) - Only shows alert
- No API integration to actually create/update certificates
- QR code generation not implemented (line 283 mentions "Include QR verification code")
- Custom message field not saved
- Template selection doesn't affect actual certificate generation

**What needs to be done**:
- Connect to `/api/certificates` POST endpoint to create/update certificates
- Implement QR code generation (install `qrcode` package)
- Save custom messages and template preferences
- Generate PDF after certificate creation
- Update UI to reflect actual certificate data

---

### 3. **Contact Form Backend**
**Status**: Frontend only, no backend API

**Location**: `app/contact/page.tsx` (line 15-18)

**Issues**:
- Form submission only shows alert: `alert('Thank you for contacting us! We will respond within 24 hours.');`
- No API endpoint to save contact form submissions
- No email notification to admins
- No database storage for contact inquiries

**What needs to be done**:
- Create `/api/contact` POST endpoint
- Create database model for contact submissions (or use existing table)
- Send email notification to admin email
- Store submission in database
- Show success/error messages properly

---

### 4. **Winners Page - Add/Edit Functionality**
**Status**: UI modals exist, but functionality is incomplete

**Location**: `app/admin/winners/page.tsx`

**Issues**:
- "Add Winner" button (line 528) - Only shows alert: `alert('Winner added successfully!');`
- "Edit Winner" modal (line 600) - Only shows alert: `alert('Winner updated successfully!');`
- No API endpoint to manually add/edit winners
- Winners are currently fetched from certificates, but manual addition not supported

**What needs to be done**:
- Create `/api/admin/winners` POST/PATCH endpoints
- Allow admins to manually add winners (not just from certificates)
- Allow editing winner details (product name, producer, award level, etc.)
- Update database when winners are added/edited
- Handle image uploads for manually added winners

---

## 🟡 **MEDIUM PRIORITY - Important Features**

### 5. **Certificate Editing**
**Status**: Placeholder message only

**Location**: `app/admin/certificates/page.tsx` (line 566)

**Issues**:
- Edit modal shows: `"Certificate editing functionality coming soon."`
- No way to update certificate details after creation
- Cannot regenerate certificates with new data

**What needs to be done**:
- Implement certificate editing in the edit modal
- Allow updating award level, certificate number, issue date
- Regenerate PDF when certificate is updated
- Update related product status if needed

---

### 6. **Settings Page**
**Status**: Placeholder page only

**Location**: `app/admin/settings/page.tsx` (line 43)

**Issues**:
- Shows: `"Coming soon: Category management, scoring criteria, email templates, and more."`
- No actual settings functionality

**What needs to be done**:
- Category management (already exists in separate page, but could be consolidated)
- Scoring criteria configuration
- Email template management
- System configuration (SMTP settings, upload paths, etc.)
- Platform branding settings

---

### 7. **QR Code Generation for Certificates**
**Status**: UI checkbox exists, but not implemented

**Location**: `app/admin/certificates/generate/page.tsx` (line 283)

**Issues**:
- "Include QR verification code" checkbox exists but doesn't do anything
- No QR code generation library installed
- QR codes not displayed on certificates

**What needs to be done**:
- Install `qrcode` or `react-qr-code` package
- Generate QR code with certificate verification URL
- Display QR code on certificate template
- Create verification endpoint that QR codes link to

---

### 8. **Certificate Download from Producer Dashboard**
**Status**: Button exists but not connected

**Location**: `app/dashboard/products/[id]/page.tsx` (line 317-320)

**Issues**:
- "Download PDF" button has no onClick handler
- Producers cannot download their certificates

**What needs to be done**:
- Add onClick handler to download button
- Call `/api/certificates/[id]/download` endpoint
- Handle case where PDF doesn't exist (generate first)
- Show loading/error states

---

## 🟢 **LOW PRIORITY - Nice to Have**

### 9. **Email Configuration Check**
**Status**: Email functions exist but may not be configured

**Location**: `lib/email.ts`

**Issues**:
- Email sending is optional (warns if not configured)
- No UI to configure email settings
- No way to test email configuration
- Email templates are hardcoded in code

**What needs to be done**:
- Add email configuration UI in settings page
- Add email test functionality
- Store email templates in database or config files
- Add email sending status/logs

---

### 10. **Print Functionality**
**Status**: Basic window.print() only

**Location**: `app/admin/certificates/generate/page.tsx` (line 108-111)

**Issues**:
- Uses basic `window.print()` which may not format correctly
- No print-specific CSS
- No print preview

**What needs to be done**:
- Add print-specific CSS for certificates
- Improve print layout
- Add print preview option

---

### 11. **Certificate Template Selection**
**Status**: UI exists but doesn't affect output

**Location**: `app/admin/certificates/generate/page.tsx`

**Issues**:
- Template selection (4 templates) exists in UI
- Selected template doesn't affect actual certificate generation
- All certificates use same template

**What needs to be done**:
- Create multiple certificate template components
- Store template preference in database
- Use selected template when generating PDF
- Allow template preview before generation

---

### 12. **Image Upload for Winners**
**Status**: Winners use placeholder images

**Location**: `app/admin/winners/page.tsx` (line 91)

**Issues**:
- Winners use default Unsplash images: `https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=400&h=400&fit=crop`
- No way to upload custom images for winners
- Product images not used for winners gallery

**What needs to be done**:
- Use product images from database
- Allow image upload when manually adding winners
- Add image upload field in add/edit winner modals

---

### 13. **Search Functionality on Admin Dashboard**
**Status**: Search input exists but may not be fully functional

**Location**: `app/admin/page.tsx` (line 186)

**Issues**:
- Search placeholder exists: "Search producers, products, certificates..."
- Need to verify search actually works across all entities

**What needs to be done**:
- Verify search functionality works
- Add search to all admin pages if missing
- Improve search to include more fields

---

### 14. **Error Handling Improvements**
**Status**: Many places use `alert()` instead of proper error handling

**Locations**: Multiple files use `alert()` for errors

**Issues**:
- `alert()` is not user-friendly
- No consistent error handling pattern
- Errors not logged properly

**What needs to be done**:
- Replace all `alert()` calls with toast notifications or inline error messages
- Add error logging service
- Create consistent error handling component
- Show user-friendly error messages

---

## 📋 **Summary by Priority**

### **Must Implement Now** (Critical for MVP):
1. ✅ Certificate PDF Download (connect buttons)
2. ✅ Contact Form Backend
3. ✅ Certificate Generator Full Functionality
4. ✅ Winners Add/Edit Functionality

### **Should Implement Soon** (Important):
5. Certificate Editing
6. Settings Page Basic Features
7. QR Code Generation
8. Producer Certificate Download

### **Can Implement Later** (Enhancements):
9. Email Configuration UI
10. Print Functionality Improvements
11. Multiple Certificate Templates
12. Winner Image Upload
13. Search Improvements
14. Error Handling Improvements

---

## 🔧 **Technical Debt**

- Replace all `alert()` calls with proper UI feedback
- Replace all `console.log()` with proper logging
- Add loading states consistently across all pages
- Add error boundaries for better error handling
- Add form validation consistently
- Add proper TypeScript types where missing

---

**Last Updated**: Generated from codebase analysis

