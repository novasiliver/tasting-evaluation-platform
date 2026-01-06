/**
 * HTML to PDF Converter for Tastecert Certification Guide
 * 
 * Usage:
 * 1. Install puppeteer: npm install puppeteer
 * 2. Run: node convert-to-pdf.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('🚀 Starting PDF conversion...');
  
  const htmlPath = path.join(__dirname, 'certification-guide.html');
  const pdfPath = path.join(__dirname, 'tastecert-certification-guide.pdf');
  
  // Check if HTML file exists
  if (!fs.existsSync(htmlPath)) {
    console.error('❌ Error: certification-guide.html not found!');
    process.exit(1);
  }
  
  console.log('📄 Found HTML file');
  console.log('🌐 Launching browser...');
  
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  
  const page = await browser.newPage();
  
  console.log('📖 Loading HTML content...');
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0'
  });
  
  console.log('🖨️  Converting to PDF...');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    },
    preferCSSPageSize: true
  });
  
  await browser.close();
  
  // Check file size
  const stats = fs.statSync(pdfPath);
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  
  console.log('✅ PDF created successfully!');
  console.log(`📦 File size: ${fileSizeMB} MB`);
  console.log(`📍 Location: ${pdfPath}`);
  console.log('');
  console.log('🎉 Done! Your certification guide is ready for download.');
  
})().catch(error => {
  console.error('❌ Error during conversion:', error);
  process.exit(1);
});

