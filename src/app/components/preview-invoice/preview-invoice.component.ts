import { Component, OnInit } from '@angular/core';
import { Item } from './../../models/item';
import { CompanyService } from './../../services/company/company.service';
import { InvoiceListService } from './../../services/invoice-list/invoice-list.service';

@Component({
  selector: 'app-preview-invoice',
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['./preview-invoice.component.scss']
})
export class PreviewInvoiceComponent implements OnInit {
  displayedColumns: string[] = Object.keys(new Item(-1, "", 0, 0));
  items: Array<Item> = [];
  itemsSum: number = 0;

  companyName: string = "";
  companyAddress: string = "";
  companyPhones: Array<string> = [];

  constructor(
    private companyService: CompanyService,
    private invoiceListService: InvoiceListService
  ) { }

  ngOnInit(): void {
    this.companyService.getCompanyData('/assets/company.json')
      .subscribe(data => {
        this.companyName = data.name;
        this.companyAddress = data.address;
        this.companyPhones = data.phones;
      });

    this.invoiceListService.itemsState.subscribe((items) => {
      this.items = items;
      items.forEach(element => {
        this.itemsSum += element.count * element.price;
      });

    });
  }

}
