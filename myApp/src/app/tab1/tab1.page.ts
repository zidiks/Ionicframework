import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MenuController, ToastController, IonContent } from '@ionic/angular';

import { Observable } from 'rxjs';
import { Idea, IdeaService } from '../services/posts.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('pageTop') ionContent: IonContent;
  public posts: object;
  public uploadStatus;
  public scrollPost: number = 0;

  public scrollHeigth: number = 10;
  constructor(
    private menu: MenuController,
    public ideaService: IdeaService,
    public toastController: ToastController,
    ) { }

    ngOnInit() {
      this.uploadStatus = this.ideaService.getIdeas().subscribe((data) => {
        if (!this.posts || this.scrollHeigth < 10) {
          if (this.posts) this.presentToast({
            message: 'Контент обновился!',
            position: 'top',
            color: "success",
            duration: 5000
          });
          this.posts = data;
        } else {
          this.presentToast({
            message: 'Контент обновился!',
            position: 'top',
            color: "success",
            buttons: [
              {
                text: 'Обновить',
                handler: () => {
                  this.ionContent.scrollToTop(500);
                  this.posts = data;
                }
              }
            ],
            duration: 15000
          });
        }
      });
    }

  showCatMenu() {
    this.menu.open('cat');
  }

  async presentToast(options) {
    const toast = await this.toastController.create(options);
    toast.present();
  }
 
}
