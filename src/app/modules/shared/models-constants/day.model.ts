import { DailyTask } from "./dailytask.model";

export interface DayModel {
  currentDay: number,
  currentMonth: number,
  year: number,
  tasks: DailyTask[]
}
