import { Injectable } from '@angular/core';
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
      id: board.tables.length + 1,
      name: "Table " + (board.tables.length + 1),
      notes: []
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

}
