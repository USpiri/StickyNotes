import { Injectable } from '@angular/core';
import { Note } from '../model/Note';
import { Table } from '../model/Table';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  addNote(table:Table):Note{
    const notes = table.notes;
    const note:Note = {
      id: Math.floor(Math.random() * 100000),
      text: "",
      color: "#fffffc"
    }
    if (this.exist(note,notes)) {
      while (this.exist(note,notes)) {
        note.id = Math.floor(Math.random() * 100000);
      }
    }
    return note;
  }

  updateNote(note:Note, table:Table):Note[]{
    const notes = table.notes;
    let targetNote = notes.filter((notes) => notes.id === note.id)[0];
    const index = notes.indexOf(targetNote);
    targetNote = note;
    notes[index] = targetNote;
    return notes;
  }

  deleteNote(note:Note, table:Table):Note[]{
    const notes = table.notes.filter((notes) => notes.id != note.id);
    return notes;
  }

  private exist(note:Note, notes:Note[]):boolean{
    const found = notes.find((obj) => {
      return obj.id === note.id
    })
    return found !== undefined;
  }

}
