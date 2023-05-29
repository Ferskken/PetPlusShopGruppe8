import { Injectable } from '@angular/core';
import * as nodemailer from 'nodemailer';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure the SMTP transport for nodemailer
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // SMTP server address
      port: 587, // SMTP port
      secure: false, // Set to true if using a secure connection (TLS/SSL)
      auth: {
        user: 'your_username', // SMTP username
        pass: 'your_password' // SMTP password
      }
    });
  }

  sendEmail(recipient: string, subject: string, content: string): Promise<any> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'your_email@example.com', // Sender email address
      to: recipient, // Recipient email address
      subject: subject, // Email subject
      text: content // Plain text content of the email
    };

    return this.transporter.sendMail(mailOptions);
  }
}
