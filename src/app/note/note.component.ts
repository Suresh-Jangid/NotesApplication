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
  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit() {}

  addNote() {
    const { value } = this.noteForm;
    console.log(value);
    debugger
    this.noteObj.id = '',
    this.noteObj.note_title = value.title,
    this.noteObj.note_desc = value.description

    this.noteService.addNote(this.noteObj).then((note) => {
      debugger
      if (note) {
        alert('Data Successfully inserted');
        this.noteForm.reset();
      }
    });
  }
}
