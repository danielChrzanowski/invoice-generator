import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
//import { MatCardModule } from '@angular/material/card';
//import { MatCheckboxModule } from '@angular/material/checkbox';
//import { MatAutocompleteModule } from '@angular/material/autocomplete';
//import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const materialModules = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatIconModule,
  MatSnackBarModule,
  MatTableModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [],
  imports: materialModules,
  exports: materialModules
})

export class MaterialModule { }
