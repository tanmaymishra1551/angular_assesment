import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the reactive form with form controls
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.postForm.valid) {
      console.log('Form Submitted:', this.postForm.value);
      this.postForm.reset();
      Object.keys(this.postForm.controls).forEach((key) => {
        const control = this.postForm.get(key);
        control?.markAsPristine();
        control?.markAsUntouched();
        control?.setErrors(null);
      });
      // Perform further actions such as sending data to a backend
    } else {
      console.log('Form is invalid');
    }
  }
}