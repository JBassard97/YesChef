import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_EMPLOYEE } from "../../utils/mutations";
import "./DeleteEmployeeForm.css";

export default function DeleteEmployeeForm({ employee }) {
  const [pressCount, setPressCount] = useState(0);
  const [deleteEmployee, { loading, error }] = useMutation(DELETE_EMPLOYEE);

  const handleDelete = async () => {
    if (pressCount < 2) {
      setPressCount(pressCount + 1);
    } else {
      try {
        const { data } = await deleteEmployee({
          variables: { _id: employee._id },
        });
        if (data) {
          console.log(
            `Employee ${data.deleteEmployee.firstname} ${data.deleteEmployee.lastname} deleted successfully!`
          );
          // Optionally, you can handle any UI updates or state changes here
          window.location.reload(); // Or handle updating the state to reflect the deletion
        }
      } catch (err) {
        console.error("Error deleting employee:", err);
      }
    }
  };

  return (
    <div className="delete-employee-form">
      <h5>Delete Employee</h5>
      <p>
        Press the button{" "}
        <span
          className={
            pressCount == 2
              ? "last-chance press-count-tracker"
              : "press-count-tracker"
          }
        >
          {3 - pressCount}
        </span>{" "}
        times to delete.
      </p>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete Employee"}
      </button>
      {error && <p className="error-message">Error: {error.message}</p>}
    </div>
  );
}
