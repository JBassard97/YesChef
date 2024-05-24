import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CONTACT, DELETE_CONTACT } from "../../utils/mutations";
import { GET_CURRENT_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import "./Contacts.css";
import sortContacts from "../../utils/sortContacts";
import currentDateAndTime from "../../utils/currentDateAndTime";

const Contacts = () => {
  // States for createContact mutation
  const [createContact, { loading: createLoading, error: createError }] =
    useMutation(CREATE_CONTACT);
  const [contactname, setContactName] = useState("");
  const [contacttext, setContactText] = useState("");
  const [sortContactOrder, setSortContactOrder] =
    useState("CreatedFirstToLast");

  // State for deleteContact mutation
  const [deleteContact, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_CONTACT);

  // States for user data query
  const { data } = useQuery(GET_CURRENT_USER);
  const [userData, setUserData] = useState(null);
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    // If not logged in, go back to login page
    if (!Auth.loggedIn()) {
      window.location = "/";
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUserData(data.me);
    }
  }, [data]);

  useEffect(() => {
    if (userData) {
      setContactData(userData.contacts);
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the createContact mutation with the provided variables
      const { data: newContactData } = await createContact({
        variables: {
          contactname,
          contacttext,
        },
        update(cache, { data: { createContact } }) {
          // Update the Apollo Client cache with the new contact
          const existingUser = cache.readQuery({ query: GET_CURRENT_USER });
          const newContacts = [...existingUser.me.contacts, createContact];
          cache.writeQuery({
            query: GET_CURRENT_USER,
            data: { me: { ...existingUser.me, contacts: newContacts } },
          });
        },
      });

      // Update local state with the new contact
      setContactData((prevContacts) => [
        ...prevContacts,
        newContactData.createContact,
      ]);

      // Clear the form inputs after successful submission
      setContactName("");
      setContactText("");
    } catch (err) {
      console.error("Error creating contact:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact({
        variables: { id },
        update(cache) {
          const existingContacts = cache.readQuery({ query: GET_CURRENT_USER });
          const newContacts = existingContacts.me.contacts.filter(
            (contact) => contact._id !== id
          );
          cache.writeQuery({
            query: GET_CURRENT_USER,
            data: { me: { ...existingContacts.me, contacts: newContacts } },
          });
        },
      });

      // Update local state after deletion
      setContactData((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== id)
      );
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  const handleContSortChange = (event) => {
    setSortContactOrder(event.target.value);
  };

  return (
    <>
      <div className="contacts-full">
        <DashboardHeader />

        <div className="top-info">
          <h1 className="page-header">Contacts</h1>
          <p className="current-date-time">{currentDateAndTime()}</p>
        </div>

        {contactData && (
          <>
            <div className="contact-section-header">
              <h5>Contacts: {contactData?.length}</h5>
              <select value={sortContactOrder} onChange={handleContSortChange}>
                <option value="CreatedFirstToLast">Created 1st to Last</option>
                <option value="CreatedLastToFirst">Created Last to 1st</option>
                <option value="ContactNameAtoZ">Contact Name A to Z</option>
                <option value="ContactNameZtoA">Contact Name Z to A</option>
              </select>
            </div>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortContacts(contactData, sortContactOrder).map(
                  (contact, index) => (
                    <tr key={index}>
                      <td>{contact.contactname}</td>
                      <td>{contact.contacttext}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(contact._id)}
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <div className="page-break"></div>
          </>
        )}
        {deleteError && <p>Error: {deleteError.message}</p>}

        <form className="contact-form" onSubmit={handleSubmit}>
          <h5>Create Contact</h5>
          <div>
            <p>Contact Name:</p>
            <input
              type="text"
              className="contact-input"
              value={contactname}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
          </div>
          <div>
            <p>Contact Text:</p>
            <input
              className="contact-input"
              value={contacttext}
              onChange={(e) => setContactText(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={createLoading}>
            {createLoading ? "Creating..." : "Create Contact"}
          </button>
          {createError && <p>Error: {createError.message}</p>}
        </form>
      </div>
    </>
  );
};

export default Contacts;
