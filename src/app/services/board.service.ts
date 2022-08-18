import { Injectable } from '@angular/core';
import { Board } from '../model/Board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  getBoards():Board[]{
    return JSON.parse(localStorage.getItem("notesapp-notes") || "[]") ;
  }

  saveBoards(boards:Board[]){
    localStorage.setItem("notesapp-notes", JSON.stringify(boards));
  }

  addBoard():Board{
    const boards = this.getBoards();
    const board:Board = {
      id: Math.floor(Math.random() * 100000),
      name: "My Board",
      tables: [],
      isActual: false
    }
    if (this.exist(board,boards)) {
      while (this.exist(board,boards)) {
        board.id = Math.floor(Math.random() * 100000);
      }
    }
    boards.push(board);
    this.saveBoards(boards);
    return board;
  }

  updateBoard(board:Board):Board[]{
    const boards = this.getBoards();
    let targetBoard = boards.filter((boards) => boards.id == board.id)[0];
    const index = boards.indexOf(targetBoard);
    targetBoard = board;
    boards[index] = targetBoard;
    this.saveBoards(boards);
    return boards;
  }

  deleteBoard(board:Board):Board[]{
    const boards = this.getBoards().filter((boards) => boards.id != board.id);
    this.saveBoards(boards);
    return boards;
  }

  getSelectedBoard():Board{
    const selected = this.getBoards().filter(
      board => {
        if (board.isActual) {
          return board;
        }
        return null;
      }
    )[0];
    return selected
  }

  private exist(board:Board, boards:Board[]):boolean{
    const found = boards.find((obj) => {
      return obj.id === board.id
    })
    return found !== undefined;
  }

}
