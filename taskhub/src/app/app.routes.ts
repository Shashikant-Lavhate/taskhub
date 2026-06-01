import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home | TaskHub' },
  { path: 'tasks', component: TaskListComponent, title: 'Tasks | TaskHub' },
  { path: 'profile', component: ProfileComponent, title: 'Profile | TaskHub' },
  { path: 'contact', component: ContactFormComponent, title: 'Contact | TaskHub' },
  { path: '**', redirectTo: '' }
];
