import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() text:string = "";
  @Output() onNewText:EventEmitter<string> = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  noteText:string = "";

  constructor() { }

  ngOnInit(): void {
    this.noteText = this.text
  }

  onUpdate(){
    this.onNewText.emit(this.noteText);
  }

  onDeleteNote(){
    this.onDelete.emit();
  }

}
