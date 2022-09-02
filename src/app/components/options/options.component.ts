import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import packageJson from '../../../../package.json';

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
  @Output() importData:EventEmitter<any> = new EventEmitter();
  @Output() exportBoardData:EventEmitter<any> = new EventEmitter();
  @Output() exportAllData:EventEmitter<any> = new EventEmitter();

  selectedFile!: File;
  version:string = packageJson.version;

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

  onExport(){
    this.exportBoardData.emit();
    this.clsButton.nativeElement.click();
  }

  onExportAll(){
    this.exportAllData.emit();
    this.clsButton.nativeElement.click();
  }

  onImport(event:any){
    if(event.target.files.length > 0) {
      let data:any;
      this.selectedFile = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsText(this.selectedFile, "UTF-8");
      fileReader.onload = () => {
        data = JSON.parse(fileReader.result?.toString()!);
        this.importData.emit(data);
      }
      fileReader.onerror = (error) => {
        alert("Error reading file")
      }
    }
    this.clsButton.nativeElement.click();
  }

}
