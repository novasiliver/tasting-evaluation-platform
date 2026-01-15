import QRCode from 'qrcode';
import { createCanvas, loadImage, CanvasRenderingContext2D } from 'canvas';
import fs from 'fs';
import path from 'path';

interface QRCodeOptions {
  size?: number;
  margin?: number;
  logoPath?: string;
  logoSize?: number;
  foregroundColor?: string;
  backgroundColor?: string;
}

/**
 * Generate a branded QR code with Tastecert logo
 */
export async function generateBrandedQRCode(
  data: string,
  options: QRCodeOptions = {}
): Promise<Buffer> {
  const {
    size = 500,
    margin = 4,
    logoPath,
    logoSize = 80,
    foregroundColor = '#2E4F3A', // Deep green
    backgroundColor = '#FFFFFF', // White
  } = options;

  // Generate base QR code
  const qrCodeDataURL = await QRCode.toDataURL(data, {
    width: size,
    margin: margin,
    color: {
      dark: foregroundColor,
      light: backgroundColor,
    },
    errorCorrectionLevel: 'H', // High error correction for logo overlay
  });

  // Create canvas
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Load QR code image
  const qrImage = await loadImage(qrCodeDataURL);
  ctx.drawImage(qrImage, 0, 0);

  // Add logo if provided
  if (logoPath && fs.existsSync(logoPath)) {
    try {
      const logo = await loadImage(logoPath);
      const logoX = (size - logoSize) / 2;
      const logoY = (size - logoSize) / 2;

      // Draw white background circle for logo
      ctx.fillStyle = backgroundColor;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, logoSize / 2 + 5, 0, 2 * Math.PI);
      ctx.fill();

      // Draw logo
      ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
    } catch (error) {
      console.error('Error loading logo for QR code:', error);
      // Continue without logo if it fails
    }
  }

  return canvas.toBuffer('image/png');
}

/**
 * Generate QR code and save to file
 */
export async function generateAndSaveQRCode(
  data: string,
  outputPath: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const buffer = await generateBrandedQRCode(data, options);
  
  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Save file
  fs.writeFileSync(outputPath, buffer);
  return outputPath;
}

/**
 * Generate QR code as data URL (for direct use in HTML)
 */
export async function generateQRCodeDataURL(
  data: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const buffer = await generateBrandedQRCode(data, options);
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

