import { Injectable } from '@angular/core';
import { Note } from './note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  Url = env.apiUrl;

  constructor(private fs: Firestore, private http:HttpClient,) {}

  // Add new Note code here
  addNote(note: any){
    debugger
    return this.http.post(this.Url + '/api/notes-apps', note)
  }


  // addNote(note: Note) {
  //   note.id = doc(collection(this.fs, 'id')).id
  //   debugger
  //   return addDoc(collection(this.fs, 'Notes'), note)
  // }

  //Get All notes form Database
  getNotes(){
    return this.http.get(this.Url + '/api/notes-apps')
  }

  // getNotes(): Observable<Note[]> {
  //   let notesRef = collection(this.fs, 'Notes');
  //   return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
  // }

  //Delete notes from Database

  // deleteNote(note: Note) {
  //   let docRef = doc(this.fs, `Notes/${note.id}`);

  //   return deleteDoc(docRef);
  // }

  //Update Notes from Database

  // updateNote(note: Note, notes: any) {
  //   let docRef = doc(this.fs, `Notes/${note.id}`);
  //   return updateDoc(docRef, notes);
  // }
}
