import { Component, OnInit, ViewChild } from '@angular/core';
import { Board } from 'src/app/model/Board';
import { Table } from 'src/app/model/Table';
import { BoardService } from 'src/app/services/board.service';
import { TableService } from 'src/app/services/table.service';

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
      this.createTableOnStart();
    }
  }

  createTableOnStart(){
    this.selectedBoard.tables.push(this.tableService.addTable());
    this.updateBoard();
  }
  
  setBoardsInfo(){
    this.boards = this.boardService.getBoards();
    this.selectedBoard = this.boardService.getSelectedBoard();
  }

  updateBoard(){
    this.boardService.updateBoard(this.selectedBoard);
  }

  newBoard(){
    //TO DO
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

}
