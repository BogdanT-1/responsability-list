import { CalendarActionsService } from "../../calendar/services/calendar-actions.service";
import { DayModel } from "../models-constants/day.model";
import { groupBy } from "./group-by";

export async function prepareCalendar(missingDaysBefore: number, missingDaysAfter: number, currentMonthDays: number,
  daysPreviousMonth: number, currentMonth: number, currentYear: number, calendarService: CalendarActionsService,) {
  let days: DayModel[] = [];

  const tasks = groupBy(await calendarService.getAllTasks().toPromise(), "assignedDate");
  while (missingDaysBefore > 0) {
    const taskIndex = `${daysPreviousMonth - missingDaysBefore + 1}-${currentMonth - 1}-${currentMonth - 1 < 0 ? currentYear - 1 : currentYear}`;
    days.push({
      currentDay: daysPreviousMonth - missingDaysBefore + 1,
      currentMonth: currentMonth - 1,
      year: currentMonth - 1 < 0 ? currentYear - 1 : currentYear,
      tasks: tasks[taskIndex] || []
    })
    missingDaysBefore--;
  }

  for (let i = 1; i <= currentMonthDays; i++) {
    const taskIndex = `${i}-${currentMonth}-${currentYear}`;
    days.push({
      currentDay: i,
      currentMonth: currentMonth,
      year: currentYear,
      tasks: tasks[taskIndex] || []
    })
  }

  let index = 1
  while (index <= missingDaysAfter) {
    const taskIndex = `${index}-${currentMonth + 1}-${currentMonth + 1 > 11 ? currentYear + 1 : currentYear}`;
    days.push({
      currentDay: index,
      currentMonth: currentMonth + 1,
      year: currentMonth + 1 > 11 ? currentYear + 1 : currentYear,
      tasks: tasks[taskIndex] || []
    })
    index++;
  }

  return days;
}
