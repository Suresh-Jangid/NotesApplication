import { Injectable } from '@angular/core';
import { Note } from './note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';


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
getById(id:any){
  return this.http.get(`${this.Url}/${id}`,{responseType:'json'})
}

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


