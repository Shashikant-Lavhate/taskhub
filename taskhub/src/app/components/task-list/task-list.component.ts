import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task, TaskPriority } from '../../models/task.model';
import { PriorityLabelPipe } from '../../pipes/priority-label.pipe';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    CurrencyPipe,
    LowerCasePipe,
    PriorityLabelPipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  newTitle = '';
  newDescription = '';
  newPriority: TaskPriority = 'medium';
  newDueDate = '';
  newCost = 0;

  showAddForm = false;
  addSuccess = false;

  readonly priorities: TaskPriority[] = ['low', 'medium', 'high'];

  private subscription?: Subscription;

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 7);
    this.newDueDate = tomorrow.toISOString().split('T')[0];

    this.subscription = this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get filteredTasks(): Task[] {
    switch (this.filter) {
      case 'active':
        return this.tasks.filter((t) => !t.completed);
      case 'completed':
        return this.tasks.filter((t) => t.completed);
      default:
        return this.tasks;
    }
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter = filter;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.addSuccess = false;
  }

  addTask(): void {
    if (!this.newTitle.trim()) {
      return;
    }

    this.taskService.addTask(
      this.newTitle,
      this.newDescription,
      this.newPriority,
      new Date(this.newDueDate),
      Number(this.newCost) || 0
    );

    this.newTitle = '';
    this.newDescription = '';
    this.newPriority = 'medium';
    this.newCost = 0;
    this.addSuccess = true;
    this.showAddForm = false;

    setTimeout(() => (this.addSuccess = false), 3000);
  }

  toggleComplete(id: number): void {
    this.taskService.toggleComplete(id);
  }

  removeTask(id: number): void {
    this.taskService.removeTask(id);
  }

  trackByTaskId(_index: number, task: Task): number {
    return task.id;
  }
}
