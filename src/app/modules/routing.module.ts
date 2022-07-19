import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewInvoiceComponent } from '../components/new-invoice/new-invoice.component';
import { PreviewInvoiceComponent } from '../components/preview-invoice/preview-invoice.component';

const routes: Routes = [
  { path: '', redirectTo: 'newInvoice', pathMatch: 'full' },
  { path: 'newInvoice', component: NewInvoiceComponent },
  { path: 'previewInvoice', component: PreviewInvoiceComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})

export class RoutingModule { }

export const routingComponents = [NewInvoiceComponent, PreviewInvoiceComponent]
