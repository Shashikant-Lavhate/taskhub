import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly profileSubject = new BehaviorSubject<UserProfile>({
    name: 'Alex Morgan',
    email: 'alex.morgan@taskhub.dev',
    role: 'Product Manager',
    bio: 'Passionate about building accessible, responsive web experiences with Angular.',
    joinedDate: new Date('2024-03-15')
  });

  readonly profile$ = this.profileSubject.asObservable();

  get profile(): UserProfile {
    return this.profileSubject.value;
  }

  updateProfile(profile: UserProfile): void {
    this.profileSubject.next({ ...profile });
  }
}
