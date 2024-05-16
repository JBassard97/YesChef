import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CONTACT } from "../../utils/mutations";

const Contacts = () => {
  const [contactname, setcontactname] = useState("");
  const [contacttext, setcontacttext] = useState("");

  const [createContact, { loading, error }] = useMutation(CREATE_CONTACT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the createListcontact mutation with the provided variables
      await createContact({
        variables: {
          contactname,
          contacttext,
        },
      });
      // Clear the form inputs after successful submission
      setcontactname("");
      setcontacttext("");
      alert("Contact created successfully!");
    } catch (err) {
      console.error("Error creating contact:", err);
      alert("Failed to create contact. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="contactname">Contact Name:</label>
          <input
            type="text"
            id="contactname"
            value={contactname}
            onChange={(e) => setcontactname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contacttext">Contact Text:</label>
          <textarea
            id="contacttext"
            value={contacttext}
            onChange={(e) => setcontacttext(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Contact"}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default Contacts;
