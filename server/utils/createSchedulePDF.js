const puppeteer = require("puppeteer");
const path = require("path");

async function createSchedulePDF(bossAndEmpsArray) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .name-cell {
          white-space: pre-wrap; /* To allow line breaks within names */
        }
        .name {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h1 style="text-align: center;">Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          ${bossAndEmpsArray
            .map(
              (person) => `
            <tr>
              <td class="name-cell"><span class="name">${person.firstname}<br>${
                person.lastname
              }</span><br>(${person.position})</td>
              <td>${
                person.availability.monday == "unavailable"
                  ? "OFF"
                  : person.schedule.monday
              }</td>
              <td>${
                person.availability.tuesday == "unavailable"
                  ? "OFF"
                  : person.schedule.tuesday
              }</td>
              <td>${
                person.availability.wednesday == "unavailable"
                  ? "OFF"
                  : person.schedule.wednesday
              }</td>
              <td>${
                person.availability.thursday == "unavailable"
                  ? "OFF"
                  : person.schedule.thursday
              }</td>
              <td>${
                person.availability.friday == "unavailable"
                  ? "OFF"
                  : person.schedule.friday
              }</td>
              <td>${
                person.availability.saturday == "unavailable"
                  ? "OFF"
                  : person.schedule.saturday
              }</td>
              <td>${
                person.availability.sunday == "unavailable"
                  ? "OFF"
                  : person.schedule.sunday
              }</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  const pdfPath = path.join(__dirname, "schedules.pdf");
  await page.pdf({ path: pdfPath, format: "A4", printBackground: true });
  await browser.close();
  return pdfPath;
}

module.exports = { createSchedulePDF };

// const pdf = require("html-pdf");

// function createSchedulePDF(bossAndEmpsArray) {
//   return new Promise((resolve, reject) => {
//     const html = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             margin: 20px;
//           }
//           table {
//             width: 100%;
//             border-collapse: collapse;
//           }
//           th, td {
//             border: 1px solid #000;
//             padding: 8px;
//             text-align: left;
//           }
//           th {
//             background-color: #f2f2f2;
//           }
//           .name-cell {
//             white-space: pre-wrap; /* To allow line breaks within names */
//           }
//           .name {
//             font-weight: bold;
//           }
//         </style>
//       </head>
//       <body>
//         <h1 style="text-align: center;">Schedule</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Monday</th>
//               <th>Tuesday</th>
//               <th>Wednesday</th>
//               <th>Thursday</th>
//               <th>Friday</th>
//               <th>Saturday</th>
//               <th>Sunday</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${bossAndEmpsArray
//               .map(
//                 (person) => `
//               <tr>
//                 <td class="name-cell"><span class="name">${
//                   person.firstname
//                 }<br>${person.lastname}</span><br>(${person.position})</td>
//                 <td>${
//                   person.availability.monday == "unavailable"
//                     ? "OFF"
//                     : person.schedule.monday
//                 }</td>
//                 <td>${
//                   person.availability.tuesday == "unavailable"
//                     ? "OFF"
//                     : person.schedule.tuesday
//                 }</td>
//                 <td>${
//                   person.availability.wednesday == "unavailable"
//                     ? "OFF"
//                     : person.schedule.wednesday
//                 }</td>
//                 <td>${
//                   person.availability.thursday == "unavailable"
//                     ? "OFF"
//                     : person.schedule.thursday
//                 }</td>
//                 <td>${
//                   person.availability.friday == "unavailable"
//                     ? "OFF"
//                     : person.schedule.friday
//                 }</td>
//                 <td>${
//                   person.availability.saturday == "unavailable"
//                     ? "OFF"
//                     : person.schedule.saturday
//                 }</td>
//                 <td>${
//                   person.availability.sunday == "unavailable"
//                     ? "OFF"
//                     : person.schedule.sunday
//                 }</td>
//               </tr>
//             `
//               )
//               .join("")}
//           </tbody>
//         </table>
//       </body>
//       </html>
//     `;

//     const options = {
//       format: "A4",
//       orientation: "portrait",
//       border: {
//         top: "10mm",
//         right: "10mm",
//         bottom: "10mm",
//         left: "10mm",
//       },
//     };

//     pdf.create(html, options).toFile("schedules.pdf", (err, res) => {
//       if (err) {
//         console.error("PDF creation error:", err);
//         return reject(err);
//       }
//       resolve(res.filename);
//     });
//   });
// }

// module.exports = { createSchedulePDF };
