import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from 'src/app/models/item';

@Injectable({
  providedIn: 'root'
})
export class InvoiceListService {
  private items = new BehaviorSubject<Array<Item>>(new Array<Item>);
  itemsState = this.items.asObservable();

  constructor() { }

  updateItems(item: Array<Item>) {
    this.items.next(item);
  }

}
