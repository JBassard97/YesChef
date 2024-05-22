import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_SCHEDULE } from "../../utils/mutations";
import "./UpdateScheduleForm.css";

export default function ScheduleForm({ scheduleId, day, closeForm }) {
  const [startTime, setStartTime] = useState({
    hour: "12",
    minute: "00",
    period: "AM",
  });
  const [endTime, setEndTime] = useState({
    hour: "12",
    minute: "00",
    period: "AM",
  });
  const [updateSchedule] = useMutation(UPDATE_SCHEDULE);

  const handleTimeChange = (event, setTime, key) => {
    const { value } = event.target;
    setTime((prev) => ({ ...prev, [key]: value }));
  };

  const formatTime = (hour, minute, period) => {
    return `${hour}:${minute} ${period}`;
  };

  const handleUpdateSchedule = async () => {
    const formattedStartTime = formatTime(
      startTime.hour,
      startTime.minute,
      startTime.period
    );
    const formattedEndTime = formatTime(
      endTime.hour,
      endTime.minute,
      endTime.period
    );

    try {
      const { data } = await updateSchedule({
        variables: {
          id: scheduleId,
          input: {
            [day]: `${formattedStartTime} - ${formattedEndTime}`,
          },
        },
      });
      console.log("Updated Schedule:", data);
        closeForm(); // Close the form after successful update
        window.location.reload();
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  return (
    <div className="schedule-form">
      <div className="start-time">
        <select
          className="time-value-select"
          onChange={(e) => handleTimeChange(e, setStartTime, "hour")}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          className="time-value-select"
          onChange={(e) => handleTimeChange(e, setStartTime, "minute")}
        >
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>
        <select
          className="time-value-select"
          onChange={(e) => handleTimeChange(e, setStartTime, "period")}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      -
      <div className="end-time">
        <select
          className="time-value-select"
          onChange={(e) => handleTimeChange(e, setEndTime, "hour")}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          className="time-value-select"
          onChange={(e) => handleTimeChange(e, setEndTime, "minute")}
        >
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>
        <select
          className="time-value-select"
          onChange={(e) => handleTimeChange(e, setEndTime, "period")}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <button onClick={handleUpdateSchedule}>Save</button>
      <button onClick={closeForm}>Cancel</button>
    </div>
  );
}
