import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { NoteComponent } from './components/note/note.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { TableComponent } from './components/table/table.component';
import { OptionsComponent } from './components/options/options.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    DragDropModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgxGoogleAnalyticsModule.forRoot('MEASUREMENT-ID')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
