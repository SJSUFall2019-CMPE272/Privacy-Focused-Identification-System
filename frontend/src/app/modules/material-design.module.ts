import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatListModule
  ],
  exports: [
  	MatInputModule,
  	MatToolbarModule,
  	MatCardModule,
  	MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatListModule
  ]
})
export class MaterialDesignModule { }
