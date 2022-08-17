import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../model/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  getNotes():Note[]{
    return JSON.parse(localStorage.getItem("notesapp-notes") || "[]") ;
  }

  saveNotes(notes:Note[]){
    localStorage.setItem("notesapp-notes", JSON.stringify(notes));
  }

  addNote():Note{
    const notes = this.getNotes();
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
    notes.push(note);
    this.saveNotes(notes);
    return note;
  }

  updateNote(note:Note):Note[]{
    const notes = this.getNotes();
    let targetNote = notes.filter((notes) => notes.id == note.id)[0];
    const index = notes.indexOf(targetNote);
    targetNote = note;
    notes[index] = targetNote;
    this.saveNotes(notes);
    return notes;
  }

  deleteNote(note:Note):Note[]{
    const notes = this.getNotes().filter((notes) => notes.id != note.id);
    this.saveNotes(notes);
    return notes;
  }

  private exist(note:Note, notes:Note[]):boolean{
    const found = notes.find((obj) => {
      return obj.id === note.id
    })
    return found !== undefined;
  }

}
