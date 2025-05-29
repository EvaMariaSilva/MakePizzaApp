import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeMenuPageRoutingModule } from './home-menu-routing.module';

import { HomeMenuPage } from './home-menu.page';
import { ToppinsModalComponent } from '../components/toppins-modal/toppins-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeMenuPageRoutingModule
  ],
  declarations: [HomeMenuPage,ToppinsModalComponent ]
})
export class HomeMenuPageModule {}
