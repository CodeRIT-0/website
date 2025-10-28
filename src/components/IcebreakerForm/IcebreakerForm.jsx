"use client";

import { useEffect, useState } from "react";
import styles from "./IcebreakerForm.module.css";
import FormStage1 from "./FormStage1";
import FormStage2 from "./FormStage2";
import { useIcebreakerForm } from "./useIcebreakerForm";

export default function IcebreakerForm() {
  const formProps = useIcebreakerForm();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (formProps.submitStatus?.type === "success") {
      setShowSuccessModal(true);
    }
  }, [formProps.submitStatus?.type]);

  return (
    <>
      <form onSubmit={formProps.handleSubmit} className={styles.form}>
        {formProps.formStage === 1 ? (
          <FormStage1 {...formProps} />
        ) : (
          <FormStage2 {...formProps} />
        )}
      </form>

      {showSuccessModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <div className={styles.modalMessage}>
              Form submitted successfully
            </div>
            <button
              type="button"
              className={styles.modalButton}
              onClick={() => setShowSuccessModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
