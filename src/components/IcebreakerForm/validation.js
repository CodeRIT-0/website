export const validateField = (name, value) => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      return "";

    case "usn":
      if (!value.trim()) return "USN is required";
      return "";

    default:
      return "";
  }
};
