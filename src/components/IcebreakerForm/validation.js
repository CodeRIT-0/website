import { findDepartment } from './departments';

// Shared by the form (client-side checks) and /api/icebreaker-register (server-side checks),
// so both always agree on what is valid. Keep this file free of browser-only code.

// 1MS + 2-digit year + 2-letter branch code + 3-digit number, e.g. 1MS24CS186 (any case).
// First years with a temporary USN have a -T or _T at the end, e.g. 1MS25CS001-T
export const USN_REGEX = /^1ms\d{2}[a-z]{2}\d{3}([-_]t)?$/i;

// letters (any language), spaces, and . ' - only
export const NAME_REGEX = /^[\p{L}][\p{L}\p{M}\s.'-]*$/u;

// something@domain.tld, no spaces, no consecutive dots, TLD of 2+ letters
export const EMAIL_REGEX = /^[^\s@.]+(\.[^\s@.]+)*@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i;

export const validateField = (name, rawValue) => {
  const value = (rawValue || '').trim();

  switch (name) {
    case 'name':
      if (!value) return 'Name is required';
      if (value.length < 2) return 'Name must be at least 2 characters';
      if (value.length > 100) return 'Name cannot exceed 100 characters';
      if (!NAME_REGEX.test(value)) return 'Name can only contain letters, spaces, . \' and -';
      return '';

    case 'usn':
      if (!value) return 'USN is required';
      if (!USN_REGEX.test(value)) return 'Enter a valid USN like 1MS26CS001 (temporary USNs: 1MS26CS001-T)';
      return '';

    case 'email':
      if (!value) return 'Email is required';
      if (value.length > 100) return 'Email cannot exceed 100 characters';
      if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email';
      return '';

    case 'branch':
      if (!value) return 'Branch is required';
      if (!findDepartment(value)) return 'Please pick your branch from the list';
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

  ['name', 'usn', 'email', 'branch', 'questionForClub'].forEach((key) => {
    const error = validateField(key, formData[key]);
    if (error) errors[key] = error;
  });

  return errors;
};
