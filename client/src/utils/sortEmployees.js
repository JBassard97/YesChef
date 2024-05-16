export default function sortEmployees(employeeArray, order) {
  let sortedEmployees;
  switch (order) {
    case "CreatedFirstToLast":
      sortedEmployees = employeeArray;
      break;
    case "CreatedLastToFirst":
      sortedEmployees = [...employeeArray].reverse();
      break;
    case "LastNameAtoZ":
      sortedEmployees = [...employeeArray].sort((a, b) => {
        let lastnameA = a.lastname.toUpperCase();
        let lastnameB = b.lastname.toUpperCase();
        if (lastnameA < lastnameB) {
          return -1;
        } else if (lastnameA > lastnameB) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    case "LastNameZtoA":
      sortedEmployees = [...employeeArray].sort((a, b) => {
        let lastnameA = a.lastname.toUpperCase();
        let lastnameB = b.lastname.toUpperCase();
        if (lastnameB < lastnameA) {
          return -1;
        } else if (lastnameB > lastnameA) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    case "FirstNameAtoZ":
      sortedEmployees = [...employeeArray].sort((a, b) => {
        let firstnameA = a.firstname.toUpperCase();
        let firstnameB = b.firstname.toUpperCase();
        if (firstnameA < firstnameB) {
          return -1;
        } else if (firstnameA > firstnameB) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    case "FirstNameZtoA":
      sortedEmployees = [...employeeArray].sort((a, b) => {
        let firstnameA = a.firstname.toUpperCase();
        let firstnameB = b.firstname.toUpperCase();
        if (firstnameB < firstnameA) {
          return -1;
        } else if (firstnameB > firstnameA) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    case "TitleAtoZ":
      sortedEmployees = [...employeeArray].sort((a, b) => {
        let positionA = a.position.toUpperCase();
        let positionB = b.position.toUpperCase();
        if (positionA < positionB) {
          return -1;
        } else if (positionA > positionB) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    case "TitleZtoA":
      sortedEmployees = [...employeeArray].sort((a, b) => {
        let positionA = a.position.toUpperCase();
        let positionB = b.position.toUpperCase();
        if (positionB < positionA) {
          return -1;
        } else if (positionB > positionA) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    case "RateHighToLow":
      sortedEmployees = [...employeeArray].sort((a, b) => {
        const rateA = parseFloat(a.rate) || 0; // Treat "00.00" as 0
        const rateB = parseFloat(b.rate) || 0;
        return rateB - rateA;
      });
      break;
    case "RateLowToHigh":
      sortedEmployees = [...employeeArray].sort((a, b) => {
        const rateA = parseFloat(a.rate) || 0; // Treat "00.00" as 0
        const rateB = parseFloat(b.rate) || 0;
        return rateA - rateB;
      });
      break;
    default:
      sortedEmployees = employeeArray;
  }

  return sortedEmployees;
}
