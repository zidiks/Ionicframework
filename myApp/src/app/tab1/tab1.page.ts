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

  constructor(
    private menu: MenuController,
    public ideaService: IdeaService
    ) { }

    ngOnInit() {
      this.ideas = this.ideaService.getIdeas();
    }

  showCatMenu() {
    this.menu.open('cat');
  }
  public itemss = ['test1', 
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
  'test2',
];

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

 
 
}
