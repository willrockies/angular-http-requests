import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [
    AlertModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertModalComponent
  ],
  entryComponents: [AlertModalComponent, ConfirmModalComponent]

})
export class SharedModule { }
