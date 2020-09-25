import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private menu: MenuController, private firestore: AngularFirestore) { }

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

 

 ngOnInit() {
   console.log(this.firestore
    .doc('ideas/JHuXRxI9pnovamFCzAj3').valueChanges() )
 }
 
}
