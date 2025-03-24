// services/emailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send welcome email to new subscribers
export const sendWelcomeEmail = async (email) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Our Newsletter!',
    html: `
      <h2>Thank You for Subscribing!</h2>
      <p>We're excited to have you join our community.</p>
      <p>You'll now receive our weekly recipes, cooking tips, and culinary inspiration straight to your inbox.</p>
      <p>If you wish to unsubscribe in the future, simply click the unsubscribe link at the bottom of any newsletter email.</p>
    `
  });
};

// Send reactivation email to returning subscribers
export const sendReactivationEmail = async (email) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome Back to Our Newsletter!',
    html: `
      <h2>Welcome Back!</h2>
      <p>We're happy to have you back as a subscriber to our newsletter.</p>
      <p>You'll start receiving our weekly recipes, cooking tips, and culinary inspiration right away.</p>
      <p>If you wish to unsubscribe in the future, simply click the unsubscribe link at the bottom of any newsletter email.</p>
    `
  });
};

// Send unsubscribe confirmation email
export const sendUnsubscribeEmail = async (email) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Unsubscribed from Our Newsletter',
    html: `
      <h2>You've Been Unsubscribed</h2>
      <p>We're sorry to see you go.</p>
      <p>You've been successfully unsubscribed from our newsletter.</p>
      <p>If you change your mind, you can always subscribe again through our website.</p>
    `
  });
};

// Send notification to admin about new contact message
export const sendAdminNotification = async (name, email, message) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  });
};

// Send confirmation to user after submitting contact form
export const sendContactConfirmation = async (name, email, message) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'We\'ve Received Your Message',
    html: `
      <h2>Thank You for Contacting Us!</h2>
      <p>Hello ${name},</p>
      <p>We've received your message and will get back to you within 24-48 business hours.</p>
      <p>For your records, here's a copy of your message:</p>
      <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
      <p>Best regards,</p>
      <p>The CookZy Team</p>
    `
  });
};