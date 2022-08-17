import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from 'src/app/model/Note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  notes:Note[] = [];

  constructor(
    private noteService:NoteService
  ) { }

  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
  }

  addNote(){
    this.notes.push(this.noteService.addNote());
  }

  updateNote( newNote:Note ){
    this.noteService.updateNote(newNote);
  }

  deleteNote(note:Note){
    const doDelete = confirm("Are you sure you wish to delete this sticky note?");
    if (doDelete) {
      this.notes = this.noteService.deleteNote(note);
    }
  }

}
