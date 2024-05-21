import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_AVAILABILITY } from "../../utils/mutations";
import "./UpdateAvailabilityForm.css";

const UpdateAvailabilityForm = ({ employee }) => {
  const [availabilityStatus, setAvailabilityStatus] = useState({
    monday: employee.availability.monday,
    tuesday: employee.availability.tuesday,
    wednesday: employee.availability.wednesday,
    thursday: employee.availability.thursday,
    friday: employee.availability.friday,
    saturday: employee.availability.saturday,
    sunday: employee.availability.sunday,
  });

  const [updateAvailability, { loading, error }] =
    useMutation(UPDATE_AVAILABILITY);

  const handleRadioChange = (day, status) => {
    setAvailabilityStatus({
      ...availabilityStatus,
      [day]: status,
    });
  };

  const handleSaveAvailability = async () => {
    try {
      await updateAvailability({
        variables: {
          _id: employee._id,
          input: {
            ...availabilityStatus,
          },
        },
      });
      // Optionally, you can handle success here
      console.log("Availability updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update availability:", error);
      // Handle error as needed
    }
  };

  const getDayClass = (day) => {
    return availabilityStatus[day] === "available"
      ? "available"
      : "unavailable";
  };

  return (
    <div className="update-availability-form">
      <h5>Update Availability</h5>
      <div className="day-container">
        <div className={`day-item ${getDayClass("monday")}`}>
          <p>Mon</p>
          <label>
            <input
              type="radio"
              name="monday"
              value="available"
              checked={availabilityStatus.monday === "available"}
              onChange={() => handleRadioChange("monday", "available")}
            />{" "}
            <span role="img" aria-label="available">
              ✅
            </span>{" "}
          </label>
          <label>
            <input
              type="radio"
              name="monday"
              value="unavailable"
              checked={availabilityStatus.monday === "unavailable"}
              onChange={() => handleRadioChange("monday", "unavailable")}
            />{" "}
            <span role="img" aria-label="unavailable">
              ❌
            </span>{" "}
          </label>
        </div>
        <div className={`day-item ${getDayClass("tuesday")}`}>
          <p>Tues</p>
          <label>
            <input
              type="radio"
              name="tuesday"
              value="available"
              checked={availabilityStatus.tuesday === "available"}
              onChange={() => handleRadioChange("tuesday", "available")}
            />{" "}
            <span role="img" aria-label="available">
              ✅
            </span>{" "}
          </label>
          <label>
            <input
              type="radio"
              name="tuesday"
              value="unavailable"
              checked={availabilityStatus.tuesday === "unavailable"}
              onChange={() => handleRadioChange("tuesday", "unavailable")}
            />{" "}
            <span role="img" aria-label="unavailable">
              ❌
            </span>{" "}
          </label>
        </div>
        <div className={`day-item ${getDayClass("wednesday")}`}>
          <p>Wed</p>
          <label>
            <input
              type="radio"
              name="wednesday"
              value="available"
              checked={availabilityStatus.wednesday === "available"}
              onChange={() => handleRadioChange("wednesday", "available")}
            />{" "}
            <span role="img" aria-label="available">
              ✅
            </span>{" "}
          </label>
          <label>
            <input
              type="radio"
              name="wednesday"
              value="unavailable"
              checked={availabilityStatus.wednesday === "unavailable"}
              onChange={() => handleRadioChange("wednesday", "unavailable")}
            />{" "}
            <span role="img" aria-label="unavailable">
              ❌
            </span>{" "}
          </label>
        </div>
        <div className={`day-item ${getDayClass("thursday")}`}>
          <p>Thur</p>
          <label>
            <input
              type="radio"
              name="thursday"
              value="available"
              checked={availabilityStatus.thursday === "available"}
              onChange={() => handleRadioChange("thursday", "available")}
            />{" "}
            <span role="img" aria-label="available">
              ✅
            </span>{" "}
          </label>
          <label>
            <input
              type="radio"
              name="thursday"
              value="unavailable"
              checked={availabilityStatus.thursday === "unavailable"}
              onChange={() => handleRadioChange("thursday", "unavailable")}
            />{" "}
            <span role="img" aria-label="unavailable">
              ❌
            </span>{" "}
          </label>
        </div>
        <div className={`day-item ${getDayClass("friday")}`}>
          <p>Fri</p>
          <label>
            <input
              type="radio"
              name="friday"
              value="available"
              checked={availabilityStatus.friday === "available"}
              onChange={() => handleRadioChange("friday", "available")}
            />{" "}
            <span role="img" aria-label="available">
              ✅
            </span>{" "}
          </label>
          <label>
            <input
              type="radio"
              name="friday"
              value="unavailable"
              checked={availabilityStatus.friday === "unavailable"}
              onChange={() => handleRadioChange("friday", "unavailable")}
            />{" "}
            <span role="img" aria-label="unavailable">
              ❌
            </span>{" "}
          </label>
        </div>
        <div className={`day-item ${getDayClass("saturday")}`}>
          <p>Sat</p>
          <label>
            <input
              type="radio"
              name="saturday"
              value="available"
              checked={availabilityStatus.saturday === "available"}
              onChange={() => handleRadioChange("saturday", "available")}
            />{" "}
            <span role="img" aria-label="available">
              ✅
            </span>{" "}
          </label>
          <label>
            <input
              type="radio"
              name="saturday"
              value="unavailable"
              checked={availabilityStatus.saturday === "unavailable"}
              onChange={() => handleRadioChange("saturday", "unavailable")}
            />{" "}
            <span role="img" aria-label="unavailable">
              ❌
            </span>{" "}
          </label>
        </div>
        <div className={`day-item ${getDayClass("sunday")}`}>
          <p>Sun</p>
          <label>
            <input
              type="radio"
              name="sunday"
              value="available"
              checked={availabilityStatus.sunday === "available"}
              onChange={() => handleRadioChange("sunday", "available")}
            />{" "}
            <span role="img" aria-label="available">
              ✅
            </span>{" "}
          </label>
          <label>
            <input
              type="radio"
              name="sunday"
              value="unavailable"
              checked={availabilityStatus.sunday === "unavailable"}
              onChange={() => handleRadioChange("sunday", "unavailable")}
            />{" "}
            <span role="img" aria-label="unavailable">
              ❌
            </span>{" "}
          </label>
        </div>
      </div>
      <button onClick={handleSaveAvailability}>Save Changes</button>
    </div>
  );
};

export default UpdateAvailabilityForm;
