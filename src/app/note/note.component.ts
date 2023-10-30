import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NoteService } from '../note.service';
import { Note } from '../note';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  notesData!: any; //for get data object created and show all data
  noteGetById!: any; // Get Id for Update data and bind data in model
  noteForm!: FormGroup; // for addform for frorm group
  editForm!: FormGroup; // for editform for frorm group
  noteObj: Note = {
    id: '',
    note_title: '',
    note_desc: '',
  }; // for object post all method interface

  constructor(private fb: FormBuilder,
     private noteService: NoteService,
     private spinner: NgxSpinnerService,
     public toastr: ToastrService) {
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
    this.getAllNotes(); // initial call method when page rendering
  }

  // Create Notes using strapi
  addNote() {
    let obj = {
      data: {
        note_title: this.noteForm.value.note_title,
        note_desc: this.noteForm.value.note_desc,
      },
    }; // this Obj in pass data using form and data key word is strapi structur for used
    this.noteService.addNote(obj).subscribe({
      next: (res: any) => {
        console.log('Post Successfully', res.data);
        this.getAllNotes();
        this.toastr.success('Your data successfully Added !', 'Success !', {
          timeOut: 2000,
        });
      },
      error: (err) => {
        this.toastr.error('Something is wrogn !', 'Major Error !', {
          timeOut: 2000,
        });
      },
      complete: () => {},
    });
    this.noteForm.reset();
  }

  // Get All Using Strapi cms
  getAllNotes() {
    this.spinner.show();
    this.noteService.getNotes().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.notesData = res.data;
        setTimeout(()=>{
          this.spinner.hide();
        },5000);
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  // GetBy Id Using Strapi cms
  getById(note: Note) {
    // this is Get By Id note in selected data with getbyid using note key word in id Note in All data
    this.noteService.getById(note).subscribe({
      next: (res: any) => {
        console.log('Get By ID using Strapi', res.data);
        this.noteGetById = res.data;
        console.log(this.noteGetById);
      },
      error: (err) => {},
      complete: () => {},
    });
    this.getAllNotes();
  }

  // Update Note Using Strapi cms
  updateNote(notes: Note) {
    let Obj: any = {
      data: {
        note_title: this.editForm.value.edit_title,
        note_desc: this.editForm.value.edit_desc,
      },
    }; // this Obj in set data with getbyid using note key word in id  Note in selected data form and data key word is strapi structur for used
    console.log(notes, Obj);
    this.noteService.updateNote(notes, Obj).subscribe({
      next: (res: any) => {
        console.log('Update Note Successfully!', res.data);
        this.noteObj.id = res.data.id;
        console.log('data id ' + res.data.id);
        this.toastr.warning('Your data successfully Updated !', 'Warn !', {
          timeOut: 2000,
        });
        this.getAllNotes();
      },
      error: (err) => {
        this.toastr.error('everything is broken !', 'Major Error !', {
          timeOut: 2000,
        });
      },
      complete: () => {},
    });
    this.editForm.reset();
  }

  //delete Note using strapi
  delNote(note: Note) {
    // this note in  selected data with getbyid using note key word in id Note in All data
    this.noteService.deleteNote(note).subscribe({
      next: (res: any) => {
        console.log('Delete Note Successfully!', res.data);
        this.toastr.warning('Your data successfully Deleted !', 'Delete !', {
          timeOut: 2000,
        });
        this.getAllNotes();
      },
      error: (err) => {
        this.toastr.error('everything is broken !', 'Major Error !', {
          timeOut: 2000,
        });
      },
      complete: () => {},
    });
  }
}
