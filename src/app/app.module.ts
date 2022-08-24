import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { NoteComponent } from './components/note/note.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { TableComponent } from './components/table/table.component';
import { OptionsComponent } from './components/options/options.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    NoteComponent,
    AddButtonComponent,
    TableComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
