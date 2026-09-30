import { useState } from "react";
import { DEPARTMENTS, findDepartment } from "./departments";
import { validateField, validateForm } from "./validation";

export const useIcebreakerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    email: "",
    branch: "",
    questionForClub: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filterDepartments = (input) => {
    const term = input.trim().toLowerCase();
    if (!term) return [];
    return DEPARTMENTS.filter(
      (dept) =>
        dept.name.toLowerCase().includes(term) ||
        dept.short.toLowerCase().includes(term)
    ).slice(0, 6);
  };

  // While typing, don't nag: only refresh an error that is already showing,
  // so it disappears as soon as the value becomes valid.
  const handleChange = (e) => {
    const { name } = e.target;
    const value = name === "usn" ? e.target.value.toUpperCase() : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => (prev[name] ? { ...prev, [name]: validateField(name, value) } : prev));

    if (submitStatus.message) {
      setSubmitStatus({ type: "", message: "" });
    }
  };

  // Validate a field when the user leaves it
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Branch only counts once a department from the list is chosen (or typed exactly)
  const handleBranchInputChange = (e) => {
    const value = e.target.value;
    const match = findDepartment(value);
    setSearchTerm(value);
    setFormData((prev) => ({ ...prev, branch: match ? match.short : "" }));
    setShowSuggestions(value.length > 0);
    if (match) setErrors((prev) => ({ ...prev, branch: "" }));
  };

  const handleBranchBlur = () => {
    setShowSuggestions(false);
    setErrors((prev) => ({ ...prev, branch: validateField("branch", formData.branch) }));
  };

  const selectDepartment = (dept) => {
    setFormData((prev) => ({ ...prev, branch: dept.short }));
    setSearchTerm(dept.name);
    setShowSuggestions(false);
    setErrors((prev) => ({ ...prev, branch: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(formData);
    if (formErrors.branch && searchTerm) {
      formErrors.branch = "Please pick your branch from the list";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/icebreaker-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ type: "success", message: data.message });
        setFormData({
          name: "",
          usn: "",
          email: "",
          branch: "",
          questionForClub: "",
        });
        setSearchTerm("");
        setErrors({});
      } else {
        setSubmitStatus({ type: "error", message: data.message });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    searchTerm,
    showSuggestions,
    filteredDepts: filterDepartments(searchTerm),
    handleChange,
    handleBlur,
    handleBranchBlur,
    handleBranchInputChange,
    selectDepartment,
    setShowSuggestions,
    handleSubmit,
  };
};
