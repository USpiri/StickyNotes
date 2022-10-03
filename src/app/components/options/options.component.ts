import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import packageJson from '../../../../package.json';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  menus:{ id:number, title:string }[] = [
    { id:0, title:"Menu" },
    { id:1, title:"About this project" },
    { id:2, title:"Export options" },
    { id:3, title:"New Board/Table options" },
    { id:4, title:"How to download StickyNotes" }
  ];
  selectedMenu:{ id:number, title:string } = this.menus[0];

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
    this.closeModal();
  }

  onNewTable(){
    this.newTable.emit();
    this.closeModal();
  }

  onUpdateData(){
    if (confirm("This action will delete all your data and create an empty Board")) {
      this.updateData.emit();
    }
    this.closeModal();
  }

  changeMenu( id:number ){
    this.selectedMenu = this.menus[id];
  }

  onExport(){
    this.exportBoardData.emit();
    this.closeModal();
  }

  onExportAll(){
    this.exportAllData.emit();
    this.closeModal();
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
    this.closeModal();
  }

  closeModal(){
    this.clsButton.nativeElement.click();
    this.changeMenu(0);
  }

}
