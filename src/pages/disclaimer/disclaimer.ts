import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Slides } from 'ionic-angular';
import { InAppBrowser} from '@ionic-native/in-app-browser';

import { MyhubPage } from '../myhub/myhub';

@Component({
  selector: 'page-disclaimer',
  templateUrl: 'disclaimer.html'
})

export class DisclaimerPage {
  showSkip = true;
  checkterms:boolean = false;
  showerror:boolean = false;

	@ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    private inappbrowser: InAppBrowser
  ) { }

  startApp() {
    if(this.checkterms)
      this.navCtrl.setRoot(MyhubPage);
    else
        this.showerror = true;
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

	ionViewWillEnter() {
		this.slides.update();
	}

  openWithBrowser(url:string){
    this.inappbrowser.create(url,"_blank");
  } 

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
