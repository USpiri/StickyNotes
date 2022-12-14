import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/model/Note';
import { Table } from 'src/app/model/Table';
import { NoteService } from 'src/app/services/note.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Output() updateTables:EventEmitter<any> = new EventEmitter();
  @Output() deleteTable:EventEmitter<any> = new EventEmitter();
  @Output() newTableName:EventEmitter<Table> = new EventEmitter();
  @Input() table:Table = { id:0, name:"", notes:[] };
  @Input() moreTables:boolean = false;
  
  actualTable:Table = { id:0, name:"", notes:[] };
  isFirstTable:boolean = false;

  constructor(
    private noteService:NoteService,
    private boardService:BoardService
  ) { }

  ngOnInit(): void {
    this.actualTable = this.table;
    this.firstTable();
  }

  firstTable(){
    if ( this.boardService.getSelectedBoard().tables[0].id === this.actualTable.id ) {
      this.isFirstTable = true
    }
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
    this.actualTable.notes = this.noteService.deleteNote(note,this.table);
    this.onUpdate();
  }

  onDelete(){
    this.deleteTable.emit();
    this.firstTable();
  }

  onUpdate(){
    this.newTableName.emit(this.actualTable);
  }

  onDropped(event:CdkDragDrop<Note[]>){
    if (event.previousContainer === event.container) {
    } else {
      this.updateTables.emit({
        previousTable: event.previousContainer.data,
        currentTable: event.container.data,
        note: event.item.data
      });
    }
  }

  moveInArray( array:Note[], oldIndex:number, newIndex:number ){
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array; // for testing
  }

}
