import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/model/Note';
import { Table } from 'src/app/model/Table';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Output() deleteTable:EventEmitter<any> = new EventEmitter();
  @Output() newTableName:EventEmitter<Table> = new EventEmitter();
  @Input() table:Table = { id:0, name:"", notes:[] };
  @Input() moreTables:boolean = false;
  
  actualTable:Table = { id:0, name:"", notes:[] };

  constructor(
    private noteService:NoteService
  ) { }

  ngOnInit(): void {
    this.actualTable = this.table;
  }

  addNote(){
    this.actualTable.notes.push(this.noteService.addNote(this.table));
    this.onUpdate();
  }

  updateNote( newNote:Note ){
    this.actualTable.notes = this.noteService.updateNote(newNote,this.table);
    this.onUpdate();
  }

  deleteNote(note:Note){
    const doDelete = confirm("Are you sure you wish to delete this sticky note?");
    if (doDelete) {
      this.actualTable.notes = this.noteService.deleteNote(note,this.table);
    }
    this.onUpdate();
  }

  onDelete(){
    this.deleteTable.emit();
  }

  onUpdate(){
    this.newTableName.emit(this.actualTable);
  }

}
