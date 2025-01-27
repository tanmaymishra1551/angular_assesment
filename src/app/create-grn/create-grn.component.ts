// app/create-grn/create-grn.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-grn',
  templateUrl: './create-grn.component.html',
  styleUrls: ['./create-grn.component.css']
})
export class CreateGrnComponent {
  grnForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.grnForm = this.fb.group({
      company: ['', Validators.required],
      date: ['', Validators.required],
      store: ['', Validators.required],
      remarks: [''],
      items: this.fb.array([this.createItemGroup()])
    });
  }

  createItemGroup(): FormGroup {
    return this.fb.group({
      itemCategory: ['', Validators.required],
      item: ['', Validators.required],
      strain: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      uom: ['', Validators.required],
      totalCost: ['', [Validators.required, Validators.min(0)]],
      costPerUnit: ['', [Validators.required, Validators.min(0)]],
      supplier: ['', Validators.required],
      lotName: [''],
      imported: [false]
    });
  }

  get items(): FormArray {
    return this.grnForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.createItemGroup());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    if (this.grnForm.valid) {
      console.log(this.grnForm.value);
      // Submit the form
    }
  }
}
