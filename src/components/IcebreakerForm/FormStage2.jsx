import styles from './IcebreakerForm.module.css';

export default function FormStage2({ 
  formData, 
  errors, 
  submitStatus,
  isSubmitting,
  handleChange, 
  setFormStage 
}) {
  return (
    <>
      <div className={styles.stageHeader}>
        <button type="button" onClick={() => setFormStage(1)} className={styles.backButton}>
          ← Back
        </button>
        <span className={styles.stageIndicator}>Step 2 of 2</span>
      </div>

      <div className={styles.textareaWrapper}>
        <label className={styles.label} htmlFor="questionForClub">
          Any question u&apos;ve always wanted to shoot at Seniors?
          <span className={styles.required}> *</span>
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
            required
          />
          <span className={styles.charCount}>{formData.questionForClub.length}/300</span>
        </div>
        {errors.questionForClub && <span className={styles.errorMessage}>{errors.questionForClub}</span>}
      </div>

      <div className={styles.textareaWrapper}>
        <label className={styles.label} htmlFor="programmingInterests">
          What are your programming interests?
          <span className={styles.required}> *</span>
        </label>
        <div className={`${styles.textareaContainer} ${errors.programmingInterests ? styles.error : ''}`}>
          <textarea
            id="programmingInterests"
            name="programmingInterests"
            value={formData.programmingInterests}
            onChange={handleChange}
            placeholder="Tell us what you like to code, languages you know, projects you've worked on..."
            className={styles.textarea}
            maxLength={500}
            rows={4}
            required
          />
          <span className={styles.charCount}>{formData.programmingInterests.length}/500</span>
        </div>
        {errors.programmingInterests && <span className={styles.errorMessage}>{errors.programmingInterests}</span>}
      </div>

      <div className={styles.textareaWrapper}>
        <label className={styles.label} htmlFor="expectations">
          What would you like to see from CodeRIT?
          <span className={styles.required}> *</span>
        </label>
        <div className={`${styles.textareaContainer} ${errors.expectations ? styles.error : ''}`}>
          <textarea
            id="expectations"
            name="expectations"
            value={formData.expectations}
            onChange={handleChange}
            placeholder="Events, workshops, hackathons, competitions..."
            className={styles.textarea}
            maxLength={500}
            rows={4}
            required
          />
          <span className={styles.charCount}>{formData.expectations.length}/500</span>
        </div>
        {errors.expectations && <span className={styles.errorMessage}>{errors.expectations}</span>}
      </div>

      <div className={styles.textareaWrapper}>
        <label className={styles.label} htmlFor="howDidYouHear">
          How did you hear about CodeRIT?
          <span className={styles.required}> *</span>
        </label>
        <div className={`${styles.textareaContainer} ${errors.howDidYouHear ? styles.error : ''}`}>
          <textarea
            id="howDidYouHear"
            name="howDidYouHear"
            value={formData.howDidYouHear}
            onChange={handleChange}
            placeholder="Social media, friends, posters, events..."
            className={styles.textarea}
            maxLength={200}
            rows={3}
            required
          />
          <span className={styles.charCount}>{formData.howDidYouHear.length}/200</span>
        </div>
        {errors.howDidYouHear && <span className={styles.errorMessage}>{errors.howDidYouHear}</span>}
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
    </>
  );
}
