import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/model/Board';
import { Note } from 'src/app/model/Note';
import { Table } from 'src/app/model/Table';
import { BoardService } from 'src/app/services/board.service';
import { TableService } from 'src/app/services/table.service';
import { transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boards:Board[] = [];
  selectedBoard:Board = { id:0, name:"", tables:[], isActual:true }
  moreTables:boolean = false;
  
  constructor(
    private boardService:BoardService,
    private tableService:TableService
  ) { }

  ngOnInit(): void {
    this.createBoardOnStart();
    this.setBoardsInfo();
    this.updateTableName();
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

  updateTables(event:{ previousTable: Table, currentTable: Table, previousIndex: number, currentIndex: number, note:Note }){
    transferArrayItem(
      this.selectedBoard.tables[this.getSelectedTableIndex(event.previousTable)].notes,
      this.selectedBoard.tables[this.getSelectedTableIndex(event.currentTable)].notes,
      event.previousIndex,
      event.currentIndex
    );
    this.updateBoard();
  }

  getSelectedTableIndex(table:Table):number{
    let index = this.selectedBoard.tables.map( (o) => o.id ).indexOf(table.id)
    return index;
  }

}
