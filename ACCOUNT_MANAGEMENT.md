# Producer Account Management Logic

## Overview

The platform now implements a proper account approval workflow for producers. This ensures quality control and prevents unauthorized product submissions.

## Account Status Flow

```
┌─────────────┐
│   PENDING   │  ← New producers start here
└──────┬──────┘
       │
       ├──→ Admin Approves ──→ ┌──────────┐
       │                       │ APPROVED │ ← Can submit products
       │                       └──────────┘
       │
       └──→ Admin Rejects ──→ ┌──────────┐
                              │ REJECTED │ ← Cannot submit products
                              └──────────┘
```

## Account Statuses

### 1. **PENDING** (Default)
- **Status**: Waiting for admin approval
- **Permissions**: Cannot submit products
- **User Experience**: 
  - User sees message: "Your account is pending approval. Please wait for admin approval before submitting products."
  - Submit button is disabled or shows appropriate message

### 2. **APPROVED**
- **Status**: Account approved by admin
- **Permissions**: Can submit products freely
- **User Experience**: 
  - Full access to product submission
  - Can upload images and fill out product forms

### 3. **REJECTED**
- **Status**: Account rejected by admin
- **Permissions**: Cannot submit products
- **User Experience**: 
  - User sees message: "Your account has been rejected. You cannot submit products."
  - Cannot access product submission features

## Admin Actions

### 1. Approve Producer
- **Action**: Sets `accountStatus` to `APPROVED`
- **Effect**: Producer can now submit products
- **Location**: Producer detail page → "Approve" button

### 2. Reject Producer
- **Action**: Sets `accountStatus` to `REJECTED`
- **Effect**: Producer cannot submit products
- **Location**: Producer detail page → "Reject" button

### 3. Close Account (Delete)
- **Action**: Permanently deletes the producer account
- **Effect**: Deletes:
  - Producer account
  - All submitted products
  - All evaluations
  - All certificates
  - All sessions
- **Safety**: 
  - Requires double confirmation
  - User must type "DELETE" to confirm
  - Shows warning with exact count of products to be deleted
- **Location**: Producer detail page → "Close Account" button
- **⚠️ WARNING**: This action is IRREVERSIBLE

## Database Schema

```prisma
model User {
  // ... other fields ...
  accountStatus AccountStatus @default(PENDING)
  // ... other fields ...
}

enum AccountStatus {
  PENDING   // Waiting for admin approval
  APPROVED  // Can submit products
  REJECTED  // Cannot submit products
}
```

## API Endpoints

### 1. Approve/Reject Producer
- **Endpoint**: `PATCH /api/admin/producers/[id]`
- **Body**: `{ "status": "APPROVED" | "REJECTED" | "PENDING" }`
- **Auth**: Admin only
- **Response**: Updated producer with new status

### 2. Delete Producer Account
- **Endpoint**: `DELETE /api/admin/producers/[id]`
- **Auth**: Admin only
- **Response**: Success message with count of deleted items

### 3. Submit Product (with status check)
- **Endpoint**: `POST /api/products`
- **Auth**: Producer/Admin
- **Validation**: 
  - Checks if producer account is APPROVED
  - Returns 403 Forbidden if account is PENDING or REJECTED
- **Response**: Created product or error message with account status

## Implementation Files

### Modified Files:

1. **`prisma/schema.prisma`**
   - Added `accountStatus` field to User model
   - Added `AccountStatus` enum
   - Added additional fields: `country`, `address`, `website`

2. **`app/api/admin/producers/[id]/route.ts`**
   - Updated PATCH endpoint to set `accountStatus`
   - Added DELETE endpoint for account deletion
   - Added proper logging and error handling

3. **`app/api/admin/producers/route.ts`**
   - Updated GET endpoint to include `accountStatus`
   - Updated status mapping to use database field

4. **`app/api/products/route.ts`**
   - Added account status check before product creation
   - Returns appropriate error messages based on account status
   - Logs account status for debugging

5. **`app/admin/producers/[id]/page.tsx`**
   - Updated UI to show account status
   - Added "Close Account" button with double confirmation
   - Updated approve/reject handlers to use new API
   - Added loading states and better UX

## User Experience Flow

### For Producers:

```
1. Producer registers account
   ↓
2. Account status: PENDING
   - Can login
   - Cannot submit products
   - Sees "waiting for approval" message
   ↓
3. Admin reviews and approves
   ↓
4. Account status: APPROVED
   - Can submit products
   - Full platform access
```

### For Admins:

```
1. View producers list
   ↓
2. Click producer to see details
   ↓
3. Review producer information
   ↓
4. Choose action:
   - Approve → Producer can submit products
   - Reject → Producer cannot submit products
   - Close Account → Permanently delete account and all data
```

## Next Steps

### 1. **Restart Development Server** (IMPORTANT!)
The Prisma schema was updated. You need to restart your development server to pick up the changes:

```bash
# Stop your dev server (Ctrl+C)
# Then restart:
npm run dev
```

### 2. **Update Existing Producers** (Optional)
If you have existing producers in your database, you may want to update their status:

```sql
-- Approve all existing producers (optional)
UPDATE users 
SET accountStatus = 'APPROVED' 
WHERE role = 'PRODUCER' AND accountStatus = 'PENDING';
```

### 3. **Test the Flow**
1. Create a new producer account (should be PENDING)
2. Try to submit a product (should fail with "pending approval" message)
3. Login as admin and approve the producer
4. Try to submit a product again (should succeed)
5. Test reject and close account features

### 4. **Add Email Notifications** (Future Enhancement)
Consider adding email notifications for:
- Account approved
- Account rejected
- Account deleted

### 5. **Update Frontend UI** (Future Enhancement)
- Add visual indicators on producer dashboard showing account status
- Show friendly messages explaining what each status means
- Add appeal process for rejected accounts

## Security Considerations

1. **Account Deletion**: 
   - Only admins can delete accounts
   - Requires double confirmation
   - Cascades properly to remove all related data

2. **Product Submission**: 
   - Backend validation ensures only approved producers can submit
   - Returns proper HTTP status codes (403 Forbidden)
   - Includes account status in error response for debugging

3. **Status Updates**: 
   - Only admins can change account status
   - All changes are logged to console
   - Proper error handling and user feedback

## Troubleshooting

### Problem: "Cannot submit products" error
- **Check**: Is the producer account APPROVED?
- **Solution**: Admin must approve the account first

### Problem: Prisma client errors after schema update
- **Check**: Did you restart the dev server?
- **Solution**: Stop and restart: `npm run dev`

### Problem: Account deletion not working
- **Check**: Console logs for errors
- **Possible Issue**: Foreign key constraints
- **Solution**: Schema has cascade deletes configured

## Summary

The new account management logic provides:
- ✅ Proper approval workflow for producers
- ✅ Prevention of unauthorized product submissions
- ✅ Clean account deletion with cascade
- ✅ Clear user feedback at every step
- ✅ Admin control over who can use the platform
- ✅ Security and quality control

This ensures that only vetted, approved producers can submit products for evaluation, maintaining the quality and integrity of the certification platform.

