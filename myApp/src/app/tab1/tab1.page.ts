import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController, IonContent } from '@ionic/angular';

import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('pageTop') ionContent: IonContent;
  public posts: object;
  public uploadStatus;
  public changeCategpryStatus: boolean = false;
  public currentCategory: string = 'Лента';

  public scrollHeigth: number = 10;
  constructor(
    private menu: MenuController,
    public ideaService: PostsService,
    public toastController: ToastController,
    ) { }

    ngOnInit() {
      this.getContent('all');
    }

  showCatMenu() {
    this.menu.open('categories');
  }

  hideCatMenu() {
    this.menu.close('categories');
  }

  async presentToast(options) {
    const toast = await this.toastController.create(options);
    toast.present();
  }

  getContent(category) {
    this.uploadStatus = this.ideaService.getPosts(category).subscribe((data) => {
      if (this.changeCategpryStatus) {
        this.posts = data;
        this.changeCategpryStatus = false;
      } else {
        if (!this.posts || this.scrollHeigth <= 10) {
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
      }
    });
  }

  logScrolling($event) {
    this.scrollHeigth = $event.detail.scrollTop;
  }

  changeCategory(category) {
    this.changeCategpryStatus = true;
    this.uploadStatus.unsubscribe();
    this.getContent(category);
    this.hideCatMenu();
    switch (category) {
      case 'all':
        this.currentCategory = 'Лента';
        break;
      case 'sport':
        this.currentCategory = 'Спорт';
        break;
      case 'stud-life':
        this.currentCategory = 'Студ. жизнь';
        break;
      case 'sience':
        this.currentCategory = 'Наука';
        break;
      case 'events':
        this.currentCategory = 'Мероприятия';
        break;
      case 'homes':
        this.currentCategory = 'Общежития';
        break;
    }
  }

}
