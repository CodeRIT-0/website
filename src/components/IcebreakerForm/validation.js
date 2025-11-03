export const validateField = (name, value) => {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.length < 2) return 'Name must be at least 2 characters';
      return '';
    
    case 'usn':
      if (!value.trim()) return 'USN is required';
      return '';
    
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
      return '';
    
    case 'branch':
      if (!value) return 'Branch is required';
      return '';
    
    case 'year':
      if (!value) return 'Year is required';
      return '';
    
    case 'programmingInterests':
      if (!value.trim()) return 'Please tell us about your programming interests';
      if (value.length > 500) return 'Response cannot exceed 500 characters';
      return '';
    
    case 'expectations':
      if (!value.trim()) return 'Please tell us what you would like to see from CodeRIT';
      if (value.length > 500) return 'Response cannot exceed 500 characters';
      return '';
    
    case 'howDidYouHear':
      if (!value.trim()) return 'Please tell us how you heard about CodeRIT';
      if (value.length > 200) return 'Response cannot exceed 200 characters';
      return '';
    
    case 'questionForClub':
      if (!value.trim()) return 'Please share your question';
      if (value.length > 300) return 'Question cannot exceed 300 characters';
      return '';
    
    default:
      return '';
  }
};

export const validateForm = (formData) => {
  const errors = {};
  Object.keys(formData).forEach(key => {
    const error = validateField(key, formData[key]);
    if (error) errors[key] = error;
  });
  return errors;
};
