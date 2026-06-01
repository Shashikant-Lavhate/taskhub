import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, TaskPriority } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly tasksSubject = new BehaviorSubject<Task[]>(this.getInitialTasks());
  readonly tasks$ = this.tasksSubject.asObservable();

  private nextId = 6;

  get tasks(): Task[] {
    return this.tasksSubject.value;
  }

  addTask(
    title: string,
    description: string,
    priority: TaskPriority,
    dueDate: Date,
    estimatedCost: number
  ): void {
    const task: Task = {
      id: this.nextId++,
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
      dueDate,
      estimatedCost
    };
    this.tasksSubject.next([task, ...this.tasks]);
  }

  toggleComplete(id: number): void {
    this.tasksSubject.next(
      this.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  removeTask(id: number): void {
    this.tasksSubject.next(this.tasks.filter((t) => t.id !== id));
  }

  getStats(): { total: number; completed: number; pending: number; totalBudget: number } {
    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.completed).length;
    return {
      total,
      completed,
      pending: total - completed,
      totalBudget: this.tasks.reduce((sum, t) => sum + t.estimatedCost, 0)
    };
  }

  private getInitialTasks(): Task[] {
    return [
      {
        id: 1,
        title: 'Design dashboard wireframes',
        description: 'Create responsive layouts for desktop and mobile views.',
        priority: 'high',
        completed: true,
        dueDate: new Date('2026-06-05'),
        estimatedCost: 0
      },
      {
        id: 2,
        title: 'Implement Angular components',
        description: 'Build reusable header, footer, and list components.',
        priority: 'high',
        completed: false,
        dueDate: new Date('2026-06-10'),
        estimatedCost: 150
      },
      {
        id: 3,
        title: 'Set up reactive contact form',
        description: 'Add validation and accessible error messages.',
        priority: 'medium',
        completed: false,
        dueDate: new Date('2026-06-12'),
        estimatedCost: 75
      },
      {
        id: 4,
        title: 'Write unit tests',
        description: 'Cover critical services and form logic.',
        priority: 'low',
        completed: false,
        dueDate: new Date('2026-06-20'),
        estimatedCost: 200
      },
      {
        id: 5,
        title: 'Accessibility audit',
        description: 'Verify labels, contrast, and keyboard navigation.',
        priority: 'medium',
        completed: false,
        dueDate: new Date('2026-06-15'),
        estimatedCost: 50
      }
    ];
  }
}
