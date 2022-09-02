import { Component, OnInit, ViewChild } from '@angular/core';
import { Board } from 'src/app/model/Board';
import { Note } from 'src/app/model/Note';
import { Table } from 'src/app/model/Table';
import { BoardService } from 'src/app/services/board.service';
import { TableService } from 'src/app/services/table.service';
import packageJson from '../../../../package.json';
import { OptionsComponent } from '../options/options.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boards:Board[] = [];
  selectedBoard:Board = { id:0, name:"", tables:[], isActual:true }
  moreTables:boolean = false;

  @ViewChild(OptionsComponent) child?:OptionsComponent;
  
  constructor(
    private boardService:BoardService,
    private tableService:TableService
  ) { }

  ngOnInit(): void {
    this.createBoardOnStart();
    this.setBoardsInfo();
    this.updateTableName();
  }

  openMenu(){
    this.child?.changeMenu(0);
  }
  
  createBoardOnStart(){
    if (this.boardService.getBoards().length === 0) {
      this.selectedBoard = this.boardService.addBoard();
      this.selectedBoard.isActual = true;
      this.updateBoard();
    }
  }
  
  setBoardsInfo(){
    this.boards = this.boardService.getBoards();
    this.selectedBoard = this.boardService.getSelectedBoard();
  }

  updateBoard(){
    this.boards = this.boardService.updateBoard(this.selectedBoard);
  }

  newBoard(){
    let board = this.boardService.addBoard();
    this.boards.push( board );
  }

  newTable(){
    this.selectedBoard.tables.push(this.tableService.addTable());
    this.updateBoard();
    this.updateTableName();
  }

  deleteTable(table:Table){
    this.selectedBoard.tables = this.tableService.deleteTable(table);
    this.updateBoard();
    this.updateTableName();
  }

  updateTableName(){
    if (this.selectedBoard.tables.length === 1) {
      this.moreTables = false;
    } else {
      this.moreTables = true;
    }
  }

  updateTable(event:Table){
    this.selectedBoard.tables = this.tableService.updateTable(event);
    this.updateBoard();
  }

  updateData(){
    this.boardService.deleteData();
    this.createBoardOnStart();
    this.setBoardsInfo();
    this.updateTableName();
  }

  onChangeBoard(board:Board){
    this.selectedBoard.isActual = false;
    this.updateBoard();
    this.selectedBoard = board;
    this.selectedBoard.isActual = true;
    this.updateBoard();
    this.updateTableName();
    this.setBoardsInfo();
  }

  onDeleteBoard(){
    if (this.boards.length === 1) {
      this.updateData();
    } else {
      this.boards = this.boardService.deleteBoard(this.selectedBoard);
      this.selectedBoard = this.boards[0];
      this.selectedBoard.isActual = true;
      this.updateBoard();
    }
    this.updateTableName();
  }

  updateTables(event:{ previousTable: Table, currentTable: Table, note:Note }){
    this.selectedBoard.tables[this.getSelectedTableIndex(event.previousTable)].notes = this.deleteNoteFromTable(
      this.selectedBoard.tables[this.getSelectedTableIndex(event.previousTable)]
      ,event.note
    )
    this.selectedBoard.tables[this.getSelectedTableIndex(event.currentTable)].notes.push(event.note);
    this.updateBoard();
  }

  deleteNoteFromTable(table:Table, note:Note):Note[]{
    return table.notes.filter(
      not => not.id !== note.id
    );
  }

  getSelectedTableIndex(table:Table):number{
    let index = this.selectedBoard.tables.map( (o) => o.id ).indexOf(table.id)
    return index;
  }

  importData(event:{ app:string, version:string , boards:Board[] }){
    if (event.app === "StickyNotes") {
      event.boards.forEach(board => {
        board.id = Math.floor(Math.random() * 100000)
        if (this.boardService.existId(board.id)) {
          while (this.boardService.existId(board.id)) {
            board.id = Math.floor(Math.random() * 100000);
          }
        }
        board.isActual = false;
        this.boards.push(board);
      });
      this.boardService.saveBoards(this.boards);
    } else {
      alert("This file does not belong to StickyNotes");
    }
  }

  exportAllData(){
    this.generateJson(this.boardService.getBoards(), "StickyNotes-Boards")
  }

  exportBoard(){
    let array = [this.selectedBoard];
    this.generateJson(array, "StickyNotes-" + this.selectedBoard.name)
  }

  generateJson( array:any, fileName:string ){
    let object:{ app:string, version:string , boards:Board[] } = {
      app:"StickyNotes",
      version: packageJson.version,
      boards: array
    }
    var sJson = JSON.stringify(object);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', fileName+".json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

}
