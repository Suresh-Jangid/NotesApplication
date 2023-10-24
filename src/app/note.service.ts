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

  constructor(private http:HttpClient,) {}

  // Add new Note code here
  addNote(data: any){
    return this.http.post(`${this.Url}`, data);
  }

  //Get All notes form Database
  getNotes(){
    return this.http.get(this.Url + '?populate=*')
  }

  //Get By Id notes form Database


  //Delete notes from Database
deleteNote(id:any){
  debugger
  return this.http.delete(`${this.Url}/${id}`,{responseType:'json'});
}

  //Update Notes from Database
  updateNote(id:any,body:any){
    debugger
    return this.http.put(`${this.Url}/${id}`,body);
  }
}


