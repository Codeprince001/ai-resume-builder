// lib/email.ts
import nodemailer from 'nodemailer';

// Create transporter with more explicit Gmail configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test transporter configuration
export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log('✅ Email server connection successful');
    return { success: true };
  } catch (error) {
    console.error('❌ Email server connection failed:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(email: string, pin: string, userName?: string) {
  // Test connection first
  const connectionTest = await testEmailConnection();
  if (!connectionTest.success) {
    console.error('Email connection test failed:', connectionTest.error);
    return { success: false, error: 'Email service unavailable' };
  }

  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_FROM}>`, // Add sender name
    to: email,
    subject: 'Password Reset Code - Your App Name',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .pin-code { background: #fff; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px; }
          .pin-number { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; margin: 10px 0; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔒 Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${userName || 'there'}!</h2>
            <p>We received a request to reset your password. Use the verification code below to proceed:</p>
            
            <div class="pin-code">
              <p><strong>Your Verification Code:</strong></p>
              <div class="pin-number">${pin}</div>
              <p style="color: #666; font-size: 14px;">This code expires in 10 minutes</p>
            </div>
            
            <div class="warning">
              <p><strong>⚠️ Security Notice:</strong></p>
              <ul style="margin: 5px 0; padding-left: 20px;">
                <li>This code is valid for 10 minutes only</li>
                <li>Don't share this code with anyone</li>
                <li>If you didn't request this, please ignore this email</li>
              </ul>
            </div>
            
            <p>If you're having trouble, you can request a new code or contact our support team.</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>&copy; 2024 Your App Name. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Password Reset Request
      
      Hello ${userName || 'there'}!
      
      We received a request to reset your password. Use this verification code: ${pin}
      
      This code expires in 10 minutes.
      
      Security Notice:
      - Don't share this code with anyone
      - If you didn't request this, please ignore this email
      
      Your App Name
    `
  };

  try {
    console.log('📧 Attempting to send email to:', email);
    console.log('📧 From:', process.env.EMAIL_FROM);
    console.log('📧 PIN:', pin);
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 Response:', info.response);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return { success: false, error: 'Failed to send email' };
  }
}

// Utility function to generate 6-digit PIN
export function generatePin(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Utility function to generate secure token
export function generateResetToken(): string {
  return require('crypto').randomBytes(32).toString('hex');
}

// Test function to send a test email (for debugging)
export async function sendTestEmail(toEmail: string) {
  try {
    const testPin = generatePin();
    const result = await sendPasswordResetEmail(toEmail, testPin, 'Test User');
    return result;
  } catch (error) {
    console.error('Test email failed:', error);
    return { success: false, error };
  }
}