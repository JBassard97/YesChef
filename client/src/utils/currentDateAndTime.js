export default function currentDateAndTime() {
  const currentDate = new Date();
  const dateString = `${currentDate.getMonth() + 1}/${currentDate.getDate()}`;
  const timeString = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateTimeString = `${dateString} ${timeString}`;
  return dateTimeString;
}
