import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MaterialModule
} from '@angular/material';



export const IMPORTS: any[] = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule.forRoot()
];

export const DECLARATIONS = [

];


export const PROVIDERS = [

];

export const EXPORTS = [
  // BrowserModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule
];

// export const BOOTSTRAP = [
//   AppComponent
// ];



@NgModule({
  imports: IMPORTS,
  declarations: DECLARATIONS,
  providers: PROVIDERS,
  exports: EXPORTS
})
export class SharedModule { }
