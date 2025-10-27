import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => twMerge(clsx(inputs));

export const SetLocalStorage = (values) => {
  localStorage.setItem('token', values.token);
  localStorage.setItem('fullName', values.fullName);
  localStorage.setItem('role', values.role);
  localStorage.setItem('email', values.email);
  localStorage.setItem('empID', values.empID);
};

export const GetLocalStorage = () => {
  const token = localStorage.getItem('token'),
    fullName = localStorage.getItem('fullName'),
    role = localStorage.getItem('role'),
    email = localStorage.getItem('email');

  if (!token || !fullName || !role || !email) {
    return { token: null, userInfo: null };
  }

  return { token, userInfo: { fullName, role, email } };
};

export const ClearLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('fullName');
  localStorage.removeItem('role');
  localStorage.removeItem('email');
};

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const formatDateShort = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
  });
};
