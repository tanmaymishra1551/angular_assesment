import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Step 1: Details
    this.detailsFormGroup = this.fb.group({
      company: ['', Validators.required],
      date: ['', Validators.required],
      store: ['', Validators.required],
      remarks: [''],
      documentNumber: [{ value: 'XXX-XXX-XXXX', disabled: true }],
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
    const itemGroup = this.fb.group({
      itemCategory: ['null', Validators.required],
      item: ['null', Validators.required],
      quantity: [0, Validators.required],
      uom: ['kg', Validators.required],
      totalCost: [0, Validators.required],
      costPerUnit: [{ value: 0, disabled: true }, Validators.required],
    });

    // Set up value changes to calculate cost per unit
    itemGroup.valueChanges.subscribe((value) => {
      const quantity = value.quantity || 0;
      const totalCost = value.totalCost || 0;

      const costPerUnit = quantity > 0 ? totalCost / quantity : 0;
      itemGroup.get('costPerUnit')?.setValue(costPerUnit, { emitEvent: false });
    });

    // Push the new item group into the form array
    this.items.push(itemGroup);

  }


  removeItem(index: number) {
    this.items.removeAt(index);
  }


  onSubmit() {
    if (this.grnForm.valid) {
      const formData = this.grnForm.value;
      console.log('Form Data:', formData);

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url =`http://localhost:8000/api/v1/form/create`;
      this.http.post(url, formData, { headers })
        .subscribe(
          (response: any) => console.log('Server Response:', response),
          (error: any) => console.error('Error:', error)
        );
    } else {
      console.log('Form is invalid');
    }
  }
}
