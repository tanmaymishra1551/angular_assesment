import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyService } from '../services/company.service';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-grn-stepper',
  templateUrl: './create-grn.component.html',
  styleUrls: ['./create-grn.component.css'],
})
export class GrnStepperComponent implements OnInit {
  isEditable = true;
  grnForm: FormGroup;
  detailsFormGroup: FormGroup;
  inventoriesFormGroup: FormGroup;
  companies: string[] = []; // Holds the fetched company names
  itemsList: string[] = ['Laptop', 'Tablet', 'Monitor', 'Keyboard', 'Mouse']; // Sample Items

  // Search controls
  companySearchControl = new FormControl('');
  itemSearchControl = new FormControl('');

  // Filtered Observables for search
  filteredCompanies!: Observable<string[]>;
  filteredItems!: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private companyService: CompanyService
  ) {
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

  ngOnInit(): void {
    // Fetch Companies from API
    this.companyService.getCompanies().subscribe((data: string[]) => {
      this.companies = data;
    });

    // Initialize filtered company search
    this.filteredCompanies = this.companySearchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value!, this.companies))
    );

    // Initialize filtered item search
    this.filteredItems = this.itemSearchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value!, this.itemsList))
    );
  }

  private _filter(value: string | null | undefined, list: string[] = []): string[] {
    const filterValue = (value || '').toLowerCase();
    return list ? list.filter(option => option.toLowerCase().includes(filterValue)) : [];
  }
  

  selectCompany(company: string) {
    this.detailsFormGroup.get('company')?.setValue(company);
    this.companySearchControl.setValue(company);
  }

  selectItem(item: string, index: number) {
    (this.items.at(index) as FormGroup).get('item')?.setValue(item);
    this.itemSearchControl.setValue(item); 
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

    itemGroup.valueChanges.subscribe(value => {
      const quantity = value.quantity || 0;
      const totalCost = value.totalCost || 0;
      const costPerUnit = quantity > 0 ? totalCost / quantity : 0;
      itemGroup.get('costPerUnit')?.setValue(costPerUnit, { emitEvent: false });
    });

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
      const url = `http://localhost:8000/api/v1/form/create`;
      this.http
        .post(url, formData, { headers })
        .subscribe(
          response => console.log('Server Response:', response),
          error => console.error('Error:', error)
        );
    } else {
      console.log('Form is invalid');
    }
  }
}
