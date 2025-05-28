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


export async function sendDonationCollectedEmail(to, foodName, collectorInfo) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: `Your donation "${foodName}" has been collected!`,
      html: `
        <p>Assalamualaikum Dear Donor,</p>
        <p>We are pleased to inform you that your donated food item "<strong>${foodName}</strong>" has been successfully collected.</p>
        <p><strong>Collector Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${collectorInfo.name || 'N/A'}</li>
          <li><strong>Phone:</strong> ${collectorInfo.phone || 'N/A'}</li>
          <li><strong>Email:</strong> ${collectorInfo.email || 'N/A'}</li>
        </ul>
        <p>The collecter will contact you soon, if not you can contact him on the above given details. In case of any inconvenience please feel free to contact helpin hands team.</p>
        <p>Thank you for your generous contribution. May Allah SWT reward you immensely.<br/>Helping Hands</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send collection email:', error);
    throw error;
  }
}


export async function sendRiderNotificationEmail(riders, donation, donor, requester, userCity) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptionsBase = {
      from: process.env.EMAIL_USER,
      subject: 'Food Available for Pickup',
    };

    await Promise.all(
      riders.map((rider) => {
        const mailOptions = {
          ...mailOptionsBase,
          to: rider.email,
          html: `
            <p>Hello ${rider.name || 'Rider'},</p>
            <p>A food item <strong>${donation.details?.foodName || 'N/A'}</strong> is available for pickup in your city (${userCity}).</p>

            <h3>Pickup Location:</h3>
            <p>Address: ${donation.location?.pickupAddress || 'N/A'}</p>
            <p>Phone: ${donation.location?.phoneNumber || 'N/A'}</p>

            <h3>Donor Information:</h3>
            <p>Name: ${donor.name || 'N/A'}</p>
            <p>Email: ${donor.email || 'N/A'}</p>
            <p>Phone: ${donor.phone || 'N/A'}</p>
            <p>Address: ${donor.address || 'N/A'}</p>

            <h3>Requester Information:</h3>
            <p>Name: ${requester.name || 'N/A'}</p>
            <p>Email: ${requester.email || 'N/A'}</p>
            <p>Phone: ${requester.phone || 'N/A'}</p>
            <p>Address: ${requester.address || 'N/A'}</p>

            <p>Please login to the system to accept the pickup.</p>
            <p>Thank you!</p>
          `,
        };
        return transporter.sendMail(mailOptions);
      })
    );
  } catch (error) {
    console.error('Failed to send rider notification emails:', error);
    throw error;
  }
}

















export async function sendPickupNotificationEmails(donor, requester, rider, donation) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptionsBase = {
      from: process.env.EMAIL_USER,
      subject: `Update: Donation "${donation.details?.foodName || 'Food Item'}" picked up`,
    };

    // Prepare donor email options
    const donorMailOptions = {
      ...mailOptionsBase,
      to: donor.email,
      html: `
        <p>Assalamualaikum Dear ${donor.name || 'Donor'},</p>
        <p>Your donation "<strong>${donation.details?.foodName || 'Food Item'}</strong>" has been picked up by the rider.</p>
        <h3>Rider Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${rider.name || 'N/A'}</li>
          <li><strong>Phone:</strong> ${rider.phone || 'N/A'}</li>
          <li><strong>Email:</strong> ${rider.email || 'N/A'}</li>
        </ul>
        <p>Thank you for your generosity.<br/>Helping Hands Team</p>
      `,
    };

    // Prepare requester email options
    const requesterMailOptions = {
      ...mailOptionsBase,
      to: requester.email,
      html: `
        <p>Assalamualaikum Dear ${requester.name || 'Recipient'},</p>
        <p>A rider has picked up the donation "<strong>${donation.details?.foodName || 'Food Item'}</strong>" and it will be delivered to you soon.</p>
        <h3>Rider Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${rider.name || 'N/A'}</li>
          <li><strong>Phone:</strong> ${rider.phone || 'N/A'}</li>
          <li><strong>Email:</strong> ${rider.email || 'N/A'}</li>
        </ul>
        <p>Please be prepared to receive it.<br/>Helping Hands Team</p>
      `,
    };

    // Send both emails in parallel and return the promise
    return await Promise.all([
      transporter.sendMail(donorMailOptions),
      transporter.sendMail(requesterMailOptions),
    ]);
  } catch (error) {
    console.error('Failed to send pickup notification emails:', error);
    throw error;
  }
}
