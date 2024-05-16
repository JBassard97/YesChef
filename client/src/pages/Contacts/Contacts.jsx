import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CONTACT } from "../../utils/mutations";
import { GET_CURRENT_USER } from "../../utils/queries";

import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import "./Contacts.css";

const Contacts = () => {
  // ! States for createContact mutation
  const [createContact, { loading, error }] = useMutation(CREATE_CONTACT);
  const [contactname, setcontactname] = useState("");
  const [contacttext, setcontacttext] = useState("");

  // ! States for user data query
  const { data } = useQuery(GET_CURRENT_USER);
  const [userData, setUserData] = useState(null);
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    if (data) {
      console.log("User Data:\n", data.me);
      setUserData(data.me);
    }
  }, [data]);

  useEffect(() => {
    if (userData) {
      console.log("Contact Data:\n", userData.contacts);
      setContactData(userData.contacts);
    }
  }, [userData]);

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
    <>
      <DashboardHeader />

      <div className="contacts-full">
        <h1 className="page-header">Contacts</h1>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h5>Create Contact</h5>
          <div>
            <p>Contact Name:</p>
            <input
              type="text"
              className="contact-input"
              value={contactname}
              onChange={(e) => setcontactname(e.target.value)}
              required
            />
          </div>
          <div>
            <p>Contact Text:</p>
            <input
              className="contact-input"
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
    </>
  );
};

export default Contacts;
