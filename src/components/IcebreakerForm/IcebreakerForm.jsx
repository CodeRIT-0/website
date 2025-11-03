"use client";

import { useEffect, useState } from "react";
import styles from "./IcebreakerForm.module.css";
import { useIcebreakerForm } from "./useIcebreakerForm";

export default function IcebreakerForm() {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
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
          Name<span className={styles.required}> *</span>
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

      <div className={styles.textareaWrapper}>
        <label className={styles.label} htmlFor="questionForClub">
          Do you have any questions for the Club/ Seniors?
        </label>
        <div className={styles.textareaContainer}>
          <textarea
            id="questionForClub"
            name="questionForClub"
            value={formData.questionForClub}
            onChange={handleChange}
            placeholder="Ask us anything..."
            className={styles.textarea}
            rows={4}
          />
        </div>
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
