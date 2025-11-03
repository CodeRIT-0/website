import { useState } from "react";
import { DEPARTMENTS } from "./departments";
import { validateField, validateForm } from "./validation";

export const useIcebreakerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    email: "",
    branch: "",
    year: "",
    programmingInterests: "",
    expectations: "",
    howDidYouHear: "",
    questionForClub: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [formStage, setFormStage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filterDepartments = (input) => {
    if (!input) return [];
    const regex = new RegExp(input, "i");
    return DEPARTMENTS.filter(
      (dept) => regex.test(dept.name) || regex.test(dept.short)
    ).slice(0, 6);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (submitStatus.message) {
      setSubmitStatus({ type: "", message: "" });
    }
  };

  const handleBranchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFormData((prev) => ({ ...prev, branch: value }));
    setShowSuggestions(value.length > 0);

    const error = validateField("branch", value);
    setErrors((prev) => ({ ...prev, branch: error }));
  };

  const selectDepartment = (dept) => {
    setFormData((prev) => ({ ...prev, branch: dept.short }));
    setSearchTerm(dept.name);
    setShowSuggestions(false);
    setErrors((prev) => ({ ...prev, branch: "" }));
  };

  const handleNextStage = () => {
    const stage1Fields = ["name", "usn", "email", "branch", "year"];
    const newErrors = {};

    stage1Fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormStage(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(formData);
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
          year: "",
          programmingInterests: "",
          expectations: "",
          howDidYouHear: "",
          questionForClub: "",
        });
        setSearchTerm("");
        setFormStage(1);
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
    formStage,
    searchTerm,
    showSuggestions,
    filteredDepts: filterDepartments(searchTerm),
    handleChange,
    handleBranchInputChange,
    selectDepartment,
    setShowSuggestions,
    handleNextStage,
    setFormStage,
    handleSubmit,
  };
};
