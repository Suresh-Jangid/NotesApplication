import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NoteService } from '../note.service';
import { Note } from '../note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  notesData!: any; //for get data object created and show all data

  noteForm!: FormGroup; // for addform for frorm group
  editForm!: FormGroup; // for editform for frorm group

  noteObj: Note = {
    id: '',
    note_title: '',
    note_desc: '',
  }; // for object post all method interface

  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.noteForm = this.fb.group({
      note_title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      note_desc: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
    }); // for add form validation fields

    this.editForm = this.fb.group({
      edit_title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      edit_desc: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
    }); // for edit form validation fields
  }

  ngOnInit() {
    this.getAllNotes();
  }

  // Create Notes using strapi
  addNote() {
    let obj = {
      data: {
        note_title: this.noteForm.value.note_title,
        note_desc: this.noteForm.value.note_desc,
      },
    };
    this.noteService.addNote(obj).subscribe({
      next: (res: any) => {
        console.log('Post Successfully', res.data);
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  // Get All Using Strapi cms
  getAllNotes() {
    this.noteService.getNotes().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.notesData = res.data;
      },
      error: (err) => {},
      complete: () => {},
    });
  }

// Update Note Using Strapi cms
updateNote(id:any){
  let obj = {
    data: {
      id:this.editForm.value.id,
      edit_title: this.editForm.value.edit_title,
      edit_desc: this.editForm.value.edit_desc,
    },
  };
  console.log(obj);
  this.noteService.updateNote(this.editForm,this.noteObj.id).subscribe({
    next: (res: any) => {
      console.log('Update Note Successfully!', res.data);
      this.noteObj.id = res.data.id;
      console.log('data id'+ res.data.id);
    },
    error: (err) => {},
    complete: () => {},
  });
}
//delete Note using strapi
delNote(){
  debugger
  this.noteService.deleteNote(this.editForm.value.id).subscribe({
    next:(res:any)=> {
      console.log('Delete Note Successfully!',res.data);
    },
  })
}

}
