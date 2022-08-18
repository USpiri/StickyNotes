import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Output() newBoard:EventEmitter<any> = new EventEmitter();
  @Output() newTable:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onNewBoard(){
    this.newBoard.emit();
  }

  onNewTable(){
    this.newTable.emit();
  }

}
