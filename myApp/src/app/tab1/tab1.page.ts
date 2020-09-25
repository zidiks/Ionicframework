import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private menu: MenuController) { }

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

 ngOnInit() {
 }
 
}
