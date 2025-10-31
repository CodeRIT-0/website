import styles from './IcebreakerForm.module.css';
import { YEARS } from './departments';

export default function FormStage1({ 
  formData, 
  errors, 
  searchTerm, 
  showSuggestions,
  filteredDepts,
  handleChange, 
  handleBranchInputChange, 
  selectDepartment,
  setShowSuggestions,
  handleNextStage 
}) {
  return (
    <>
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

      <div className={styles.selectWrapper}>
        <label className={styles.label} htmlFor="year">
          Year<span className={styles.required}> *</span>
        </label>
        <div className={`${styles.selectContainer} ${errors.year ? styles.error : ''}`}>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="">Select year</option>
            {YEARS.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        {errors.year && <span className={styles.errorMessage}>{errors.year}</span>}
      </div>

      <button type="button" onClick={handleNextStage} className={styles.nextButton}>
        Next
      </button>
    </>
  );
}
