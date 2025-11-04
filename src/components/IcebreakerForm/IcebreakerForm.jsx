"use client";

import { useEffect, useState } from "react";
import styles from "./IcebreakerForm.module.css";
import { useIcebreakerForm } from "./useIcebreakerForm";

export default function IcebreakerForm() {
  const {
    formData,
    errors,
    submitStatus,
    isSubmitting,
    searchTerm,
    showSuggestions,
    filteredDepts,
    handleChange,
    handleBranchInputChange,
    selectDepartment,
    setShowSuggestions,
    handleSubmit
  } = useIcebreakerForm();
  
  const [registrationComplete, setRegistrationComplete] = useState(false);

  useEffect(() => {
    if (submitStatus?.type === "success") {
      setRegistrationComplete(true);
    }
  }, [submitStatus?.type]);

  if (registrationComplete) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successCard}>
          <h3 className={styles.successTitle}>Registration Successful</h3>
          
          <p className={styles.successMessage}>
          Join our WhatsApp group for all the further updates and alongside tech talk, project colabs and meet likeminded peers.
          </p>

          <a 
            href="https://linktr.ee/CodeRIT" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.whatsappButton}
          >
            Join WhatsApp Group
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor="name">
          Student Name<span className={styles.required}> *</span>
        </label>
        <div className={`${styles.inputContainer} ${errors.name ? styles.error : ''}`}>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={styles.input}
            maxLength={100}
            required
          />
        </div>
        {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor="usn">
          USN<span className={styles.required}> *</span>
        </label>
        <div className={`${styles.inputContainer} ${errors.usn ? styles.error : ''}`}>
          <input
            id="usn"
            name="usn"
            type="text"
            value={formData.usn}
            onChange={handleChange}
            placeholder="e.g., 1MS23CS001"
            className={styles.input}
            required
          />
        </div>
        {errors.usn && <span className={styles.errorMessage}>{errors.usn}</span>}
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor="email">
          Email ID<span className={styles.required}> *</span>
        </label>
        <div className={`${styles.inputContainer} ${errors.email ? styles.error : ''}`}>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className={styles.input}
            maxLength={100}
            required
          />
        </div>
        {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor="branch">
          Branch<span className={styles.required}> *</span>
        </label>
        <div className={`${styles.inputContainer} ${errors.branch ? styles.error : ''}`}>
          <input
            id="branch"
            name="branch"
            type="text"
            value={searchTerm || formData.branch}
            onChange={handleBranchInputChange}
            onFocus={() => setShowSuggestions(searchTerm.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Start typing (e.g., CSE, Computer Science)"
            className={styles.input}
            required
            autoComplete="off"
          />
        </div>
        {showSuggestions && searchTerm && (
          <ul className={styles.suggestions}>
            {filteredDepts.map((dept, idx) => (
              <li 
                key={idx}
                onClick={() => selectDepartment(dept)}
                className={styles.suggestionItem}
              >
                <span className={styles.deptName}>{dept.name}</span>
                <span className={styles.deptShort}>{dept.short}</span>
              </li>
            ))}
          </ul>
        )}
        {errors.branch && <span className={styles.errorMessage}>{errors.branch}</span>}
      </div>

      <div className={styles.textareaWrapper}>
        <label className={styles.label} htmlFor="questionForClub">
          Any Questions for the seniors/ club?
        </label>
        <div className={`${styles.textareaContainer} ${errors.questionForClub ? styles.error : ''}`}>
          <textarea
            id="questionForClub"
            name="questionForClub"
            value={formData.questionForClub}
            onChange={handleChange}
            placeholder="Ask us anything..."
            className={styles.textarea}
            maxLength={300}
            rows={3}
          />
          <span className={styles.charCount}>{formData.questionForClub.length}/300</span>
        </div>
        {errors.questionForClub && <span className={styles.errorMessage}>{errors.questionForClub}</span>}
      </div>

      {submitStatus.message && (
        <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
          {submitStatus.message}
        </div>
      )}

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? (
          <span className={styles.loadingText}>
            <span className={styles.spinner}></span>
            Processing...
          </span>
        ) : (
          'Submit Registration'
        )}
      </button>
    </form>
  );
}
