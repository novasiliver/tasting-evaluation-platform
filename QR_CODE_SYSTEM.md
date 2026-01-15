# QR Code System Documentation

## Overview

The Tastecert QR code system allows you to generate branded QR codes for certified products. When scanned, these QR codes redirect users to a public product page displaying the product details and award information.

## Features

- ✅ **Branded QR Codes**: Includes Tastecert logo and branding
- ✅ **Product-Specific**: Each QR code links to a unique product page
- ✅ **Award Display**: Shows the exact award level and certification details
- ✅ **Scan Tracking**: Tracks number of scans and last scan time
- ✅ **Management Interface**: Admin panel for managing all QR codes
- ✅ **Producer Access**: Producers can generate and download QR codes for their products
- ✅ **Activate/Deactivate**: Control QR code availability
- ✅ **Regeneration**: Regenerate QR codes if needed

## Database Schema

The `QRCode` model includes:
- `id`: Unique identifier
- `productId`: Links to the product (one QR code per product)
- `qrCodeUrl`: Path to the generated QR code image
- `redirectUrl`: URL that the QR code points to
- `isActive`: Whether the QR code is active
- `scanCount`: Number of times the QR code has been scanned
- `lastScannedAt`: Timestamp of last scan

## API Endpoints

### GET `/api/qrcodes`
Get all QR codes (Admin) or QR codes for user's products (Producer)

**Query Parameters:**
- `productId` (optional): Get QR code for specific product

**Response:**
```json
[
  {
    "id": "qr-code-id",
    "qrCodeUrl": "/qrcodes/qr-product-id-1234567890.png",
    "redirectUrl": "http://localhost:3000/products/product-id",
    "isActive": true,
    "scanCount": 5,
    "lastScannedAt": "2024-01-15T10:30:00.000Z",
    "product": { ... }
  }
]
```

### POST `/api/qrcodes`
Create a new QR code for a product

**Request Body:**
```json
{
  "productId": "product-id"
}
```

**Requirements:**
- Product must have a certificate
- User must be Admin or the product owner
- Only one QR code per product

### GET `/api/qrcodes/[id]`
Get a specific QR code by ID

### PATCH `/api/qrcodes/[id]`
Update QR code (activate/deactivate, regenerate)

**Request Body:**
```json
{
  "isActive": true,  // Optional: toggle active status
  "regenerate": true  // Optional: regenerate QR code
}
```

### DELETE `/api/qrcodes/[id]`
Delete QR code (Admin only)

### POST `/api/qrcodes/[id]/scan`
Track QR code scan (public endpoint, no auth required)

## Public Product Page

**URL:** `/products/[id]`

When a QR code is scanned, users are redirected to this page which displays:
- Product image and details
- Award level and certification information
- Certificate number and issue date
- Score and evaluation details
- Producer information
- Link to full certificate

## Admin Panel

**URL:** `/admin/qrcodes`

Features:
- View all QR codes with product information
- See scan statistics
- Activate/deactivate QR codes
- Regenerate QR codes
- Delete QR codes
- Download QR code images
- View QR code preview in modal

## Producer Dashboard

**URL:** `/dashboard/products/[id]`

For products with certificates, producers can:
- Generate QR code (if not already generated)
- View QR code preview
- Download QR code image
- See scan count and last scan time
- View redirect URL

## QR Code Generation

QR codes are generated using the `qrcode` library with:
- **Size**: 500x500 pixels
- **Error Correction**: High (H) level for logo overlay
- **Colors**: 
  - Foreground: Deep green (#2E4F3A)
  - Background: White (#FFFFFF)
- **Logo**: Tastecert logo centered (if available at `public/logo.png`)
- **Format**: PNG

## File Storage

QR code images are stored in:
```
public/qrcodes/qr-{productId}-{timestamp}.png
```

## Logo Setup

To include the Tastecert logo in QR codes:
1. Place your logo file at `public/logo.png`
2. Recommended size: 200x200 pixels or larger (will be resized to 80x80 in QR code)
3. Format: PNG with transparent background preferred

If no logo is found, QR codes will be generated without a logo.

## Environment Variables

Make sure to set:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # or your production URL
```

This is used to generate the correct redirect URLs for QR codes.

## Usage Examples

### Generate QR Code (Producer)
```typescript
const response = await fetch('/api/qrcodes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ productId: 'product-id' }),
});
```

### Get QR Code for Product
```typescript
const response = await fetch(`/api/qrcodes?productId=${productId}`, {
  credentials: 'include',
});
const qrCode = await response.json();
```

### Deactivate QR Code
```typescript
const response = await fetch(`/api/qrcodes/${qrCodeId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ isActive: false }),
});
```

### Track Scan (Public)
```typescript
const response = await fetch(`/api/qrcodes/${qrCodeId}/scan`, {
  method: 'POST',
});
```

## Automatic QR Code Generation

Currently, QR codes must be manually generated. To automatically generate QR codes when a certificate is created, you can add this logic to your certificate creation endpoint:

```typescript
// After creating certificate
if (certificate) {
  // Auto-generate QR code
  await fetch('/api/qrcodes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: product.id }),
  });
}
```

## Best Practices

1. **Generate QR codes after certification**: Only generate QR codes for products that have been certified
2. **Monitor scan counts**: Use scan data to understand customer engagement
3. **Keep QR codes active**: Only deactivate if there's an issue with the product or certificate
4. **Use high-quality printing**: Ensure QR codes are printed clearly for best scan success
5. **Test before distribution**: Always test QR codes before printing on packaging

## Troubleshooting

### QR Code not generating
- Check that product has a certificate
- Verify user has permission (Admin or product owner)
- Check server logs for errors
- Ensure `public/qrcodes` directory exists and is writable

### Logo not appearing
- Verify `public/logo.png` exists
- Check logo file format (PNG recommended)
- Ensure logo is readable (not corrupted)

### QR code not scanning
- Verify QR code is active (`isActive: true`)
- Check redirect URL is correct
- Ensure QR code image is clear and not distorted
- Test with multiple QR code scanner apps

### Scan tracking not working
- Verify scan endpoint is accessible (public, no auth)
- Check QR code ID is correct
- Review server logs for errors

## Future Enhancements

Potential improvements:
- Automatic QR code generation on certificate creation
- Custom QR code designs per award level
- Batch QR code generation
- QR code analytics dashboard
- Export scan data to CSV
- Custom redirect URLs per QR code
- QR code expiration dates

