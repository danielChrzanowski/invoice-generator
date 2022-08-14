import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  items: Observable<Array<Item> | any> | undefined;
  itemsSum: number = 0;

  companyName: Observable<string> | undefined;
  companyAddress: Observable<string> | undefined;
  companyPhones: Observable<Array<string>> | undefined;

  constructor(
    private companyService: CompanyService,
    private invoiceListService: InvoiceListService
  ) { }

  ngOnInit(): void {
    this.companyService.getCompanyData('/assets/company.json')
      .subscribe(data => {
        this.companyName = new Observable(ob => ob.next(data.name));
        this.companyAddress = new Observable(ob => ob.next(data.address));
        this.companyPhones = new Observable(ob => ob.next(data.phones.join(', ')));
      });

    this.invoiceListService.itemsState.subscribe((items) => {
      this.items = new Observable(ob => ob.next(items));
      items.forEach(element => {
        this.itemsSum += element.count * element.price;
      });

    });
  }

}
