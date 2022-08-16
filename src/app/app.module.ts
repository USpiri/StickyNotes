import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { NoteComponent } from './components/note/note.component';
import { AddButtonComponent } from './components/add-button/add-button.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    NoteComponent,
    AddButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
