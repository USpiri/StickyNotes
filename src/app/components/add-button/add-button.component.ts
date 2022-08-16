import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {

  @Output() btnClick = new EventEmitter;
  
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){;
    this.btnClick.emit();
  }

}
