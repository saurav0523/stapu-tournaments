import { format, parseISO, addHours } from 'date-fns';

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd MMM yyyy');
  } catch (error) {
    return dateString;
  }
};

export const formatTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);      
    const istDate = addHours(date, 5.5);
    return format(istDate, 'hh:mm a');
  } catch (error) {
    return dateString;
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    const istDate = addHours(date, 5.5);
    return format(istDate, 'dd MMM yyyy, hh:mm a');
  } catch (error) {
    return dateString;
  }
};

export const getDateKey = (dateString: string): string => {
  try {
    if (!dateString) return '';
    const date = parseISO(dateString);
    if (isNaN(date.getTime())) return '';
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    console.warn('Error parsing date:', dateString, error);
    return '';
  }
};

export const isToday = (dateString: string): boolean => {
  try {
    const date = parseISO(dateString);
    const today = new Date();
    return format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
  } catch (error) {
    return false;
  }
};

export const getMonthName = (date: Date): string => {
  return format(date, 'MMM yyyy');
};
