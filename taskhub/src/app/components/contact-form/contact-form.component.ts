import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  contactForm: FormGroup;
  submitted = false;
  submitSuccess = false;

  readonly subjects = ['General Inquiry', 'Technical Support', 'Feedback', 'Partnership'];

  constructor(private readonly fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['General Inquiry', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      newsletter: [false]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.submitSuccess = true;
    this.contactForm.reset({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
      newsletter: false
    });
    this.submitted = false;
  }

  resetForm(): void {
    this.contactForm.reset({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
      newsletter: false
    });
    this.submitted = false;
    this.submitSuccess = false;
  }
}
