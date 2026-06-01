import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe, LowerCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, DatePipe, LowerCasePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: UserProfile = {
    name: '',
    email: '',
    role: '',
    bio: '',
    joinedDate: new Date()
  };

  editMode = false;
  saveSuccess = false;

  private subscription?: Subscription;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.profile$.subscribe((profile) => {
      this.profile = { ...profile };
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  enableEdit(): void {
    this.editMode = true;
    this.saveSuccess = false;
  }

  cancelEdit(): void {
    this.profile = { ...this.userService.profile };
    this.editMode = false;
  }

  saveProfile(): void {
    if (!this.profile.name.trim() || !this.profile.email.trim()) {
      return;
    }

    this.userService.updateProfile({ ...this.profile });
    this.editMode = false;
    this.saveSuccess = true;
    setTimeout(() => (this.saveSuccess = false), 3000);
  }
}
