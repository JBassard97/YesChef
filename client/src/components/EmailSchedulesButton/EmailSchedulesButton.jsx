import React from "react";
import { useMutation } from "@apollo/client";
import { EMAIL_SCHEDULES } from "../../utils/mutations"; // Adjust the import path as needed

const EmailSchedulesButton = () => {
  const [emailSchedules, { data, loading, error }] =
    useMutation(EMAIL_SCHEDULES);

  const handleEmailSchedules = async () => {
    try {
      const response = await emailSchedules();
      console.log("Email schedules response:", response);
      // Handle the response as needed
    } catch (error) {
      console.error("Error emailing schedules:", error);
    }
  };

  return (
    <div>
      <button onClick={handleEmailSchedules} disabled={loading}>
        Email Schedules
      </button>
      {loading && <p>Sending emails...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Success!</p>}
    </div>
  );
};

export default EmailSchedulesButton;
