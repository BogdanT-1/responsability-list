import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyTask } from '../../shared/models-constants/dailytask.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarActionsService {
  backendDefaultRoute: string = "http://localhost:9010/v1/";
  headers = { 'content-type': 'application/json'} ;
  constructor(private http: HttpClient) { }

  getAllTasks() {
    const taskUrl = "tasks/";
    return this.http.get<DailyTask[]>(this.backendDefaultRoute + taskUrl);
  }

  getTasksByAssignedDate(assignedDate: string) {
    const taskUrl = "tasks/day/";
    return this.http.get<DailyTask[]>(this.backendDefaultRoute + taskUrl + assignedDate);
  }

  createTask(task: DailyTask) {
    const taskUrl = "task/";
    const body = JSON.stringify(task);
    return this.http.post(this.backendDefaultRoute + taskUrl, body, {'headers': this.headers});
  }

  deleteTask(task: DailyTask) {
    const taskUrl = "task/";
    return this.http.delete(this.backendDefaultRoute + taskUrl + task.ID);
  }

  editTask(task: DailyTask) {
    const taskUrl = "task/";
    const body = JSON.stringify(task);
    return this.http.put(this.backendDefaultRoute + taskUrl + task.ID, body, {'headers': this.headers});
  }

  completeTasks(IDs: number[]) {
    const taskUrl = "tasks/complete"
    const body = JSON.stringify({ids: IDs});
    return this.http.post(this.backendDefaultRoute + taskUrl, body, {'headers': this.headers});
  }
}
