import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Item } from './../../models/item';
import { InvoiceListService } from './../../services/invoice-list/invoice-list.service';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {
  itemFormGroup: Array<FormGroup> = [];
  items: Array<Item> = [];

  @ViewChildren('nameInput') nameInput!: QueryList<ElementRef>;
  @ViewChildren('countInput') countInput!: QueryList<ElementRef>;
  @ViewChildren('priceInput') priceInput!: QueryList<ElementRef>;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private invoiceListService: InvoiceListService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addItemFormGroup();
    this.items.push(new Item(0, '', 0, 0));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  getNameFormControlErrorMessage(id: number) {
    return this.itemFormGroup[id].controls['nameFormControl'].hasError('required') ? 'Please enter name' :
      this.itemFormGroup[id].controls['nameFormControl'].hasError('minlength') ? 'Min length 3' :
        this.itemFormGroup[id].controls['nameFormControl'].hasError('maxlength') ? 'Max length 30' :
          '';
  }

  getCountFormControlErrorMessage(id: number) {
    return this.itemFormGroup[id].controls['countFormControl'].hasError('required') ? 'Please enter count' :
      this.itemFormGroup[id].controls['countFormControl'].hasError('min') ? 'Min 1' :
        this.itemFormGroup[id].controls['countFormControl'].hasError('max') ? 'Max 100' :
          this.itemFormGroup[id].controls['countFormControl'].hasError('pattern') ? 'Please input number' :
            '';
  }

  getPriceFormControlErrorMessage(id: number) {
    return this.itemFormGroup[id].controls['priceFormControl'].hasError('required') ? 'Please enter price' :
      this.itemFormGroup[id].controls['priceFormControl'].hasError('min') ? 'Min 1' :
        this.itemFormGroup[id].controls['priceFormControl'].hasError('max') ? 'Max  1000000' :
          this.itemFormGroup[id].controls['priceFormControl'].hasError('pattern') ? 'Please input number' :
            '';
  }

  addItem() {
    if (this.items.length > 0) {
      let lastItemId = this.items[this.items.length - 1].id;

      this.addItemFormGroup();
      this.items.push(new Item(lastItemId + 1, '', 0, 0));
    } else {
      this.addItemFormGroup();
      this.items.push(new Item(0, '', 0, 0));
    }
  }

  removeItem(id: number) {
    this.itemFormGroup.splice(id, 1);
    this.items.pop();
  }

  onSubmit() {
    let itemsLength = this.items.length;
    let correctData = true;

    if (itemsLength > 0) {
      this.itemFormGroup.forEach(element => {
        element.markAllAsTouched();
      });
    } else {
      return this.openSnackBar("Please add items", "Ok");
    }

    this.itemFormGroup.forEach(element => {
      if (!element.valid) {
        correctData = false;
        return;
      }
    });

    if (correctData) {
      let i = 0;
      this.items.forEach(() => {
        this.items[i].name = this.nameInput.toArray()[i].nativeElement.value;
        this.items[i].count = this.countInput.toArray()[i].nativeElement.value;
        this.items[i].price = this.priceInput.toArray()[i].nativeElement.value;
        i++;
      });

      this.invoiceListService.updateItems(this.items);
      this.router.navigate(['/previewInvoice']);
    }
  }

  addItemFormGroup() {
    this.itemFormGroup[this.itemFormGroup.length] = this.formBuilder.group({
      nameFormControl: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      countFormControl: ["", [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]],
      priceFormControl: ["", [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]],
    })
  }

}
