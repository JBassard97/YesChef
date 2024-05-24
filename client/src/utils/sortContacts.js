export default function sortContacts(contactArray, order) {
  let sortedContacts;
  switch (order) {
    case "CreatedFirstToLast":
      sortedContacts = contactArray;
      break;
    case "CreatedLastToFirst":
      sortedContacts = [...contactArray].reverse();
      break;
    case "ContactNameAtoZ":
      sortedContacts = [...contactArray].sort((a, b) => {
        let contactnameA = a.contactname.toUpperCase();
        let contactnameB = b.contactname.toUpperCase();
        if (contactnameA < contactnameB) {
          return -1;
        } else if (contactnameA > contactnameB) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    case "ContactNameZtoA":
      sortedContacts = [...contactArray].sort((a, b) => {
        let contactnameA = a.contactname.toUpperCase();
        let contactnameB = b.contactname.toUpperCase();
        if (contactnameB < contactnameA) {
          return -1;
        } else if (contactnameB > contactnameA) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    default:
      sortedContacts = contactArray;
  }

  return sortedContacts;
}
