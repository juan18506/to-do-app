import { Months } from '../types';

export const getCurrentDateData = () => {
  const currentDate = new Date(Date.now());
  const currentMonth = Months[currentDate.getMonth()];
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();

  return { currentDay, currentMonth, currentYear };
};

export const showCurrentDate = (day: number, month: string, year: number): void => {
  const $date = document.getElementById('date');
  if ($date === null) return;
  $date.innerHTML = `${month} ${day}, ${year}`;
};