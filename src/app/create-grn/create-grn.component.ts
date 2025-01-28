import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-grn-stepper',
  templateUrl: './create-grn.component.html',
  styleUrls: ['./create-grn.component.css'],
})
export class GrnStepperComponent {
  isEditable = true;
  grnForm: FormGroup;
  detailsFormGroup: FormGroup;
  inventoriesFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    // Step 1: Details
    this.detailsFormGroup = this.fb.group({
      company: ['', Validators.required],
      date: ['', Validators.required],
      store: ['', Validators.required],
      remarks: [''],
    });

    // Step 2: Inventories
    this.inventoriesFormGroup = this.fb.group({
      items: this.fb.array([]),
    });

    // Parent Form
    this.grnForm = this.fb.group({
      details: this.detailsFormGroup,
      inventories: this.inventoriesFormGroup,
    });
  }

  get items(): FormArray {
    return this.inventoriesFormGroup.get('items') as FormArray;
  }

  addItem() {
    this.items.push(
      this.fb.group({
        itemCategory: ['', Validators.required],
        item: ['', Validators.required],
        strain: ['', Validators.required],
        quantity: [null, Validators.required],
        uom: ['', Validators.required],
        totalCost: [null, Validators.required],
        costPerUnit: [null, Validators.required],
        supplier: ['', Validators.required],
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    if (this.grnForm.valid) {
      console.log('Form Submitted:', this.grnForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
