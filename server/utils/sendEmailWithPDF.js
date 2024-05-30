var nodemailer = require("nodemailer");

async function sendEmailWithPDF(email, pdfFilePath) {
  try {
    // Create a transporter to send the email
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "yeschefapplication@gmail.com",
        pass: "ankt obne zepa rxaj",
      },
    });

    // Setup email data
    const mailOptions = {
      from: "yeschefapplication@gmail.com",
      to: email,
      subject: "Store Schedule PDF",
      text: "Attached is the most recently updated schedule for your store",
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
