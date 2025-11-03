export const validateField = (name, value) => {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.length < 2) return 'Name must be at least 2 characters';
      return '';
    
    case 'usn':
      if (!value.trim()) return 'USN is required';
      return '';
    
    case 'questionForClub':
      if (value.length > 300) return 'Question cannot exceed 300 characters';
      return '';
    
    default:
      return '';
  }
};
