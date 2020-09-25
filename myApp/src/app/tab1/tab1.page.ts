import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { Idea, IdeaService } from '../services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public ideas: Observable<Idea[]>;
  public ideasDom;

  constructor(
    private menu: MenuController,
    public ideaService: IdeaService
    ) { }

    ngOnInit() {
      this.ideas = this.ideaService.getIdeas();
      //this.ideasDom = JSON.parse(JSON.stringify(this.ideas));
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

 
 
}
