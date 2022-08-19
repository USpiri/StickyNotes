import { Injectable } from '@angular/core';
import { Board } from '../model/Board';
import { Table } from '../model/Table';
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private boardService:BoardService
  ) { }

  addTable():Table{
    const board = this.boardService.getSelectedBoard();
    const newTable:Table = {
      id: Math.floor(Math.random() * 100000),
      name: "Table " + (board.tables.length + 1),
      notes: []
    }
    if (this.exist(newTable,board.tables)) {
      while (this.exist(newTable,board.tables)) {
        newTable.id = Math.floor(Math.random() * 100000);
      }
    }
    return newTable;
  }

  addTableOnBoard(board:Board):Table{
    const newTable:Table = {
      id: Math.floor(Math.random() * 100000),
      name: "Table " + (board.tables.length + 1),
      notes: []
    }
    if (this.exist(newTable,board.tables)) {
      while (this.exist(newTable,board.tables)) {
        newTable.id = Math.floor(Math.random() * 100000);
      }
    }
    return newTable;
  }

  updateTable(table:Table):Table[]{
    const tables = this.boardService.getSelectedBoard().tables;
    let targetTable = tables.filter((tables) => tables.id === table.id)[0];
    const index = tables.indexOf(targetTable);
    targetTable = table;
    tables[index] = targetTable;
    return tables;
  }

  deleteTable(table:Table):Table[]{
    const tables = this.boardService.getSelectedBoard().tables.filter((tables) => tables.id != table.id);
    return tables;
  }

  private exist(table:Table, tables:Table[]):boolean{
    const found = tables.find((obj) => {
      return obj.id === table.id
    })
    return found !== undefined;
  }

}
