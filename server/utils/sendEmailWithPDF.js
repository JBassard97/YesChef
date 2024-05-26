const nodemailer = require("nodemailer");

async function sendEmailWithPDF(email, pdfFilePath) {
  try {
    // Create a transporter to send the email
    const transporter = nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: "yeschefapp.schedules@yahoo.com",
        pass: "Y3SCH3FAPPLICATION",
      },
    });

    // Setup email data
    const mailOptions = {
      from: "yeschefapp.schedules@yahoo.com",
      to: email,
      subject: "Employee Schedule PDF",
      text: "Attached is the PDF containing the employee schedules.",
      attachments: [
        {
          filename: "schedules.pdf",
          path: pdfFilePath,
          contentType: "application/pdf",
        },
      ],
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

module.exports = { sendEmailWithPDF };
