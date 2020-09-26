import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { Idea, IdeaService } from '../services/posts.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnChanges {

  public posts: object;
  public uploadStatus;

  public scrollHeigth: number = 10;
  constructor(
    private menu: MenuController,
    public ideaService: IdeaService,
    public toastController: ToastController
    ) { }

    ngOnInit() {
      this.uploadStatus = this.ideaService.getIdeas().subscribe((data) => {
        if (!this.posts || this.scrollHeigth < 10) {
          if (this.posts) this.presentToast();
          this.posts = data;
        } else {
          console.log('scroll to top to have new content!');
          this.presentToast();
        }
        
      });
    }

    ngOnChanges(changes: SimpleChanges) {
  }

  showCatMenu() {
    this.menu.open('cat');
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  logScrolling($event) {
    this.scrollHeigth = $event.detail.scrollTop;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Контент обновился!',
      position: 'top',
      color: "success",
      duration: 15000
    });
    toast.present();
  }
 
}
