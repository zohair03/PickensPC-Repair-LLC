import { format, parseISO } from 'date-fns';

export function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return format(parseISO(dateStr), 'MMMM d, yyyy');
  } catch {
    return dateStr;
  }
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const STATUS_COLORS = {
  confirmed: 'bg-green-50 text-green-700 border border-green-200/60',
  rescheduled: 'bg-yellow-50 text-yellow-700 border border-yellow-200/60',
  cancelled: 'bg-red-50 text-red-700 border border-red-200/60',
};

export const STATUS_LABELS = {
  confirmed: 'Confirmed',
  rescheduled: 'Rescheduled',
  cancelled: 'Cancelled',
};
