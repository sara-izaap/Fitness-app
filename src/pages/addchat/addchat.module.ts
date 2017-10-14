import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddchatPage } from './addchat';

@NgModule({
  declarations: [
    AddchatPage,
  ],
  imports: [
    IonicPageModule.forChild(AddchatPage),
  ],
})
export class AddchatPageModule {}
