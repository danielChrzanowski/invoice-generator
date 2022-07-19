import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { InvoiceListService } from './services/invoice-list/invoice-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'invoice-generator';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private invoiceListService: InvoiceListService
  ) { }

  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    })
  }

  clearInvoiceServiceItems() {
    this.invoiceListService.updateItems([]);
  }

}
