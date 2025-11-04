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
    
    case 'questionForClub':
      if (value.length > 300) return 'Question cannot exceed 300 characters';
      return '';
    
    default:
      return '';
  }
};

export const validateForm = (formData) => {
  const errors = {};
  const requiredFields = ['name', 'usn', 'email', 'branch'];
  
  requiredFields.forEach(key => {
    const error = validateField(key, formData[key]);
    if (error) errors[key] = error;
  });

  if (formData.questionForClub) {
    const error = validateField('questionForClub', formData.questionForClub);
    if (error) errors.questionForClub = error;
  }

  return errors;
};
