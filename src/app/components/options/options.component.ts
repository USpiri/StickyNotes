import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @ViewChild('clsButton') clsButton:any;

  @Output() newBoard:EventEmitter<any> = new EventEmitter();
  @Output() newTable:EventEmitter<any> = new EventEmitter();
  @Output() updateData:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onNewBoard(){
    this.newBoard.emit();
    this.clsButton.nativeElement.click();
  }

  onNewTable(){
    this.newTable.emit();
    this.clsButton.nativeElement.click();
  }

  onUpdateData(){
    if (confirm("This action will delete all your data and create an empty Board")) {
      this.updateData.emit();
    }
    this.clsButton.nativeElement.click();
  }

}
