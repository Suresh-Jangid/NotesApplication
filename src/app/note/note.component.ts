import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../note.service';
import { Note } from '../note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  noteForm!: FormGroup;
  noteObj: Note = {
    id: '',
    note_title: '',
    note_desc: '',
  };
  notesData!: any;
  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.noteForm = this.fb.group({
      note_title: ['', Validators.required],
      note_desc: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.getAllNotes()
  }

// Create Notes using strapi
addNote(){
  debugger
  const obj = this.noteForm;
    console.log(obj);
    this.noteService.addNote(obj).subscribe({
      next:(data:any)=>{
        debugger
      console.log('Post Successfully',data);
    },
    error:(err)=>{},
    complete:()=>{}
  })
  //   this.noteObj.id = '',
  //   this.noteObj.note_title = value.title,
  //   this.noteObj.note_desc = value.description,
}



    // Get All
    getAllNotes(){
      this.noteService.getNotes().subscribe({next:(res:any)=>{
        console.log(res.data);
        this.notesData = res.data;
      },
      error:(err)=>{},
      complete:()=>{},
    })
    }
}
