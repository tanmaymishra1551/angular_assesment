import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
})
export class UserDialogComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data?._id;
    this.userForm = this.fb.group({
      username: [this.data?.username || '', [Validators.required, Validators.minLength(3)]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      fullName: [this.data?.fullName || '', Validators.required],
      password: [this.data?._id ? null : '', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
    });
  }

  save(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value); // Pass the form data back
    }
  }

  close(): void {
    this.dialogRef.close(); // Close without saving
  }
}
