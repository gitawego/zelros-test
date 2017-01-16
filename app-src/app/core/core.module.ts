/* tslint:disable:member-ordering no-unused-variable */
import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';


import { ApiService } from './api.service';

@NgModule({
  imports: [
    CommonModule
    // todo add store
    //StoreModule.provideStore()
  ],
  declarations: [],
  exports: [],
  providers: [ApiService]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
