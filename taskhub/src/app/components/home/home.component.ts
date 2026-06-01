import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Task } from '../../models/task.model';
import { PriorityLabelPipe } from '../../pipes/priority-label.pipe';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterLink,
    DatePipe,
    CurrencyPipe,
    UpperCasePipe,
    PriorityLabelPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  userName = '';
  greeting = '';
  stats = { total: 0, completed: 0, pending: 0, totalBudget: 0 };
  recentTasks: Task[] = [];
  isLoading = true;
  showWelcomeBanner = true;

  private subscription?: Subscription;

  constructor(
    private readonly taskService: TaskService,
    readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.userName = this.userService.profile.name;
    this.updateGreeting();

    this.subscription = this.taskService.tasks$.subscribe((tasks) => {
      this.stats = this.taskService.getStats();
      this.recentTasks = tasks.filter((t) => !t.completed).slice(0, 3);
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  dismissBanner(): void {
    this.showWelcomeBanner = false;
  }

  private updateGreeting(): void {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Good morning';
    } else if (hour < 17) {
      this.greeting = 'Good afternoon';
    } else {
      this.greeting = 'Good evening';
    }
  }
}
