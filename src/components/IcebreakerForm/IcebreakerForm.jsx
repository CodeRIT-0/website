"use client";

import { useEffect, useState } from "react";
import styles from "./IcebreakerForm.module.css";
import FormStage1 from "./FormStage1";
import FormStage2 from "./FormStage2";
import { useIcebreakerForm } from "./useIcebreakerForm";

export default function IcebreakerForm() {
  const formProps = useIcebreakerForm();
  const [registrationComplete, setRegistrationComplete] = useState(false);

  useEffect(() => {
    if (formProps.submitStatus?.type === "success") {
      setRegistrationComplete(true);
    }
  }, [formProps.submitStatus?.type]);

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
    <form onSubmit={formProps.handleSubmit} className={styles.form}>
      {formProps.formStage === 1 ? (
        <FormStage1 {...formProps} />
      ) : (
        <FormStage2 {...formProps} />
      )}
    </form>
  );
}
