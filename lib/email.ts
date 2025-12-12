// Dynamic import to avoid build-time module resolution issues
async function getTransporter() {
  try {
    const nodemailer = await import('nodemailer');
    const createTransport = nodemailer.default?.createTransport || nodemailer.createTransport;
    
    return createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  } catch (error) {
    console.warn('Failed to create email transporter:', error);
    return null;
  }
}

export async function sendEmail(to: string, subject: string, html: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('Email not configured. Skipping email send.');
    return;
  }

  try {
    const emailTransporter = await getTransporter();
    if (!emailTransporter) {
      console.warn('Email transporter not available. Skipping email send.');
      return;
    }

    await emailTransporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw - email failures shouldn't break the app
  }
}

export async function sendProductSubmissionEmail(userEmail: string, userName: string, productName: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #D97706;">Product Submission Received</h2>
      <p>Dear ${userName},</p>
      <p>Thank you for submitting <strong>${productName}</strong> for evaluation.</p>
      <p>We have received your submission and our team will review it within 24-48 hours.</p>
      <p>You will receive an email notification once the evaluation is complete.</p>
      <p>Best regards,<br>The TasteCert Team</p>
    </div>
  `;

  await sendEmail(userEmail, 'Product Submission Received - TasteCert', html);
}

export async function sendEvaluationCompleteEmail(
  userEmail: string,
  userName: string,
  productName: string,
  score: number,
  awardLevel: string | null
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #D97706;">Evaluation Complete</h2>
      <p>Dear ${userName},</p>
      <p>The evaluation for <strong>${productName}</strong> has been completed.</p>
      <p><strong>Overall Score:</strong> ${score.toFixed(1)} / 10.0</p>
      ${awardLevel && awardLevel !== 'NONE' ? `<p><strong>Award Level:</strong> ${awardLevel}</p>` : ''}
      <p>You can view the detailed evaluation results in your dashboard.</p>
      ${awardLevel && awardLevel !== 'NONE' ? '<p>A certificate has been issued and is available for download.</p>' : ''}
      <p>Best regards,<br>The TasteCert Team</p>
    </div>
  `;

  await sendEmail(userEmail, 'Evaluation Complete - TasteCert', html);
}

export async function sendCertificateIssuedEmail(
  userEmail: string,
  userName: string,
  productName: string,
  certificateNumber: string,
  awardLevel: string
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #D97706;">Certificate Issued</h2>
      <p>Dear ${userName},</p>
      <p>Congratulations! A certificate has been issued for <strong>${productName}</strong>.</p>
      <p><strong>Certificate Number:</strong> ${certificateNumber}</p>
      <p><strong>Award Level:</strong> ${awardLevel}</p>
      <p>You can download your certificate from your dashboard.</p>
      <p>Best regards,<br>The TasteCert Team</p>
    </div>
  `;

  await sendEmail(userEmail, 'Certificate Issued - TasteCert', html);
}

