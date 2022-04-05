
export function prepareCalendar(missingDaysBefore: number, missingDaysAfter: number, currentMonthDays: number,
  daysPreviousMonth: number, currentMonth: number, currentYear: number) {
  let days = [];
  while (missingDaysBefore > 0) {
    days.push({
      currentDay: daysPreviousMonth - missingDaysBefore,
      currentMonth: currentMonth - 1,
      year: currentMonth - 1 < 0 ? currentYear - 1 : currentYear
    })
    missingDaysBefore--;
  }

  for (let i = 1; i <= currentMonthDays; i++) {
    days.push({
      currentDay: i,
      currentMonth: currentMonth,
      year: currentYear
    })
  }

  let index = 1
  while (index <= missingDaysAfter) {
    days.push({
      currentDay: index,
      currentMonth: currentMonth + 1,
      year: currentMonth + 1 > 11 ? currentYear + 1 : currentYear
    })
    index++;
  }

  return days;
}
