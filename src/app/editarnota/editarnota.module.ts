import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarnotaPageRoutingModule } from './editarnota-routing.module';

import { EditarnotaPage } from './editarnota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarnotaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarnotaPage]
})
export class EditarnotaPageModule {}
