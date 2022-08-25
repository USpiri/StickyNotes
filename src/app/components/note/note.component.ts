import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Color } from 'src/app/model/Color';
import { Note } from 'src/app/model/Note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note:Note = { id:0, text:"", color:"#fffffc" }
  @Output() onNewText:EventEmitter<Note> = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  colors:Color[] = [
    { id: 0, color: "#fffffc", selected: false },
    { id: 1, color: "#ffadad", selected: false },
    { id: 2, color: "#ffd6a5", selected: false },
    { id: 3, color: "#fdffb6", selected: false },
    { id: 4, color: "#caffbf", selected: false },
    { id: 5, color: "#c0fdff", selected: false },
    { id: 6, color: "#a0c4ff", selected: false },
    { id: 7, color: "#ffc6ff", selected: false }
  ]

  noteText:string = "";

  constructor() { }

  ngOnInit(): void {
    this.noteText = this.note.text;
    this.colors.forEach( color => {
      if (color.color === this.note.color) {
        color.selected = true;
      } else {
        color.selected = false
      }
    });
  }

  onUpdate(){
    this.onNewText.emit(this.note);
  }

  onDeleteNote(){
    this.onDelete.emit();
  }

  selectItem(id:number){
    this.colors.forEach(color => {
      if (color.id === id) {
        color.selected = true;
        this.note.color = color.color;
      } else {
        color.selected = false
      }
    });
    this.onUpdate();
  }

}
