import { CurrentDate, Months } from '../types';

export const getCurrentDate = (): CurrentDate => {
  const currentDate: Date = new Date(Date.now());

  const currentDay  : number = currentDate.getDate();
  const currentMonth: string = Months[currentDate.getMonth()];
  const currentYear : number = currentDate.getFullYear();

  return { currentDay, currentMonth, currentYear };
};

export const showCurrentDate = (currentDate: CurrentDate): void => {
  const $date: HTMLElement | null = document.getElementById('date');
  if ($date === null) return;

  const { currentDay, currentMonth, currentYear } = currentDate;
  $date.innerHTML = `${currentMonth} ${currentDay}, ${currentYear}`;
};