# QR Codes Directory

This directory stores generated QR code images for certified products.

QR codes are automatically generated when requested via the API and stored with the naming pattern:
```
qr-{productId}-{timestamp}.png
```

## File Management

- QR codes are automatically created when a product gets a QR code generated
- Old QR codes are deleted when regenerated
- QR codes are deleted when the QR code record is deleted from the database

## Storage

All QR code images are stored here and served via the `/qrcodes/` public URL path.

