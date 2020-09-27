import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
 
export interface Idea {
  id?: string,
  name: string,
  ncategory: string
}
 
@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  public ideas: Observable<Idea[]>;
  public ideaCollection: AngularFirestoreCollection<Idea>;
  
 
  constructor(private afs: AngularFirestore) {
  }
 
  getPosts(category): Observable<Idea[]>  {
    if (category == 'all') {
      this.ideaCollection = this.afs.collection<Idea>('ideas', ref => ref.orderBy('date', 'desc'));
    } else {
      this.ideaCollection = this.afs.collection<Idea>('ideas', ref => ref.where('category', '==', category).orderBy('date', 'desc'));
    }
    this.ideas = this.ideaCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.ideas;
  }
 
  getIdea(id: string): Observable<Idea> {
    return this.ideaCollection.doc<Idea>(id).valueChanges().pipe(
      take(1),
      map(idea => {
        idea.id = id;
        return idea
      })
    );
  }
}