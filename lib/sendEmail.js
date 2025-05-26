import nodemailer from 'nodemailer'

export async function sendExpiryEmail(to, itemName, expiryDate) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // your Gmail app password
            },
        })

        const mailOptions = {
  from: process.env.EMAIL_USER,
  to,
  subject: `Reminder: ${itemName} will expire soon`,
  // Use HTML for the email body with a button link
  html: `
    <p>Hello,</p>
    <p>This is a reminder that your item "<strong>${itemName}</strong>" will expire on <strong>${new Date(expiryDate).toDateString()}</strong>.</p>
    <p>Please consider donating it before it expires.</p>
    <p>
      <a href="http://localhost:3000/account/general/projects/create" 
         style="
           display: inline-block;
           padding: 10px 20px;
           font-size: 16px;
           color: white;
           background-color: #007bff;
           text-decoration: none;
           border-radius: 5px;
         "
         target="_blank" 
         rel="noopener noreferrer"
      >
        Donate Now
      </a>
    </p>
    <p>Best regards,<br/>Helpin Hands</p>
  `,
}


        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Failed to send email:', error)
        throw error
    }
}
