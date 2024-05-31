var nodemailer = require("nodemailer");

async function sendEmail(email, availability, schedule) {
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
      text: `Here is your schedule for the coming week:
        Monday: ${availability.monday == "unavailable" ? "UNAVAILABLE" : schedule.monday}
        Tuesday: ${availability.tuesday == "unavailable" ? "UNAVAILABLE" : schedule.tuesday}
        Wednesday: ${availability.wednesday == "unavailable" ? "UNAVAILABLE" : schedule.wednesday}
        Thursday: ${availability.thursday == "unavailable" ? "UNAVAILABLE" : schedule.thursday}
        Friday: ${availability.friday == "unavailable" ? "UNAVAILABLE" : schedule.friday}
        Saturday: ${availability.saturday == "unavailable" ? "UNAVAILABLE" : schedule.saturday}
        Sunday: ${availability.sunday == "unavailable" ? "UNAVAILABLE" : schedule.sunday}
        `
    }

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

module.exports = { sendEmail };
